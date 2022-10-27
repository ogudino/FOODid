import React from "react";
import { View, Text, Button, StyleSheet, Modal} from "react-native"


const NewItemScreen = ({route, navigation}) => {
    //const {barcodeId} = route.params;
    console.log("Barcode ID:" , route.params )
    return (
        <View style={styles.container}>
            <Text>New Item Screen</Text>
            <Button
            title="Click Here"
            onPress={() => alert("Button Pressed!")}
            />
        </View>
    )
}


export default NewItemScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#8fcbbc",
    },
})