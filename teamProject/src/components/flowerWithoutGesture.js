
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {Text, } from 'react-native-paper';
import { StyleSheet, View, Pressable, Image, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { useAnimatedGestureHandler, sequence, repeat, useAnimatedStyle, useSharedValue, withTiming, withRepeat } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Timer from './timer';


const Flower = (props)=> {
  const [image, setImage] = useState(
    <Image source={require('../../assets/garden/flower.png')} style={{ width: 351, height: 249, }} />
  );
  //const growingTime = props.growingTime;
        
        
  const [timerActive, setTimerActive] = useState(true);
  const [timer, setTimer] = useState(props.growingTime);
  const updateTimer = () => {
    if(!timerActive) return;
    setTimer(timer-1);
    console.log("Flower timer: ", timer);
  }

  const [timerText, setTimerText] = useState(timer+"s");
  const [timerColor, setTimerColor] = useState('#fdf5e6e0');

  const pressField = () => {
    if(timer > 0) return;
    props.pickUp(props.idx);
    //props.showBag();
    //props.setUsedScreen('flower');
    //props.setObjIdx(props.idx);
  }

  const rotation = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return{
          transform: [{ translateY: -50 }, { translateX: 28 },{rotateZ: `${rotation.value}deg`},],
    };
  });

  const [active, setActive] = useState(false);

  useEffect(() => {
    setTimerText(timer+'s');
    if (timer <= 0) {
      let myImage = <Image source={require('../../assets/garden/plant.png')} style={{ width: 351, height: 249 }} />
      setImage(myImage);
      setActive(true);
      setTimerActive(false);
      setTimerText("Pick me!");
      setTimerColor('#ffe4b5e0');
      rotation.value = repeat(sequence(
        withTiming(10, {duration: 250}),
        withTiming(-10, {duration: 250}),
        ), 6000, true);
    }
  }, [timer]);

  return (
    <TouchableOpacity onPress={pressField} activeOpacity={active ? 0.2 : 255 } style={{
      //backgroundColor: 'blue',
    }}>
      {image}
      <Timer timer={timer} updateTimer={updateTimer} />
      <Animated.View style={ [{
        width: 300, height: 70, backgroundColor: timerColor,
        position: 'absolute', alignItems: 'center', borderRadius: 15,
      }, animatedStyle]}>
        <Text style={{ fontSize: 50, fontWeight: 'bold' }}> {timerText} </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}
export default Flower;

