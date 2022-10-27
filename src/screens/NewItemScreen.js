import React from "react";
import { View, Text, Button, StyleSheet, Modal} from "react-native"


const NewItemScreen = ({navigation}) => {
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