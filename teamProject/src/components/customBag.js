import React, {useState, useEffect, useLayoutEffect} from 'react';

import {Pressable, StyleSheet, View, ScrollView, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import {DefaultTheme, Text, Modal, Provider as PaperProvider, Portal, Button} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { PanGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';

import SmallBag from '../../assets/SmallBag.svg';
import ItemBG from '../../assets/ItemBG.svg';



const Item = (props) => {
    const backgroundColor = useSharedValue(props.backgroundColor);
    const [_icon, setIcon] = useState(null);
    const [info, setInfo] = useState(null);
    const [amount, setAmount] = useState(0);
    //const [useFn, setUseFn] = useState(null);
    let detail = null;
    let icon = null;

    const useObject = () => {
        props.hideDetail();
        props.hideBag();
        if (props.useObject == null) return;
        console.log("Bag useObject props: ", props);
        if (props.id == 'seed') {
           // console.log('Item_useObject_amount: ', amount);
            //let myAmount = amount;
            //myAmount--;
            setAmount(amount-1);
            props.updateItems(props.name, -1);
            
            props.useSeed(props.objIdx, info);
        }
    }

    const BTActive = () => {
        if (props.id != 'seed') { return <Button mode="contained" disabled={true} >사용</Button> }
        else {
            console.log('Item_BTActive_useObject: ', props.useObject)
            return <Button mode="contained" disabled={false} onPress={useObject}>사용</Button>
        }
    }

    const pressed = () => {
        if (props.id == 'null') return;
        switch (props.usedScreen) {
            case "main":
            case "shop":
                detail = <View style={styles.detailView}> 
                    <Text style={styles.name}>{props.name}</Text>
                    <Text style={styles.detail}>{info.detail}</Text>
                </View>
                break;
            case "field":
                detail = <View style={styles.detailView}>
                    
                    <Text style={styles.name}>{props.name}</Text>
                    <Text style={styles.detail}>{info.detail}</Text>
                    {BTActive()}

                </View>
                break;
            case "flower":
                detail = <View style={styles.detailView}>
                    
                    <Text style={styles.name}>{props.name}</Text>
                    <Text style={styles.detail}>{info.detail}</Text>
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

    useEffect(() => {

        //setAmount(props.amount);
        //console.log('Item_useEffect_amount: ', amount);

        console.log("Item_useEffect_props: ", props);
        let myItemInfo = props.itemInfos.filter((item) => item.name == props.name);
       // console.log('myItemInfo: ', myItemInfo[0]);
        let myInfo = JSON.parse(JSON.stringify(myItemInfo[0]));
        setInfo(myInfo);
       //console.log("info: ", myInfo);
        switch (props.name) {
            case 'Sun Flower Seed':
                icon = <MaterialCommunityIcons name="seed" style={styles.icon} size={styles.icon.width} color="black" />;
                //setUseFn(props.useSeed);
                break;
            case 'Fertilizer':
        icon = <Image source={require('../../assets/garden/fertilizer.png')} style={ [styles.icon,{ transform: [{scale: 0.65}]}]}/>;
                break;
            case 'Strawberry Seed':
                icon = <MaterialCommunityIcons name="seed" style={styles.icon} size={styles.icon.width} color="#8b0000" />;
                //setUseFn(props.useSeed);
                break;
            default:
                icon = <View style={{width: 100, height: 100}} />;
                break;
        }
        setIcon(icon);

        const _setAmount = async () => {
            let myItems = props.items;
            //await props.readItems();
            //console.log('item_useEffect_[]_myItems: ', myItems, "name: ", props.name);
            let myItem = null;
            if(myItems != null){
                myItem = myItems.filter((item) => item.name == props.name)[0];
                console.log('name: ', props.name);
                //console.log('name: ', props.name, 'item_useEffect_[]_myItem_amount: ', myItem.amount );
                console.log('item_useEffect_[]_myItem: ', myItem);
                if(myItem.amount  == undefined) setAmount('');
                else if(myItem.amount == 0) setAmount('');
                setAmount(myItem.amount);
            }
        };
        _setAmount();
    }, []);



    return (
        <PanGestureHandler onGestureEvent={panHandler}>
            <Animated.View style={[animatedStyle, {marginHorizontal: '39.8%', borderRadius: 25, }]}>
                <TouchableOpacity onPress={pressed}>
                    <ItemBG style={{...StyleSheet.absoluteFill}}/>
                    {amount == 0? <View style={{width: 100, height: 100}} /> : _icon}
                    <Text style={{position: 'absolute', 
                    backgroundColor: '#000000aa', color: 'white', width: 20,
                     textAlign: 'center', borderRadius: 6, transform: [{translateX: 72}, {translateY: 75}]}}>
                         { amount == 0?  "" : amount }</Text>
                </TouchableOpacity>
                {detail}
            </Animated.View>
        </PanGestureHandler>
    );
}

const Items = (props) => {
    // const [items, setItems] = 
    // useState([{
    //     name: 'Sun Flower Seed',
    //     id: 'seed',
    //     amount: 3,
    //     //useObject: props.useSeed,
    // },
    // {
    //     name: 'Fertilizer',
    //     id: 'fertilizer',
    //     amount: 1,
    //  //   useObject: null,
    // },
    // {
    //     name: '',
    //     id: 'null',
    //     amount: 0,
    //   //  useObject: null,
    // },
    // ]);

    const itemInfos =[
        {
            name: '',
            id: 'null',
            key: -1,
           // icon: <View/>,
            detail: "",
            active: false,
        },
         {
        name: 'Sun Flower Seed',
        id: 'seed',
        key: 0,
        cost: 500,
        //icon: <MaterialCommunityIcons name="seed" style={styles.icon} size={styles.icon.width} color="black" />,
        growingTime: 5,
        detail: "Growing Time: 5s",
        active: true,
        
    },
    {
        name: 'Strawberry Seed',
        id: 'seed',
        key: 1,
      //  icon: <MaterialCommunityIcons name="seed" style={styles.icon} size={styles.icon.width} color="red" />,
     //   usedScreen: props.usedScreen,
        growingTime: 10,
        detail: "Growing Time: 10s",
        cost: 1000,
      //  showDetail: props.showDetail,
     //   setDetailObject: props.setDetailObject,
      //  hideDetail: props.hideDetail,
//      hideBag: props.hideBag,
        active: true,
    }, 
    {
        name: 'Fertilizer',
        id: 'fertilizer',
        key: 2,
       // icon: <Image source={require('../../assets/garden/fertilizer.png')} style={ [styles.icon,{ transform: [{scale: 0.65}]}]}/>,
        //usedScreen: props.usedScreen,
      //  growTime: 5000,
        detail: "This is a fertillizer not a seed!!!",
       // showDetail: props.showDetail,
     //   setDetailObject: props.setDetailObject,
     //  hideDetail: props.hideDetail,
     //   hideBag: props.hideBag,
        active: true,
        
    },];

    // const saveItems = async (myItems) => {
    //     try {
    //         const result = await SecureStore.setItemAsync('Items', JSON.stringify(myItems));
    //         // console.log('saveItems_result: ',result);
    //     } catch (e) {
    //         console.log('saveItems_error: ', e);
    //     }
    // }

// const readItems = async () => {
//     const result = await SecureStore.getItemAsync('Items');
//     console.log('readItems_result: ', result);
//     if(result != null) {
//         const json = await JSON.parse(result);
//         console.log('Items_readItems_result_not_null: ', json);
//         return json;
//     }
//     console.log('Items_readItems_result_null');
//      return null;
// }


const updateItems = async (name, value) => {
    if( name == '') return;
    let myItems = props.items;
    console.log('Items_updateItems_items: ', props.items, "name: ", name);  
    let idx = myItems.findIndex((item)=> item.name == name);
    console.log('Items_updateItems_idx: ', idx);
    if(myItems[idx].amount + value == 0){
       let newObj = {
        name: '',
        id: 'null',
        amount: 0,
    };
        myItems.push(newObj);
        myItems.splice(idx, 1);
    }
    else {
        myItems[idx].amount += value;
    }
    
    myItems.sort(function(a, b){
        return a.name > b.name ? -1: a.name < b.name ? 1 : 0;
    });

    props.setItems(myItems);
    //await saveItems(myItems);
}

//console.log('Items_Items: ', items);

const readItemInfos = async () => {
    const result = await SecureStore.getItemAsync('ItemInfos');
   // console.log('readItemInfos_result: ', result);
    if(result != null){
        const json = await JSON.parse(result);
      //  console.log('readItemInfos_json: ', json);
        return json;
    }
    else return null;
}

const saveItemInfos = async () => {
    try{
        const result = await SecureStore.setItemAsync('ItemInfos', JSON.stringify(itemInfos));
      //  console.log("saveItemInfos_result: ", result);
    }catch (e) {
        console.log('saveItemInfos_error: ', e);
    }
}

const clearItems = async () => {
    try{
        await SecureStore.deleteItemAsync('Items');
    }catch(e){
        console.log(e);
    }
}

useEffect(() => {
    //saveItemInfos();
    //clearItems();
    // if(r == null)
    //     {
    //         console.log("Items_useEffect_items: ", items);
    //         saveItems(items);
    //     }
    //saveItems();

// const _readItems = async () => {
//      let r = await readItems();
//     // console.log('Items_useEffect_readItems_result!!!!!!!!!!!!!', r);
//      if(r == null){
//          saveItems(items);
//         console.log('Items_useEffect_saveItem: ', items);
//      }
//      else{
//          setItems(r);
//          console.log('Items_useEffect_r: ', r);
//      }
//     };
//     _readItems();

}, []);

    let itemsRender=[];
    for(let i = 0; i < props.items.length; i++){
        let item = JSON.parse(JSON.stringify(props.items[i]));
       // console.log('Items_itemsRender_item: ', item);
        itemsRender.push(
            <Item
                name={item.name} id={item.id} key={i} //amount={item.amount} //icon={item.icon}
                itemInfos={itemInfos} //setItemInfos={setItemInfos}
                usedScreen={props.usedScreen} //index={item.index} 
                showDetail={props.showDetail}
                setDetailObject={props.setDetailObject}
                hideDetail={props.hideDetail}
                hideBag={props.hideBag}
                //backgroundColor={"gray"}
                useObject={() => {item.id == 'seed' ? props.useSeed : null}}
                useSeed={props.useSeed}
                objIdx={props.objIdx}
                updateItems={updateItems}
                //saveItems={saveItems} readItems={readItems}
                items={props.items}
                //setItems={setItems}
            />);
    }

    return (
    <View key = "itemContainer" style={[styles.list,]}>  
        {itemsRender}
    </View>
    );
}



const CustomBag = (props) => {
    
  const [items, setItems]=useState([{
    name: 'Sun Flower Seed',
    id: 'seed',
    amount: 3,
    //useObject: props.useSeed,
},

{
    name: 'Strawberry Seed',
    id: 'seed',
    amount: 1,
  //  useObject: null,
},
{
    name: 'Fertilizer',
    id: 'fertilizer',
    amount: 1,
 //   useObject: null,
},
]);

    const window = Dimensions.get('screen');
    const x = useSharedValue(window.width * -1);

    const hide = () => {
        x.value = withTiming(window.width * -1, { duration: 300 });
        setTimeout(() => props.hide(), 300);
    }

    useEffect(() => {
        if (props.visible == true) x.value = withTiming(0);
    }, [props.visible]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: x.value }],
            //backgroundColor: 'red',
            marginVertical: 210,
            zIndex: 10000,
        };
    });

    if (!props.visible) return null;
    return (
        <View style={styles.absoluteContainer}>
            <Pressable style={{
                position: 'absolute', zIndex: 9999,
            }} onPress={hide}>
                <View style={{
                    backgroundColor: "white", opacity: 0.4, width: Dimensions.get("window").width,
                    height: Dimensions.get("window").height * 1.2, x: 0, top: 0
                }} />
            </Pressable>
            <Animated.View style={[styles.absoluteContainer, animatedStyle]}>
                <SmallBag width="100%" height="100%" style={{ ...StyleSheet.absoluteFill }} />
                <Items style={{ position: 'absolute', }}
                    usedScreen={props.usedScreen} showDetail={props.showDetail}
                    setDetailObject={props.setDetailObject}

                    items={items} setItems={setItems}
                    hideDetail={props.hideDetail} hideBag={hide} useSeed={props.useSeed} objIdx={props.objIdx} itemInfos={props.itemInfos} setItemInfos={props.setItemInfos} />
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
    name: {
        fontWeight: 'bold',
        fontSize: 30,
        color:'white'
    },
    detail: {
        fontSize: 30,
        color:'white',
        textAlign: 'center'
    },
    detailView: {
        //backgroundColor:'blue',
        alignItems: 'center',
        marginHorizontal: 50,
        transform: [{translateY: -35}]
    }

});
export default CustomBag;