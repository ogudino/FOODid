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

const BookmarkScreen = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [bookmarks, setBookmarks] = React.useState(null);
  const isFocused = useIsFocused();

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
          <TouchableOpacity onPress={() => setModalVisible(true)}>
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
                <Text style={styles.modalText}>Btest</Text>
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
