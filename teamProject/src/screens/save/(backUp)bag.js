import React, {useState, useEffect, useLayoutEffect} from 'react';

import {Pressable, StyleSheet, View, ScrollView, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import {DefaultTheme, Text, Modal, Provider as PaperProvider, Portal, Button} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { PanGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';





const Item = (props) => {
    const backgroundColor = useSharedValue(props.backgroundColor);
    let detail = null;

    const useObject = () => {
        props.hideDetail();
        props.hideBag();
        if(props.useObject == null) return;
          if(props.id == 'seed')  props.useObject(props.objIdx);
    }

    const BTActive = () => {
                        if(props.id != 'seed') 
                            return <Button mode="contained" disabled={true} >사용</Button>
                        else
                         return <Button mode="contained" disabled={false} onPress={useObject}>사용</Button>
                    }

    const pressed = () => {
        switch(props.usedScreen){
            case "main":
                detail = <View>
                    <Text style={{fontWeight: 'bold'}}>{props.name}</Text>
                    <Text>{props.detail}</Text>
                </View>
                break;
            case "field":
                detail = <View>
                    <Text style={{fontWeight: 'bold'}}>{props.name}</Text>
                    <Text>{props.detail}</Text>
                    {BTActive()}

                </View>
                break;

        }
        props.setDetailObject(detail);
       // console.log(detail);
        if(detail != null)
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
            backgroundColor: backgroundColor.value
        }
    })
    return (
        <PanGestureHandler onGestureEvent={panHandler}>
            <Animated.View style={[animatedStyle, {paddingHorizontal: '2%', paddingVertical: '2%'}]}>
                <TouchableOpacity onPress={pressed}>
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
        icon: <Image source={require('../../assets/garden/fertilizer.png')} style={ styles.icon}/>,
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
    <View key = "itemContainer" style={styles.list}>  
        {itemsRender}
    </View>
    );
}




export default function Bag(props) {
    return (
        <View style={styles.bagList}>
            <Items usedScreen={props.usedScreen} showDetail={props.showDetail}
             setDetailObject={props.setDetailObject}
             hideDetail={props.hideDetail} hideBag={props.hideBag} useSeed={props.useSeed} objIdx={props.objIdx}/>
        </View>
    );
}


const styles = StyleSheet.create({
    bagList: {
        flex: 1,
    },
    list: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection:'row',
        justifyContent: 'space-around',
    },
    item: {
        //flex: 1,
        width: "30%",
        height: Dimensions.get('window').height * 10 / 100,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        marginVertical: Dimensions.get('window').height * 1 / 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: Dimensions.get('screen').width / 6,
        height: Dimensions.get('screen').width / 6,
        
    }
});
