
import { MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import {Text, Avatar} from 'react-native-paper';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

function PlateUI(props){
    const [icon, setIcon] = useState(null);
    useEffect(()=>{
        let myIcon = null;
        if(props.icon == 'money')
        {
            myIcon = <Image source={require("../../assets/money.png")}
            style = {{
                            //backgroundColor: 'red',
                            width: Dimensions.get('screen').width / 15,
                            height: Dimensions.get('screen').height / 25,
                            resizeMode: 'contain',
                        }} />
                        
        }
        setIcon(myIcon);
    },[]);
return(
    <View// style={{backgroundColor: 'purple'}}
    >
        <ImageBackground source={require("../../assets/garden/UI_small_plate.png")}
        style = {{
            width:Dimensions.get('screen').width / 4,
            height: Dimensions.get('screen').height / 20,
            resizeMode: 'contain',
            paddingLeft: '5%',
            paddingTop: '3%',
            flexDirection: 'row',
            justifyContent: 'space-around'
        }}
        >
            {icon}
            <Text style={{
                width: Dimensions.get('screen').width / 4 - Dimensions.get('screen').width / 10,
             height: Dimensions.get('screen').height / 25, textAlign: "center",
              justifyContent: 'center', alignSelf: 'center',
             //backgroundColor: 'blue',
              marginHorizontal: '3%',
             }}>{props.data}</Text>
        </ImageBackground>
    </View>
);
}

function PlateUIBase(props) {
    const [icon, setIcon] = useState(null);
    useEffect(() => {
        let myIcon = null;
        if (props.icon == 'money') {
            myIcon = <Image source={require("../../assets/money.png")}
                style={{
                    //backgroundColor: 'red',
                    width: Dimensions.get('screen').width / 15,
                    height: Dimensions.get('screen').height / 25,
                    resizeMode: 'contain',
                }} />
        }
        else if (props.icon == 'field'){
            myIcon = <Image source={require("../../assets/garden/weeds.png")}
            style={{
                //backgroundColor: 'red',
                left: 0, top: 0, 
                width: '40%', //Dimensions.get('screen').width / 5,
                height: '100%',//Dimensions.get('screen').height / 15,
                resizeMode: 'contain',
                transform:[{scale: 0.7}],
                marginHorizontal: "-6%"
            }} />
        }
        else if(props.icon == 'flower'){
            myIcon = <Image source={require("../../assets/garden/flower_icon.png")}
            style={{
                //backgroundColor: 'red',
                left: 0, top: 0, 
                width: '40%', //Dimensions.get('screen').width / 5,
                height: '100%',//Dimensions.get('screen').height / 15,
                resizeMode: 'contain',
                transform:[{scale: 0.75}],
                marginHorizontal: "-6%"
            }} />
        }
        setIcon(myIcon);
    }, []);

    return (
        <View style={{
            //backgroundColor: 'purple',
             width: Dimensions.get('screen').width / 4.5,
            height: Dimensions.get('screen').height / 20,
            resizeMode: 'contain',
            //paddingLeft: '5%',
            paddingTop: '3%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignSelf:'center',
            alignItems: 'center',
        }}>
        {icon}
            <ImageBackground source={require("../../assets/garden/UI_small_plate_base.png")}
                style={{
                    width: Dimensions.get('screen').width / 6.6,
                    height: Dimensions.get('screen').height / 29,
                    resizeMode: 'contain',
                    //paddingLeft: '5%',
                    //paddingTop: '3%',
                    marginVertical: '2%',
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }}
            >
                <Text style={{
                    width: Dimensions.get('screen').width / 4 - Dimensions.get('screen').width / 10,
                    fontWeight: 'bold',
                    textAlign: "center",
                    justifyContent: 'center', alignSelf: 'center',
                    //backgroundColor: 'blue',
                    marginHorizontal: '3%',
                }}>{props.data}</Text>
            </ImageBackground>
        </View>
    );
}

export default function UI(props) {
    return (
        <View style={{ flex: 1, /*backgroundColor: "red",*/ alignSelf: 'flex-end', }}>
            <ImageBackground source={require("../../assets/garden/plate_bottom.png")} style={{
                flex: 1,
                width: Dimensions.get('screen').width,
                height: Dimensions.get('screen').height / 6.8,
                zIndex: 100000,
                resizeMode: "contain",
                marginBottom: '-1.2%',
            }} >
                <View style={{
                    flex: 4,
                    //flexWrap: 'wrap',
                    flexDirection: 'row',
                   // borderColor: 'gray',
                    //borderWidth: 1,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    padding: "2%",
                }}>
                    <ImageBackground source={require('../../assets/garden/plate_Image.png')}
                    style={{
                        width: Dimensions.get('screen').width / 4.5,
                        height: Dimensions.get('screen').width / 4.5,
                        resizeMode: 'contain',
                        justifyContent: 'center',
                        alignItems: 'center',
                        //backgroundColor: 'blue',
                        
                        //marginHorizontal: '20%',
                }}
                    >
                <Pressable onPress={props.showProfile} >
                  <Avatar.Text size={Dimensions.get('screen').width / 6} label='LV1' style={{ justifyContent: "center" }} />
                </Pressable>
                </ImageBackground>
                    <View style={{ flexWrap: 'wrap', //backgroundColor: 'red',
                     width: Dimensions.get('screen').width / 4.5,
                     height: Dimensions.get('screen').width / 4.5,
                     justifyContent: 'space-around'
                     }}>
                         <PlateUIBase icon ={'money'} data={props.money} />
                         <PlateUIBase icon ={'field'} data={`${props.fieldNum}/${props.fieldMax}`} />
                    </View>
                    <View style={{ flexDirection: 'row', //backgroundColor: 'orange', 
                            width: Dimensions.get('screen').width / 4.5,
                            height: Dimensions.get('screen').width / 4.5,
                     justifyContent: 'space-around', alignItems: 'center' }}>
                         <PlateUIBase icon ={'flower'} data={`${props.flowerNum}/${props.flowerMax}`} />
                    </View>
                    <View style={{ flexDirection: 'row', //backgroundColor: 'orange',
                            width: Dimensions.get('screen').width / 4.5,
                            height: Dimensions.get('screen').width / 4.5,
                     justifyContent: 'space-around', alignItems: 'center'}}>
                        <PlateUIBase icon ={'flower'} data={`${props.flowerNum}/${props.flowerMax}`} />

                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}