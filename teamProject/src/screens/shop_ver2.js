
import React, { useEffect, useState } from 'react';
import { Component } from 'react';
import { StyleSheet, View, Image, Animated, ScrollView, Dimensions, Pressable, ImageBackground } from 'react-native';
import { PanGestureHandler, State, TouchableOpacity } from 'react-native-gesture-handler';
import { ToggleButton, Portal, Button, Modal, Text, Provider as PaperProvider } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import BookBackPlate from '../../assets/garden/BookBackPlate.svg';
import BookInsidePlate from '../../assets/garden/BookInsidePlate.svg';
import ItemBG from '../../assets/ItemBG.svg';
import SvgFlower from '../../assets/garden/flower.svg'; 
import SvgTitle from '../../assets/Title.svg';
import BackButton from '../../assets/BackButton.svg';
import UISmallInsidePlate from '../../assets/UISmallInsidePlate.svg';
import UITitle from '../components/Title';
import SvgBG from '../../assets/garden/ShopBG.svg';
import CustomBag from '../components/customBag';
import SvgMoney from '../../assets/money.svg';
import Detail from '../components/detail';

import SVGPlate from '../../assets/garden/plate_shop.svg';
import SVGFill from '../../assets/garden/fill_shop.svg';
import SVGItemBG from '../../assets/garden/itemBG.svg';
import SVGBT from '../../assets/garden/btPlate.svg';

const UIMoney = (props) => {
  
  return(
  <View style={{ flex:2, zIndex: 9998, flexDirection: 'row', justifyContent:'center', marginLeft: '3%'}}>
  <SvgTitle width="110%" height="110%" style={[styles.svgBG, {transform: [{translateY: -5}]}]} />
  <UISmallInsidePlate width= "60%" height='60%' style={ [styles.svgBG,{transform: [{translateX: 40}, {translateY: 14}]}]}/>
  {props.icon}
  <Text style={{position: 'absolute', fontSize: 18, fontWeight: 'bold', 
  transform: [{translateX: 20}, {translateY: 25}] }}>
    {props.money}</Text>
  </View>
  );
}

const Item = (props) => {
  let text = "";
  let cost = 0;
  
    if(props.text != undefined) text = props.text; 
    if(props.cost != undefined) cost = props.cost; 

  return ( 
    <View style={styles.item}>
    <SVGPlate width='100%' height='100%' style={styles.svgBG}/>
    <SVGFill width='70%' height='70%' style={[styles.svgBG, {transform: [{translateX: 150}, {translateY: 18}]}]}/>
    <SVGItemBG width = '75%' height ='75%' style={[styles.svgBG, {transform: [{translateX: -40}, {translateY: 15}]}]}/>    
  <View style={{//backgroundColor: 'purple', 
  width: 220, height: 80, transform: [{translateX: 50}]}}>
  <Text style={{fontSize: 30}}>{text}</Text>

  <SVGBT width="35%" height= "35%" style ={{position: 'absolute',
  transform: [{translateX: 150}, {translateY: 50}]}}/>
  <TouchableOpacity style={{width: 65, height: 25, //backgroundColor: "cyan",
   transform: [{translateX: 155}, {translateY: 8}], borderRadius: 10}}>
  
  <Text style ={{position: 'absolute', fontSize: 18, textAlign: 'center', 
  width: 65, height: 30, //borderColor: 'cyan', borderWidth: 1, 
  }}>{cost}</Text>
  </TouchableOpacity>  
  </View> 
        </View>
  );
}

const bagModalStyle = {
  backgroundColor: 'white',
  padding: 20,
  height: "70%",
  width: "70%",
  marginLeft: "15%",
};

function List(props) {
let list = null;
  switch (props.name) {
    case 'Flower':
      list=<View style={styles.itemsRow}>
      <Item text={"딸기"} cost={100}/>
      <Item text={"해바라기"} cost={500}/>
      <Item text={"튤립"} cost={1000}/>
      <Item />
    </View>
      break;
      case 'Fertilizer':
      list=<View style={styles.itemsRow}>
      <Item text={"적당한 비료"} cost={1000}/>
      <Item text={"약간 훌륭한 비료"} cost={2000}/>
      <Item text={"훌륭한 비료"} cost={5000}/>
      <Item />
    </View>
      break;
      case 'Upgrade':
      list=<View style={styles.itemsRow}>
      <Item text={"밭 증가"} cost={10000}/>
      <Item />
      <Item />
      <Item />
    </View>
      break;
  
    default:
      break;
  }
  return (
    <ScrollView style={styles.list}>
      {list}
    </ScrollView >
  );
}

