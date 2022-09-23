import React from "react";
import { View, Text, Button, StyleSheet} from "react-native"
import { Camera, frameRateIncluded, useCameraDevices } from 'react-native-vision-camera';

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