import React from "react";
import { View, Text, Button, StyleSheet, Modal, SafeAreaView, TextInput, ScrollView, ToastAndroid} from "react-native"
import firestore from '@react-native-firebase/firestore';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useIsFocused } from '@react-navigation/native';



const NewItemScreen = ({route, navigation}) => {

    const isFocused = useIsFocused();
    const [barcode, onChangeBarcode] = React.useState(null)

    const [foodItem, setFoodItem] = React.useState({
            calories: null,
            cholesterol: null, 
            dietaryfiber: null, 
            includesaddedsugars: null, 
            protein: null, 
            saturatedfat: null, 
            servingsize: null, 
            servingspercontainer: null, 
            sodium: null, 
            totalcarbs: null, 
            totalfat: null, 
            totalsugars: null, 
            transfat: null
    })

    React.useEffect(() => {
    (async () => {
        if(route && route.params && route.params.params && route.params.params.barcodeId) {
            onChangeBarcode(route.params.params.barcodeId)
        }
        if(!isFocused) {
            onChangeBarcode(null)
            route.params = null 
            setFoodItem({
  
                    calories: null,
                    cholesterol: null, 
                    dietaryfiber: null, 
                    includesaddedsugars: null, 
                    protein: null, 
                    saturatedfat: null, 
                    servingsize: null, 
                    servingspercontainer: null, 
                    sodium: null, 
                    totalcarbs: null, 
                    totalfat: null, 
                    totalsugars: null, 
                    transfat: null
                
            })
        }
    })();
  }, [isFocused]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
            <TextInput
                style={styles.input}
                onChangeText = {onChangeBarcode}
                value={barcode}
                placeholder="Barcode"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                />   
            <TextInput
                style={styles.input}
                onChangeText = {input => {
                    setFoodItem({
                        ...foodItem,
                        servingspercontainer: input
                    })
                }}
                value={foodItem.servingspercontainer}
                placeholder="Servings Per Container"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                />
            <TextInput
                style={styles.input}
                onChangeText = {input => {
                    setFoodItem({
                        ...foodItem,
                        servingsize: input
                    })
                }}
                value={foodItem.servingsize}
                placeholder="Serving Size"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                />
            <TextInput
                style={styles.input}
                onChangeText = {input => {
                    setFoodItem({
                        ...foodItem,
                        calories: input
                    })
                }}
                value={foodItem.calories}
                placeholder="Calories"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                />
            <TextInput
                style={styles.input}
                onChangeText = {input => {
                    setFoodItem({
                        ...foodItem,
                        totalfat: input
                    })
                }}
                value={foodItem.totalfat}
                placeholder="Total Fat"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                />
            <TextInput
                style={styles.input}
                onChangeText = {input => {
                    setFoodItem({
                        ...foodItem,
                        saturatedfat: input
                    })
                }}
                value={foodItem.saturatedfat}
                placeholder="Saturated Fat"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                /> 
            <TextInput
                style={styles.input}
                onChangeText = {input => {
                    setFoodItem({
                        ...foodItem,
                        transfat: input
                    })
                }}                
                value={foodItem.transfat}
                placeholder="Trans Fat"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                />
            <TextInput
                style={styles.input}
                onChangeText = {input => {
                    setFoodItem({
                        ...foodItem,
                        cholesterol: input
                    })
                }}
                value={foodItem.cholesterol}
                placeholder="Cholesterol"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                />
            <TextInput
                style={styles.input}
                onChangeText = {input => {
                    setFoodItem({
                        ...foodItem,
                        sodium: input
                    })
                }}
                value={foodItem.sodium}
                placeholder="Sodium"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                />
            <TextInput
                style={styles.input}
                onChangeText = {input => {
                    setFoodItem({
                        ...foodItem,
                        totalcarbs: input
                    })
                }}
                value={foodItem.totalcarbs}
                placeholder="Total Carbohydrate"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                />
            <TextInput
                style={styles.input}
                onChangeText = {input => {
                    setFoodItem({
                        ...foodItem,
                        dietaryfiber: input
                    })
                }}
                value={foodItem.dietaryfiber}
                placeholder="Dietary Fiber"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                />
            <TextInput
                style={styles.input}
                onChangeText = {input => {
                    setFoodItem({
                        ...foodItem,
                        totalsugars: input
                    })
                }}
                value={foodItem.totalsugars}
                placeholder="Total Sugars"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                />
            <TextInput
                style={styles.input}
                onChangeText = {input => {
                    setFoodItem({
                        ...foodItem,
                        includesaddedsugars: input
                    })
                }}
                value={foodItem.includesaddedsugars}
                placeholder="Included Sugars"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                />
            <TextInput
                style={styles.input}
                onChangeText = {input => {
                    setFoodItem({
                        ...foodItem,
                        protein: input
                    })
                }}
                value={foodItem.protein}
                placeholder="Protein"
                placeholderTextColor={'#C0C0C0'}
                keyboardType="numeric"
                />

            <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress = {async() => {
                if (barcode) {
                const result = await firestore()
                    .collection('fooditems')
                    .doc(barcode)
                    .get ()
                console.log("result:" , result)
                if (!result._data) {
                    const inputDocument = firestore()
                    .collection('fooditems')
                    .doc(barcode)
                    .set({
                        nutritionalfacts: foodItem
                    })
                }
                ToastAndroid.show("message", ToastAndroid.SHORT)
            }}
        }
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
        color: "#000000",
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