import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image, Pressable, Dimensions, ImageBackground } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { DefaultTheme, Avatar, Modal, Portal, Provider as PaperProvider, Text } from 'react-native-paper';
import { PanGestureHandler, State, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { set, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store';

export default class Timer extends React.Component {
    constructor(){
        super()

        this.state = {
            count: 0
        }
    }

    componentDidMount() {
        this.interval = setInterval(this.inc, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    inc = () => {
        this.setState(prevState => ({
            count: prevState.count + 1,
        })),
        this.props.updateTimer();
        //console.log("timer inc", this.props.timer);
    }

    render() {
        return (
            <View style={{position:'absolute'}} />
        )
    }
}