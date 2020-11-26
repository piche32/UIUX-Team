
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View, Pressable, Text, Image, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';



const Flower = (props)=> {
 
  const pressField = () => {
    props.showBag();
    props.setUsedScreen('flower');
    props.setObjIdx(props.idx);
  }
  return(
      <TouchableOpacity onPress = {pressField}
       style = {{...StyleSheet.absoluteFill,
       justifyContent: 'center'}}>
        <Image source={require('../../assets/garden/flower.png')} style={styles.obj}/>
        </TouchableOpacity>
    
  );
}
export default Flower;

  const styles = StyleSheet.create({
    field:
    {
        ...StyleSheet.absoluteFill,
        width:100, //'20%',
        height: 100,//'15%',
        backgroundColor: 'cyan',
        borderWidth: 2,
        justifyContent: 'center',
    },
    text:{
      textAlign: "center",
    },
    obj:{
       flex: 1,
       width: '150%',
       height: '100%',
    }
  });
  
