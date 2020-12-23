import React, { useState, useRef, useEffect, } from 'react';
import { StyleSheet, View, ScrollView, Image, Pressable, Dimensions, ImageBackground } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { DefaultTheme, Avatar, Modal, Title, Portal, Provider as PaperProvider, Text } from 'react-native-paper';
import { PanGestureHandler, State, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { set, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store';


import FieldWithoutGesture from '../components/fieldWithoutGesture';
import FlowerWithoutGesture from '../components/flowerWithoutGesture';

import Plate_modal from '../../assets/MediumPlateBG.svg'
import InsidePlate from '../../assets/garden/BookInsidePlate.svg';


import Setting from '../components/setting_ver2';
import Cloud from '../components/cloud';
import UI from '../components/UI';
import Timer from '../components/timer';
import CustomBag from '../components/customBag';
import Profile from '../components/profile';
import ScareCrow from '../components/scarecrow';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'orange',
    accent: 'green',
  },
}

const detailModalStyle = {
  backgroundColor: 'white',
  padding: 20,
  height: "50%",
  width: "50%",
  marginLeft: "25%",
};

const MyObj = (props) => {
  const [comp, setComp] = useState(null);

  const initComp = () => {
    let myComp = null;
    switch (props.object.id) {
      case 'field':
        myComp = <FieldWithoutGesture idx={props.object.idx} id={props.object.id}
          x={props.object.x}
          y={props.object.y}
          scale={props.object.scale}
          showBag={props.showBag} setUsedScreen={props.setUsedScreen}

          updatePos={props.updatePos} setObjIdx={props.setObjIdx}
          key={props.idx}
        />
        break;

      case 'flower':
        myComp = <FlowerWithoutGesture idx={props.object.idx} id={'flower'}
          x={props.object.x}
          y={props.object.y}
          scale={props.object.scale}
          showBag={props.showBag} setUsedScreen={props.setUsedScreen}
          updatePos={props.updatePos} setObjIdx={props.setObjIdx}

          key={props.idx} pickUp={props.pickUp}
          growingTime={props.object.growingTime} value={props.object.value}
        />
        break;


    }
    console.log("initComp myComp: ", myComp);
    setComp(myComp);
  };

  useEffect(() => {
    console.log("myObj: called once");
    initComp();
  }, []);

  // useEffect(() => {
  //   console.log("Island: ", props.island);
  // }, [props.island]);

  return (
    <View style={{
      position: 'absolute', //backgroundColor: 'red',
      // x: props.object.x, y: props.object.y, 
      zIndex: props.object.y,
      transform: [{ translateX: props.object.x }, { translateY: props.object.y }, { scale: props.object.scale }]
    }}>
      {comp}
    </View>


  );
}

