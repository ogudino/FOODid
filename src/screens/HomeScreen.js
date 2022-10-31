import React, {useEffect} from 'react';
import {
  Button,
  PermissionsAndroid,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Click Here" onPress={() => console.log('pressed')} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8fcbbc',
  },
});
