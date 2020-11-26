
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';



const Field = (props)=> {
 
  const pressField = () => {
    props.showBag();
    props.setUsedScreen('field');
    props.setObjIdx(props.idx);
  }
  return(
      <Pressable onPress = {pressField} style = {{...StyleSheet.absoluteFill, justifyContent: 'center'}}>
        <Text style={styles.text}>{props.id}</Text>
        </Pressable>
    
  );
}
export default Field;

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
    }
  });
  
