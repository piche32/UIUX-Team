import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Pressable, Text, TouchableOpacity, Image, ActivityIndicatorComponent} from 'react-native';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { DangerZone } from 'expo';
import { Switch } from 'react-native-paper';

import ScareCrowSVG from '../../assets/garden/scarecrow.svg'

const ScareCrow = (props) => {

    return(
        <View style = {{...StyleSheet.absoluteFill, position:'absolute'}}>
          <TouchableOpacity onPress={props.funtion}
          style={{width: '10%', height: '10%',backgroundColor: 'transparent',  zIndex: 300, transform: [{translateX: 10}, {translateY: 240}]}}>
        <ScareCrowSVG width = "100%" height = "100%" style={{ paddingTop: 25}} />
        </TouchableOpacity>
        </View>
    );
}

export default ScareCrow;

