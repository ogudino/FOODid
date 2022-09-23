
import React, { useCallback, useEffect, useState } from 'react';
import { Camera, frameRateIncluded, useCameraDevices } from 'react-native-vision-camera';
import { Button, PermissionsAndroid, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

const ScanScreen = ({navigation}) => {
  const devices = useCameraDevices('wide-angle-camera')
  console.log("Devices: ", devices)
  const device = devices['front'];

  if (device == null) 
{
    return (
        <View style={styles.container}>
            <Text>Scan Screen</Text>
            <Button
            title="Click Here"
            onPress={() => alert("Button Pressed!")}
            />
            <Button title="request permissions" onPress={requestCameraPermission} />
        </View>
    )
}
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
    />
  )
}

export default ScanScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#8fcbbc",
    },
})