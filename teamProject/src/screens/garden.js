import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ShopScene from './shopMain';
import MainScene from './main';
import BookScene from './book';

function TitleScene({navigation}){
    const pressBT = ()=>{
        navigation.navigate("InGame");
}
    return(
        <View style={styles.titleSceneContainer}>
      <MaterialCommunityIcons name="human-handsdown" size={126} color="white" />
      <MaterialCommunityIcons name="flower" size={50} color='white' />
      <Button onPress={pressBT} title="START" />
    </View>
    );
}

const Stack = createStackNavigator();

function InGameScene() {
    return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        elevation: 0,
      }
    }}>
      <Stack.Screen name="Main" component={MainScene} options={{
        title: "", headerShown: false
      }} />
      <Stack.Screen name="Book" component={BookScene} options={{
        headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="Shop" component={ShopScene} options={{
        headerTitleAlign: 'center',
        headerRight: () => (
          <View style={{ flex: 1, paddingRight: '15%', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons name="flower" size={24} color="black" />
            <View style={{ backgroundColor: 'gray', width: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'black' }}>3/3</Text>
            </View>
          </View>
        )
      }} />
    </Stack.Navigator>
    );
}

const Drawer = createDrawerNavigator();
export default function Gardens(){
    return(
        <NavigationContainer>
        <Drawer.Navigator>
            <Drawer.Screen name = "Title" component = {TitleScene}/>
            <Drawer.Screen name="InGame" component = {InGameScene}/>
        </Drawer.Navigator>
        </NavigationContainer>
    );
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
  