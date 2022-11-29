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
    foodItems: []
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
        console.log("VALUE: ", value)
        const marks = JSON.parse(value)
        console.log("MARKS: ", marks)
        setBookmarks({
          barcodes: marks.barcodes,
          names: marks.names,
          foodItems: marks.foodItems
        });

        console.log("BOOKMARKS: ", bookmarks)
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
            console.log('code: ', code);
            return barcode != code;
          });
          savedBookmarks.barcodes = result;
          await AsyncStorage.setItem(
            '@bookmarksv3',
            JSON.stringify(savedBookmarks),
          );
          setBookmarks(savedBookmarks.barcodes);
        }
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

  // const userDocument = firestore()
  // .collection('fooditems')
  // .doc(item)
  // .get()
  // .then(querySnapshot => {
  //   console.log('fooditem: ', querySnapshot._data);
  //   if (querySnapshot._data) {
  //     setFoodItem({
  //       barcode: item,
  //       ...querySnapshot._data,
  //     });
  //   }
  // });

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarks.barcodes}
        renderItem={({item: barcode}) => (
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
              console.log('this is item:',barcode);
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
                {bookmarks.foodItems.find(foodItem => foodItem.barcode === barcode).name}
              </Text>
              <Pressable
                style={styles.deletebookmarkbutton}
                onPress={() => {
                  deleteBookmark(barcode);
                  getData();
                  console.log('item: ' ,barcode);
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
                <Text style={styles.modalText}>
                  Barcode: {foodItem.barcode}
                </Text>
                <View>
                  <Text style={styles.modalText}>
                    {foodItem.nutritionalfacts.fooditemname}{' '}
                  </Text>
                </View>
                <View>
                  <Text style={styles.modalText}>
                    About {foodItem.nutritionalfacts.servingspercontainer}{' '}
                    servings per container
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
                    Includes {foodItem.nutritionalfacts.includesaddedsugars}{' '}
                    Added Sugars{' '}
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
                  onPress={() => {
                    setModalVisible(false);
                  }}>
                  <Text style={styles.textStyle}>Close</Text>
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
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#16302B',
    alignItems: 'center',
    width: 150,
  },
  item: {
    // flex: 1,
    marginHorizontal: 10,
    borderRadius:10,
    marginTop: 24,
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
    marginBottom: 15,
    alignItems: 'flex-start',
  },
});
