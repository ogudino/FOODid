import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {TextInput, HelperText, List} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useIsFocused} from '@react-navigation/native';

const NewItemScreen = ({route, navigation}) => {
  const isFocused = useIsFocused();
  const [barcode, onChangeBarcode] = React.useState(null);
  const [barcodeTextError, setBarcodeTextError] = React.useState(false);
  const [caloriesTextError, setCaloriesTextError] = React.useState(false);
  const [servingsPerContainerTextError, setServingsPerContainerTextError] = React.useState(false);
  const [totalFatTextError, setTotalFatTextError] = React.useState(false);
  const [saturatedFatTextError, setSaturatedFatTextError] = React.useState(false);
  const [transFatTextError, setTransFatTextError] = React.useState(false);
  const [cholesterolTextError, setCholesterolTextError] = React.useState(false);
  const [sodiumTextError, setSodiumTextError] = React.useState(false);
  const [totalCarbsTextError, setTotalCarbsTextError] = React.useState(false);
  const [dietaryFiberTextError, setDietaryTextError] = React.useState(false);
  const [totalSugarsTextError, setTotalSugarsTextErrors] = React.useState(false);
  const [includedSugarsTextError, setIncludedSugarsTextError] = React.useState(false);
  const [proteinTextError, setProteinTextError] = React.useState(false);

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

  const re = /^[0-9]*$/;

  const hasErrors = text => {
    if (text) {
      const result = !re.exec(text);
      return result;
    } else {
      return false;
    }
  };

  const hasAnyErrors = () => {
    return (
      barcodeTextError |
      caloriesTextError |
      servingsPerContainerTextError |
      totalFatTextError |
      saturatedFatTextError |
      transFatTextError |
      cholesterolTextError |
      sodiumTextError |
      totalCarbsTextError |
      dietaryFiberTextError |
      totalSugarsTextError |
      includedSugarsTextError |
      proteinTextError
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TextInput
          style={{margin: 10}}
          onChangeText={onChangeBarcode}
          value={barcode}
          label="Barcode"
          keyboardType="numeric"
          mode="flat"
          textColor="#1E1E1E"
          theme={styles.textInputOutlineStyle}
        />
        <HelperText
          type="error"
          visible={hasErrors(barcode)}
          style={styles.validateText}>
          Barode not valid!
        </HelperText>

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
          mode="flat"
          textColor="#1E1E1E"
          theme={styles.textInputOutlineStyle}
        />

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View>
            <TextInput
              style={{margin: 10, width: 170}}
              onChangeText={input => {
                setFoodItem({
                  ...foodItem,
                  calories: input,
                });

                if (hasErrors(input)) {
                  setCaloriesTextError(true);
                } else {
                  setCaloriesTextError(false);
                }
              }}
              value={foodItem.calories}
              label="Calories"
              keyboardType="numeric"
              mode="flat"
              textColor="#1E1E1E"
              theme={styles.textInputOutlineStyle}
            />
            <HelperText
              type="error"
              visible={hasErrors(foodItem.calories)}
              style={styles.validateText}>
              Calories not valid!
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
                if (hasErrors(input)) {
                  setServingsPerContainerTextError(true);
                } else {
                  setServingsPerContainerTextError(false);
                }
              }}
              value={foodItem.servingspercontainer}
              placeholder="Per Container"
              label="Servings Per Container"
              keyboardType="numeric"
              mode="flat"
              textColor="#1E1E1E"
              theme={styles.textInputOutlineStyle}
            />
            <HelperText
              type="error"
              visible={hasErrors(foodItem.servingspercontainer)}
              style={styles.validateText}>
              Servings not valid!
            </HelperText>
          </View>
        </View>
        <View>
          <TextInput
            style={{margin: 10}}
            onChangeText={input => {
              setFoodItem({
                ...foodItem,
                servingsize: input,
              });
            }}
            value={foodItem.servingsize}
            label="Serving Size (Unit)"
            keyboardType="default"
            mode="flat"
            textColor="#1E1E1E"
            theme={styles.textInputOutlineStyle}
          />

          {/* <HelperText
            type="error"
            visible={hasErrors(foodItem.servingsize)}
            style={styles.validateText}>
            Serving Size not valid!
          </HelperText> */}
        </View>

        {/* <View style={{margin: 10, marginTop: 12}}>
          <List.Accordion
        title="idk"
        style={{marginVertical: 0, width: 170, backgroundColor: '#16302b', borderColor: '#0000'}}
        >
        <List.Item title="grams" />
        <List.Item title="cups" />
      </List.Accordion>
          </View>  */}

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View>
            <TextInput
              style={{margin: 10, width: 170}}
              onChangeText={input => {
                setFoodItem({
                  ...foodItem,
                  totalfat: input,
                });
                if (hasErrors(input)) {
                  setTotalFatTextError(true);
                } else {
                  setTotalFatTextError(false);
                }
              }}
              value={foodItem.totalfat}
              label="Total Fat"
              keyboardType="numeric"
              mode="flat"
              textColor="#1E1E1E"
              theme={styles.textInputOutlineStyle}
            />
            <HelperText
              type="error"
              visible={hasErrors(foodItem.totalfat)}
              style={styles.validateText}>
              Total Fat not valid!
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
                if (hasErrors(input)) {
                  setSaturatedFatTextError(true);
                } else {
                  setSaturatedFatTextError(false);
                }
              }}
              value={foodItem.saturatedfat}
              label="Saturated Fat"
              keyboardType="numeric"
              mode="flat"
              textColor="#1E1E1E"
              theme={styles.textInputOutlineStyle}
            />
            <HelperText
              type="error"
              visible={hasErrors(foodItem.saturatedfat)}
              style={styles.validateText}>
              Saturated Fat not valid!
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
                if (hasErrors(input)) {
                  setTransFatTextError(true);
                } else {
                  setTransFatTextError(false);
                }
              }}
              value={foodItem.transfat}
              label="Trans Fat"
              keyboardType="numeric"
              mode="flat"
              textColor="#1E1E1E"
              theme={styles.textInputOutlineStyle}
            />

            <HelperText
              type="error"
              visible={hasErrors(foodItem.transfat)}
              style={styles.validateText}>
              Trans Fat not valid!
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
                if (hasErrors(input)) {
                  setCholesterolTextError(true);
                } else {
                  setCholesterolTextError(false);
                }
              }}
              value={foodItem.cholesterol}
              label="Cholesterol"
              keyboardType="numeric"
              mode="flat"
              textColor="#1E1E1E"
              theme={styles.textInputOutlineStyle}
            />
            <HelperText
              type="error"
              visible={hasErrors(foodItem.cholesterol)}
              style={styles.validateText}>
              Cholesterol not valid!
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
                if (hasErrors(input)) {
                  setSodiumTextError(true);
                } else {
                  setSodiumTextError(false);
                }
              }}
              value={foodItem.sodium}
              label="Sodium"
              keyboardType="numeric"
              mode="flat"
              textColor="#1E1E1E"
              theme={styles.textInputOutlineStyle}
            />
            <HelperText
              type="error"
              visible={hasErrors(foodItem.sodium)}
              style={styles.validateText}>
              Sodium not valid!
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
                if (hasErrors(input)) {
                  setTotalCarbsTextError(true);
                } else {
                  setTotalCarbsTextError(false);
                }
              }}
              value={foodItem.totalcarbs}
              label="Total Carbs"
              keyboardType="numeric"
              mode="flat"
              textColor="#1E1E1E"
              theme={styles.textInputOutlineStyle}
            />
            <HelperText
              type="error"
              visible={hasErrors(foodItem.totalcarbs)}
              style={styles.validateText}>
              Total Carbs not valid!
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
                if (hasErrors(input)) {
                  setDietaryTextError(true);
                } else {
                  setDietaryTextError(false);
                }
              }}
              value={foodItem.dietaryfiber}
              label="Dietary Fiber"
              keyboardType="numeric"
              mode="flat"
              textColor="#1E1E1E"
              theme={styles.textInputOutlineStyle}
            />
            <HelperText
              type="error"
              visible={hasErrors(foodItem.dietaryfiber)}
              style={styles.validateText}>
              Dietary Fiber not valid!
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
                if (hasErrors(input)) {
                  setTotalSugarsTextErrors(true);
                } else {
                  setTotalSugarsTextErrors(false);
                }
              }}
              value={foodItem.totalsugars}
              label="Total Sugars"
              keyboardType="numeric"
              mode="flat"
              textColor="#1E1E1E"
              theme={styles.textInputOutlineStyle}
            />
            <HelperText
              type="error"
              visible={hasErrors(foodItem.totalsugars)}
              style={styles.validateText}>
              Total Sugars not valid!
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
                if (hasErrors(input)) {
                  setIncludedSugarsTextError(true);
                } else {
                  setIncludedSugarsTextError(false);
                }
              }}
              value={foodItem.includesaddedsugars}
              label="Included Sugars"
              keyboardType="numeric"
              mode="flat"
              textColor="#1E1E1E"
              theme={styles.textInputOutlineStyle}
            />
            <HelperText
              type="error"
              visible={hasErrors(foodItem.includesaddedsugars)}
              style={styles.validateText}>
              Included Sugars not valid!
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
                if (hasErrors(input)) {
                  setProteinTextError(true);
                } else {
                  setProteinTextError(false);
                }
              }}
              value={foodItem.protein}
              label="Protein"
              keyboardType="numeric"
              mode="flat"
              textColor="#1E1E1E"
              theme={styles.textInputOutlineStyle}
            />
            <HelperText
              type="error"
              visible={hasErrors(foodItem.protein)}
              style={styles.validateText}>
              Protein not valid!
            </HelperText>
          </View>
        </View>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          disabled={hasAnyErrors()}
          onPress={async () => {
            console.log('PRESSED');
            const score = calculateScore(foodItem);
            const newFoodItem = {
              ...foodItem,
              foodscore: score,
            };
            setFoodItem({
              ...newFoodItem,
            });
            if (barcode) {
              const result = await firestore()
                .collection('fooditems')
                .doc(barcode)
                .get();
              if (!result._data) {
                console.log('\n food item:', newFoodItem);
                const inputDocument = firestore()
                  .collection('fooditems')
                  .doc(barcode)
                  .set({
                    nutritionalfacts: newFoodItem,
                  });
              }
              ToastAndroid.show('Food Saved!', ToastAndroid.SHORT);
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
    // color: '#ffff',
    // backgroundColor: '#ffffff',
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
      text: '#F6F7EB',
      primary: '#2f9c95',
      underlineColor: 'transparent',
      background: '#ffff',
    },
  },
  validateText: {
    marginVertical: -15,
    color: '#E04F5F',
  },
});
