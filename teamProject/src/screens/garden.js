import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Button, Provider as PaperProvider} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ShopScene from './shopMain';
import MainScene from './main';
import BookScene from './book';

function TitleScene({navigation}){
    const pressBT = ()=>{
        navigation.navigate("Main");
}
    return(
        <View style={styles.titleSceneContainer}>
      <MaterialCommunityIcons name="human-handsdown" size={126} color="white" />
      <MaterialCommunityIcons name="flower" size={50} color='white' />
      <Button mode = "contained" onPress={pressBT}>Start</Button>
    </View>
    );
}

const Stack = createStackNavigator();

export default function Gardens() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Title" component={TitleScene} options={{ headerShown: false }} />
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
  