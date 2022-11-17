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
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const BookmarkScreen = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [bookmarks, setBookmarks] = React.useState(null);
  const isFocused = useIsFocused();
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
      const value = await AsyncStorage.getItem('@bookmarks');
      if (value !== null) {
        setBookmarks(JSON.parse(value).barcodes);
      }
    } catch (e) {
      console.log('error getData', e);
    }
  };

  const deleteBookmark = async barcode => {
    try {
      const value = await AsyncStorage.getItem('@bookmarks');
      let savedBookmarks = JSON.parse(value);
      if (savedBookmarks) {
        if (savedBookmarks.barcodes) {
          const result = savedBookmarks.barcodes.filter(code => {
            console.log('code: ', code);
            return barcode != code;
          });
          savedBookmarks.barcodes = result;
          await AsyncStorage.setItem(
            '@bookmarks',
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

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarks}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
              console.log(item);
              {
                const userDocument = firestore()
                  .collection('fooditems')
                  .doc(item)
                  .get()
                  .then(querySnapshot => {
                    console.log('fooditem: ', querySnapshot._data);
                    if (querySnapshot._data) {
                      setFoodItem({
                        barcode: item,
                        ...querySnapshot._data,
                      });
                    }
                  });
              }
            }}>
            <View>
              <Text style={styles.item}>{item}</Text>
              <Pressable
                style={styles.button}
                onPress={() => {
                  deleteBookmark(item);
                  getData();
                  console.log(item);
                }}>
                <Text>Delete</Text>
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
    backgroundColor: '#8fcbbc',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  item: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 24,
    padding: 30,
    backgroundColor: '#ffff',
    fontSize: 24,
    color: 'black',
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
  modalText: {
    color: 'black',
    marginBottom: 15,
    textAlign: 'center',
  },
});
