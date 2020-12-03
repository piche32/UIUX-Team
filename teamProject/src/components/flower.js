
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View, Pressable, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';



const Flower = (props)=> {
  const x = useSharedValue(props.x);
  const y = useSharedValue(props.y);
  const pressField = () => {
    props.showBag();
    props.setUsedScreen('flower');
    props.setObjIdx(props.idx);
  }

  const panHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
      ctx.dragged = false;
    },
    onActive: (event, ctx) => {
      if(ctx.dragged == false){
        ctx.dragged = true;
      }
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onFinish: (_, ctx)=>{
      if(ctx.dragged == true){
        props.updatePos(props.idx, x.value, y.value);
      }
    },
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: 0,
      top: 0,
      position: 'absolute',
      backgroundColor: 'red',
       transform: [
         {translateX: x.value},
         {translateY: y.value},
         {scale: props.scale},
       ],
      zIndex: 20000,
      
       }
  })

// const onLayout = (event) =>{
//   console.log('event flower: ', event.nativeEvent.layout);
//   const {x, y, width, height} = event.nativeEvent.layout;
//   const w = width*props.scale*0.085;
//   const h = height*props.scale*0.085;
//   const crrX = x - (width-w)/2;
//   const crrY = y - (height-h)/2;
//   console.log(`crrWidth: ${w} crrHeight: ${h} crrX: ${crrX} crrY: ${crrY}`)
//   props.updatePos(props.idx, crrX, crrY);
//   x.value = crrX;
//   y.value = crrY;

// }

  return (
    <PanGestureHandler onGestureEvent={panHandler}>
      <Animated.View style={animatedStyle} >
        <TouchableOpacity onPress={pressField}>
          <Image source={require('../../assets/garden/flower.png')}  />
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>

  );
}
export default Flower;

