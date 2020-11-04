import React from 'react';
import {View, Text, StyleSheet,Button } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';

function ShopSeed({navigation}) {
  const goToBook = () => {
    navigation.navigate("Book");
  }
  return (
      <View style={styles.shopTab}>
          
              <MaterialCommunityIcons name="book-multiple" size={37} color="#593A14"
                onPress={goToBook}
                style={{
                  // marginTop: '10%'
                }}
              />
      </View>
  );
}


function ShopTree() {
  return (
      <View style={styles.shopTab}>
          <Text>Tree</Text>
      </View>
  );
}

function ShopFertilizer() {
  return (
      <View style={styles.shopTab}>
          <Text>Fertilizer</Text>
      </View>
  );
}

function ShopField() {
  return (
      <View style={styles.shopTab}>
          <Text>Field</Text>
      </View>
  );
}

const Tab = createBottomTabNavigator();

export default function ShopScene(){
  
  return (
    <Tab.Navigator>
      <Tab.Screen name="shopSeed" component={ShopSeed} />
      <Tab.Screen name="shopTree" component={ShopTree} />
      <Tab.Screen name="shopFertilizer" component={ShopFertilizer} />
      <Tab.Screen name="shopField" component={ShopField} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
    shopTab: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  