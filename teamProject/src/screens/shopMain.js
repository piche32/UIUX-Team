import React, {useState,} from 'react';
import { View, Image, Text, StyleSheet, ScrollView, Button, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Portal, Modal, Provider as PaperProvider} from 'react-native-paper';
import Bag from '../components/bag';

const bagModalStyle = {
  backgroundColor: 'white',
  padding: 20,
  height: "70%",
  width: "70%",
  marginLeft: "15%",
};

function ShopTab(props) {
  const [bagVisible, setBagVisible] = useState(false);
  const showBag = () => setBagVisible(true);
  const hideBag = () => setBagVisible(false);
  return (
    <PaperProvider>
      <Portal>
      <Modal visible={bagVisible} onDismiss={hideBag}
            contentContainerStyle={bagModalStyle}>
              <Bag/>
           
          </Modal>
      </Portal>
    <View style={styles.shopTab}>
      <View style={styles.icon}>
        <MaterialCommunityIcons name="bag-personal"
          size={40} color='#A57939'
          onPress={showBag}
          style={{ width: '10%' }}
        />

        <MaterialCommunityIcons name="book-multiple" size={37} color="#593A14"
          onPress={props._goToBook}
          style={{
          }}
        />
      </View>
      <ScrollView style={styles.list}>
        <View style={styles.item}>
          <Image source={{ uri: props.uri }} style={styles.itemImage} />
          <View style={styles.itemTexts}>
            <Text style={styles.itemText}>
              {props.name}</Text>
            <Text style={styles.itemText}>
              {props.explain}
            </Text>
          </View>
          <View style={styles.itemCost}>
            <Text style={{ flex: 1, fontSize: 17, textAlignVertical: 'center', textAlign: 'center', }}>99.99a</Text>
          </View>
        </View>
        <View style={styles.item}>
        </View>
        <View style={styles.item}>
        </View>


      </ScrollView>
    </View>
    </PaperProvider>
  );
}

function ShopSeed({ navigation }) {
  const goToBook = () => {
    navigation.navigate("Book");
  }
  return (
    <ShopTab name='해바라기' uri="https://www.vectorkhazana.com/assets/images/products/Sunflower-.jpg" explain="성장시간: 21분" _goToBook={goToBook}>
    </ShopTab>
  );
}


function ShopTree({ navigation }) {
  const goToBook = () => {
    navigation.navigate("Book");
  }
    return (
      <ShopTab name='소나무' uri="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRDlc-Mn_W_fnZ_iDtU2ULH-d7eR_4aTSQ5jA&usqp=CAU" explain="성장시간: 21분" _goToBook={goToBook}>
      </ShopTab>
    );
  }

  function ShopFertilizer({ navigation }) {
    const goToBook = () => {
      navigation.navigate("Book");
    }
      return (
        <ShopTab name='비료' _goToBook = {goToBook} explain="수확량 증가" uri="https://cdn5.vectorstock.com/i/1000x1000/76/39/fertilizer-flat-icon-vector-21547639.jpg">
        </ShopTab>
      );
    }

    function ShopField({ navigation }) {
      const goToBook = () => {
        navigation.navigate("Book");
      }
        return (
          <ShopTab name='밭 업그레이드'_goToBook = {goToBook} explain="" uri="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIKOyrwT2mGm7VYGyp2hycs1RSp9OY343pYQ&usqp=CAU">
          </ShopTab>
        );
      }

      const Tab = createBottomTabNavigator();

      export default function ShopScene() {

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
        },
        icon: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        list: {
          flex: 1,
          backgroundColor: 'gray',
          //alignItems: 'center',
          //justifyContent: 'space-around',
        },
        item: {
          //flex: 1,
          width: "85%",
          height: Dimensions.get('window').height * 25 / 100,
          alignSelf: 'center',
          backgroundColor: 'white',
          borderWidth: 1,
          marginTop: Dimensions.get('window').height * 4 / 100,
          marginBottom: Dimensions.get('window').height * 4 / 100,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        itemImage: {
          marginHorizontal: '5%',
          width: '35%',
          height: '70%',
        },
        itemTexts: {
          flex: 1,
          //borderWidth: 1,
          width: '70%',
          right: '3%',
        },
        itemText: {
          fontSize: Dimensions.get('window').width * 5 / 100,
        },
        itemCost: {
          position: 'absolute',
          borderWidth: 1,
          width: '20%',
          height: '20%',
          right: '2.5%',
          bottom: "5%",
        },
      });
