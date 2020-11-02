
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {MaterialCommunityIcons} from '@expo/vector-icons';

function StartScene({navigation}){
  const pressBT = () => {
    navigation.navigate("InGame");
  }
  return(
    <View style = {styles.startSceneContainer}>
      <MaterialCommunityIcons name="human-handsdown" size ={126} color="white"/>
      <MaterialCommunityIcons name="flower" size = {50} color='white'/>
      <Button onPress={pressBT} title="START"/>
    </View>
  );
}

const Stack = createStackNavigator();

function InGameScene(){
  
  return(
    <Stack.Navigator>
      <Stack.Screen name = "Main" component = {MainScene}/>
      <Stack.Screen name = "Book" component = {BookScene}/>
    </Stack.Navigator>
  );
}

function MainScene({navigation}){
  const drawerBook = () => {
    navigation.navigate("Book");
  }
  return(
    <View style = {styles.mainSceneContainer}>
      <MaterialCommunityIcons onPress={drawerBook} name="book-multiple" size={50} color="brown"/>
    </View>
  );
}


function BookScene(){
  return(
    <View style = {styles.bookSceneContainer}>
      <Text>Test</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function Loading() {
  return ( 
  <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen name = "Start" component = {StartScene}/>
      <Drawer.Screen name = "InGame" component = {InGameScene} />
    </Drawer.Navigator>
  </NavigationContainer>
    );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 30,
    paddingVertical: 100,
    backgroundColor: "#FDF6AA"
  }, 

  text:{
    color:"#2c2c2c",
    fontSize: 30  
  },startSceneContainer: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainSceneContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookSceneContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});