import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image, Pressable, Dimensions, AsyncStorage } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DefaultTheme, Avatar, Modal, Portal, Provider as PaperProvider, Text, Button } from 'react-native-paper';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { PanGestureHandler, State, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { sequence, useAnimatedGestureHandler, repeat, useAnimatedStyle, useSharedValue,
     withRepeat, withTiming, Easing } from 'react-native-reanimated';

export default function Cloud(props) {
    const x = useSharedValue(props.x);
    //const y = useSharedValue(props.y);
    const [active, setActive] = useState(false);
    const [offsetValue, setOffsetValue] = useState(700);

    useEffect(() => {
        if(active != true) return;
        move();
        onTap();
    }, [active]);

    useEffect(() => {
        if(props.offsetX != null)
             setOffsetValue(props.offsetX);
        onTap();
    }, [])
    
    useEffect(() => {
        if(props.timer % props.duration == 0)
            setActive(true);
    },[props.timer])

    const move = () => {
        if(x.value > 300){
            x.value = -300;
        } 
        x.value = withTiming(offsetValue, {duration: 8000, });
        // setTimeout(() => {
        //     onTap();
        // }, 7000);
    }

    const onTap = () => {
        setActive(!active);
    }
    
    const animatedStyle = useAnimatedStyle(() => {
        return {
            left: props.x,
            top: props.y,
            width: 91*props.width,
            height: 61*props.height,
            position: 'absolute',
            zIndex: -2,
            transform: [
                {translateX: x.value},
                //{translateY: y.value},
            ]
        }
    });

    return (
            <Animated.View style={animatedStyle}>
                <TouchableOpacity>
                <Image source={require("../../assets/garden/clouds.png")} style={{
                    width: 91 * props.width,
                    height: 61 * props.height
                }} />
                </TouchableOpacity>
            </Animated.View>
        
    );
}
