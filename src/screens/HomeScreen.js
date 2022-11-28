import React, {useEffect} from 'react';
import {
  Button,
  PermissionsAndroid,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image 
      source={require('../../assets/icons/homescreenimg.jpg')}
      // resizeMode="contain"
      style={{
        width: 215,
        height: 215,
        top: 125,
      }}
      />
      <Text style={styles.baseText}>Welcome to FOODiD          </Text>
      <Text style={styles.innerText}>Get all the nutrition facts for your favorite foods in a matter of seconds</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  baseText: {
    paddingTop: 200,
    // marginTop: 200,
    fontWeight: 'bold',
    fontSize: 24,
    // fontFamily: 'Arial',
  },
  innerText: {
    fontSize: 15,
    marginLeft: 30,
    marginRight: 30,
  },  
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#16302B',
  },
});