const Island = (props) => {
  // const [island, setIsland] = useState([
  //   {
  //     idx: 0, 
  //     x: Dimensions.get('screen').width * 2 / 5, 
  //     y: Dimensions.get('screen').height * 2 / 5,
  //     id: 'field',
  //   },
  // ]);

  //   const getData = async () => {
  //     const result = await SecureStore.getItemAsync('Island');
  //     console.log("island getData: result", result);
  //     if (result != null) {
  //       const json = await JSON.parse(result);
  //       console.log("Island useEffect json", json, "\n result: ", result);
  //       setIsland(json);
  //     }
  //    // else setData();
  //   };

  //   const updatePos = async (idx, x, y) =>{
  //     await getData();//데이터 불러오기(저장된 값)
  //     let myIsland = JSON.parse(JSON.stringify(island));
  //     myIsland = myIsland.map((item) => item.idx === idx ? {...item, x: x, y: y}: item);
  //     console.log(myIsland);
  //     SecureStore.setItemAsync('Island', JSON.stringify(myIsland));
  //     setIsland(myIsland);
  //     //데이터 저장하기
  //   };

  //   const setData = async () => {
  //     const result = await SecureStore.getItemAsync('Island', JSON.stringify(island));
  //     console.log("result", result);
  //   };

  //   const deleteData = async () => {
  //     await SecureStore.deleteItemAsync('Island');
  //   }

  // console.log("island: ", island);

  //   useEffect(() => {
  // //    deleteData('Island');
  //     console.log("called once");
  //  //   setData();
  //     getData();
  //   }, []);

  //   let islandRender = [];
  //   for(let i = 0; i < island.length; i++) {
  //     let item = island[i];
  //     //console.log("item: ", item);
  //     islandRender.push(<MyObj key={item.idx} object={item}
  //       showBag={props.showBag}
  //       setUsedScreen={props.setUsedScreen}
  //       updatePos={updatePos} setObjIdx={props.setObjIdx}/>);
  //     }

  //   return <View key='islandContainer'
  //     style={{ flex: 1, position: 'absolute' }}>
  //       {islandRender}
  //     </View>

  const getData = async () => {
    const result = await SecureStore.getItemAsync('Island');
    console.log("island getData: result", result);
    if (result != null) {
      const json = await JSON.parse(result);
      console.log("Island useEffect json", json, "\n result: ", result);
      props.setIsland(json);
    }
    // else setData();
  };

  // const updatePos = async (idx, x, y) =>{
  //   await getData();//데이터 불러오기(저장된 값)
  //   let myIsland = JSON.parse(JSON.stringify(props.island));
  //   myIsland = myIsland.map((item) => item.idx === idx ? {...item, x: x, y: y}: item);
  //   console.log(myIsland);
  //   SecureStore.setItemAsync('Island', JSON.stringify(myIsland));
  //   props.setIsland(myIsland);
  //   const result = await SecureStore.getItemAsync('Island', JSON.stringify(props.island));

  //   //setData();//데이터 저장하기
  // };

  const setData = async () => {
    const result = await SecureStore.getItemAsync('Island', JSON.stringify(props.island));
    console.log("result", result);
  };

  const deleteData = async () => {
    await SecureStore.deleteItemAsync('Island');
  }

  //console.log("island: ", props.island);

  useEffect(() => {
    //  deleteData('Island');
    //  console.log("called once");
    // setData();
    //  getData();
  }, []);

  let islandRender = [];
  for (let i = 0; i < props.island.length; i++) {
    let item = props.island[i];
    //console.log("item: ", item);
    islandRender.push(<MyObj key={item.idx} object={item}
      showBag={props.showBag} pickUp={props.pickUp}
      setUsedScreen={props.setUsedScreen}
      updatePos={props.updatePos} setObjIdx={props.setObjIdx} />
    );
  }

  return <View key='islandContainer'
    style={{ position: 'absolute', }}>
    {islandRender}
  </View>
}

