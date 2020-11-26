import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Button, ScrollView, Image, Pressable, Dimensions, AsyncStorage } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DefaultTheme, Avatar, Modal, Portal, Provider as PaperProvider, Text } from 'react-native-paper';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import Field from '../components/field';
import BookScene from './book';
import Bag from '../components/bag';
import Setting from '../components/setting';
import * as SecureStore from 'expo-secure-store';


function WorkerUI(props) {
  return (
    <View style={styles.shopTab}>

      <ScrollView style={styles.list}>
        <View style={styles.item}>
          <View style={styles.itemImage} />
          <View style={styles.itemTexts}>
            <Text style={styles.itemText}>
              {props.name}</Text>
            <Text style={styles.itemText}>
              {props.explain}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemImage} />
          <View style={styles.itemTexts}>
            <Text style={styles.itemText}>
              {props.name}</Text>
            <Text style={styles.itemText}>
              {props.explain}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemImage} />
          <View style={styles.itemTexts}>
            <Text style={styles.itemText}>
              {props.name}</Text>
            <Text style={styles.itemText}>
              {props.explain}
            </Text>
          </View>
        </View>


      </ScrollView>
    </View>
  );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'orange',
    accent: 'green',
  },
}

const profileModalStyle = {
  backgroundColor: 'white',
  padding: 20,
  height: "70%",
  width: "70%",
  marginLeft: "15%",
};
const detailModalStyle = {
  backgroundColor: 'white',
  padding: 20,
  height: "50%",
  width: "50%",
  marginLeft: "25%",
};

const bagModalStyle = {
  backgroundColor: 'white',
  padding: 20,
  height: "70%",
  width: "70%",
  marginLeft: "15%",
};

const bottomBarModalStyle = {
  marginTop: "100%",
  height: '40%',
  backgroundColor: 'white',
};


