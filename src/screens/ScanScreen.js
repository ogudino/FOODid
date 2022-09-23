
import React, { useCallback, useEffect, useState } from 'react';
import { Camera, frameRateIncluded, useCameraDevices } from 'react-native-vision-camera';
import { Button, PermissionsAndroid, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import LoadingView from 'react-native-loading-view';
import { useIsFocused } from '@react-navigation/native';

// const requestCameraPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//       {
//         title: "Cool Photo App Camera Permission",
//         message:
//           "Cool Photo App needs access to your camera " +
//           "so you can take awesome pictures.",
//         buttonNeutral: "Ask Me Later",
//         buttonNegative: "Cancel",
//         buttonPositive: "OK"
//       }
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log("You can use the camera");
//     } else {
//       console.log("Camera permission denied");
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// };

const newCameraPermission =  Camera.requestCameraPermission()
const cameraPermission =  Camera.getCameraPermissionStatus()



const ScanScreen = ({navigation}) => {
  const devices = useCameraDevices()
  const device = devices.back

  const isFocused = useIsFocused()

  if (device == null) return <LoadingView />
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={isFocused}
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
