import React, {useState, useEffect} from 'react';

import {Pressable, StyleSheet, View, ScrollView, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import {DefaultTheme, Text, Modal, Provider as PaperProvider, Portal, Button} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';




const Item = (props) => {
    let detail = null;
    const useSeed = () => {
        props.hideDetail();
        props.hideBag();
        addSeed();
        props.readObj();
    }

    const addSeed = async () =>{
        const newSeed = { obj: <View key={"seed"}>
            <Image source={require('../../assets/mushroom.png')}/>
        </View>};
        try{
            await SecureStore.setItemAsync(
                "island", JSON.stringify(newSeed)
            );
        }catch(e){
            console.log(e);
        }
    };


    const pressed = () => {
        console.log(props);
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
                    <Button mode="contained" onPress={useSeed}>사용</Button>
                </View>
                break;

        }
        props.setDetailObject(detail);
        console.log(detail);
        if(detail != null)
            props.showDetail();
    }



    return (
        <View>
            <Pressable style={{ backgroundColor: 'gray' }} onPress={pressed}>
                {props.icon}
            </Pressable>
            {detail}
        </View>
    );
}

const Items = (props) => {
    const [items, setItems] = useState([{
        name: 'Sun Flower Seed',
        key: 'seed',
        icon:  <MaterialCommunityIcons name="seed" size={50} color="black" />,
        usedScreen: props.usedScreen,
        index: 0,
        growTime: 5000,
        detail: "Growing Time: 5s",
        showDetail: props.showDetail,
        setDetailObject: props.setDetailObject,
        hideDetail: props.hideDetail,
        hideBag: props.hideBag,
        readObj: props.readObj,
        }, 
]);


    let itemsRender=[];
    for(let i = 0; i < items.length; i++){
        let item = items[i];

        itemsRender.push(
            <Item
                name={item.name} key={item.key} icon={item.icon}
                usedScreen={item.usedScreen} index={item.index} 
                growTime={item.growTime}
                detail={item.detail} showDetail={item.showDetail}
                setDetailObject={item.setDetailObject}
                hideDetail={item.hideDetail}
                hideBag={item.hideBag}
                readObj={item.readObj}

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
             hideDetail={props.hideDetail} hideBag={props.hideBag} readObj={props.readObj}  />
        </View>
    );
}


const styles = StyleSheet.create({
    bagList: {
        flex: 1,
    },
    list: {
        flex: 1,
        //flexWrap: 'wrap',
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
});
