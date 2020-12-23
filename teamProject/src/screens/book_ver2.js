
import React, { useEffect, useState } from 'react';
import { Component } from 'react';
import { StyleSheet, View, Image, Animated, ScrollView, Dimensions, Pressable } from 'react-native';
import { PanGestureHandler, State, TouchableOpacity } from 'react-native-gesture-handler';
import { ToggleButton, Portal, Button, Modal, Text, Provider as PaperProvider } from 'react-native-paper';
import Bag from '../components/bag';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import BookBackPlate from '../../assets/garden/BookBackPlate.svg';
import BookInsidePlate from '../../assets/garden/BookInsidePlate.svg';
import ItemBG from '../../assets/ItemBG.svg';
import SvgFlower from '../../assets/garden/flower.svg'; 
import SvgTitle from '../../assets/Title.svg';
import BackButton from '../../assets/BackButton.svg';
import UISmallInsidePlate from '../../assets/UISmallInsidePlate.svg';
import UITitle from '../components/Title';
import UISpace from '../components/UISpace';
import SvgBG from '../../assets/garden/BookBG.svg';
import SvgBug from '../../assets/garden/Bug Icon.svg';

const Item = (props) => {
  return ( 
    <View style={styles.item}>
          <ItemBG style={[styles.svgBG]} />
          <SvgFlower width = '70%' height = '70%' style={styles.itemFlower}/>
          <View style={styles.itemTexts}>
            <Text style={styles.itemText}>
              {props.name}</Text>
            <Text style={styles.itemText}>
              {props.explain}
            </Text>
          </View>
        </View>
  );
}

const bagModalStyle = {
  backgroundColor: 'white',
  padding: 20,
  height: "70%",
  width: "70%",
  marginLeft: "15%",
};





function List(props) {

  return (
    <ScrollView style={styles.list}>
      <View style={styles.itemsRow}>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </View>
    </ScrollView >
  );
}

const Tab = createBottomTabNavigator();

export default function BookScene ({navigation}, props) {
  
    return (
      <Tab.Navigator>
        <Tab.Screen name="Flower" component={BookScene_flower} options={{tabBarVisible: false}}/>
        <Tab.Screen name="Bug" component={BookScene_bug} options={{tabBarVisible: false}}/>
      </Tab.Navigator>
    );

}

 function BookScene_flower ({navigation}, props) {
  const [flowerSpacies,setFlowerSpacies] = useState(1);
  
  const [category, setCategory] = useState("Flower");
  
  const flowerMax = 50;
  const [icon, setIcon] = useState(
      <MaterialCommunityIcons name="flower" size={24} color="black" style={{transform:[{translateX: -5}, {translateY: 25}]}} />
  )

  const goToMain = () => {
    navigation.navigate("Main");
  }

  const goToBug = () => {
    navigation.navigate("Bug");
  }

    return (
      <View style={{flex: 1,}}>
        <SvgBG width={Dimensions.get("window").width} height={Dimensions.get("window").height*1.1} style={[styles.svg,
           {transform: [{translateY: -20}], position: 'absolute'}]}/>
      <View style={styles.mainSceneContainer}>
        <View style={{flex:1, flexDirection: 'row', flexWrap: 'wrap',}}>
          <UISpace icon={icon} text={`${flowerSpacies}/${flowerMax}`}/>
          <UITitle text={"도감"}/>
          <TouchableOpacity onPress={goToMain}
          style={{borderRadius: 20, transform: [{translateX: -10}, {translateY: 10}] }}>
            <BackButton width = {60} height = {56} />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 3, flexDirection: 'row', }}>
          <SvgFlower width = '80%' height = '80%' style={{transform: [{translateX: -50}, {translateY: 30}]}}/>
          <Text style={{fontWeight: 'bold', fontSize: 30, transform:[{translateX: -100}, {translateY: 100}]}}>
    해바라기 {"\n"}꽃말: 애모 </Text>
        </View>

        <View style={{ flex: 4 }}>
          <BookBackPlate width='110%' height='120%' style={{ ...StyleSheet.absoluteFill, transform: [{ translateY: -10 }] }} />
          <BookInsidePlate width='95%' height='95%' style={{
            ...StyleSheet.absoluteFill, marginHorizontal: '2.6%', transform: [{ translateY: -10 }],
          }} />
          <List name={category} />
          <View style={{ flexDirection: 'row' }}>
            <Button style={{ flex: 1 }} color='#52D315' mode="contained" labelStyle={{fontSize: 20}}
            
            >flower</Button>
            <Button style={{ flex: 1 }} color='#B2F991' mode="contained" disabled = {false} labelStyle={{fontSize: 20}}
            onPress={goToBug}
            >bug</Button>
          </View>
        </View>
      </View>
      </View>
    );
}

