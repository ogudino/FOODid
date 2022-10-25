import * as React from 'react';
import { StyleSheet, Text , View , Modal, Alert} from 'react-native';
import { useCameraDevices } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import { useIsFocused } from '@react-navigation/native';
import { NavigationAction } from '@react-navigation/native';
import Scanned from '../components/ScannedBarcode'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const ScanScreen = ({navigation}) => {

  const [hasPermission, setHasPermission] = React.useState(false);
  const [hasAlerted, setHasAlerted] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();

  // function ModalScreen({ navigation }) {
  //   return (
  //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //       <Text style={{ fontSize: 30 }}>This is a modal!</Text>
  //       <Button onPress={() => navigation.goBack()} title="Dismiss" />
  //     </View>
  //   );
  // }

  var [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.UPC_A], {
    checkInverted: true,
  });

  React.useEffect(() => {
    (async () => {
      console.log("running")
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  React.useEffect(() => {
    barcodes = []
    setHasAlerted(false)
  }, [isFocused]);

  
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
              <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose = {() => {
                Alert.alert("modal has been closed");
                setModalVisible(!modalVisible);
              }}
              >
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Hello World</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress = {() => setModalVisible(false)}
                  >
                  <Text style = {styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </Modal>
        {barcodes.map((barcode, idx) => {
          {barcode.displayValue}
          if (!modalVisible){
            //  setHasAlerted(true); 
            // alert(`
            // Barcode: ${barcode.displayValue} 
            // `);dorio
            setModalVisible(true)
          }
        })}
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
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})
