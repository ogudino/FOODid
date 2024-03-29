import React from 'react';
import {StyleSheet} from 'react-native';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import Tabs from './src/navigation/tab';

const App = () => {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
};

export default App;
