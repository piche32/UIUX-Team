import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Button, Text, Provider as PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import ShopScene from './shop_ver2';
import MainScene from './main';
import BookScene from './book_ver2';
import MiniGame from './MiniGame';

function TitleScene({ navigation }) {
  const pressBT = () => {
    navigation.navigate("Main");
  }
  return (
    <View style={styles.titleSceneContainer}>
      <Entypo name="cloud" size={126} color="white" />
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

  render() {
    
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false, tapBarVisible: false}}>
          <Stack.Screen name="Title" component={TitleScene}  />
          <Stack.Screen name="Main" component={MainScene} initialParams={{ money: this.state.money }}/>
          <Stack.Screen name="Book" component={BookScene}
            options={({navigation,route})=> ({
              headerShown: false
            })} />
          <Stack.Screen name="Shop" component={ShopScene} options={{tapBarVisible: false}}/>
            <Stack.Screen name="MiniGame" component={MiniGame}/>
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
