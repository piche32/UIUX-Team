import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Button, Text, Provider as PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ShopScene from './shopMain';
import MainScene from './main';
import BookScene from './book';

function TitleScene({ navigation }) {
  const pressBT = () => {
    navigation.navigate("Main");
  }
  return (
    <View style={styles.titleSceneContainer}>
      <MaterialCommunityIcons name="human-handsdown" size={126} color="white" />
      <MaterialCommunityIcons name="flower" size={50} color='white' />
      <Button mode="contained" onPress={pressBT}>Start</Button>
    </View>
  );
}

const Stack = createStackNavigator();

export default class Gardens extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      money: 9000,
      flowerSpacies: 0,
      flowerMaxSpacies: 100,
      treeSpacies: 0,
      treeMaxSpacies: 30,
      bugSpacies: 0,
      bugMaxSpacies: 25,
      bookCategory: 'flower',
      bookIcon: null,
    };
  }

  changeCategory = () => {
    console.log(this.state.bookIcon);
    if (this.state.bookCategory === 'flower') {
      this.state.bookIcon = <View style={{
        paddingRight: '15%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
      }}>
        <MaterialCommunityIcons name="flower" size={24} color="black" />
        <View style={{
          backgroundColor: 'gray',
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{ color: 'black' }}>{this.state.flowerSpacies}/{this.state.flowerMaxSpacies}</Text>
        </View>
      </View>
    }
    else if (this.state.bookCategory === 'tree') {
      this.state.bookIcon = <View style={{
        paddingRight: '15%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
      }}>
        <MaterialCommunityIcons name="pine-tree" size={24} color="black" />
        <View style={{
          backgroundColor: 'gray',
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{ color: 'black' }}>{this.state.treeSpacies}/{this.state.treeMaxSpacies}</Text>
        </View>
      </View>
    }
    else if (this.state.bookCategory === 'bug') {
      this.state.bookIcon = <View style={{
        paddingRight: '15%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
      }}>
        <MaterialCommunityIcons name="ladybug" size={24} color="black" />
        <View style={{
          backgroundColor: 'gray',
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{ color: 'black' }}>{this.state.bugSpacies}/{this.state.bugMaxSpacies}</Text>
        </View>
      </View>
    }
  }


  render() {
    this.changeCategory();
    
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Title" component={TitleScene} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={MainScene} initialParams={{ money: this.state.money }} options={{
            title: "", headerShown: false
          }} />
          <Stack.Screen name="Book" component={BookScene} initialParams={{ bookCategory: this.state.bookCategory}}
            options={{
              headerTitleAlign: 'center',
              headerRight: () => (
                this.state.bookIcon
              )
            }} />
          <Stack.Screen name="Shop" component={ShopScene} initialParams={{ money: this.state.money }}
            options={{
              headerTitleAlign: 'center',
              headerRight: () => (
                <View style={{
                  paddingRight: '15%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center'
                }}>
                  <MaterialCommunityIcons name="coin" size={24} color="black" />
                  <View style={{
                    backgroundColor: 'gray',
                    width: '100%',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Text style={{ color: 'black' }}>{this.state.money}</Text>
                  </View>
                </View>
              )
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


/*export default function Gardens() {
  const [money, setMoney] = useState(9000);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Title" component={TitleScene} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainScene} initialParams ={{money : money}} options={{
          title: "", headerShown: false
        }} />
        <Stack.Screen name="Book" component={BookScene} options={{
          headerTitleAlign: 'center',
        }} />
        <Stack.Screen name="Shop" component={ShopScene} initialParams ={{money : money, setMoney : setMoney}} options={{
          headerTitleAlign: 'center',
          headerRight: () => (
            <View style={{
              //flex: 1,
              paddingRight: '15%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center'
            }}>
              <MaterialCommunityIcons name="coin" size={24} color="black" />
              <View style={{
                backgroundColor: 'gray',
                width: '100%',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{ color: 'black' }}>{money}</Text>
              </View>
            </View>
          )
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}*/

const styles = StyleSheet.create({
  titleSceneContainer: {
    marginTop: '6%',
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