const Tab = createBottomTabNavigator();

export default function ShopScene ({navigation}, props) {

    return (
        <Tab.Navigator>
          <Tab.Screen name="Flower" component={ShopScene_flower} options={{tabBarVisible: false}}/>
          <Tab.Screen name="Fertilizer" component={ShopScene_Fertilizer} options={{tabBarVisible: false}}/>
          <Tab.Screen name="Upgrade" component={ShopScene_upgrade} options={{tabBarVisible: false}}/>
        </Tab.Navigator>
    );
}

function ShopScene_flower ({navigation}, props) {
  const [money, setMoney] = useState(0);

  const [detailVisible, setDetailVisible] = useState(false);
  const showDetail = () => setDetailVisible(true);
  const hideDetail = () => setDetailVisible(false);
  
  const [bagVisible, setBagVisible] = useState(false);
  const showBag = () => setBagVisible(true);
  const hideBag = () => setBagVisible(false);
  
  const [detailObject, setDetailObject] = useState(null);
  const [usedScreen, setUsedScreen] = useState(null);
  const [objIdx, setObjIdx] = useState(-1);

  const [flowerSpacies,setFlowerSpacies] = useState(1);
  
  const [category, setCategory] = useState("Flower");
  
  const flowerMax = 50;
  
  const [icon, setIcon] = useState(
      <MaterialCommunityIcons name="flower" size={24} color="black" style={{transform:[{translateX: -5}, {translateY: 25}]}} />
  )

  const goToMain = () => {
    navigation.navigate("Main");
  }
  
  const goToBook = () => {
    navigation.navigate("Book");
  }

  const goToFertilizer = () => {
    navigation.navigate("Fertilizer");
  }
   const goToUpgrade = () => {
    navigation.navigate("Upgrade");
  }
  
  const readMoney = async () => {
    const result = await SecureStore.getItemAsync('Money');
    console.log('readMoney_result: ', result);
    if(result != null) {
      const json = await JSON.parse(result);
      console.log('readMoney_json: ', json);
      return json;
    }
    else return 0;
  }

  const saveMoney = async (myMoney) => {
    try {
      const result = await SecureStore.setItemAsync('Money', JSON.stringify(myMoney));
      console.log('saveMoney_result: ', result);
    } catch (e) {
      console.log('saveMoney_error: ', e);
    }
  }

  useEffect(() => {
    const _readMoney = async () => {
     let myMoney = await readMoney();
     setMoney(myMoney);
    };
    _readMoney();
  },[]);

  useEffect(() => {
    saveMoney(money);
  },[money]);

    return (
      <View style={{flex: 1,}}>
        <SvgBG width={Dimensions.get("window").width} height={Dimensions.get("window").height*1.1} style={[styles.svg,
           {transform: [{translateY: -20}], position: 'absolute'}]}/>
      <View style={styles.mainSceneContainer}>
        <View style={{flex:1, flexDirection: 'row', flexWrap: 'wrap',}}>
          <UIMoney icon={<SvgMoney width= '45%' height= '45%'
           style={{transform: [{translateX: -30}, {translateY: 18}]}}/>}
           readMoney={readMoney} saveMoney={saveMoney} money = {money}/>
          <UITitle text={"상점"}/>
          <TouchableOpacity onPress={goToMain}
          style={{borderRadius: 20, transform: [{translateX: -10}, {translateY: 10}] }}>
            <BackButton width = {60} height = {56} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5}}>
        <TouchableOpacity style={{
            justifyContent: 'center',
          }}
            onPress={() => { 
              showBag();
              setUsedScreen("shop");
                }}>
            <ImageBackground source={require('../../assets/icon_base.png')} style={{
              width: Dimensions.get('screen').width / 10,
              height: Dimensions.get('screen').width / 11,
              transform: [{ scale: 0.95 }],
              justifyContent: 'center',
              alignItems: 'center',
              //paddingBottom: '17%',
            }}>
              <MaterialCommunityIcons name="bag-personal" size={28} color='#A14326' />
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity style={{
              // borderWidth: 1,
              justifyContent: 'center',
            }}
              onPress={() => { goToBook }}>
              <ImageBackground source={require('../../assets/icon_base.png')} style={{
                width: Dimensions.get('screen').width / 10,
                height: Dimensions.get('screen').width / 11,
                transform: [{ scale: 0.94 }],
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: '14%',
                marginTop: '5%',
              }}>
                <MaterialCommunityIcons name="book-multiple" size={28} color="#A14326"
                  onPress={goToBook}
                  style={{
                    // marginTop: '10%'
                  }} />
              </ImageBackground>
            </TouchableOpacity>
            </View>
        <View style={{ flex: 7}}>
          
          <List name={"Flower"} />
          <View style={{ flexDirection: 'row' }}>
            <Button style={styles.selected} color='#F78C1F' mode="contained" labelStyle={{fontSize: 17}}
            
            >FLOWER</Button>
            <Button style={{ flex: 1 }} color='#FAD3A6'  mode="contained" disabled = {false} labelStyle={{fontSize: 17}}
            onPress={goToFertilizer}
            >FERTILIZER</Button>
            <Button style={{ flex: 1}} color='#FAD3A6' mode="contained" disabled = {false} labelStyle={{fontSize: 17}}
            onPress={goToUpgrade}
            >UPGRADE</Button>
          </View>
        </View>
      </View>
      <CustomBag visible={bagVisible} hide={hideBag}
          usedScreen={'shop'} showDetail={showDetail}
          setDetailObject={setDetailObject}
          hideDetail={hideDetail}
          objIdx={objIdx}
          //itemInfos={itemInfos} setItemInfos={setItemInfos}
          />
          <Detail visible={detailVisible} hide={hideDetail} detailObject={detailObject} />
      </View>
    );

}
function ShopScene_Fertilizer ({navigation}, props) {
  const [money, setMoney] = useState(0);

  const [detailVisible, setDetailVisible] = useState(false);
  const showDetail = () => setDetailVisible(true);
  const hideDetail = () => setDetailVisible(false);
  
  const [bagVisible, setBagVisible] = useState(false);
  const showBag = () => setBagVisible(true);
  const hideBag = () => setBagVisible(false);
  
  const [detailObject, setDetailObject] = useState(null);
  const [usedScreen, setUsedScreen] = useState(null);
  const [objIdx, setObjIdx] = useState(-1);

  const [flowerSpacies,setFlowerSpacies] = useState(1);
  
  const [category, setCategory] = useState("Flower");
  
  const flowerMax = 50;
  
  const [icon, setIcon] = useState(
      <MaterialCommunityIcons name="flower" size={24} color="black" style={{transform:[{translateX: -5}, {translateY: 25}]}} />
  )

  const goToMain = () => {
    navigation.navigate("Main");
  }
  
  const goToBook = () => {
    navigation.navigate("Book");
  }
  
  const readMoney = async () => {
    const result = await SecureStore.getItemAsync('Money');
    console.log('readMoney_result: ', result);
    if(result != null) {
      const json = await JSON.parse(result);
      console.log('readMoney_json: ', json);
      return json;
    }
    else return 0;
  }

  const saveMoney = async (myMoney) => {
    try {
      const result = await SecureStore.setItemAsync('Money', JSON.stringify(myMoney));
      console.log('saveMoney_result: ', result);
    } catch (e) {
      console.log('saveMoney_error: ', e);
    }
  }

  useEffect(() => {
    const _readMoney = async () => {
     let myMoney = await readMoney();
     setMoney(myMoney);
    };
    _readMoney();
  },[]);

  useEffect(() => {
    saveMoney(money);
  },[money]);

  const goToFlower= () => {
    navigation.navigate("Flower");
  }
   const goToUpgrade = () => {
    navigation.navigate("Upgrade");
  }

    return (
      <View style={{flex: 1,}}>
        <SvgBG width={Dimensions.get("window").width} height={Dimensions.get("window").height*1.1} style={[styles.svg,
           {transform: [{translateY: -20}], position: 'absolute'}]}/>
      <View style={styles.mainSceneContainer}>
        <View style={{flex:1, flexDirection: 'row', flexWrap: 'wrap',}}>
          <UIMoney icon={<SvgMoney width= '45%' height= '45%'
           style={{transform: [{translateX: -30}, {translateY: 18}]}}/>}
           readMoney={readMoney} saveMoney={saveMoney} money = {money}/>
          <UITitle text={"상점"}/>
          <TouchableOpacity onPress={goToMain}
          style={{borderRadius: 20, transform: [{translateX: -10}, {translateY: 10}] }}>
            <BackButton width = {60} height = {56} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5}}>
        <TouchableOpacity style={{
            justifyContent: 'center',
          }}
            onPress={() => { 
              showBag();
              setUsedScreen("shop");
                }}>
            <ImageBackground source={require('../../assets/icon_base.png')} style={{
              width: Dimensions.get('screen').width / 10,
              height: Dimensions.get('screen').width / 11,
              transform: [{ scale: 0.95 }],
              justifyContent: 'center',
              alignItems: 'center',
              //paddingBottom: '17%',
            }}>
              <MaterialCommunityIcons name="bag-personal" size={28} color='#A14326' />
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity style={{
              // borderWidth: 1,
              justifyContent: 'center',
            }}
              onPress={() => { goToBook }}>
              <ImageBackground source={require('../../assets/icon_base.png')} style={{
                width: Dimensions.get('screen').width / 10,
                height: Dimensions.get('screen').width / 11,
                transform: [{ scale: 0.94 }],
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: '14%',
                marginTop: '5%',
              }}>
                <MaterialCommunityIcons name="book-multiple" size={28} color="#A14326"
                  onPress={goToBook}
                  style={{
                    // marginTop: '10%'
                  }} />
              </ImageBackground>
            </TouchableOpacity>
            </View>
        <View style={{ flex: 7,  }}>
          <List name={"Fertilizer"} />
           <View style={{ flexDirection: 'row' }}>
          <Button style={styles.selected} color='#FAD3A6' mode="contained" labelStyle={{fontSize: 17}}
            onPress={goToFlower}
            >FLOWER</Button>
            <Button style={{ flex: 1 }} color='#F78C1F' mode="contained" disabled = {false} labelStyle={{fontSize: 17}}
            
            >FERTILIZER</Button>
            <Button style={{ flex: 1 }} color='#FAD3A6' mode="contained" disabled = {false} labelStyle={{fontSize: 17}}
            onPress={goToUpgrade}
            >UPGRADE</Button>
          </View>
        </View>
      </View>
      <CustomBag visible={bagVisible} hide={hideBag}
          usedScreen={'shop'} showDetail={showDetail}
          setDetailObject={setDetailObject}
          hideDetail={hideDetail}
          objIdx={objIdx}
          //itemInfos={itemInfos} setItemInfos={setItemInfos}
          />
          <Detail visible={detailVisible} hide={hideDetail} detailObject={detailObject} />
      </View>
    );

}

