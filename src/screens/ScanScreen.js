import * as React from 'react';
import {StyleSheet, Text, View, Modal, Image} from 'react-native';
import {useCameraDevices} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {useIsFocused} from '@react-navigation/native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScanScreen = ({navigation}) => {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [barcode, setBarcode] = React.useState('default');
  const [modalNewItemVisible, setModalNewItemVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [barcodeFound, setBarcodeFound] = React.useState(false);
  const [foodItem, setFoodItem] = React.useState({
    nutritionalfacts: {
      fooditemname: 'N/A',
      calories: 'N/A',
      cholesterol: 'N/A',
      dietaryfiber: 'N/A',
      includesaddedsugars: 'N/A',
      protein: 'N/A',
      saturatedfat: 'N/A',
      servingsize: 'N/A',
      servingspercontainer: 'N/A',
      sodium: 'N/A',
      totalcarbs: 'N/A',
      totalfat: 'N/A',
      totalsugars: 'N/A',
      transfat: 'N/A',
      foodscore: 'N/A',
    },
  });

  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();

  const storeData = async (barcode, name) => {
    try {
      console.log('NAME: ', name);
      const value = await AsyncStorage.getItem('@bookmarksv3');

      let bookmarks = JSON.parse(value);

      console.log('Bookmarks: ', bookmarks);

      if (bookmarks) {
        if (!bookmarks.barcodes.includes(barcode)) {
          bookmarks.barcodes.push(barcode);
          // bookmarks.names.push(name);
          bookmarks.foodItems.push({
            barcode: barcode,
            name: name,
          });
        }
      } else {
        bookmarks = {
          barcodes: [barcode],
          // names: [name],
          foodItems: [
            {
              barcode: barcode,
              name: name,
            },
          ],
        };
      }

      await AsyncStorage.setItem('@bookmarksv3', JSON.stringify(bookmarks));
      console.log('storedata: ', barcode);
      console.log('name: ', name);
    } catch (e) {
      console.log('error saving data', e);
    }
  };

  var [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.UPC_A], {
    checkInverted: true,
  });

  React.useEffect(() => {
    (async () => {
      console.log('running');
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  React.useEffect(() => {
    barcodes = [];
    setBarcodeFound(false);
  }, [isFocused]);

  return (
    device != null &&
    hasPermission && (
      <>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isFocused}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalNewItemVisible}
          onRequestClose={() => {
            setModalNewItemVisible(false);
          }}>
          <View style={styles.modalView}>
            <View>
              <Image
                source={require('../../assets/icons/error.png')}
                // resizeMode="contain"
                style={{
                  margin: 10,
                  marginBottom: 20,
                  alignSelf: 'center',
                  width: 80,
                  height: 80,
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                alignSelf: 'center',
              }}>
              Error!
            </Text>
            <Text style={{color: 'black', alignSelf: 'center', margin: 5}}>
              Barcode not recognized:
            </Text>
            <Text
              style={{
                color: 'black',
                alignSelf: 'center',
                margin: 5,
                marginBottom: 20,
              }}>
              {barcode}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Pressable
                style={[styles.button, {backgroundColor: '#E04F5F'}]}
                onPress={() => {
                  navigation.navigate('NEW ITEM', {
                    params: {barcodeId: barcode},
                  });
                  setModalNewItemVisible(false);

                  barcodes = [];
                }}>
                <Text style={{color: 'white', alignSelf: 'center'}}>
                  Add New Item
                </Text>
              </Pressable>
              <Pressable
                style={[styles.buttonClose, {backgroundColor: '#E04F5F'}]}
                onPress={() => {
                  setModalNewItemVisible(false);
                  setBarcodeFound(false);
                  barcodes = [];
                }}>
                <Text style={{color: 'white', alignSelf: 'center'}}>
                  Try Again
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={styles.modalView}>
            <Text
              style={[
                styles.modalText,
                {textAlign: 'center', marginBottom: 10},
              ]}>
              Barcode: {barcode}
            </Text>
            <View>
              <Text style={styles.modalBoldText}>
                {foodItem.nutritionalfacts.fooditemname}{' '}
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 24,
                  fontWeight: 'bold',
                }}>
                Nutrition Facts
              </Text>
            </View>
            <View>
              <Text style={styles.modalText}>
                About {foodItem.nutritionalfacts.servingspercontainer} servings
                per container
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: 'black',
                borderBottomWidth: 5,
              }}>
              <Text
                style={[
                  styles.modalSmallBoldText,
                  {flex: 1, textAlign: 'left'},
                ]}>
                Serving size
              </Text>
              <Text
                style={[
                  styles.modalSmallBoldText,
                  {flex: 1, textAlign: 'right'},
                ]}>
                {foodItem.nutritionalfacts.servingsize}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'left',
                  color: 'black',
                  fontSize: 24,
                  fontWeight: 'bold',
                }}>
                Calories
              </Text>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'right',
                  color: 'black',
                  fontSize: 24,
                  fontWeight: 'bold',
                }}>
                {foodItem.nutritionalfacts.calories}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.modalSmallBoldText}>Total Fat</Text>
              <Text style={styles.modalFactText}>
                {' '}
                {foodItem.nutritionalfacts.totalfat}
                {'g'}
              </Text>
            </View>
            <View>
              <Text style={styles.modalText}>
                {'    '}Saturated Fat {foodItem.nutritionalfacts.saturatedfat}
                {'g '}
              </Text>
            </View>
            <View>
              <Text style={styles.modalText}>
                {'    '}Trans Fat {foodItem.nutritionalfacts.transfat}
                {'g '}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.modalSmallBoldText}>Cholesterol</Text>
              <Text style={styles.modalFactText}>
                {' '}
                {foodItem.nutritionalfacts.cholesterol}
                {'mg '}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.modalSmallBoldText}>Sodium</Text>
              <Text style={styles.modalFactText}>
                {' '}
                {foodItem.nutritionalfacts.sodium}
                {'mg '}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.modalSmallBoldText}>Total Carbohydrate</Text>
              <Text style={styles.modalFactText}>
                {' '}
                {foodItem.nutritionalfacts.totalcarbs}
                {'g '}
              </Text>
            </View>
            <View>
              <Text style={styles.modalText}>
                {'    '}Dietary Fiber {foodItem.nutritionalfacts.dietaryfiber}
                {'g '}
              </Text>
            </View>
            <View>
              <Text style={styles.modalText}>
                {'    '}Total Sugars {foodItem.nutritionalfacts.totalsugars}
                {'g '}
              </Text>
            </View>
            <View>
              <Text style={styles.modalText}>
                {'         '}Includes{' '}
                {foodItem.nutritionalfacts.includesaddedsugars}
                {'g '}
                Added Sugars{' '}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.modalSmallBoldText}>Protein</Text>
              <Text style={styles.modalFactText}>
                {' '}
                {foodItem.nutritionalfacts.protein}
                {'g '}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text
                style={[styles.modalBoldText, {flex: 1, textAlign: 'left'}]}>
                Food Score
              </Text>
              <Text
                style={[
                  styles.modalBoldText,
                  {flex: 1, textAlign: 'right', fontSize: 30},
                ]}>
                {foodItem.nutritionalfacts.foodscore}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Pressable
                style={styles.button}
                onPress={async () => {
                  await storeData(
                    barcode,
                    foodItem.nutritionalfacts.fooditemname,
                  );
                  setModalVisible(false);
                  setBarcodeFound(false);
                  barcodes = [];
                }}>
                <Text style={{color: 'white', alignSelf: 'center'}}>
                  Bookmark
                </Text>
              </Pressable>
              <Pressable
                style={styles.buttonClose}
                onPress={() => {
                  setModalVisible(false);
                  setFoodItem({
                    nutritionalfacts: {
                      fooditemname: 'N/A',
                      calories: 'N/A',
                      cholesterol: 'N/A',
                      dietaryfiber: 'N/A',
                      includesaddedsugars: 'N/A',
                      protein: 'N/A',
                      saturatedfat: 'N/A',
                      servingsize: 'N/A',
                      servingspercontainer: 'N/A',
                      sodium: 'N/A',
                      totalcarbs: 'N/A',
                      totalfat: 'N/A',
                      totalsugars: 'N/A',
                      transfat: 'N/A',
                      foodscore: 'N/A',
                    },
                  });
                  barcodes = [];
                  setBarcodeFound(false);
                }}>
                <Text style={{color: 'white', alignSelf: 'center'}}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {barcodes.map((newBarcode, idx) => {
          {
            newBarcode.displayValue;
          }
          if (!barcodeFound) {
            setBarcode(newBarcode.displayValue);
            const userDocument = firestore()
              .collection('fooditems')
              .doc(newBarcode.displayValue)
              .get()
              .then(querySnapshot => {
                console.log('fooditem: ', querySnapshot._data);
                if (querySnapshot._data) {
                  setFoodItem(querySnapshot._data);
                  setModalVisible(true);
                } else {
                  //add barcode newitem screen
                  setModalNewItemVisible(true);
                }
              });
            setBarcodeFound(true);
            // setModalVisible(true)
          }
        })}
      </>
    )
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8fcbbc',
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-start',
    backgroundColor: '#2F9C95',
    borderRadius: 15,
    padding: 10,
    marginRight: 15,
    elevation: 2,
  },
  buttonClose: {
    flex: 1,
    alignContent: 'flex-end',
    backgroundColor: '#2F9C95',
    borderRadius: 15,
    padding: 10,
    marginLeft: 15,
    elevation: 2,
  },
  modalText: {
    color: 'black',
    marginBottom: 5,
    alignItems: 'flex-start',
  },
  modalBoldText: {
    color: 'black',
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 20,
    // marginBottom: 15,
    alignItems: 'flex-start',
  },
  modalSmallBoldText: {
    color: 'black',
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalFactText: {
    color: 'black',
    marginBottom: 5,
    fontSize: 16,
  },
});
