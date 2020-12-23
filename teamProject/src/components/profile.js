import React, {useState, useEffect, useLayoutEffect} from 'react';

import {Pressable, StyleSheet, View, ScrollView, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import {DefaultTheme, Text, Title, Modal, Provider as PaperProvider, Portal, Button, ProgressBar} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { PanGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';

import SmallBag from '../../assets/SmallBag.svg';
import ItemBG from '../../assets/ItemBG.svg';
import { Profiler } from 'react';
import Plate_modal from '../../assets/MediumPlateBG.svg'
import InsidePlate from '../../assets/garden/BookInsidePlate.svg';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Profile = (props) => {
    const window = Dimensions.get('screen');
    const x = useSharedValue(window.width*-1);
    
    const hide =() => {
        x.value = withTiming(window.width*-1, {duration: 300});
        setTimeout(() => props.hide(), 300);
    }

    useEffect(() => {
        if(props.visible == true) x.value = withTiming(0);
    },[props.visible]);


    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateX: x.value}],
            marginVertical:120,
            marginBottom: 220,
            marginHorizontal:20,
            zIndex: 10000,
        };
    });

    if(!props.visible) return null;
    return (
        <View style = {styles.absoluteContainer}>
             <Pressable style={{
            position: 'absolute' , zIndex: 9999,
        }} onPress={hide}>
            <View style={{
                backgroundColor: "white", opacity:0.4, width: Dimensions.get("window").width,
                height: Dimensions.get("window").height*1.2, x: 0, top: 0
            }} />
        </Pressable>
            <Animated.View style = {[styles.absoluteContainer, animatedStyle]}>
                <Plate_modal height = "100%" style={{...StyleSheet.absoluteFill}}/>
                <InsidePlate width = '80%' height =" 90%"  style={{...StyleSheet.absoluteFill, marginLeft: 40, marginTop: 50}}/>
                    <Title style={{fontSize: 70, color: 'black', fontWeight: 'bold', fontStyle: 'italic', 
             marginTop: 15, height:120, alignSelf: 'center', textAlignVertical: 'center',}}>PROFILE</Title>
             <View style={{ width: window.width*0.65, height: window.width*0.47, marginLeft: 55, marginTop: -35}}>
            <Text style={styles.text}>LV 1</Text>
            <ProgressBar progress = {0.75} color='#FFBF1B' style={{borderWidth:1, height: '25%', marginVertical: '1%', backgroundColor: 'white' }} /> 
            <View style={{marginTop: -30}}>
            <Text style={styles.text}>성장속도 100%</Text>
             <Text style={styles.text}>추가 수입 0</Text>
             <Text style={styles.text}>최대 밭 갯수 5</Text>
             <Text style={styles.text}>수집한 곤충 수 2</Text>
            <Text style={styles.text}>수집한 식물 수 5</Text>
            </View>
                </View >
             </Animated.View>
        </View>    
    );
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent"
    },
    absoluteContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    text:{
        fontSize: 20, color: 'white', fontWeight: 'bold', 
        textAlignVertical: 'center',
    },
    box: {
        width: 80,
        height: 80,
        backgroundColor: "blue",
    },
    commandText: {
        flex:1,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white'
    },
    border: {
        borderColor: 'yellow',
        borderWidth: 10,
        borderStyle: 'dashed',
    },
    icon: {
        width: Dimensions.get('screen').width/4 ,
        height: Dimensions.get('screen').width /4,
        
    },
    list: {
        flex: 1,
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: '14%',
        marginHorizontal:'4%',
        transform: [{translateY: 35}],
    },
});