export default function MainScene({ navigation, route }) {
  const [island, setIsland] = useState([
    {
      idx: 0,
      x: 32,
      y: 110,
      id: 'field',
      scale: 0.3,
      active: true,
      isEmpty: true,
    },
    {
      idx: 1,
      x: -76,
      y: 185,
      id: 'field',
      scale: 0.3,
      active: true,
      isEmpty: true,
    },
    {
      idx: 2,
      x: 140,
      y: 185,
      id: 'field',
      scale: 0.3,
      active: true,
      isEmpty: true,
    },
    {
      idx: 3,
      x: 32,
      y: 260,
      id: 'field',
      scale: 0.3,
      active: true,
      isEmpty: true,
    },
    {
      idx: 4,
      x: 32,
      y: 185,
      id: 'field',
      scale: 0.3,
      active: true,
      isEmpty: true,
    },
  ]);

  //const [itemInfos, setItemInfos] = useState(null);

  const [profileVisible, setProfileVisible] = useState(false);
  const showProfile = () => setProfileVisible(true);
  const hideProfile = () => setProfileVisible(false);

  const [settingVisible, setSettingVisible] = useState(false);
  const showSetting = () => setSettingVisible(true);
  const hideSetting = () => setSettingVisible(false);

  const [bagVisible, setBagVisible] = useState(false);
  const showBag = () => setBagVisible(true);
  const hideBag = () => setBagVisible(false);

  const [detailVisible, setDetailVisible] = useState(false);
  const showDetail = () => setDetailVisible(true);
  const hideDetail = () => setDetailVisible(false);

  const [money, setMoneyValue] = useState(0);
  const [flowerNum, setFlowerValue] = useState(1);
  const [flowerMax, setFlowerMaxValue] = useState(50);
  const [fieldNum, setFieldValue] = useState(0);
  const [fieldMax, setFieldMaxValue] = useState(5);
  const [flowerSpace, setFlowerSpace] = useState(0);
  const [bugSpace, setBugSpace] = useState(0);
  const bugMax = 50;

  const [detailObject, setDetailObject] = useState(null);
  const [usedScreen, setUsedScreen] = useState(null);
  const [objIdx, setObjIdx] = useState(-1);

  const [mainTimer, setTimer] = useState(0);
  const updateMainTimer = () => {
    setTimer(mainTimer + 1);
  }

  const drawerBook = () => {
    navigation.navigate("Book");
  }
  const goToShop = () => {
    navigation.navigate("Shop");
  }
  const goToMain = () => {
    navigation.navigate("Title");
  }
  const goToMini = () => {
    navigation.navigate("MiniGame");
  }

  const updatePos = (idx, x, y) => {
    //await getData();//데이터 불러오기(저장된 값)
    let myIsland = island;
    myIsland = myIsland.map((item) => item.idx === idx ? { ...item, x: x, y: y } : item);
    console.log(myIsland);
    //SecureStore.setItemAsync('Island', JSON.stringify(myIsland));
    setIsland(myIsland);
    // const result =  SecureStore.getItemAsync('Island', JSON.stringify(props.island));

    //setData();//데이터 저장하기
  };

  const useSeed = async (idx, info) => {
    let myIsland = island;
    //console.log('useSeed last item: ', myIsland[myIsland.length - 1]);
    let myItem = island.filter((item) => item.idx === idx);
    //console.log('useSeed myItem: ', myItem);
    let newObj = {
      idx: myIsland[myIsland.length - 1].idx + 1,
      x: myItem[0].x - 2,
      y: myItem[0].y - 23,
      scale: 0.3,
      value: info.cost,
      growingTime: info.growingTime,
      id: 'flower',
    };

    //console.log("useSeed newObj: ", newObj);
    myIsland.push(newObj);
    let myFieldNum = await readFieldNum();
    console.log("useSeed_FieldNum: ",myFieldNum, fieldNum);
    myFieldNum++;
    setFieldValue(myFieldNum);
    saveFieldNum(myFieldNum);
    for (let i = 0; i < myIsland.length; i++) {
      if (myIsland[i].idx == idx) {
        let obj = myIsland.splice(i, 1);
        //console.log("useSeed delete Obj: ", obj);
        break;
      }
    }
    setIsland(myIsland);
   // console.log("useSeed myIsland: ", myIsland);
  }

  const readMoney = async () => {
    const result = await SecureStore.getItemAsync('Money');
    //console.log("readMoney_result: ", result);
    if(result != null) {
      const json = await JSON.parse(result);
     // console.log("readMoney_json: ", json);
      setMoneyValue(json);
      return json;
    }
    else return 0;
  }

  const saveMoney = async (myMoney) => {
    try {
      let _myMoneyString = JSON.stringify(myMoney);
      //console.log('saveMoney_myMoneyString: ', _myMoneyString, typeof(_myMoneyString));
      const result = await SecureStore.setItemAsync('Money', _myMoneyString);
      //console.log("saveMoney_result: ", result);
    } catch (e) {
         console.log('saveMoney_error: ', e);
    }
  }

  const readFieldNum = async () => {
    const result = await SecureStore.getItemAsync('FieldNum');
  //  console.log("readMoney_result: ", result);
    if(result != null){
      const json = await JSON.parse(result);
    //  console.log("readMoney_json: ", json);
      setFieldValue(json);
      return json;
    }
    else return 0;
  }

  const saveFieldNum = async (myFieldNum) => {
    try {
      const result = await SecureStore.setItemAsync('FieldNum', JSON.stringify(myFieldNum));
     // console.log("saveFieldNum_result: ", result);
    } catch (e) {
         console.log('saveFieldNum_error: ', e);
    }
  }

  const pickUp = async (idx) => {
      // console.log('pick Up! ', idx);
      let myMoney = await readMoney();
      let myFieldNum = await readFieldNum();
      //console.log('money: ', myMoney);
      console.log('fieldNum: ', myFieldNum);

      let myIsland = island;
      //console.log('pickUp last item: ', myIsland[myIsland.length - 1]);
      let myItem = island.filter((item) => item.idx === idx);
      let newObj = {
        idx: myIsland[myIsland.length - 1].idx + 1,
        x: myItem[0].x + 2,
        y: myItem[0].y + 23,
        scale: 0.3,
        id: 'field',
      };

      //console.log("pickUp newObj: ", newObj);
      myIsland.push(newObj);
      myFieldNum -= 1;
      setFieldValue(myFieldNum);
      saveFieldNum(myFieldNum);

      for (let i = 0; i < myIsland.length; i++) {
        if (myIsland[i].idx == idx) {
          let obj = myIsland.splice(i, 1);
          myMoney += obj[0].value;
          //setMoneyValue(money + obj[0].value);
          //console.log("pickUp delete Obj: ", obj);
         // console.log('pickUp_money_result: ', myMoney, typeof(myMoney));
          setMoneyValue(myMoney);
          saveMoney(myMoney);
          break;
        }
      }
      setIsland(myIsland);
      //console.log("pickUp myIsland: ", myIsland);
   
  };

useEffect(() => {
  saveMoney(0);
  readMoney();
  saveFieldNum(0);
  readFieldNum();
},[]);

const  [detail, setDetail] = useState(null);

//const window = Dimensions.get('screen');
    const opacity = useSharedValue(1);
    
    const hide = () => {
        opacity.value = withTiming(0, {duration: 300});
        setTimeout(() => hideDetail(), 300);
    }

    useEffect(() => {
        if(detailVisible == true) {
         let myDetail = <View style = {styles.absoluteContainer}>
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
             marginTop: 15, height:120, alignSelf: 'center', textAlignVertical: 'center',}}>DETAIL</Title>
             
                {detailObject}
             </Animated.View>
        </View>    
        setDetail(myDetail);
          opacity.value = withTiming(1, {duration: 300});
        }
        else
          setDetail(null);
    },[detailVisible]);


    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateX: 0}],
            marginVertical:120,
            marginBottom: 220,
            marginHorizontal:20,
            opacity: opacity.value,
            zIndex: 10000,
        };
    });




  return (
    <PaperProvider theme={theme}>
      <View style={{ ...styles.mainSceneContainer }}>
        {/* <Image source={require("../../assets/garden/flower.png")} style={{
          position: 'absolute',
          width: 91,
          height: 63,
          left: 0,
          top: 0,
        }}/> */}

        <Timer timer={mainTimer} updateTimer={updateMainTimer} />
        <Cloud x={-100} y={51} width={2} height={2} offsetX={800} timer={mainTimer} duration={7} />
        <Cloud x={-100} y={Dimensions.get('screen').height * 3 / 5} width={1.5} height={1.5}
          offsetX={900} timer={mainTimer} duration={9} />
        <Cloud x={-150} y={Dimensions.get('screen').height * 1 / 5} width={1} height={1}
          offsetX={1000} timer={mainTimer} duration={6} />

        <Image source={require("../../assets/garden/island.png")}
          style={{
            position: 'absolute',
            left: Dimensions.get('window').width * 6 / 100,
            top: Dimensions.get('window').height * 1 / 3.5,
            transform: [{ scale: 1.1 }],
            zIndex: -1,
          }} />

        {/* <Portal>
          <Modal visible={detailVisible} onDismiss={hideDetail} contentContainerStyle={detailModalStyle}>
            {detailObject}
          </Modal>
        </Portal> */}

        <View style={{
          flexWrap: "wrap",
          flex: 1.5,
          // borderWidth: 1,
          //borderColor: 'red',
          flexDirection: 'row',
          paddingTop: '1%',
          justifyContent: 'space-between',
          alignContent: 'center',
          alignItems: 'center'
        }}>
          <TouchableOpacity style={{
            justifyContent: 'center',
          }}
            onPress={() => { showBag(); setUsedScreen("main"); }}>
            <ImageBackground source={require('../../assets/icon_base.png')} style={{
              width: Dimensions.get('screen').width / 10,
              height: Dimensions.get('screen').width / 11,
              transform: [{ scale: 0.95 }],
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: '17%',
            }}>
              <MaterialCommunityIcons name="bag-personal" size={28} color='#A14326' />
            </ImageBackground>
          </TouchableOpacity>
          <View style={{
            //backgroundColor:'blue',
            // flex: 0.8,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
            <TouchableOpacity
              onPress={showSetting}>
              <Image source={require('../../assets/icon_setting.png')} style={{ transform: [{ scale: 0.8 }] }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={goToShop}>
              <Image source={require('../../assets/icon_shop.png')} style={{ transform: [{ scale: 0.8 }] }} />
            </TouchableOpacity>
            <TouchableOpacity style={{
              // borderWidth: 1,
              justifyContent: 'center',
            }}
              onPress={() => { drawerBook }}>
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
                  onPress={drawerBook}
                  style={{
                    // marginTop: '10%'
                  }} />
              </ImageBackground>
            </TouchableOpacity>
          </View>

        </View>

        <View style={{ flex: 7, justifyContent: "flex-end" }}>
          <View style={{
            position: 'absolute',
            justifyContent: 'flex-end',
            // alignContent: 'center',
            //alignSelf: 'center',
            // alignItems: 'center',
          }}>
            <UI money={money} fieldNum={fieldNum} fieldMax={fieldMax} flowerNum={flowerNum} flowerMax={flowerMax}
              bugSpace={bugSpace} bugMax={bugMax} showProfile={showProfile} />
            {/*<Field showBag={showBag} setUsedScreen={()=>setUsedScreen("field")} key="field"/>*/}
          </View>
          {/* <Pressable onPress={showBottomBar} style={{ alignSelf: 'center', width: '20%', height: '3%', backgroundColor: 'red' }} /> */}
        </View>
        <Island island={island} setIsland={setIsland} pickUp={pickUp}
          showBag={showBag} setUsedScreen={setUsedScreen} setObjIdx={setObjIdx} updatePos={updatePos}
          key={"island"} />
          <ScareCrow funtion={goToMini} style={{zIndex: 101}}/>
        <CustomBag visible={bagVisible} hide={hideBag}
          usedScreen={usedScreen} showDetail={showDetail}
          setDetailObject={setDetailObject}
          hideDetail={hide}
          useSeed={useSeed} objIdx={objIdx}
          //itemInfos={itemInfos} setItemInfos={setItemInfos}
          />
{detail}
    

        <Profile visible={profileVisible} hide={hideProfile} />
        <Setting visible={settingVisible} hide={hideSetting} goToMain={goToMain} />
      </View>


    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  mainSceneContainer: {
    marginTop: '6%',
    flex: 1,
    backgroundColor: '#A8FFFA',

  },
  list: {
    flex: 1,
    backgroundColor: 'purple',
    //alignItems: 'center',
    //justifyContent: 'space-around',
  },
  item: {
    //flex: 1,
    width: "85%",
    height: Dimensions.get('window').height * 25 / 100,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    marginTop: Dimensions.get('window').height * 4 / 100,
    marginBottom: Dimensions.get('window').height * 4 / 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    marginHorizontal: '5%',
    width: '35%',
    height: '70%',
    borderWidth: 1,
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
  itemCost: {
    position: 'absolute',
    borderWidth: 1,
    width: '20%',
    height: '20%',
    right: '2.5%',
    bottom: "5%",
  },
  absoluteContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
},
});
