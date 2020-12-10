import React, {useState, useEffect, useLayoutEffect} from 'react';

import {Pressable, StyleSheet, View, ScrollView, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import {DefaultTheme, Text, Modal, Provider as PaperProvider, Portal, Button} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { PanGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';

import SmallBag from '../../assets/SmallBag.svg';
import ItemBG from '../../assets/ItemBG.svg';



const Item = (props) => {
    const backgroundColor = useSharedValue(props.backgroundColor);
    let detail = null;

    const useObject = () => {
        props.hideDetail();
        props.hideBag();
        if(props.useObject == null) return;
        console.log("Bag useObject props: ", props);
          if(props.id == 'seed')  props.useObject(props.objIdx);
    }

    const BTActive = () => {
                        if(props.id != 'seed') 
                            return <Button mode="contained" disabled={true} >사용</Button>
                        else
                         return <Button mode="contained" disabled={false} onPress={useObject}>사용</Button>
                    }

    const pressed = () => {
        if(props.id == 'null') return;
        switch (props.usedScreen) {
            case "main":
                detail = <View>
                    <Text style={{ fontWeight: 'bold' }}>{props.name}</Text>
                    <Text>{props.detail}</Text>
                </View>
                break;
            case "field":
                detail = <View>
                    <Text style={{ fontWeight: 'bold' }}>{props.name}</Text>
                    <Text>{props.detail}</Text>
                    {BTActive()}

                </View>
                break;
            case "flower":
                detail = <View>
                    <Text style={{ fontWeight: 'bold' }}>{props.name}</Text>
                    <Text>{props.detail}</Text>
                </View>
                break;

        }
        props.setDetailObject(detail);
        // console.log(detail);
        if (detail != null)
            props.showDetail();
    }

    const panHandler = useAnimatedGestureHandler({
        onStart: () => {
            backgroundColor.value = '#a0a0a0';//'gainsboro';
        },
        onActive:()=>{
           backgroundColor.value = 'gray';
        },
        onFinish: () => {
            backgroundColor.value = 'gray';
        }
    })

    const animatedStyle = useAnimatedStyle(()=> {
        return {
            //backgroundColor: backgroundColor.value
        }
    })
    return (
        <PanGestureHandler onGestureEvent={panHandler}>
            <Animated.View style={[animatedStyle, {marginHorizontal: '39.8%', borderRadius: 25, }]}>
                <TouchableOpacity onPress={pressed}>
                    <ItemBG style={{...StyleSheet.absoluteFill}}/>
                    {props.icon}
                </TouchableOpacity>
                {detail}
            </Animated.View>
        </PanGestureHandler>
    );
}



const Items = (props) => {
    const [items, setItems] = useState([{
        name: 'Sun Flower Seed',
        id: 'seed',
        icon: <MaterialCommunityIcons name="seed" style={styles.icon} size={styles.icon.width} color="black" />,
        usedScreen: props.usedScreen,
        growTime: 5000,
        detail: "Growing Time: 5s",
        showDetail: props.showDetail,
        setDetailObject: props.setDetailObject,
        hideDetail: props.hideDetail,
        hideBag: props.hideBag,
        active: true,
        useObject: props.useSeed,
    },
    {
        name: 'Fertilizer',
        id: 'fertilizer',
        icon: <Image source={require('../../assets/garden/fertilizer.png')} style={ [styles.icon,{ transform: [{scale: 0.65}]}]}/>,
        usedScreen: props.usedScreen,
        growTime: 5000,
        detail: "Growing Time: 5s",
        showDetail: props.showDetail,
        setDetailObject: props.setDetailObject,
        hideDetail: props.hideDetail,
        hideBag: props.hideBag,
        active: true,
        useObject: null,
    },
    {
        name: 'null',
        id: 'null',
        icon: <View  style={ [styles.icon,{ transform: [{scale: 0.65}]}]}/>,
        usedScreen: props.usedScreen,
        growTime: 5000,
        detail: "Growing Time: 5s",
        showDetail: props.showDetail,
        setDetailObject: props.setDetailObject,
        hideDetail: props.hideDetail,
        hideBag: props.hideBag,
        active: false,
        useObject: null,
    },
    ]);

   /*const setFn = () => {
        let myItems = items;
        myItems.forEach(item =>{
            if(item.id == 'seed'){
                item.useObject = props.useSeed;
            }
            else item.useObject = null;
        });
        setItems(myItems);
    }

useLayoutEffect(()=>{setFn();},[])*/

    let itemsRender=[];
    for(let i = 0; i < items.length; i++){
        let item = items[i];
        itemsRender.push(
            <Item
                name={item.name} id={item.id} key={item.id} icon={item.icon}
                usedScreen={item.usedScreen} index={item.index} 
                growTime={item.growTime}
                detail={item.detail} showDetail={item.showDetail}
                setDetailObject={item.setDetailObject}
                hideDetail={item.hideDetail}
                hideBag={item.hideBag}
                backgroundColor={"gray"}
                useObject={item.useObject}
                objIdx={props.objIdx}

            />);
    }

    return (
    <View key = "itemContainer" style={[styles.list,]}>  
        {itemsRender}
    </View>
    );
}



const CustomBag = (props) => {
    const window = Dimensions.get('screen');
    const x = useSharedValue(window.width*-1);

    const hide = () => {
        x.value=withTiming(window.width*-1, {duration: 300});
        setTimeout(()=>props.hide(), 300);
    }

    useEffect(() => {
        if(props.visible == true) x.value = withTiming(0);
    }, [props.visible]);

    const animatedStyle = useAnimatedStyle( () => {
        return {
            transform: [{translateX: x.value}],
            //backgroundColor: 'red',
            marginVertical: 210,
            zIndex: 10000,
        };
    });

    if (!props.visible) return null;
    return (
    <View style={styles.absoluteContainer}>
        <Pressable style={{
            position: 'absolute' , zIndex: 9999,
        }} onPress={hide}>
            <View style={{
                backgroundColor: "white", opacity:0.4, width: Dimensions.get("window").width,
                height: Dimensions.get("window").height, x: 0, top: 0
            }} />
        </Pressable>
        <Animated.View style={[styles.absoluteContainer, animatedStyle]}>
            <SmallBag width= "100%" height="100%" style={{...StyleSheet.absoluteFill}} />
            <Items style={{position: 'absolute',}}
            usedScreen={props.usedScreen} showDetail={props.showDetail}
                    setDetailObject={props.setDetailObject}
                    hideDetail={props.hideDetail} hideBag={props.hide} useSeed={props.useSeed} objIdx={props.objIdx} />

                    </Animated.View>
    </View>
    );
}

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
export default CustomBag;