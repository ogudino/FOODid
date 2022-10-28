import React from "react";
import { View, Text, Button, StyleSheet, Modal, SafeAreaView, TextInput, ScrollView} from "react-native"
import firestore from '@react-native-firebase/firestore';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
// display a form


const NewItemScreen = ({route, navigation}) => {
    // const {barcodeId} = route.params;
    // console.log("Barcode ID:" , route.params )
    const [calories, onChangeCalories] = React.useState(null)
    const [cholesterol, onChangeCholesterol] = React.useState(null)
    const [dietaryfiber, onChnageDietaryFiber] = React.useState(null)
    const [includesaddedsugars, onChangeIncludedsAddedSugars] = React.useState(null)
    const [protein, onChangeProtein] = React.useState(null)
    const [saturatedfat, onChangeSaturatedFat] = React.useState(null)
    const [servingsize, onChangeServingSize] = React.useState(null)
    const [servingspercontainer, onChangeServingsPerContainer] = React.useState(null)
    const [sodium, onChangeSodium] = React.useState(null)
    const [totalcarbs, onChangeTotalCarbs] = React.useState(null)
    const [totalfat, onChangeTotalFat] = React.useState(null)
    const [totalsugars, onChangeTotalSugars] = React.useState(null)
    const [transfat, onChangeTransFat] = React.useState(null)
    
    const inputDocument = firestore()
                            .collection('fooditems')
                            .doc('4567')
                            .set ({
                                nutritionalfacts: {
                                    calories: "N/A"
                                }
                            })
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
            <TextInput
                style={styles.input}
                onChangeText = {onChangeServingsPerContainer}
                value={servingspercontainer}
                placeholder="Servings Per Container"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                />
            <TextInput
                style={styles.input}
                onChangeText = {onChangeServingSize}
                value={servingsize}
                placeholder="Serving Size"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                />
            <TextInput
                style={styles.input}
                onChangeText = {onChangeCalories}
                value={calories}
                placeholder="Calories"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                />
            <TextInput
                style={styles.input}
                onChangeText = {onChangeTotalFat}
                value={totalfat}
                placeholder="Total Fat"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                />
            <TextInput
                style={styles.input}
                onChangeText = {onChangeSaturatedFat}
                value={saturatedfat}
                placeholder="Saturated Fat"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                /> 
            <TextInput
                style={styles.input}
                onChangeText = {onChangeTransFat}
                value={transfat}
                placeholder="Trans Fat"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                />
            <TextInput
                style={styles.input}
                onChangeText = {onChangeCholesterol}
                value={cholesterol}
                placeholder="Cholesterol"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                />
            <TextInput
                style={styles.input}
                onChangeText = {onChangeSodium}
                value={sodium}
                placeholder="Sodium"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                />
            <TextInput
                style={styles.input}
                onChangeText = {onChangeTotalCarbs}
                value={totalcarbs}
                placeholder="Total Carbohydrate"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                />
            <TextInput
                style={styles.input}
                onChangeText = {onChnageDietaryFiber}
                value={dietaryfiber}
                placeholder="Dietary Fiber"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                />
            <TextInput
                style={styles.input}
                onChangeText = {onChangeTotalSugars}
                value={totalsugars}
                placeholder="Total Sugars"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                />
            <TextInput
                style={styles.input}
                onChangeText = {onChangeIncludedsAddedSugars}
                value={includesaddedsugars}
                placeholder="Included Sugars"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                />
            <TextInput
                style={styles.input}
                onChangeText = {onChangeProtein}
                value={protein}
                placeholder="Total Fat"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                />

            <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress = {() => {

            }}
            >
                <Text>Save</Text>
            </Pressable>
            </ScrollView>
        </SafeAreaView>

    )
}


export default NewItemScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: "#8fcbbc",
    },
    scrollView: {
        marginHorizontal: 5,
        marginBottom: 130,
        padding: 10
    },
    input: {
        height :40,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#ffffff"
    },
    button: {
        borderRadius: 30,
        padding: 10,
        elevation: 2,
        marginBottom: 25
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
})