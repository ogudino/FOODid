import {TestScheduler} from 'jest';
import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  FlatList,
  Touchable,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const BookmarkScreen = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [bookmarks, setBookmarks] = React.useState({
    barcodes: [],
    names: [],
    foodItems: [],
  });
  const isFocused = useIsFocused();
  const [foodItemName, setFoodItemName] = React.useState(null);
  const [foodItem, setFoodItem] = React.useState({
    barcode: 'N/A',
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

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@bookmarksv3');
      if (value !== null) {
        // console.log('VALUE: ', value);
        const marks = JSON.parse(value);
        // console.log('\n\nMARKS: ', marks);
        setBookmarks({
          barcodes: marks.barcodes,
          // names: marks.names,
          foodItems: marks.foodItems,
        });

        // console.log('\n\nBOOKMARKS: ', bookmarks);
      }
    } catch (e) {
      console.log('error getData', e);
    }
  };

  const deleteBookmark = async barcode => {
    try {
      const value = await AsyncStorage.getItem('@bookmarksv3');
      let savedBookmarks = JSON.parse(value);
      if (savedBookmarks) {
        if (savedBookmarks.barcodes) {
          const result = savedBookmarks.barcodes.filter(code => {
            console.log('barcode: ', code);
            return barcode != code;
          });
          savedBookmarks.barcodes = result;
        }

        if (savedBookmarks.foodItems) {
          const result = savedBookmarks.foodItems.filter(food => {
            console.log('fooditem: ', food);
            return barcode != food.barcode;
          });
          savedBookmarks.foodItems = result;
        }

        console.log("\n\nSavedBookmarks: ", savedBookmarks)
          await AsyncStorage.setItem(
            '@bookmarksv3',
            JSON.stringify(savedBookmarks),
          );
          // setBookmarks(savedBookmarks.barcodes);
          // setBookmarks(savedBookmarks.foodItems)
          setBookmarks({
            barcodes: savedBookmarks.barcodes,
            foodItems: savedBookmarks.foodItems
          })
        }
        
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    (async => {
      getData();
    })();
  }, []);

  React.useEffect(() => {
    (async => {
      getData();
    })();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarks.barcodes}
        renderItem={({item: barcode}) => (
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
              console.log('this is item:', barcode);
              {
                const userDocument = firestore()
                  .collection('fooditems')
                  .doc(barcode)
                  .get()
                  .then(querySnapshot => {
                    console.log('fooditem: ', querySnapshot._data);
                    if (querySnapshot._data) {
                      setFoodItem({
                        barcode: barcode,
                        ...querySnapshot._data,
                      });
                    }
                  });
              }
            }}>
            <View>
              <Text style={styles.item}>
                {
                  bookmarks.foodItems.find(
                    foodItem => foodItem.barcode === barcode,
                  ).name
                }
              </Text>
              <Pressable
                style={styles.deletebookmarkbutton}
                onPress={() => {
                  deleteBookmark(barcode);
                  // getData();
                  // console.log('item: ', barcode);
                }}>
                {/* <Text>Delete</Text> */}
                <Image
                  source={require('../../assets/icons/close.png')}
                  resizeMode="contain"
                  style={{
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                    width: 20,
                    height: 20,
                    tintColor: '#fff',
                  }}
                />
              </Pressable>
            </View>
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
                  Barcode: {foodItem.barcode}
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
                    About {foodItem.nutritionalfacts.servingspercontainer}{' '}
                    servings per container
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
                    {'    '}Saturated Fat{' '}
                    {foodItem.nutritionalfacts.saturatedfat}
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
                  <Text style={styles.modalSmallBoldText}>
                    Total Carbohydrate
                  </Text>
                  <Text style={styles.modalFactText}>
                    {' '}
                    {foodItem.nutritionalfacts.totalcarbs}
                    {'g '}
                  </Text>
                </View>
                <View>
                  <Text style={styles.modalText}>
                    {'    '}Dietary Fiber{' '}
                    {foodItem.nutritionalfacts.dietaryfiber}
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
                    style={[
                      styles.modalBoldText,
                      {flex: 1, textAlign: 'left'},
                    ]}>
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
                <Pressable
                  style={[styles.button]}
                  onPress={() => {
                    setModalVisible(false);
                  }}>
                  <Text style={{color: 'white', alignSelf: 'center'}}>
                    Close
                  </Text>
                </Pressable>
              </View>
            </Modal>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#16302B',
  },
  deletebookmarkbutton: {
    alignSelf: 'flex-end',
    marginRight: 30,
    width: 40,
    height: 40,
    borderRadius: 35,
    padding: 10,
    elevation: 4,
    backgroundColor: '#E04F5F',
    top: -65,
  },
  button: {
    elevation: 2,
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#2F9C95',
    alignSelf: 'center',
    width: 150,
  },
  item: {
    // flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    marginTop: 10,
    padding: 30,
    backgroundColor: '#D9D9D9',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2F9C95',
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
