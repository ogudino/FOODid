import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useIsFocused} from '@react-navigation/native';
import {transparent} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

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

  //   const storeData = async barcode => {
  //     try {
  //       const value = await AsyncStorage.getItem('@bookmarks');

  //       let bookmarks = JSON.parse(value);

  //       //console.log('Bookmarks: ', bookmarks);

  //       if (bookmarks) {
  //         if (!bookmarks.barcodes.includes(barcode)) {
  //           bookmarks.barcodes.push(barcode);
  //         }
  //       } else {
  //         bookmarks = {
  //           barcodes: [barcode],
  //         };
  //       }

  //       await AsyncStorage.setItem('@bookmarks', JSON.stringify(bookmarks));
  //       console.log('storedata: ', barcode);
  //     } catch (e) {
  //       console.log('error saving data', e);
  //     }
  //   };

  function calculateScore(foodItem) {
    let score = 0;

    if (foodItem.calories <= 150) {
      score += 1;
    } else if (foodItem.calories > 150 && foodItem.calories <= 300) {
      score += 2;
    } else if (foodItem.calories > 300 && foodItem.calories <= 450) {
      score += 3;
    } else if (foodItem.calories > 450 && foodItem.calories <= 600) {
      score += 4;
    } else if (foodItem.calories > 600) {
      score += 5;
    }

    if (foodItem.totalfat == 0) {
      score += 1;
    } else if (foodItem.totalfat > 0 && foodItem.totalfat <= 10) {
      score += 2;
    } else if (foodItem.totalfat > 10 && foodItem.totalfat <= 30) {
      score += 3;
    } else if (foodItem.totalfat > 30 && foodItem.totalfat <= 50) {
      score += 4;
    } else if (foodItem.totalfat > 50) {
      score += 5;
    }

    if (foodItem.cholesterol == 0) {
      score += 1;
    } else if (foodItem.cholesterol > 0 && foodItem.cholesterol <= 50) {
      score += 2;
    } else if (foodItem.cholesterol > 50 && foodItem.cholesterol <= 150) {
      score += 3;
    } else if (foodItem.cholesterol > 150 && foodItem.cholesterol <= 250) {
      score += 4;
    } else if (foodItem.cholesterol > 250) {
      score += 5;
    }

    if (foodItem.sodium == 0) {
      score += 1;
    } else if (foodItem.sodium > 0 && foodItem.sodium <= 500) {
      score += 2;
    } else if (foodItem.sodium > 500 && foodItem.sodium <= 1500) {
      score += 3;
    } else if (foodItem.sodium > 1500 && foodItem.sodium <= 2500) {
      score += 4;
    } else if (foodItem.sodium > 2500) {
      score += 5;
    }

    if (foodItem.totalcarbs <= 50) {
      score += 1;
    } else if (foodItem.totalcarbs > 50 && foodItem.totalcarbs <= 100) {
      score += 2;
    } else if (foodItem.totalcarbs > 100 && foodItem.totalcarbs <= 150) {
      score += 3;
    } else if (foodItem.totalcarbs > 150 && foodItem.totalcarbs <= 200) {
      score += 4;
    } else if (foodItem.totalcarbs > 200) {
      score += 5;
    }

    if (foodItem.dietaryfiber > 20) {
      score += 1;
    } else if (foodItem.dietaryfiber < 20 && foodItem.dietaryfiber >= 10) {
      score += 2;
    } else if (foodItem.dietaryfiber < 10 && foodItem.dietaryfiber >= 5) {
      score += 3;
    } else if (foodItem.dietaryfiber < 5 && foodItem.dietaryfiber >= 0) {
      score += 4;
    } else if (foodItem.dietaryfiber == 0) {
      score += 5;
    }

    if (foodItem.totalsugars == 0) {
      score += 1;
    } else if (foodItem.totalsugars > 0 && foodItem.totalsugars <= 10) {
      score += 2;
    } else if (foodItem.totalsugars > 10 && foodItem.totalsugars <= 20) {
      score += 3;
    } else if (foodItem.totalsugars > 20 && foodItem.totalsugars <= 30) {
      score += 4;
    } else if (foodItem.totalsugars > 30) {
      score += 5;
    }

    if (foodItem.protein > 35) {
      score += 1;
    } else if (foodItem.protein < 35 && foodItem.protein >= 25) {
      score += 2;
    } else if (foodItem.protein < 25 && foodItem.protein >= 15) {
      score += 3;
    } else if (foodItem.protein < 15 && foodItem.protein >= 5) {
      score += 4;
    } else if (foodItem.protein < 5) {
      score += 5;
    }

    if (foodItem.saturatedfat > 0) {
      score += 5;
    }

    console.log('score: ', score);
    score = score / 7;

    if (score < 2) {
      console.log('score is A');
      return 'A';
    }

    if (score >= 2 && score < 3) {
      console.log('score is B');

      return 'B';
    }

    if (score >= 3 && score < 4) {
      console.log('score is C');

      return 'C';
    }

    if (score >= 4 && score < 5) {
      console.log('score is D');

      return 'D';
    }

    if (score > 5) {
      console.log('score is F');

      return 'F';
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

  //   const [input, setInput] = React.useState('');

  //   const onChangeText = input => setInput(input);
  // const re = /^(?:\d{3}|\(\d{3}\))([-/.])\d{3}\1\d{4}$/;
  const re = /^[0-9]*$/g;

  const hasErrors = text => {
    if (text) {
      const result = !re.exec(text);
      return result;
    } else {
      return false;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TextInput
          style={{margin: 10}}
          onChangeText={input => {
            setFoodItem({
              ...foodItem,
              fooditemname: input,
            });
          }}
          value={foodItem.fooditemname}
          label="Food Item Name"
          keyboardType="default"
          mode="outlined"
          textColor="#ffff"
          theme={styles.textInputOutlineStyle}
        />

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View>
            <TextInput
              style={{margin: 10, width: 170}}
              onChangeText={onChangeBarcode}
              value={barcode}
              label="Barcode"
              keyboardType="numeric"
              mode="outlined"
              textColor="#ffff"
              theme={styles.textInputOutlineStyle}
            />
            <HelperText type="error" visible={hasErrors(barcode)}>
              Barode not valid!
            </HelperText>
          </View>
          <View>
            <TextInput
              style={{margin: 10, width: 170}}
              onChangeText={input => {
                setFoodItem({
                  ...foodItem,
                  servingspercontainer: input,
                });
              }}
              value={foodItem.servingspercontainer}
              placeholder="Per Container"
              label="Servings..."
              keyboardType="numeric"
              mode="outlined"
              textColor="#ffff"
              theme={styles.textInputOutlineStyle}
            />
            <HelperText
              type="error"
              visible={hasErrors(foodItem.servingspercontainer)}>
              Servings not valid!
            </HelperText>
          </View>
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
            <View>
          <TextInput
            style={{margin: 10, width: 170}}
            onChangeText={input => {
              setFoodItem({
                ...foodItem,
                servingsize: input,
              });
            }}
            value={foodItem.servingsize}
            label="Serving Size"
            keyboardType="numeric"
            mode="outlined"
            textColor="#ffff"
            theme={styles.textInputOutlineStyle}
          />
            <HelperText type="error" visible={hasErrors(foodItem.servingsize)}>
              Serving Size not valid!
            </HelperText>
            </View>
            <View>
          <TextInput
            style={{margin: 10, width: 170}}
            onChangeText={input => {
              setFoodItem({
                ...foodItem,
                calories: input,
              });
            }}
            value={foodItem.calories}
            label="Calories"
            keyboardType="numeric"
            mode="outlined"
            textColor="#ffff"
            theme={styles.textInputOutlineStyle}
          />
                      <HelperText type="error" visible={hasErrors(foodItem.calories)}>
              Calories not valid!
            </HelperText>
            </View>
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
            <View>
          <TextInput
            style={{margin: 10, width: 170}}
            onChangeText={input => {
              setFoodItem({
                ...foodItem,
                totalfat: input,
              });
            }}
            value={foodItem.totalfat}
            label="Total Fat"
            keyboardType="numeric"
            mode="outlined"
            textColor="#ffff"
            theme={styles.textInputOutlineStyle}
          />
                    <HelperText type="error" visible={hasErrors(foodItem.totalfat)}>
              Barode not valid!
            </HelperText>
            </View>
            <View>
          <TextInput
            style={{margin: 10, width: 170}}
            onChangeText={input => {
              setFoodItem({
                ...foodItem,
                saturatedfat: input,
              });
            }}
            value={foodItem.saturatedfat}
            label="Saturated Fat"
            keyboardType="numeric"
            mode="outlined"
            textColor="#ffff"
            theme={styles.textInputOutlineStyle}
          />
                      <HelperText type="error" visible={hasErrors(foodItem.saturatedfat)}>
              Barode not valid!
            </HelperText>
            </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <View>
          <TextInput
            style={{margin: 10, width: 170}}
            onChangeText={input => {
              setFoodItem({
                ...foodItem,
                transfat: input,
              });
            }}
            value={foodItem.transfat}
            label="Trans Fat"
            keyboardType="numeric"
            mode="outlined"
            textColor="#ffff"
            theme={styles.textInputOutlineStyle}
          />
                      <HelperText type="error" visible={hasErrors(foodItem.transfat)}>
              Barode not valid!
            </HelperText>
            </View>
            <View>
          <TextInput
            style={{margin: 10, width: 170}}
            onChangeText={input => {
              setFoodItem({
                ...foodItem,
                cholesterol: input,
              });
            }}
            value={foodItem.cholesterol}
            label="Cholesterol"
            keyboardType="numeric"
            mode="outlined"
            textColor="#ffff"
            theme={styles.textInputOutlineStyle}
          />
                      <HelperText type="error" visible={hasErrors(foodItem.cholesterol)}>
              Barode not valid!
            </HelperText>
            </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <View>
          <TextInput
            style={{margin: 10, width: 170}}
            onChangeText={input => {
              setFoodItem({
                ...foodItem,
                sodium: input,
              });
            }}
            value={foodItem.sodium}
            label="Sodium"
            keyboardType="numeric"
            mode="outlined"
            textColor="#ffff"
            theme={styles.textInputOutlineStyle}
          />
                      <HelperText type="error" visible={hasErrors(foodItem.sodium)}>
              Barode not valid!
            </HelperText>
            </View>
            <View>
          <TextInput
            style={{margin: 10, width: 170}}
            onChangeText={input => {
              setFoodItem({
                ...foodItem,
                totalcarbs: input,
              });
            }}
            value={foodItem.totalcarbs}
            placeholder="Carbohydrates"
            label="Total..."
            keyboardType="numeric"
            mode="outlined"
            textColor="#ffff"
            theme={styles.textInputOutlineStyle}
          />
                      <HelperText type="error" visible={hasErrors(foodItem.totalcarbs)}>
              Barode not valid!
            </HelperText>
            </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <View>
          <TextInput
            style={{margin: 10, width: 170}}
            onChangeText={input => {
              setFoodItem({
                ...foodItem,
                dietaryfiber: input,
              });
            }}
            value={foodItem.dietaryfiber}
            label="Dietary Fiber"
            keyboardType="numeric"
            mode="outlined"
            textColor="#ffff"
            theme={styles.textInputOutlineStyle}
          />
                      <HelperText type="error" visible={hasErrors(foodItem.dietaryfiber)}>
              Barode not valid!
            </HelperText>
            </View>
            <View>
          <TextInput
            style={{margin: 10, width: 170}}
            onChangeText={input => {
              setFoodItem({
                ...foodItem,
                totalsugars: input,
              });
            }}
            value={foodItem.totalsugars}
            label="Total Sugars"
            keyboardType="numeric"
            mode="outlined"
            textColor="#ffff"
            theme={styles.textInputOutlineStyle}
          />
                      <HelperText type="error" visible={hasErrors(foodItem.totalsugars)}>
              Barode not valid!
            </HelperText>
            </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
            <View>
          <TextInput
            style={{margin: 10, width: 170}}
            onChangeText={input => {
              setFoodItem({
                ...foodItem,
                includesaddedsugars: input,
              });
            }}
            value={foodItem.includesaddedsugars}
            label="Included Sugars"
            keyboardType="numeric"
            mode="outlined"
            textColor="#ffff"
            theme={styles.textInputOutlineStyle}
          />
                      <HelperText type="error" visible={hasErrors(foodItem.includesaddedsugars)}>
              Barode not valid!
            </HelperText>
            </View>
            <View>
          <TextInput
            style={{margin: 10, width: 170}}
            onChangeText={input => {
              setFoodItem({
                ...foodItem,
                protein: input,
              });
            }}
            value={foodItem.protein}
            label="Protein"
            keyboardType="numeric"
            mode="outlined"
            textColor="#ffff"
            theme={styles.textInputOutlineStyle}
          />
                      <HelperText type="error" visible={hasErrors(foodItem.protein)}>
              Barode not valid!
            </HelperText>
            </View>
        </View>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={async () => {
            const score = calculateScore(foodItem);
            const newFoodItem = {
              ...foodItem,
              foodscore: score,
            };
            // console.log("\nFOODSCORE: ", score)

            // console.log("Setting food item")
            setFoodItem({
              ...newFoodItem,
            });
            // console.log("Food item set...")
            // console.log("FoodITEM: ", foodItem)

            if (barcode) {
              const result = await firestore()
                .collection('fooditems')
                .doc(barcode)
                .get();
              //   console.log('result:', result);
              if (!result._data) {
                console.log('\n food item:', newFoodItem);
                const inputDocument = firestore()
                  .collection('fooditems')
                  .doc(barcode)
                  .set({
                    nutritionalfacts: newFoodItem,
                  });
              }
              ToastAndroid.show('message', ToastAndroid.SHORT);
            }
          }}>
          <Text style={{fontWeight: 'bold'}}>Save</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewItemScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#16302b',
    justifyContent: 'center',
    alignContent: 'center',
  },
  scrollView: {
    marginHorizontal: 5,
    marginBottom: 130,
    padding: 10,
  },
  input: {
    height: 40,
    margin: 10,
    marginLeft: 0,
    borderWidth: 0,
    borderRadius: 4,
    padding: 10,
    color: '#000000',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
    marginBottom: 25,
    backgroundColor: '#E04F5F',
    textAlignVertical: 'center',
  },
  textInputOutlineStyle: {
    colors: {
      //    placeholder: '#F6F7EB',

      text: '#F6F7EB',
      primary: '#F6F7EB',
      underlineColor: 'transparent',
      background: '#16302B',
    },
  },
});
