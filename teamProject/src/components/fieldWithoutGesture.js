import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Pressable, Text, TouchableOpacity, Image, ActivityIndicatorComponent } from 'react-native';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { DangerZone } from 'expo';
import { Switch } from 'react-native-paper';



const Field = (props) => {

  const pressField = () => {
    {
      props.showBag();
      props.setUsedScreen(props.id);
      props.setObjIdx(props.idx);
      //console.log("Field press props.idx: ", props.idx);
    }
  }

  return (
    <TouchableOpacity onPress={pressField}
      style={{
        //backgroundColor: 'blue',
      }} >
          <Image source={require('../../assets/garden/empty_field.png')}  />

    </TouchableOpacity>
  );
}
export default Field;