function BookScene_bug ({navigation}, props) {
  const [flowerSpacies,setFlowerSpacies] = useState(1);
  
  const [category, setCategory] = useState("Flower");
  
  const flowerMax = 50;
  const [icon, setIcon] = useState(
     <MaterialCommunityIcons name="ladybug" size={24} color="black" style={{transform: [{translateX: -7}, {translateY:25}]}}/>
    )

  const goToMain = () => {
    navigation.navigate("Main");
  }
  const goToFlower = () => {
    navigation.navigate("Flower");
  }
    return (
      <View style={{flex: 1,}}>
        <SvgBG width={Dimensions.get("window").width} height={Dimensions.get("window").height*1.1} style={[styles.svg,
           {transform: [{translateY: -20}], position: 'absolute'}]}/>
      <View style={styles.mainSceneContainer}>
        <View style={{flex:1, flexDirection: 'row', flexWrap: 'wrap',}}>
          <UISpace icon={icon} text={`${flowerSpacies}/${flowerMax}`}/>
          <UITitle text={"도감"}/>
          <TouchableOpacity onPress={goToMain}
          style={{borderRadius: 20, transform: [{translateX: -10}, {translateY: 10}] }}>
            <BackButton width = {60} height = {56} />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 3, flexDirection: 'row', }}>
          <SvgBug width = '80%' height = '80%' style={{transform: [{translateX: -50}, {translateY: 30}]}}/>
          <Text style={{fontWeight: 'bold', fontSize: 30, transform:[{translateX: -100}, {translateY: 100}]}}>
    무당벌레 {"\n"}익충 / 대식가 </Text>
        </View>

        <View style={{ flex: 4 }}>
          <BookBackPlate width='110%' height='120%' style={{ ...StyleSheet.absoluteFill, transform: [{ translateY: -10 }] }} />
          <BookInsidePlate width='95%' height='95%' style={{
            ...StyleSheet.absoluteFill, marginHorizontal: '2.6%', transform: [{ translateY: -10 }],
          }} />
          <List name={category} />
          <View style={{ flexDirection: 'row' }}>
            <Button style={{ flex: 1 }} color='#B2F991' mode="contained" labelStyle={{fontSize: 20}}
            onPress={goToFlower}
            >flower</Button>
            <Button style={{ flex: 1 }} color='#52D315' mode="contained" disabled = {false} labelStyle={{fontSize: 20}}
            //onPress={() => this.setBookCategory("bug")}
            >bug</Button>
          </View>
        </View>
      </View>
      </View>
    );

}

const styles = StyleSheet.create({
  mainSceneContainer: {
    marginTop: '6%',
    flex: 1,

  },

  svgBG: {
    ...StyleSheet.absoluteFill,
  },

  flowerList: {
    flex: 1,
    backgroundColor: '#fff',

  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  list: {
    flex: 1,
    //backgroundColor: 'gray',
    marginHorizontal: '3%',
    marginVertical: '5%',
    flexWrap: 'wrap',
    borderRadius: 20,
    //alignItems: 'center',
    //justifyContent: 'space-around',
  },
  item: {
    //flex: 1,
    width: Dimensions.get('window').height * 15 / 100,
    height: Dimensions.get('window').height * 15 / 100,
    alignSelf: 'center',
    //backgroundColor: 'white',
    //borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2%'
  },
  itemImage: {
    //marginHorizontal: '5%',
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
  itemFlower:{
    marginHorizontal: '13%',
  },
  itemsRow:{
    flexDirection: 'row',
     flexWrap: 'wrap',
      justifyContent: 'space-evenly',
  },
});
