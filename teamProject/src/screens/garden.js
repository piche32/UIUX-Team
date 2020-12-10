import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Button, Text, Provider as PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ShopScene from './shopMain';
import MainScene from './main';
import BookScene from './book_ver2';

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
    };
  }

  // changeCategory = () => {
  //   console.log("Icon: ", this.state.bookIcon);
  //   let icon = null;
  //   if (this.state.bookCategory === 'flower') {
  //     icon = <View style={{
  //       paddingRight: '15%',
  //       flexDirection: 'row',
  //       justifyContent: 'center',
  //       alignContent: 'center',
  //       alignItems: 'center'
  //     }}>
  //       <MaterialCommunityIcons name="flower" size={24} color="black" />
  //       <View style={{
  //         backgroundColor: 'gray',
  //         width: '100%',
  //         justifyContent: 'center',
  //         alignContent: 'center',
  //         alignItems: 'center',
  //       }}>
  //         <Text style={{ color: 'black' }}>{this.state.flowerSpacies}/{this.state.flowerMaxSpacies}</Text>
  //       </View>
  //     </View>
  //   }
  //   else if (this.state.bookCategory === 'tree') {
  //     icon = <View style={{
  //       paddingRight: '15%',
  //       flexDirection: 'row',
  //       justifyContent: 'center',
  //       alignContent: 'center',
  //       alignItems: 'center'
  //     }}>
  //       <MaterialCommunityIcons name="pine-tree" size={24} color="black" />
  //       <View style={{
  //         backgroundColor: 'gray',
  //         width: '100%',
  //         justifyContent: 'center',
  //         alignContent: 'center',
  //         alignItems: 'center',
  //       }}>
  //         <Text style={{ color: 'black' }}>{this.state.treeSpacies}/{this.state.treeMaxSpacies}</Text>
  //       </View>
  //     </View>
  //   }
  //   else if (this.state.bookCategory === 'bug') {
  //     icon = <View style={{
  //       paddingRight: '15%',
  //       flexDirection: 'row',
  //       justifyContent: 'center',
  //       alignContent: 'center',
  //       alignItems: 'center'
  //     }}>
  //       <MaterialCommunityIcons name="ladybug" size={24} color="black" />
  //       <View style={{
  //         backgroundColor: 'gray',
  //         width: '100%',
  //         justifyContent: 'center',
  //         alignContent: 'center',
  //         alignItems: 'center',
  //       }}>
  //         <Text style={{ color: 'black' }}>{this.state.bugSpacies}/{this.state.bugMaxSpacies}</Text>
  //       </View>
  //     </View>
  //   }
  //   this.state.bookIcon = icon;
  // }


  render() {
    
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Title" component={TitleScene} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={MainScene} initialParams={{ money: this.state.money }} options={{
            title: "", headerShown: false
          }} />
          <Stack.Screen name="Book" component={BookScene}
            options={({navigation,route})=> ({
              headerShown: false
            })} />
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

const styles = StyleSheet.create({
  titleSceneContainer: {
    marginTop: '6%',
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
