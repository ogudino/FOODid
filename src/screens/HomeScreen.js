import React, { useEffect } from "react";
import { Button, PermissionsAndroid, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import firestore from '@react-native-firebase/firestore';


//const usersID = await firestore().collection('Users').get();
//const userDocument = firestore().collection('Users').doc('userid');
//await func() {
    const userDocument = firestore()
    .collection('Users')
    .get()
    .then(querySnapshot => {
      console.log('Total users: ', querySnapshot.size);
    
      querySnapshot.forEach(documentSnapshot => {
        console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      });
    });
//}



//const users = useEffect(() => firestore().collection('Users').get());
// function User(userid) {
//     useEffect(() => {
//         firestore()
//         .collection('Users')
//         .get()
//         .then(querySnapshot => {
//           console.log('Total users: ', querySnapshot.size)
      
//           querySnapshot.forEach(documentSnapshot => {
//             console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
//           });
//         });
//   }, [userid]);
// }


const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button
            title="Click Here"
            onPress={() =>  console.log("pressed")
        }/>

        </View>
        
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#8fcbbc",
    },
})