function ShopScene_upgrade ({navigation}, props) {
  const [money, setMoney] = useState(0);

  const [detailVisible, setDetailVisible] = useState(false);
  const showDetail = () => setDetailVisible(true);
  const hideDetail = () => setDetailVisible(false);
  
  const [bagVisible, setBagVisible] = useState(false);
  const showBag = () => setBagVisible(true);
  const hideBag = () => setBagVisible(false);
  
  const [detailObject, setDetailObject] = useState(null);
  const [usedScreen, setUsedScreen] = useState(null);
  const [objIdx, setObjIdx] = useState(-1);

  const [flowerSpacies,setFlowerSpacies] = useState(1);
  
  const [category, setCategory] = useState("Flower");
  
  const flowerMax = 50;
  
  const [icon, setIcon] = useState(
      <MaterialCommunityIcons name="flower" size={24} color="black" style={{transform:[{translateX: -5}, {translateY: 25}]}} />
  )

  const goToMain = () => {
    navigation.navigate("Main");
  }
  
  const goToBook = () => {
    navigation.navigate("Book");
  }
  
  const goToFlower= () => {
    navigation.navigate("Flower");
  }
   const goToFertilizer = () => {
    navigation.navigate("Fertilizer");
  }


  const readMoney = async () => {
    const result = await SecureStore.getItemAsync('Money');
    console.log('readMoney_result: ', result);
    if(result != null) {
      const json = await JSON.parse(result);
      console.log('readMoney_json: ', json);
      return json;
    }
    else return 0;
  }

  const saveMoney = async (myMoney) => {
    try {
      const result = await SecureStore.setItemAsync('Money', JSON.stringify(myMoney));
      console.log('saveMoney_result: ', result);
    } catch (e) {
      console.log('saveMoney_error: ', e);
    }
  }

  useEffect(() => {
    const _readMoney = async () => {
     let myMoney = await readMoney();
     setMoney(myMoney);
    };
    _readMoney();
  },[]);

  useEffect(() => {
    saveMoney(money);
  },[money]);

    return (
      <View style={{flex: 1,}}>
        <SvgBG width={Dimensions.get("window").width} height={Dimensions.get("window").height*1.1} style={[styles.svg,
           {transform: [{translateY: -20}], position: 'absolute'}]}/>
      <View style={styles.mainSceneContainer}>
        <View style={{flex:1, flexDirection: 'row', flexWrap: 'wrap',}}>
          <UIMoney icon={<SvgMoney width= '45%' height= '45%'
           style={{transform: [{translateX: -30}, {translateY: 18}]}}/>}
           readMoney={readMoney} saveMoney={saveMoney} money = {money}/>
          <UITitle text={"상점"}/>
          <TouchableOpacity onPress={goToMain}
          style={{borderRadius: 20, transform: [{translateX: -10}, {translateY: 10}] }}>
            <BackButton width = {60} height = {56} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5}}>
        <TouchableOpacity style={{
            justifyContent: 'center',
          }}
            onPress={() => { 
              showBag();
              setUsedScreen("shop");
                }}>
            <ImageBackground source={require('../../assets/icon_base.png')} style={{
              width: Dimensions.get('screen').width / 10,
              height: Dimensions.get('screen').width / 11,
              transform: [{ scale: 0.95 }],
              justifyContent: 'center',
              alignItems: 'center',
              //paddingBottom: '17%',
            }}>
              <MaterialCommunityIcons name="bag-personal" size={28} color='#A14326' />
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity style={{
              // borderWidth: 1,
              justifyContent: 'center',
            }}
              onPress={() => { goToBook }}>
              <ImageBackground source={require('../../assets/icon_base.png')} style={{
                width: Dimensions.get('screen').width / 10,
                height: Dimensions.get('screen').width / 11,
                transform: [{ scale: 0.94 }],
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: '14%',
                marginTop: '5%',
              }}>
                <MaterialCommunityIcons name="book-multiple" size={28} color="#A14326"
                  onPress={goToBook}
                  style={{
                    // marginTop: '10%'
                  }} />
              </ImageBackground>
            </TouchableOpacity>
            </View>
        <View style={{ flex: 7,  }}>
          <List name={"Upgrade"} />
           <View style={{ flexDirection: 'row' }}>
          <Button style={styles.selected} color='#FAD3A6' mode="contained" labelStyle={{fontSize: 17}}
            onPress={goToFlower}
            >FLOWER</Button>
            <Button style={styles.selected} color='#FAD3A6' mode="contained" disabled = {false} labelStyle={{fontSize: 17}}
            onPress={goToFertilizer}
            >FERTILIZER</Button>
            <Button style={styles.selected} color='#F78C1F' mode="contained" disabled = {false} labelStyle={{fontSize: 17}}
            
            >UPGRADE</Button>
          </View>
        </View>
      </View>
      <CustomBag visible={bagVisible} hide={hideBag}
          usedScreen={'shop'} showDetail={showDetail}
          setDetailObject={setDetailObject}
          hideDetail={hideDetail}
          objIdx={objIdx}
          //itemInfos={itemInfos} setItemInfos={setItemInfos}
          />
          <Detail visible={detailVisible} hide={hideDetail} detailObject={detailObject} />
      </View>
    );

}
const styles = StyleSheet.create({
  mainSceneContainer: {
    marginTop: '6%',
    flex: 1,

  },

  svgBG: {
    ...StyleSheet.absoluteFill,
  },

  flowerList: {
    flex: 1,
    backgroundColor: '#fff',

  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  list: {
    flex: 1,
    //backgroundColor: 'gray',
    marginHorizontal: '3%',
    marginVertical: '5%',
    flexWrap: 'wrap',
    borderRadius: 20,
    //alignItems: 'center',
    //justifyContent: 'space-around',
  },
  item: {
    //flex: 1,
    width: Dimensions.get('window').height ,
    height: Dimensions.get('window').height * 20 / 100,
    alignSelf: 'center',
    //backgroundColor: 'white',
    //borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2%'
  },
  itemImage: {
    //marginHorizontal: '5%',
    width: '35%',
    height: '70%',
  },
  itemTexts: {
    flex: 1,
    //borderWidth: 1,
    width: '70%',
    right: '3%',
  },
  itemText: {
    fontSize: Dimensions.get('window').width * 5 / 100,
  },
  itemFlower:{
    marginHorizontal: '13%',
  },
  itemsRow:{
    flexDirection: 'row',
     flexWrap: 'wrap',
      justifyContent: 'space-evenly',
  },
  selected: {
    flex:1, 
    shadowOffset:{
      width: 5,
      height: 5,
    }
  },
  unselected:{
    flex:1, 

  }
});