const MyObj = (props) => {
  const [comp, setComp] = useState(null);

  const x = useSharedValue(props.object.x);
  const y = useSharedValue(props.object.y);

  const backgroundColor = useSharedValue('green');

  const panHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
      ctx.dragged = false;
      
      backgroundColor.value = 'lightgreen';
    },
    onActive: (event, ctx) => {
      if(ctx.dragged == false){
        ctx.dragged = true;
        backgroundColor.value= 'lightgreen';
      }
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onFinish: (_, ctx)=>{
      backgroundColor.value= 'green';
      if(ctx.dragged == true){
        props.updatePos(props.object.idx, x.value, y.value);
      }
    },
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      position: 'absolute',
      backgroundColor: backgroundColor.value,
      color: 'white',
      transform: [
        {translateX: x.value},
        {translateY: y.value},
      ]
       }
  })

  const initComp = () => {
    let myComp = null;
    switch (props.object.id) {
      case 'field':
        myComp = <Field idx={props.object.idx} id={'field'}
          x={props.object.x}
          y={props.object.y}
          zIndex= {100}
          showBag={props.showBag} setUsedScreen={props.setUsedScreen}
          updatePos={props.updatePos} setObjIdx={props.setObjIdx}
          key = {props.idx}
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

  return (
    <PanGestureHandler onGestureEvent={panHandler}>
    <Animated.View style={animatedStyle}>
      {comp}
    </Animated.View>
    </PanGestureHandler>
  );
}

const Island = (props) => {
  const [island, setIsland] = useState([
    {
      idx: 0, 
      x: Dimensions.get('screen').width * 2 / 5, 
      y: Dimensions.get('screen').height * 2 / 5,
      id: 'field',
    },
  ]);

  const getData = async () => {
    const result = await SecureStore.getItemAsync('Island');
    console.log("island getData: result", result);
    if (result != null) {
      const json = await JSON.parse(result);
      console.log("Island useEffect json", json, "\n result: ", result);
      setIsland(json);
    }
   // else setData();
  };

  const updatePos = async (idx, x, y) =>{
    await getData();//데이터 불러오기(저장된 값)
    let myIsland = JSON.parse(JSON.stringify(island));
    myIsland = myIsland.map((item) => item.idx === idx ? {...item, x: x, y: y}: item);
    console.log(myIsland);
    SecureStore.setItemAsync('Island', JSON.stringify(myIsland));
    setIsland(myIsland);
    //데이터 저장하기
  };
  
  const setData = async () => {
    const result = await SecureStore.getItemAsync('Island', JSON.stringify(island));
    console.log("result", result);
  };

  const deleteData = async () => {
    await SecureStore.deleteItemAsync('Island');
  }

console.log("island: ", island);

  useEffect(() => {
//    deleteData('Island');
    console.log("called once");
 //   setData();
    getData();
  }, []);

  let islandRender = [];
  for(let i = 0; i < island.length; i++) {
    let item = island[i];
    //console.log("item: ", item);
    islandRender.push(<MyObj key={item.idx} object={item}
      showBag={props.showBag}
      setUsedScreen={props.setUsedScreen}
      updatePos={updatePos} setObjIdx={props.setObjIdx}/>);
    }

  return <View key='islandContainer'
    style={{ flex: 1, position: 'absolute' }}>
      {islandRender}
    </View>
}


export default function MainScene({ navigation, route }) {
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

  const [bottomBarVisible, setBottomBarVisible] = useState(false);
  const showBottomBar = () => setBottomBarVisible(true);
  const hideBottomBar = () => setBottomBarVisible(false);

  const drawerBook = () => {
    navigation.navigate("Book");
  }
  const goToShop = () => {
    navigation.navigate("Shop");
  }

  const useSeed = (idx) => {
    console.log("useSeed idx: ", idx);
  }

  //const [money, setMoneyValue] = useState(0);
  const [flowerNum, setFlowerValue] = useState(0);
  const [flowerMax, setFlowerMaxValue] = useState(3);
  const [guardianNum, setGuardianValue] = useState(0);
  const [guardianMax, setGuardianMaxValue] = useState(3);
  const [flowerSpace, setFlowerSpace] = useState(0);
  const [guardianSpace, setGuardianSpace] = useState(0);

  const [detailObject, setDetailObject] = useState(null);
  const [usedScreen, setUsedScreen] = useState(null);
  const [objIdx, setObjIdx] = useState(-1);

  return (
    <PaperProvider theme={theme}>

      <View style={styles.mainSceneContainer}>
        {<Island
          showBag={showBag} setUsedScreen={setUsedScreen} setObjIdx={setObjIdx}
           key={"island"} />}
        <Portal>
          <Modal visible={profileVisible} onDismiss={hideProfile}
            contentContainerStyle={profileModalStyle}>
            <Text>Lv. 1 </Text>
            <Text>성장속도 100% </Text>
            <Text>추가 수입 0</Text>
            <Text>최대 밭 갯수 5</Text>
          </Modal>
          <Setting visible={settingVisible} onDismiss={hideSetting} />
          <Modal visible={bagVisible} onDismiss={hideBag}
            contentContainerStyle={bagModalStyle}>
            <Bag usedScreen={usedScreen} showDetail={showDetail}
              setDetailObject={setDetailObject}
              hideDetail={hideDetail} hideBag={hideBag}
                useSeed={useSeed} objIdx={objIdx}/>
          </Modal>
          <Modal visible={detailVisible} onDismiss={hideDetail} contentContainerStyle={detailModalStyle}>
            {detailObject}
          </Modal>
          <Modal visible={bottomBarVisible} onDismiss={hideBottomBar}
            contentContainerStyle={bottomBarModalStyle}>
            <ScrollView style={styles.list}>
              <WorkerUI />
            </ScrollView>
          </Modal>

        </Portal>
        <View style={{
          flexWrap: "wrap",
          flex: 1.5,
          //borderWidth: 1,
          //borderColor: 'red',
          flexDirection: 'row',
          paddingTop: '1%'
        }}>
          <View style={{
            //borderColor: 'purple',
            //borderWidth: 1,
            flex: 1,
            height: '100%',
            justifyContent: 'flex-start',
            alignContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            <Pressable onPress={showProfile} >
              <Avatar.Text size={50} label='LV1' style={{ justifyContent: "center" }} />
            </Pressable>

            <View style={{ alignSelf: 'center', marginTop: "5%" }}>
              <MaterialCommunityIcons name="bag-personal" size={40} color='#A57939' onPress={() => { showBag(); setUsedScreen("main"); }} />
            </View>
          </View>
          <View style={{
            flex: 4,
            flexWrap: 'wrap',
            flexDirection: 'row',
            //borderColor: 'gray',
            //borderWidth: 1,
            justifyContent: 'space-evenly',
          }}>
            <View style={{ flex: 0.4, flexDirection: 'row' }}>
              <MaterialCommunityIcons name="coin" size={24} color="black" />
              <View style={{ backgroundColor: 'gray', width: '70%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'black' }}>{route.params?.money}</Text>
              </View>
            </View>
            <View style={{ flex: 0.4, flexDirection: 'row' }}>
              <MaterialCommunityIcons name="flower" size={24} color="black" />
              <View style={{ backgroundColor: 'gray', width: '70%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'black' }}>{flowerNum}/{flowerMax}</Text>
              </View>
            </View>
            <View style={{ flex: 0.4, flexDirection: 'row' }}>
              <MaterialCommunityIcons name="ladybug" size={24} color="black" />
              <View style={{ backgroundColor: 'gray', width: '70%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'black' }}>{guardianNum}/{guardianMax}</Text>
              </View>
            </View>
          </View>

          <View style={{
            flex: 0.8,
            alignContent: 'center',
            alignItems: 'center'
          }}>
            <MaterialIcons name="settings" size={35} color="gray"
              onPress={showSetting}
            />
            <Entypo name='shop' size={35} color="gray"
              onPress={goToShop}
              style={{
                // marginTop: "10%"
              }}
            />
            <MaterialCommunityIcons name="book-multiple" size={37} color="#593A14"
              onPress={drawerBook}
              style={{
                // marginTop: '10%'
              }}
            />
          </View>
        </View>
        <View style={{ flex: 7, justifyContent: "flex-end" }}>
          <View style={{
            ...StyleSheet.absoluteFill,
            flex: 1,
            position: 'absolute',
            justifyContent: 'center',
            alignContent: 'center',
            //alignSelf: 'center',
            alignItems: 'center',
          }}>

            {/*<Field showBag={showBag} setUsedScreen={()=>setUsedScreen("field")} key="field"/>*/}
          </View>
          <Pressable onPress={showBottomBar} style={{ alignSelf: 'center', width: '20%', height: '3%', backgroundColor: 'red' }} />
        </View>




      </View>


    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  mainSceneContainer: {
    marginTop: '6%',
    flex: 1,
    backgroundColor: '#fff',
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
});

/*
88888888888888888888888888888888
ver: 1

main에 island 변수 옮겨 둠

8888888888888888888888888888888888


*/ 

import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Button, ScrollView, Image, Pressable, Dimensions, AsyncStorage } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DefaultTheme, Avatar, Modal, Portal, Provider as PaperProvider, Text } from 'react-native-paper';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import Field from '../components/field';
import BookScene from './book';
import Bag from '../components/bag';
import Setting from '../components/setting';
import * as SecureStore from 'expo-secure-store';


function WorkerUI(props) {
  return (
    <View style={styles.shopTab}>

      <ScrollView style={styles.list}>
        <View style={styles.item}>
          <View style={styles.itemImage} />
          <View style={styles.itemTexts}>
            <Text style={styles.itemText}>
              {props.name}</Text>
            <Text style={styles.itemText}>
              {props.explain}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemImage} />
          <View style={styles.itemTexts}>
            <Text style={styles.itemText}>
              {props.name}</Text>
            <Text style={styles.itemText}>
              {props.explain}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemImage} />
          <View style={styles.itemTexts}>
            <Text style={styles.itemText}>
              {props.name}</Text>
            <Text style={styles.itemText}>
              {props.explain}
            </Text>
          </View>
        </View>


      </ScrollView>
    </View>
  );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'orange',
    accent: 'green',
  },
}

const profileModalStyle = {
  backgroundColor: 'white',
  padding: 20,
  height: "70%",
  width: "70%",
  marginLeft: "15%",
};
const detailModalStyle = {
  backgroundColor: 'white',
  padding: 20,
  height: "50%",
  width: "50%",
  marginLeft: "25%",
};

const bagModalStyle = {
  backgroundColor: 'white',
  padding: 20,
  height: "70%",
  width: "70%",
  marginLeft: "15%",
};

const bottomBarModalStyle = {
  marginTop: "100%",
  height: '40%',
  backgroundColor: 'white',
};


const MyObj = (props) => {
  const [comp, setComp] = useState(null);

  const x = useSharedValue(props.object.x);
  const y = useSharedValue(props.object.y);

  const backgroundColor = useSharedValue('green');

  const panHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
      ctx.dragged = false;
      
      backgroundColor.value = 'lightgreen';
    },
    onActive: (event, ctx) => {
      if(ctx.dragged == false){
        ctx.dragged = true;
        backgroundColor.value= 'lightgreen';
      }
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onFinish: (_, ctx)=>{
      backgroundColor.value= 'green';
      if(ctx.dragged == true){
        props.updatePos(props.object.idx, x.value, y.value);
      }
    },
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      position: 'absolute',
      backgroundColor: backgroundColor.value,
      color: 'white',
      transform: [
        {translateX: x.value},
        {translateY: y.value},
      ]
       }
  })

  const initComp = () => {
    let myComp = null;
    switch (props.object.id) {
      case 'field':
        myComp = <Field idx={props.object.idx} id={'field'}
          x={props.object.x}
          y={props.object.y}
          zIndex= {100}
          showBag={props.showBag} setUsedScreen={props.setUsedScreen}
          updatePos={props.updatePos} setObjIdx={props.setObjIdx}
          key = {props.idx}
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

  return (
    <PanGestureHandler onGestureEvent={panHandler}>
    <Animated.View style={animatedStyle}>
      {comp}
    </Animated.View>
    </PanGestureHandler>
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

  const updatePos = async (idx, x, y) =>{
    await getData();//데이터 불러오기(저장된 값)
    let myIsland = JSON.parse(JSON.stringify(props.island));
    myIsland = myIsland.map((item) => item.idx === idx ? {...item, x: x, y: y}: item);
    console.log(myIsland);
    SecureStore.setItemAsync('Island', JSON.stringify(myIsland));
    props.setIsland(myIsland);
    //데이터 저장하기
  };
  
  const setData = async () => {
    const result = await SecureStore.getItemAsync('Island', JSON.stringify(props.island));
    console.log("result", result);
  };

  const deleteData = async () => {
    await SecureStore.deleteItemAsync('Island');
  }

console.log("island: ", props.island);

  useEffect(() => {
//    deleteData('Island');
    console.log("called once");
 //   setData();
    getData();
  }, []);

  let islandRender = [];
  for(let i = 0; i < props.island.length; i++) {
    let item = props.island[i];
    //console.log("item: ", item);
    islandRender.push(<MyObj key={item.idx} object={item}
      showBag={props.showBag}
      setUsedScreen={props.setUsedScreen}
      updatePos={updatePos} setObjIdx={props.setObjIdx}/>);
    }

  return <View key='islandContainer'
    style={{ flex: 1, position: 'absolute' }}>
      {islandRender}
    </View>
}


export default function MainScene({ navigation, route }) {
 const [island, setIsland] = useState([
    {
      idx: 0, 
      x: Dimensions.get('screen').width * 2 / 5, 
      y: Dimensions.get('screen').height * 2 / 5,
      id: 'field',
    },
  ]);

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

  const [bottomBarVisible, setBottomBarVisible] = useState(false);
  const showBottomBar = () => setBottomBarVisible(true);
  const hideBottomBar = () => setBottomBarVisible(false);

  const drawerBook = () => {
    navigation.navigate("Book");
  }
  const goToShop = () => {
    navigation.navigate("Shop");
  }

  const useSeed = (idx) => {
    console.log("useSeed idx: ", idx);
  }

  //const [money, setMoneyValue] = useState(0);
  const [flowerNum, setFlowerValue] = useState(0);
  const [flowerMax, setFlowerMaxValue] = useState(3);
  const [guardianNum, setGuardianValue] = useState(0);
  const [guardianMax, setGuardianMaxValue] = useState(3);
  const [flowerSpace, setFlowerSpace] = useState(0);
  const [guardianSpace, setGuardianSpace] = useState(0);

  const [detailObject, setDetailObject] = useState(null);
  const [usedScreen, setUsedScreen] = useState(null);
  const [objIdx, setObjIdx] = useState(-1);

  return (
    <PaperProvider theme={theme}>

      <View style={styles.mainSceneContainer}>
        {<Island island={island} setIsland={setIsland}
          showBag={showBag} setUsedScreen={setUsedScreen} setObjIdx={setObjIdx}
           key={"island"} />}
        <Portal>
          <Modal visible={profileVisible} onDismiss={hideProfile}
            contentContainerStyle={profileModalStyle}>
            <Text>Lv. 1 </Text>
            <Text>성장속도 100% </Text>
            <Text>추가 수입 0</Text>
            <Text>최대 밭 갯수 5</Text>
          </Modal>
          <Setting visible={settingVisible} onDismiss={hideSetting} />
          <Modal visible={bagVisible} onDismiss={hideBag}
            contentContainerStyle={bagModalStyle}>
            <Bag usedScreen={usedScreen} showDetail={showDetail}
              setDetailObject={setDetailObject}
              hideDetail={hideDetail} hideBag={hideBag}
                useSeed={useSeed} objIdx={objIdx}/>
          </Modal>
          <Modal visible={detailVisible} onDismiss={hideDetail} contentContainerStyle={detailModalStyle}>
            {detailObject}
          </Modal>
          <Modal visible={bottomBarVisible} onDismiss={hideBottomBar}
            contentContainerStyle={bottomBarModalStyle}>
            <ScrollView style={styles.list}>
              <WorkerUI />
            </ScrollView>
          </Modal>

        </Portal>
        <View style={{
          flexWrap: "wrap",
          flex: 1.5,
          //borderWidth: 1,
          //borderColor: 'red',
          flexDirection: 'row',
          paddingTop: '1%'
        }}>
          <View style={{
            //borderColor: 'purple',
            //borderWidth: 1,
            flex: 1,
            height: '100%',
            justifyContent: 'flex-start',
            alignContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            <Pressable onPress={showProfile} >
              <Avatar.Text size={50} label='LV1' style={{ justifyContent: "center" }} />
            </Pressable>

            <View style={{ alignSelf: 'center', marginTop: "5%" }}>
              <MaterialCommunityIcons name="bag-personal" size={40} color='#A57939' onPress={() => { showBag(); setUsedScreen("main"); }} />
            </View>
          </View>
          <View style={{
            flex: 4,
            flexWrap: 'wrap',
            flexDirection: 'row',
            //borderColor: 'gray',
            //borderWidth: 1,
            justifyContent: 'space-evenly',
          }}>
            <View style={{ flex: 0.4, flexDirection: 'row' }}>
              <MaterialCommunityIcons name="coin" size={24} color="black" />
              <View style={{ backgroundColor: 'gray', width: '70%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'black' }}>{route.params?.money}</Text>
              </View>
            </View>
            <View style={{ flex: 0.4, flexDirection: 'row' }}>
              <MaterialCommunityIcons name="flower" size={24} color="black" />
              <View style={{ backgroundColor: 'gray', width: '70%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'black' }}>{flowerNum}/{flowerMax}</Text>
              </View>
            </View>
            <View style={{ flex: 0.4, flexDirection: 'row' }}>
              <MaterialCommunityIcons name="ladybug" size={24} color="black" />
              <View style={{ backgroundColor: 'gray', width: '70%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'black' }}>{guardianNum}/{guardianMax}</Text>
              </View>
            </View>
          </View>

          <View style={{
            flex: 0.8,
            alignContent: 'center',
            alignItems: 'center'
          }}>
            <MaterialIcons name="settings" size={35} color="gray"
              onPress={showSetting}
            />
            <Entypo name='shop' size={35} color="gray"
              onPress={goToShop}
              style={{
                // marginTop: "10%"
              }}
            />
            <MaterialCommunityIcons name="book-multiple" size={37} color="#593A14"
              onPress={drawerBook}
              style={{
                // marginTop: '10%'
              }}
            />
          </View>
        </View>
        <View style={{ flex: 7, justifyContent: "flex-end" }}>
          <View style={{
            ...StyleSheet.absoluteFill,
            flex: 1,
            position: 'absolute',
            justifyContent: 'center',
            alignContent: 'center',
            //alignSelf: 'center',
            alignItems: 'center',
          }}>

            {/*<Field showBag={showBag} setUsedScreen={()=>setUsedScreen("field")} key="field"/>*/}
          </View>
          <Pressable onPress={showBottomBar} style={{ alignSelf: 'center', width: '20%', height: '3%', backgroundColor: 'red' }} />
        </View>




      </View>


    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  mainSceneContainer: {
    marginTop: '6%',
    flex: 1,
    backgroundColor: '#fff',
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
});


/*
88888888888888888888888888888888
ver: 2
씨앗 사용 시 오브젝트 추가

8888888888888888888888888888888888


*/ 
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Button, ScrollView, Image, Pressable, Dimensions, AsyncStorage } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DefaultTheme, Avatar, Modal, Portal, Provider as PaperProvider, Text } from 'react-native-paper';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import Field from '../components/field';
import BookScene from './book';
import Bag from '../components/bag';
import Setting from '../components/setting';
import * as SecureStore from 'expo-secure-store';


function WorkerUI(props) {
  return (
    <View style={styles.shopTab}>

      <ScrollView style={styles.list}>
        <View style={styles.item}>
          <View style={styles.itemImage} />
          <View style={styles.itemTexts}>
            <Text style={styles.itemText}>
              {props.name}</Text>
            <Text style={styles.itemText}>
              {props.explain}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemImage} />
          <View style={styles.itemTexts}>
            <Text style={styles.itemText}>
              {props.name}</Text>
            <Text style={styles.itemText}>
              {props.explain}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemImage} />
          <View style={styles.itemTexts}>
            <Text style={styles.itemText}>
              {props.name}</Text>
            <Text style={styles.itemText}>
              {props.explain}
            </Text>
          </View>
        </View>


      </ScrollView>
    </View>
  );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'orange',
    accent: 'green',
  },
}

const profileModalStyle = {
  backgroundColor: 'white',
  padding: 20,
  height: "70%",
  width: "70%",
  marginLeft: "15%",
};
const detailModalStyle = {
  backgroundColor: 'white',
  padding: 20,
  height: "50%",
  width: "50%",
  marginLeft: "25%",
};

const bagModalStyle = {
  backgroundColor: 'white',
  padding: 20,
  height: "70%",
  width: "70%",
  marginLeft: "15%",
};

const bottomBarModalStyle = {
  marginTop: "100%",
  height: '40%',
  backgroundColor: 'white',
};


const MyObj = (props) => {
  const [comp, setComp] = useState(null);

  const x = useSharedValue(props.object.x);
  const y = useSharedValue(props.object.y);

  const backgroundColor = useSharedValue('green');

  const panHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
      ctx.dragged = false;
      
      backgroundColor.value = 'lightgreen';
    },
    onActive: (event, ctx) => {
      if(ctx.dragged == false){
        ctx.dragged = true;
        backgroundColor.value= 'lightgreen';
      }
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onFinish: (_, ctx)=>{
      backgroundColor.value= 'green';
      if(ctx.dragged == true){
        props.updatePos(props.object.idx, x.value, y.value);
      }
    },
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      position: 'absolute',
      backgroundColor: backgroundColor.value,
      color: 'white',
      transform: [
        {translateX: x.value},
        {translateY: y.value},
      ]
       }
  })

  const initComp = () => {
    let myComp = null;
    switch (props.object.id) {
      case 'field':
        myComp = <Field idx={props.object.idx} id={'field'}
          x={props.object.x}
          y={props.object.y}
          zIndex= {100}
          showBag={props.showBag} setUsedScreen={props.setUsedScreen}
          updatePos={props.updatePos} setObjIdx={props.setObjIdx}
          key = {props.idx}
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

  return (
    <PanGestureHandler onGestureEvent={panHandler}>
    <Animated.View style={animatedStyle}>
      {comp}
    </Animated.View>
    </PanGestureHandler>
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

  const updatePos = async (idx, x, y) =>{
    await getData();//데이터 불러오기(저장된 값)
    let myIsland = JSON.parse(JSON.stringify(props.island));
    myIsland = myIsland.map((item) => item.idx === idx ? {...item, x: x, y: y}: item);
    console.log(myIsland);
    SecureStore.setItemAsync('Island', JSON.stringify(myIsland));
    props.setIsland(myIsland);
    //데이터 저장하기
  };
  
  const setData = async () => {
    const result = await SecureStore.getItemAsync('Island', JSON.stringify(props.island));
    console.log("result", result);
  };

  const deleteData = async () => {
    await SecureStore.deleteItemAsync('Island');
  }

console.log("island: ", props.island);

  useEffect(() => {
//    deleteData('Island');
    console.log("called once");
 //   setData();
    getData();
  }, []);

  let islandRender = [];
  for(let i = 0; i < props.island.length; i++) {
    let item = props.island[i];
    //console.log("item: ", item);
    islandRender.push(<MyObj key={item.idx} object={item}
      showBag={props.showBag}
      setUsedScreen={props.setUsedScreen}
      updatePos={updatePos} setObjIdx={props.setObjIdx}/>);
    }

  return <View key='islandContainer'
    style={{ flex: 1, position: 'absolute' }}>
      {islandRender}
    </View>
}


export default function MainScene({ navigation, route }) {
 const [island, setIsland] = useState([
    {
      idx: 0, 
      x: Dimensions.get('screen').width * 2 / 5, 
      y: Dimensions.get('screen').height * 2 / 5,
      id: 'field',
    },
  ]);

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

  const [bottomBarVisible, setBottomBarVisible] = useState(false);
  const showBottomBar = () => setBottomBarVisible(true);
  const hideBottomBar = () => setBottomBarVisible(false);

  const drawerBook = () => {
    navigation.navigate("Book");
  }
  const goToShop = () => {
    navigation.navigate("Shop");
  }

  const useSeed = (idx) => {
    let item = island.filter((item)=>item.idx === idx);
    let newObj ={ 
      idx: island.length,
      x: item[0].x,
      y: item[0].y,
      id: 'flower',
    };

    let myIsland = island;
    myIsland.push(newObj);

    console.log("useSeed myIsland: ", myIsland);
  }

  //const [money, setMoneyValue] = useState(0);
  const [flowerNum, setFlowerValue] = useState(0);
  const [flowerMax, setFlowerMaxValue] = useState(3);
  const [guardianNum, setGuardianValue] = useState(0);
  const [guardianMax, setGuardianMaxValue] = useState(3);
  const [flowerSpace, setFlowerSpace] = useState(0);
  const [guardianSpace, setGuardianSpace] = useState(0);

  const [detailObject, setDetailObject] = useState(null);
  const [usedScreen, setUsedScreen] = useState(null);
  const [objIdx, setObjIdx] = useState(-1);

  return (
    <PaperProvider theme={theme}>

      <View style={styles.mainSceneContainer}>
        {<Island island={island} setIsland={setIsland}
          showBag={showBag} setUsedScreen={setUsedScreen} setObjIdx={setObjIdx}
           key={"island"} />}
        <Portal>
          <Modal visible={profileVisible} onDismiss={hideProfile}
            contentContainerStyle={profileModalStyle}>
            <Text>Lv. 1 </Text>
            <Text>성장속도 100% </Text>
            <Text>추가 수입 0</Text>
            <Text>최대 밭 갯수 5</Text>
          </Modal>
          <Setting visible={settingVisible} onDismiss={hideSetting} />
          <Modal visible={bagVisible} onDismiss={hideBag}
            contentContainerStyle={bagModalStyle}>
            <Bag usedScreen={usedScreen} showDetail={showDetail}
              setDetailObject={setDetailObject}
              hideDetail={hideDetail} hideBag={hideBag}
                useSeed={useSeed} objIdx={objIdx}/>
          </Modal>
          <Modal visible={detailVisible} onDismiss={hideDetail} contentContainerStyle={detailModalStyle}>
            {detailObject}
          </Modal>
          <Modal visible={bottomBarVisible} onDismiss={hideBottomBar}
            contentContainerStyle={bottomBarModalStyle}>
            <ScrollView style={styles.list}>
              <WorkerUI />
            </ScrollView>
          </Modal>

        </Portal>
        <View style={{
          flexWrap: "wrap",
          flex: 1.5,
          //borderWidth: 1,
          //borderColor: 'red',
          flexDirection: 'row',
          paddingTop: '1%'
        }}>
          <View style={{
            //borderColor: 'purple',
            //borderWidth: 1,
            flex: 1,
            height: '100%',
            justifyContent: 'flex-start',
            alignContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            <Pressable onPress={showProfile} >
              <Avatar.Text size={50} label='LV1' style={{ justifyContent: "center" }} />
            </Pressable>

            <View style={{ alignSelf: 'center', marginTop: "5%" }}>
              <MaterialCommunityIcons name="bag-personal" size={40} color='#A57939' onPress={() => { showBag(); setUsedScreen("main"); }} />
            </View>
          </View>
          <View style={{
            flex: 4,
            flexWrap: 'wrap',
            flexDirection: 'row',
            //borderColor: 'gray',
            //borderWidth: 1,
            justifyContent: 'space-evenly',
          }}>
            <View style={{ flex: 0.4, flexDirection: 'row' }}>
              <MaterialCommunityIcons name="coin" size={24} color="black" />
              <View style={{ backgroundColor: 'gray', width: '70%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'black' }}>{route.params?.money}</Text>
              </View>
            </View>
            <View style={{ flex: 0.4, flexDirection: 'row' }}>
              <MaterialCommunityIcons name="flower" size={24} color="black" />
              <View style={{ backgroundColor: 'gray', width: '70%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'black' }}>{flowerNum}/{flowerMax}</Text>
              </View>
            </View>
            <View style={{ flex: 0.4, flexDirection: 'row' }}>
              <MaterialCommunityIcons name="ladybug" size={24} color="black" />
              <View style={{ backgroundColor: 'gray', width: '70%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'black' }}>{guardianNum}/{guardianMax}</Text>
              </View>
            </View>
          </View>

          <View style={{
            flex: 0.8,
            alignContent: 'center',
            alignItems: 'center'
          }}>
            <MaterialIcons name="settings" size={35} color="gray"
              onPress={showSetting}
            />
            <Entypo name='shop' size={35} color="gray"
              onPress={goToShop}
              style={{
                // marginTop: "10%"
              }}
            />
            <MaterialCommunityIcons name="book-multiple" size={37} color="#593A14"
              onPress={drawerBook}
              style={{
                // marginTop: '10%'
              }}
            />
          </View>
        </View>
        <View style={{ flex: 7, justifyContent: "flex-end" }}>
          <View style={{
            ...StyleSheet.absoluteFill,
            flex: 1,
            position: 'absolute',
            justifyContent: 'center',
            alignContent: 'center',
            //alignSelf: 'center',
            alignItems: 'center',
          }}>

            {/*<Field showBag={showBag} setUsedScreen={()=>setUsedScreen("field")} key="field"/>*/}
          </View>
          <Pressable onPress={showBottomBar} style={{ alignSelf: 'center', width: '20%', height: '3%', backgroundColor: 'red' }} />
        </View>




      </View>


    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  mainSceneContainer: {
    marginTop: '6%',
    flex: 1,
    backgroundColor: '#fff',
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
});
