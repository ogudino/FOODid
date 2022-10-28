import { TestScheduler } from 'jest';
import React from 'react';
import {View, Text, Button, StyleSheet, Modal, FlatList, Touchable, TouchableWithoutFeedback} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const BookmarkScreen = ({route, navigation}) => {
  
  // console.log("route: ", route.params.params.barcodeId);

  return (
    <FlatList

    renderItem={({route}) => (
      <TouchableWithoutFeedback>
        <View>
          <Text> Barcode: {route}</Text>
        </View>
      </TouchableWithoutFeedback>
    )}

    />
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8fcbbc',
  },
});
