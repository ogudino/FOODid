import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Switch,
  Modal
} from 'react-native';
// import { Modal } from 'react-native-paper';

import languageIcon from '../../assets/icons/internet.png';
import moonIcon from '../../assets/icons/moon.png';
import termIcon from '../../assets/icons/valid.png';
import aboutIcon from '../../assets/icons/about.png';
// import tos from '../../assets/tos.txt'
// import { Switch } from 'react-native-paper';

const PREFERENCES = [
  {
    id: 1,
    title: 'Language',
    icon: languageIcon,
    isEnabled: true,
    description: null,
  },
  {
    id: 2,
    title: 'Dark Mode',
    icon: moonIcon,
    isEnabled: false,
    description: null,
  },
];

const GENERAL = [
  {
    id: 3,
    title: 'Terms of Service',
    icon: termIcon,
    isEnabled: true,
    description: 'tos',
  },
  {
    id: 4,
    title: 'About',
    icon: aboutIcon,
    isEnabled: true,
    description:
      'FOODiD is an android application where users can find, scan, and bookmark UPC_A based barcodes for their favorite foods. It was designed, developed, and created by Omar Gudino for his WSU Senior Project. Hope you enjoy!',
  },
];


const SettingsScreen = ({navigation}) => {
  const [selectedId, setSelectedId] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [darkModeIsEnabled, setDarkModeIsEnabled] = React.useState(false);
  const [value, setValue] = React.useState('');

  const toggleSwitch = () =>
    setDarkModeIsEnabled(previousState => !previousState);
  const renderItem = ({item}) => {
    // const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    // const color = item.id === selectedId ? 'white' : 'black';

    const Item = ({item}) => (
      <TouchableOpacity
        disabled={!item.isEnabled}
        onPress={() => {
          setModalVisible(true);
          setValue(item.description);
          // console.log('this is item:', item.id);
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image style={styles.icon} source={item.icon} />
          <Text style={[styles.item, {paddingLeft: 50}]}>{item.title}</Text>
          {!item.isEnabled ? (
            <Switch
              style={styles.darkModeSwitch}
              value={darkModeIsEnabled}
              trackColor={{false: '#767577', true: '#f4f3f4'}}
              thumbColor={darkModeIsEnabled ? '#767577' : '#f4f3f4'}
              onChange={toggleSwitch}/>
          ) : null}
        </View>
        <Modal
          // style={styles.modalView}
          // {
          //   !item.modal ? (

          //   ) : null
          // }
          animationType="none"
          transparent={true}
          
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{value}</Text>
            <Pressable
              style={[styles.button]}
              onPress={() => {
                setModalVisible(false);
                setValue('');
              }}>
              <Text style={{color: 'white', alignSelf: 'center'}}>Close</Text>
            </Pressable>
          </View>
        </Modal>
      </TouchableOpacity>
    );

    return (
      <Item
        item={item}
        // onPress={() => setSelectedId(item.id)}
        backgroundColor="white"
        textColor="black"

      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.text, {marginTop: 20}]}>PREFERENCES</Text>
      <View>
        <FlatList
          data={PREFERENCES}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </View>
      <Text style={styles.text}>GENERAL</Text>
      <View>
        <FlatList
          data={GENERAL}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </View>
      <Text style={[styles.bottomText, {marginTop: 100}]}>
        You are use FOODiD app
      </Text>
      <Text style={[styles.bottomText, {}]}>version 0.0.1</Text>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'flex-start',
    backgroundColor: '#16302B',
  },
  item: {
    flex: 1,
    // alignContent: 'center',
    // marginHorizontal: 5,
    borderRadius: 5,
    margin: 5,
    marginHorizontal: 30,
    padding: 25,
    // width: 325,
    backgroundColor: '#D9D9D9',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2F9C95',
    // elevation: 10,
    zIndex: 0,
  },
  text: {
    // flexDirection: 'row',
    margin: 10,
    marginLeft: 30,
    color: 'white',
    fontSize: 14,
  },
  icon: {
    alignSelf: 'flex-start',
    marginTop: 28,
    marginLeft: 45,
    width: 25,
    height: 25,
    // padding: 10,
    position: 'absolute',
    tintColor: '#969696',
    zIndex: 1,
  },
  bottomText: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
    fontSize: 10,
    // minHeight: 200
  },
  modalView: {
    margin: 40,
    marginTop: 225,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
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
    // backgroundColor: 'rgba(0,0,0,0.7)'
  },
  modalText: {
    color: 'black',
    marginBottom: 5,
    // alignSelf: 'center',
    textAlign: 'center',
    margin: 10,
    // alignItems: 'flex-start',

  },
  button: {
    elevation: 2,
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#2F9C95',
    alignSelf: 'center',
    width: 150,
    marginTop: 20,
  },
  darkModeSwitch: {
    alignSelf: 'center',
    // marginTop: 28,
    marginLeft: 320,
    transform: [{scaleX: 1.3}, {scaleY: 1.3}],
    // tintColor: '#000',
    // width: 30,
    // height: 30,
    // width: 25,
    // height: 25,
    // padding: 10,
    position: 'absolute',
    // tintColor: '#969696',
    zIndex: 2,
  },
});
