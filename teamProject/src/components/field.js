import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Pressable, Text, TouchableOpacity, Image, ActivityIndicatorComponent} from 'react-native';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { DangerZone } from 'expo';
import { Switch } from 'react-native-paper';



const Field = (props)=> {
  const x = useSharedValue(props.x);
  const y = useSharedValue(props.y);
 const [isEmpty, setEmpty] = useState(true);
  const pressField = () => {
    {props.showBag();
    props.setUsedScreen('field');
    props.setObjIdx(props.idx);
  }
}

const testRef = React.createRef();
//console.log("testRef: ", testRef);
const [comp, setComp] = useState(null);

const initComp = () => {
  let myComp = null;
  switch(props.id){
    case 'field':
      myComp =
        <Image source={require('../../assets/garden/empty_field.png')} />
      break;
    case 'flower':
      myComp=
       <Image source={require('../../assets/garden/flower.png')} />
       console.log("flower loding");
       break;
  }
  setComp(myComp);
}

useEffect(() => {
    initComp();
},[]);

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
    onFinish: (_, ctx) => {
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
      zIndex: 100,
       }
  })


  return(

    <PanGestureHandler onGestureEvent={panHandler} >
    <Animated.View style={animatedStyle} >    
    <TouchableOpacity onPress = {pressField} style={{backgroundColor: 'purple'}} >
      {comp}
       </TouchableOpacity>
    </Animated.View>
    </PanGestureHandler>
      
    
  );
}
export default Field;

