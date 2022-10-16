import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useCameraDevices } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import { useIsFocused } from '@react-navigation/native';

const ScanScreen = ({navigation}) => {

  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.UPC_A], {
    checkInverted: true,
  });

  // const barcodeRecognized = ({ type, data }) => {
  //   setScanned(true)
  //   setText(data)
  //   console.log("Type: ")
  // }

  React.useEffect(() => {
    (async () => {
  console.log("running")
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);
  
  return (
    device != null &&
    hasPermission && (
      <>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isFocused}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
        {barcodes.map((barcode, idx) => (
          <Text key={idx} style={styles.barcodeTextURL}>
            {barcode.displayValue}
            {console.log("barcode: ", barcode.displayValue)}
          </Text> 
        ))}
      </>
    )
  );
}

export default ScanScreen 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#8fcbbc",
    },
    barcodeTextURL: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
      },
})
