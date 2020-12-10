import React, { useState } from 'react';
import { Component } from 'react';
import { StyleSheet, View, Image, Animated, ScrollView, Dimensions } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { ToggleButton, Portal, Button, Modal, Text, Provider as PaperProvider } from 'react-native-paper';
import Bag from '../components/bag';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import BookBackPlate from '../../assets/garden/BookBackPlate.svg';
import BookInsidePlate from '../../assets/garden/BookInsidePlate.svg';
import ItemBG from '../../assets/ItemBG.svg';
import SvgFlower from '../../assets/garden/flower.svg'; 
import SvgTitle from '../../assets/Title.svg';
import BackButton from '../../assets/BackButton.svg';
import UISmallInsidePlate from '../../assets/UISmallInsidePlate.svg';

const UISpace = (props) => {
    return(
    <View style={{ flex:2, zIndex: 10000, flexDirection: 'row', justifyContent:'center', marginLeft: '3%'}}>
    <SvgTitle width="110%" height="110%" style={[styles.svgBG, {transform: [{translateY: -5}]}]} />
    <UISmallInsidePlate width= "60%" height='60%' style={ [styles.svgBG,{transform: [{translateX: 40}, {translateY: 14}]}]}/>
    {props.icon}
    <Text style={{fontSize: 18, fontWeight: 'bold', transform: [{translateX: 10}, {translateY: 25}] }}>{props.text}</Text>
    </View>
    );
}

export default UISpace;


const styles = StyleSheet.create({
    mainSceneContainer: {
      marginTop: '6%',
      flex: 1,
      backgroundColor: '#A8FFFA',
  
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
  