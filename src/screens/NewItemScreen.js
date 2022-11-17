import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  SafeAreaView,
  TextInput,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useIsFocused} from '@react-navigation/native';

const NewItemScreen = ({route, navigation}) => {
  const isFocused = useIsFocused();
  const [barcode, onChangeBarcode] = React.useState(null);

  const [foodItem, setFoodItem] = React.useState({
    fooditemname: null,
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
    transfat: null,
    foodscore: null,
  });

  function calculateScore(foodItem) {
    let score = 0

    if (foodItem.calories <= 150) {
        score += 1
    }
    else if (foodItem.calories > 150 && foodItem.calories <= 300) {
        score += 2
    }
    else if (foodItem.calories > 300 && foodItem.calories <= 450) {
        score += 3
    }
    else if (foodItem.calories > 450 && foodItem.calories <= 600) {
        score += 4
    }
    else if (foodItem.calories > 600) {
        score += 5
    } 

    if (foodItem.totalfat == 0) {
        score += 1
    }
    else if (foodItem.totalfat > 0 && foodItem.totalfat <= 10) {
        score += 2
    }
    else if (foodItem.totalfat > 10 && foodItem.totalfat <= 30) {
        score += 3
    }
    else if (foodItem.totalfat > 30 && foodItem.totalfat <= 50) {
        score += 4
    }
    else if (foodItem.totalfat > 50) {
        score += 5 
    }

    if (foodItem.cholesterol == 0) {
        score += 1
    }
    else if (foodItem.cholesterol > 0 && foodItem.cholesterol <= 50) {
        score += 2
    }
    else if (foodItem.cholesterol > 50 && foodItem.cholesterol <= 150) {
        score += 3
    }
    else if (foodItem.cholesterol > 150 && foodItem.cholesterol <= 250) {
        score += 4
    }
    else if (foodItem.cholesterol > 250) {
        score += 5 
    }

    if (foodItem.sodium == 0) {
        score +=1
    }
    else if (foodItem.sodium > 0 && foodItem.sodium <= 500) {
        score += 2
    }
    else if (foodItem.sodium > 500 && foodItem.sodium <= 1500) {
        score += 3
    }
    else if (foodItem.sodium > 1500 && foodItem.sodium <= 2500) {
        score += 4
    }
    else if (foodItem.sodium > 2500) {
        score += 5 
    }

    if (foodItem.totalcarbs <= 50) {
        score += 1
    }
    else if (foodItem.totalcarbs > 50 && foodItem.totalcarbs <= 100) {
        score += 2
    }
    else if (foodItem.totalcarbs > 100 && foodItem.totalcarbs <= 150) {
        score += 3
    }
    else if (foodItem.totalcarbs > 150 && foodItem.totalcarbs <= 200) {
        score += 4
    }
    else if (foodItem.totalcarbs > 200) {
        score += 5 
    }

    if (foodItem.dietaryfiber > 20) {
        score += 1
    }
    else if (foodItem.dietaryfiber < 20 && foodItem.dietaryfiber >= 10) {
        score += 2
    }
    else if (foodItem.dietaryfiber < 10 && foodItem.dietaryfiber >= 5) {
        score += 3
    }
    else if (foodItem.dietaryfiber < 5 && foodItem.dietaryfiber >= 0) {
        score += 4
    }
    else if (foodItem.dietaryfiber == 0) {
        score += 5 
    }

    if (foodItem.totalsugars == 0) {
        score += 1
    }
    else if (foodItem.totalsugars > 0 && foodItem.totalsugars <= 10) {
        score += 2
    }
    else if (foodItem.totalsugars > 10 && foodItem.totalsugars <= 20) {
        score += 3
    }
    else if (foodItem.totalsugars > 20 && foodItem.totalsugars <= 30) {
        score += 4
    }
    else if (foodItem.totalsugars > 30) {
        score += 5 
    }

    if (foodItem.protein > 35) {
        score += 1
    }
    else if (foodItem.protein < 35 && foodItem.protein >= 25) {
        score += 2
    }
    else if (foodItem.protein < 25 && foodItem.protein >= 15) {
        score += 3
    }
    else if (foodItem.protein < 15 && foodItem.protein >= 5) {
        score += 4
    }
    else if (foodItem.protein < 5) {
        score += 5 
    }

    if (foodItem.saturatedfat > 0) {
        score += 5
    }

    score = score / 7

    if (score < 2){
        return 'A'
    }
    
    if (score >= 2 && score < 3) {
        return 'B'
    }

    if (score >= 3 && score < 4) {
        return 'C'
    }

    if (score >= 4 && score < 5) {
        return 'D'
    }

    if (score > 5) {
        return 'F'
    }
  }

  React.useEffect(() => {
    (async () => {
      if (
        route &&
        route.params &&
        route.params.params &&
        route.params.params.barcodeId
      ) {
        onChangeBarcode(route.params.params.barcodeId);
      }
      if (!isFocused) {
        onChangeBarcode(null);
        route.params = null;
        setFoodItem({
          fooditemname: null,
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
          transfat: null,
          foodscore: null,
        });
      }
    })();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeBarcode}
          value={barcode}
          placeholder="Barcode"
          placeholderTextColor={'#C0C0C0'}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={input => {
            setFoodItem({
              ...foodItem,
              fooditemname: input,
            });
          }}
          value={foodItem.fooditemname}
          placeholder="Food Item Name"
          placeholderTextColor={'#C0C0C0'}
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          onChangeText={input => {
            setFoodItem({
              ...foodItem,
              servingspercontainer: input,
            });
          }}
          value={foodItem.servingspercontainer}
          placeholder="Servings Per Container"
          placeholderTextColor={'#C0C0C0'}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={input => {
            setFoodItem({
              ...foodItem,
              servingsize: input,
            });
          }}
          value={foodItem.servingsize}
          placeholder="Serving Size"
          placeholderTextColor={'#C0C0C0'}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={input => {
            setFoodItem({
              ...foodItem,
              calories: input,
            });
          }}
          value={foodItem.calories}
          placeholder="Calories"
          placeholderTextColor={'#C0C0C0'}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={input => {
            setFoodItem({
              ...foodItem,
              totalfat: input,
            });
          }}
          value={foodItem.totalfat}
          placeholder="Total Fat"
          placeholderTextColor={'#C0C0C0'}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={input => {
            setFoodItem({
              ...foodItem,
              saturatedfat: input,
            });
          }}
          value={foodItem.saturatedfat}
          placeholder="Saturated Fat"
          placeholderTextColor={'#C0C0C0'}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={input => {
            setFoodItem({
              ...foodItem,
              transfat: input,
            });
          }}
          value={foodItem.transfat}
          placeholder="Trans Fat"
          placeholderTextColor={'#C0C0C0'}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={input => {
            setFoodItem({
              ...foodItem,
              cholesterol: input,
            });
          }}
          value={foodItem.cholesterol}
          placeholder="Cholesterol"
          placeholderTextColor={'#C0C0C0'}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={input => {
            setFoodItem({
              ...foodItem,
              sodium: input,
            });
          }}
          value={foodItem.sodium}
          placeholder="Sodium"
          placeholderTextColor={'#C0C0C0'}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={input => {
            setFoodItem({
              ...foodItem,
              totalcarbs: input,
            });
          }}
          value={foodItem.totalcarbs}
          placeholder="Total Carbohydrate"
          placeholderTextColor={'#C0C0C0'}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={input => {
            setFoodItem({
              ...foodItem,
              dietaryfiber: input,
            });
          }}
          value={foodItem.dietaryfiber}
          placeholder="Dietary Fiber"
          placeholderTextColor={'#C0C0C0'}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={input => {
            setFoodItem({
              ...foodItem,
              totalsugars: input,
            });
          }}
          value={foodItem.totalsugars}
          placeholder="Total Sugars"
          placeholderTextColor={'#C0C0C0'}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={input => {
            setFoodItem({
              ...foodItem,
              includesaddedsugars: input,
            });
          }}
          value={foodItem.includesaddedsugars}
          placeholder="Included Sugars"
          placeholderTextColor={'#C0C0C0'}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={input => {
            setFoodItem({
              ...foodItem,
              protein: input,
            });
          }}
          value={foodItem.protein}
          placeholder="Protein"
          placeholderTextColor={'#C0C0C0'}
          keyboardType="numeric"
        />

        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={async () => {
            setFoodItem({
                ...foodItem,
                foodscore: calculateScore(foodItem)
            })
            console.log("food score: " , foodItem.foodscore)
            if (barcode) {
              const result = await firestore()
                .collection('fooditems')
                .doc(barcode)
                .get();
              console.log('result:', result);
              if (!result._data) {
                const inputDocument = firestore()
                  .collection('fooditems')
                  .doc(barcode)
                  .set({
                    nutritionalfacts: foodItem,
                  });
              }
              ToastAndroid.show('message', ToastAndroid.SHORT);
            }
          }}>
          <Text>Save</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8fcbbc',
  },
  scrollView: {
    marginHorizontal: 5,
    marginBottom: 130,
    padding: 10,
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  button: {
    borderRadius: 30,
    padding: 10,
    elevation: 2,
    marginBottom: 25,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
});
