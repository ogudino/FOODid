import * as React from 'react';
import {StyleSheet, Text, View, Modal, Alert} from 'react-native';
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
      console.log("NAME: ", name)
      const value = await AsyncStorage.getItem('@bookmarksv3');

      let bookmarks = JSON.parse(value);

      console.log('Bookmarks: ', bookmarks);

      if (bookmarks) {
        if (!bookmarks.barcodes.includes(barcode)) {
          bookmarks.barcodes.push(barcode);
          bookmarks.names.push(name);
          bookmarks.foodItems.push({
            barcode: barcode,
            name: name
          })
        }
      } else {
        bookmarks = {
          barcodes: [barcode],
          names: [name],
          foodItems: [
            {
              barcode: barcode,
              name: name
            }
          ]
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
            <Text style={styles.modalText}>
              Barcode not recognized: {barcode}
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                navigation.navigate('New Item', {
                  params: {barcodeId: barcode},
                });
                setModalNewItemVisible(false);

                barcodes = [];
              }}>
              <Text style={styles.textStyle}>Add New Item</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalNewItemVisible(false);
                setBarcodeFound(false);
                barcodes = [];
              }}>
              <Text style={styles.textStyle}>Try Again</Text>
            </Pressable>
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
            <Text style={styles.modalText}>Barcode: {barcode}</Text>
            <View>
              <Text style={styles.modalText}>
                {foodItem.nutritionalfacts.fooditemname}
              </Text>
            </View>
            <View>
              <Text style={styles.modalText}>
                About {foodItem.nutritionalfacts.servingspercontainer} servings
                per container
              </Text>
            </View>
            <View>
              <Text style={styles.modalText}>
                Serving size : {foodItem.nutritionalfacts.servingsize}{' '}
              </Text>
            </View>
            <View>
              <Text style={styles.modalText}>
                Calories : {foodItem.nutritionalfacts.calories}{' '}
              </Text>
            </View>
            <View>
              <Text style={styles.modalText}>
                Total Fat : {foodItem.nutritionalfacts.totalfat}{' '}
              </Text>
            </View>
            <View>
              <Text style={styles.modalText}>
                Saturated Fat : {foodItem.nutritionalfacts.saturatedfat}{' '}
              </Text>
            </View>
            <View>
              <Text style={styles.modalText}>
                Trans Fat : {foodItem.nutritionalfacts.transfat}{' '}
              </Text>
            </View>
            <View>
              <Text style={styles.modalText}>
                Cholesterol : {foodItem.nutritionalfacts.cholesterol}{' '}
              </Text>
            </View>
            <View>
              <Text style={styles.modalText}>
                Sodium : {foodItem.nutritionalfacts.sodium}{' '}
              </Text>
            </View>
            <View>
              <Text style={styles.modalText}>
                Total Carbohydrate : {foodItem.nutritionalfacts.totalcarbs}{' '}
              </Text>
            </View>
            <View>
              <Text style={styles.modalText}>
                Dietary Fiber : {foodItem.nutritionalfacts.dietaryfiber}{' '}
              </Text>
            </View>
            <View>
              <Text style={styles.modalText}>
                Total Sugars : {foodItem.nutritionalfacts.totalsugars}{' '}
              </Text>
            </View>
            <View>
              <Text style={styles.modalText}>
                Includes {foodItem.nutritionalfacts.includesaddedsugars} Added
                Sugars{' '}
              </Text>
            </View>
            <View>
              <Text style={styles.modalText}>
                Protein : {foodItem.nutritionalfacts.protein}{' '}
              </Text>
            </View>
            <View>
              <Text style={styles.modalText}>
                Food Score : {foodItem.nutritionalfacts.foodscore}{' '}
              </Text>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={async () => {
                await storeData(barcode, foodItem.nutritionalfacts.fooditemname);
                setModalVisible(false);
                setBarcodeFound(false);
                barcodes = [];
              }}>
              <Text style={styles.textStyle}>Add to Bookmarks</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
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
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
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
    alignItems: 'center',
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  modalText: {
    color: 'black',
    marginBottom: 15,
    textAlign: 'center',
  },
});
