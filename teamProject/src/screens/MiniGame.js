import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, forwardRef, useImperativeHandle, version, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Image, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons, MaterialIcons, Entypo, Octicons } from '@expo/vector-icons';
import { DefaultTheme, Avatar, Modal, Portal, Provider as PaperProvider, DataTable, Button, List } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeWrapper, TouchableHighlight, PanGestureHandler } from 'react-native-gesture-handler';
import { render } from 'react-dom';
import ViewPager from '@react-native-community/viewpager';
import Animated, { Easing, useSharedValue, useDerivedValue, interpolateColors, withSpring, useAnimatedStyle, repeat, delay, useAnimatedGestureHandler, withTiming, sequence, EasingNode, cancelAnimation } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Timer from '../components/timer';

import Setting from '../components/setting_ver2';

function StartScene({ navigation }) {
  const pressBT = () => {
    navigation.navigate("InGame");
  }
  return (
    <View style={styles.startSceneContainer}>
      <MaterialCommunityIcons name="human-handsdown" size={126} color="white" />
      <MaterialCommunityIcons name="flower" size={50} color='white' />
      <Button onPress={pressBT} mode="contained" >START</Button>
    </View>
  );
}

const Stack = createStackNavigator();

function InGameScene() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="MiniMain" component={_MainScene} options={{ headerShown: false }} />
      <Stack.Screen name="Score" component={ScoreScene} options={{ headerShown: false }}  />
      <Stack.Screen name="Tutorial" component={TutorialScene} options={{ headerShown: false }} />
    </Stack.Navigator>
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

const defaultModalStyle = {
  backgroundColor: '#ffffff',
  padding: 5,
  height: "70%",
  width: "70%",
  marginLeft: "15%",
  alignItems: 'center',
  justifyContent: 'center',
};

const ImageModalStyle = {
  backgroundColor: '#ffffff00',
  padding: 5,
  height: "50%",
  width: "80%",
  marginLeft: "10%",
  alignItems: 'center',
  justifyContent: 'center',
};

function _MainScene({ navigation }) {
  const [settingVisible, setSettingVisible] = useState(false);
  const showSetting = () => setSettingVisible(true);
  const hideSetting = () => setSettingVisible(false);

  const goToTutorial = () => {
    navigation.navigate("Tutorial");
  }

  const [GameStartVisible, setGameStartVisible] = useState(false);
  const showGameStart = () => setGameStartVisible(true);
  const hideGameStart = () => setGameStartVisible(false);

  const goToGamePlayEasyMode = () => {
    money = 2000;
    playTime = 0;
    player = [{
      name: 0, nickname: personalNames[Math.floor(Math.random() * 100) % personalNames.length],
      x: 0, y: 0, scale: 0.8, active: false, team: ""
    },
    {
      name: 1, nickname: personalNames[Math.floor(Math.random() * 100) % personalNames.length],
      x: -80, y: 0, scale: 0.5, active: false, team: ""
    },
    {
      name: 2, nickname: personalNames[Math.floor(Math.random() * 100) % personalNames.length],
      x: -40, y: -50, scale: 0.5, active: false, team: ""
    },
    {
      name: 3, nickname: personalNames[Math.floor(Math.random() * 100) % personalNames.length],
      x: 40, y: -50, scale: 0.5, active: false, team: ""
    },
    {
      name: 4, nickname: personalNames[Math.floor(Math.random() * 100) % personalNames.length],
      x: 80, y: 0, scale: 0.5, active: false, team: ""
    },
    ];
    enemy = [{
      name: 0, nickname: personalNames[Math.floor(Math.random() * 100) % personalNames.length],
      x: 0, y: 0, scale: 0.8, active: false, team: ""
    },
    {
      name: 1, nickname: personalNames[Math.floor(Math.random() * 100) % personalNames.length],
      x: -80, y: 0, scale: 0.5, active: false, team: ""
    },
    ];

    navigation.navigate("GamePlay");
  }

const  goToGamePlayHardMode = () => {
    money = 1000;
    playTime = 0;
    player = [{
      name: 0, nickname: personalNames[Math.floor(Math.random() * 100) % personalNames.length],
      x: 0, y: 0, scale: 0.8, active: false, team: ""
    },
    {
      name: 1, nickname: personalNames[Math.floor(Math.random() * 100) % personalNames.length],
      x: -80, y: 0, scale: 0.5, active: false, team: ""
    },
    {
      name: 2, nickname: personalNames[Math.floor(Math.random() * 100) % personalNames.length],
      x: -40, y: -50, scale: 0.5, active: false, team: ""
    },
    {
      name: 3, nickname: personalNames[Math.floor(Math.random() * 100) % personalNames.length],
      x: 40, y: -50, scale: 0.5, active: false, team: ""
    },
    ];
    enemy = [{
      name: 0, nickname: personalNames[Math.floor(Math.random() * 100) % personalNames.length],
      x: 0, y: 0, scale: 0.8, active: false, team: ""
    },
    {
      name: 1, nickname: personalNames[Math.floor(Math.random() * 100) % personalNames.length],
      x: -80, y: 0, scale: 0.5, active: false, team: ""
    },
    {
      name: 2, nickname: personalNames[Math.floor(Math.random() * 100) % personalNames.length],
      x: -40, y: -50, scale: 0.5, active: false, team: ""
    },
    {
      name: 3, nickname: personalNames[Math.floor(Math.random() * 100) % personalNames.length],
      x: 40, y: -50, scale: 0.5, active: false, team: ""
    },
    ];

    navigation.navigate("GamePlay");
  }


  const goToScore = () => {
    navigation.navigate("Score");
  }
  const goToMain = () => {
    navigation.navigate("Main");
  }
  return (
    <PaperProvider theme={theme}>
    <Setting visible={settingVisible} hide={hideSetting} goToMain={goToMain} />
      <View style={{ ...styles.mainSceneTitleContainer, backgroundColor: '#FFDD87' }}>
        <Avatar.Image size={50} source={require('./../../assets/MiniGame/Enemy_orange.png')} resizeMode="stretch" />
        <ImageBackground source={require('../../assets/MiniGame/ExplanBar.png')} style={{ width: 143, height: 37, justifyContent: 'center' }}>
          <Text style={styles.titleText}> MiniGame </Text>
        </ImageBackground>
      </View>

      <View style={{ ...styles.mainSceneContainer, backgroundColor: '#FFDD87' }}>
        <Portal>
          {/* <Modal visible={settingVisible} onDismiss={hideSetting}
            contentContainerStyle={defaultModalStyle}>
            <MaterialCommunityIcons style={{ flex: 1.15, marginRight: '80%' }} onPress={hideSetting}
              name="file-excel-box" size={50} color='black' />
            <View style={{ flex: 8, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
              <Octicons name="primitive-dot" size={130} color="black" />
              <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: "20%" }}>Setting</Text>
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "gray", marginBottom: "20%" }}>소리</Text>

              <Text style={{ fontSize: 20, fontWeight: "bold", color: 'gray', marginBottom: "30%" }}>밝기</Text>
            </View>
          </Modal> */}
          <Modal visible={GameStartVisible} onDismiss={hideGameStart}
            contentContainerStyle={ImageModalStyle}>
            <ImageBackground source={require('../../assets/MiniGame/MenuPanel.png')} style={{ position: 'absolute', width: 400, height: 412 }} />
            <ImageBackground source={require('../../assets/MiniGame/ExplanBar.png')} style={{ flex: 0.2, width: 143, height: 37 }}>
              <Text style={styles.titleText}> Difficulty </Text>
            </ImageBackground>
            <View style={{ flex: 0.6, flexDirection: 'row' }}>
              <TouchableOpacity onPress={goToGamePlayEasyMode} style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: '3%' }}>
                <Image source={require('../../assets/MiniGame/Player.png')} style={{ width: 70, height: 70, marginBottom: '5%' }} resizeMode='stretch' />
                <ImageBackground source={require('../../assets/MiniGame/MenuButton.png')} style={{ width: 100, height: 46, justifyContent: 'center' }}>
                  <Text style={{ ...styles.titleText, fontSize: 18 }}> Easy </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity onPress={goToGamePlayHardMode} style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: '3%' }}>
                <Image source={require('../../assets/MiniGame/Enemy_orange_fire.png')} style={{ width: 70, height: 70, marginBottom: '5%' }} resizeMode='stretch' />
                <ImageBackground source={require('../../assets/MiniGame/MenuButton.png')} style={{ width: 100, height: 46, justifyContent: 'center' }}>
                  <Text style={{ ...styles.titleText, fontSize: 18 }}> Hard </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </Modal>
        </Portal>
        <TouchableOpacity onPress={goToScore} style={{ justifyContent: 'center', }}>
          <ImageBackground source={require('../../assets/MiniGame/MenuButton.png')} style={{ width: 100, height: 46, justifyContent: 'center' }}>
            <Text style={{ ...styles.titleText, fontSize: 18 }}> 최고 기록 </Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={showSetting} style={{ justifyContent: 'center', }}>
          <ImageBackground source={require('../../assets/MiniGame/MenuButton.png')} style={{ width: 100, height: 46, justifyContent: 'center' }}>
            <Text style={{ ...styles.titleText, fontSize: 18 }}> 환경 설정 </Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToTutorial} style={{ justifyContent: 'center', }}>
          <ImageBackground source={require('../../assets/MiniGame/MenuButton.png')} style={{ width: 100, height: 46, justifyContent: 'center' }}>
            <Text style={{ ...styles.titleText, fontSize: 18 }}> 게임 방법 </Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={showGameStart} style={{ justifyContent: 'center', marginTop: '5%' }}>
          <ImageBackground source={require('../../assets/MiniGame/StartButton.png')} style={{ width: 120, height: 43.2, justifyContent: 'center' }}>
            <Text style={{ ...styles.titleText, fontSize: 18 }}> Game Start </Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </PaperProvider>
  );
}

const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function ScoreScene({navigation}) {
  const goToMain = () => {
    navigation.navigate("InGame");
  }

  const [visibleScore, setvisibleScore] = useState(true)
  const showEasy = () => setvisibleScore(true)
  const showHard = () => setvisibleScore(false)
  
  const [EasyIcon, setEasyIcon] = useState(require('../../assets/MiniGame/Easy_1.png'))
  const [HardIcon, setHardIcon] = useState(require('../../assets/MiniGame/Hard_1.png'))


  useEffect(() => {
    if(visibleScore)
    {
      setEasyIcon(require('../../assets/MiniGame/Easy_1.png'))
      setHardIcon(require('../../assets/MiniGame/Hard_1.png'))
    }
    else{
      setEasyIcon(require('../../assets/MiniGame/Easy_2.png'))
      setHardIcon(require('../../assets/MiniGame/Hard_2.png'))
    }

  },[visibleScore]);

  return (
    <View style={{flex : 1}}>
      <TouchableOpacity onPress={goToMain}  style={{...StyleSheet.absoluteFill, zIndex: 5, width : 60, height: 54}}>
        <Image  source={require('../../assets/MiniGame/ESC.png')} style={{ margin: 10, marginTop: 22, width : 60, height: 54}} />
      </TouchableOpacity>
      <View style={{ ...styles.ScoreTab, flex: 0.005 }} />
      <View style={styles.ScoreTab}>
        <ImageBackground source={require('../../assets/MiniGame/ScoreBoard.png')} style={{ width: '100%', height: '100%', justifyContent: 'flex-end' }} resizeMode='stretch'>
          <View style={{flex : 5, flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity onPress={showEasy} style={{ justifyContent: 'flex-end', width: 120, height: 43.2, marginHorizontal: '5%', marginTop: '65%' }}>
              <Image source={EasyIcon} style={{ width: 120, height: 43.2, justifyContent: 'center' }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={showHard} style={{ justifyContent: 'flex-end', width: 120, height: 43.2, marginHorizontal: '5%', marginTop: '65%' }}>
              <Image source={HardIcon} style={{ width: 120, height: 43.2, justifyContent: 'center' }} />
            </TouchableOpacity>
          </View>
          {visibleScore == true ? ScoreEasy() : ScoreHard()}
          <View style={{ flex: 2}}/>
        </ImageBackground>
      </View>
    </View>
  );
}

function ScoreEasy() {
  return (
    <View style={{ flex: 3, justifyContent: 'space-between', marginLeft: '15%' }}>
      <Text style={styles.ScoreText}>1.  4:34</Text>
      <Text style={styles.ScoreText}>2.  5:11</Text>
      <Text style={styles.ScoreText}>3.  9:23</Text>
    </View>
  );
}

function ScoreHard() {
  return (
    <View style={{ flex: 3, justifyContent: 'space-between', marginLeft: '15%' }}>
      <Text style={styles.ScoreText}>1.  5:12</Text>
      <Text style={styles.ScoreText}>2.  7:28</Text>
      <Text style={styles.ScoreText}>3.  11:06</Text>
    </View>
  );
}

function TutorialScene({navigation}) {
  const goToMain = () => {
    navigation.navigate("MiniMain");
  }

  const [refViewPager, setrefViewPager] = useState({ ...ViewPager }); // react hook

  return (
    <PaperProvider theme={theme}>
      <TouchableOpacity onPress={goToMain} style={{ ...StyleSheet.absoluteFill, margin: 10, marginTop: 22, zIndex: 5, width: 60, height: 54}}>
        <Image source={require('../../assets/MiniGame/ESC.png')} style={{ width: 60, height: 54 }} />
      </TouchableOpacity>
      <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFDD87' }}>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFDD87' }}>
        <Avatar.Image size={50} source={require('./../../assets/MiniGame/Player.png')} resizeMode="stretch" style={{backgroundColor: '#FF8833' }}/>
        <Text style={{...styles.titleText, fontSize: 30, fontWeight: 'bold'}}> MiniGame </Text>
      </View>
      <ViewPager ref={(viewpager) => { setrefViewPager(viewpager) }} style={{ flex: 4, backgroundColor: '#FFDD87' }} initialPage={0}>
        <View key="0">
          <View style={{ flex: 6.5, alignItems: 'center', marginTop: '5%', backgroundColor: '#FFDD87' }}>
          <ImageBackground source={require('../../assets/MiniGame/TutorialPanel.png')} style={{...StyleSheet.absoluteFill, width: '100%', height: '100%'}} resizeMode='stretch'/>
            <View style={{ flex: 4, alignItems: 'center', margin: '10%', marginTop: '20%' }}>
              <Text style={{ fontSize: 20, fontWeight: "bold", color: 'black', margin: "5%" }}>1. 게임의 목표</Text>
              <Text style={{ fontSize: 19, paddingHorizontal: '5%' }}>상대방을 전부 섬멸, 혹은 항복 시켜 상대로부터 승리한다.</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Entypo name="arrow-bold-left" size={40} color='gray' />
              <Text style={{ fontSize: 20, fontWeight: "bold", color: 'black' }}> 1 / 5 </Text>
              <Entypo onPress={() => { refViewPager.setPage(1) }} name="arrow-bold-right" size={40} color='black' />
            </View>
          </View>
        </View>
        <View key="1">
        <View style={{ flex: 6.5, alignItems: 'center', marginTop: '5%', backgroundColor: '#FFDD87' }}>
          <ImageBackground source={require('../../assets/MiniGame/TutorialPanel.png')} style={{...StyleSheet.absoluteFill, width: '100%', height: '100%'}} resizeMode='stretch'/>
            <View style={{ flex: 4, alignItems: 'center', margin: '10%', marginTop: '20%' }}>
              <Text style={{ fontSize: 20, fontWeight: "bold", color: 'black', margin: "5%" }}>2. 상대방과 인터렉션</Text>
              <Text style={{ fontSize: 19, paddingHorizontal: '5%' }}>플레이어는 암살과 포섭 총 두 가지 인터렉션이 가능하다. </Text>
              <Text />
              <Text style={{ fontSize: 19, paddingHorizontal: '5%' }}>이를 이용하여 상대보다 빠르게 상대 조직의 수를 줄이고, 플레이어의 조직원 수를 늘려야 한다.</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Entypo onPress={() => { refViewPager.setPage(0) }} name="arrow-bold-left" size={40} color='black' />
              <Text style={{ fontSize: 20, fontWeight: "bold", color: 'black' }}> 2 / 5 </Text>
              <Entypo onPress={() => { refViewPager.setPage(2) }} name="arrow-bold-right" size={40} color='black' />
            </View>
          </View>
        </View>
        <View key="2">
        <View style={{ flex: 6.5, alignItems: 'center', marginTop: '5%', backgroundColor: '#FFDD87' }}>
          <ImageBackground source={require('../../assets/MiniGame/TutorialPanel.png')} style={{...StyleSheet.absoluteFill, width: '100%', height: '100%'}} resizeMode='stretch'/>
            <View style={{ flex: 4, alignItems: 'center', margin: '10%', marginTop: '20%' }}>
              <Text style={{ fontSize: 20, fontWeight: "bold", color: 'black', margin: "5%" }}>3. 암살 / 포섭 하기</Text>
              <Text style={{ fontSize: 19, paddingHorizontal: '5%' }}>플레이어는 원하는 상대 조직의 조직원을 터치해 터치한 조직원의 정보를 얻을 수 있다.</Text>
              <Text />
              <Text style={{ fontSize: 19, paddingHorizontal: '5%' }}>또한 이를 참고하여 자신의 자원을 소모하여 암살, 포섭을 할 수 있다.</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Entypo onPress={() => { refViewPager.setPage(1) }} name="arrow-bold-left" size={40} color='black' />
              <Text style={{ fontSize: 20, fontWeight: "bold", color: 'black' }}> 3 / 5 </Text>
              <Entypo onPress={() => { refViewPager.setPage(3) }} name="arrow-bold-right" size={40} color='black' />
            </View>
          </View>
        </View>
        <View key="3">
        <View style={{ flex: 6.5, alignItems: 'center', marginTop: '5%', backgroundColor: '#FFDD87' }}>
          <ImageBackground source={require('../../assets/MiniGame/TutorialPanel.png')} style={{...StyleSheet.absoluteFill, width: '100%', height: '100%'}} resizeMode='stretch'/>
            <View style={{ flex: 4, alignItems: 'center', margin: '10%', marginTop: '20%' }}>
              <Text style={{ fontSize: 20, fontWeight: "bold", color: 'black', margin: "5%" }}>4. 상점 시스템</Text>
              <Text style={{ fontSize: 19, paddingHorizontal: '5%' }}>게임에는 상점 시스템이 존재한다.</Text>
              <Text />
              <Text style={{ fontSize: 19, paddingHorizontal: '5%' }}>상점에는 지속성 아이템과 소모성 아이템이 있고, 이를 게임에서 이용하여 게임의 흐름을 바꿀 수 있다.</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Entypo onPress={() => { refViewPager.setPage(2) }} name="arrow-bold-left" size={40} color='black' />
              <Text style={{ fontSize: 20, fontWeight: "bold", color: 'black' }}> 4 / 5 </Text>
              <Entypo onPress={() => { refViewPager.setPage(4) }} name="arrow-bold-right" size={40} color='black' />
            </View>
          </View>
        </View>
        <View key="4">
        <View style={{ flex: 6.5, alignItems: 'center', marginTop: '5%', backgroundColor: '#FFDD87' }}>
          <ImageBackground source={require('../../assets/MiniGame/TutorialPanel.png')} style={{...StyleSheet.absoluteFill, width: '100%', height: '100%'}} resizeMode='stretch'/>
            <View style={{ flex: 4, alignItems: 'center', margin: '10%', marginTop: '20%' }}>
              <Text style={{ fontSize: 20, fontWeight: "bold", color: 'black', margin: "5%" }}>5. 게임 즐기기</Text>
              <Text style={{ fontSize: 19, paddingHorizontal: '5%' }}>게임을 재미있게 즐겨보자.</Text>
              <Text />
              <Text style={{ fontSize: 19, paddingHorizontal: '5%' }}>클리어타임을 줄이는 것을 목표로 하는 것도 하나의 방법.</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Entypo onPress={() => { refViewPager.setPage(3) }} name="arrow-bold-left" size={40} color='black' />
              <Text style={{ fontSize: 20, fontWeight: "bold", color: 'black' }}> 5 / 5 </Text>
              <Entypo name="arrow-bold-right" size={40} color='gray' />
            </View>
          </View>
        </View>
      </ViewPager>
    </PaperProvider>
  );
}

const GamePlayModal = {
  backgroundColor: '#ffff',
  padding: 5,
  height: "70%",
  width: "70%",
  marginLeft: "15%",
  marginTop: "-15%",
  alignItems: 'center',
  justifyContent: 'center',
};

const GamePlayStack = createStackNavigator();

const personalNames = ["James", "Ana", "Steve", "David", "Sophia", "Sally", "Holy",
  "Anika", "Aster", "Ava", "Baron", "Bono", "Buddy", "Charlie",
  "Cecil", "Carmen", "Dennis", "Doris", "Duke", "Elysia", "Elsa",
  "Eve", "Favian", "Florence", "George", "Helen", "Hubert", "Isis",
];

var money = 1000;
var playTime = 0;

let player = [];

let enemy = [];

var playerUnit = player.length;
var EnemyUnit = enemy.length;
var addUnitAbled = false;
var enemyAttack = false;
var enemyTarget = null;

const updateGameState = () => {

  playTime = playTime + 1;
  if (playTime % 8 == 0) {
    enemyAttack = true;
    enemyTarget = 8;

  }

  if (playTime % 10 == 0) {
    money = money + 100 * playerUnit;
    addUnitAbled = true;
  }

}

class ShowStatus_UnderBar extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.inc, 250)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  inc = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }

  render() {
    return (
      <>
        <ImageBackground source={require('../../assets/MiniGame/UI_under.png')} style={{ position: 'absolute', width: '100%', height: '100%' }} resizeMode='stretch' />
        <View style={{ width: '70%', height: '100%', paddingLeft: '7%', justifyContent: 'space-evenly' }}>
          <View style={{ flexDirection: 'row', marginTop: '4%' }}>
            <Image source={require('../../assets/MiniGame/Clock.png')} style={{ width: 30, height: 30 }} resizeMode='stretch' />
            <Text style={styles.titleText}> {parseInt(playTime / 60)}:{parseInt(playTime % 60)}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('../../assets/MiniGame/Money.png')} style={{ width: 27, height: 27 }} resizeMode='stretch' />
            <Text style={styles.titleText}> {money}</Text>
          </View>
        </View>
        <View style={{ width: '30%', height: '100%', paddingLeft: '3%', justifyContent: 'space-evenly' }}>
          <View style={{ flexDirection: 'row', marginTop: '4%' }}>
            <Image source={require('./../../assets/MiniGame/Enemy_orange.png')} style={{ width: 25, height: 25 }} resizeMode="stretch" />
            <Text style={styles.titleText}> {EnemyUnit}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('./../../assets/MiniGame/Player.png')} style={{ width: 25, height: 25 }} resizeMode="stretch" />
            <Text style={styles.titleText}> {playerUnit}</Text>
          </View>
        </View>

      </>
    )
  }
}

class UpdateStatus_UnderBar extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.inc, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  inc = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
    
    if(this.props.GameFinished == false)
      updateGameState()
  }

  render() {
    return (
      <ShowStatus_UnderBar />
    )
  }
}

function GamePlayScene() {
  return (
    <GamePlayStack.Navigator>
      <GamePlayStack.Screen name="GMain" component={GamePlayMainScene} options={{ headerShown: false }} />
      <GamePlayStack.Screen name="Shop" component={ShopScene} />
    </GamePlayStack.Navigator>
  );
}

const Box = (props) => {
  const x = useSharedValue(props.x);
  const y = useSharedValue(props.y);
  const color = useSharedValue("cyan");
  const fixedScale = props.scale;
  const scale = useSharedValue(fixedScale);
  const [active, setActive] = useState(false);
  const team = props.team;
  const [imageSource, setImageSource] = useState(require('./../../assets/MiniGame/Player.png'));

  useEffect(() => {
    loadImage();
    ordinary();

  }, []);

  const loadImage = () => {
    if (team == "Player")
      setImageSource(require('./../../assets/MiniGame/Player.png'));
    else if (team == "Enemy")
      setImageSource(require('./../../assets/MiniGame/Enemy_orange.png'));
  }

  const ordinary = () => {
    y.value = repeat(sequence(withTiming(y.value + 2, { duration: 1000 }), withTiming(y.value - 2, { duration: 1000 })), 0, true);

  }


  useEffect(() => {
    activate(props.active);
    if (active == false)
      jump();
    setTimeout(() => {
      props.cleanupAction();
    }, 200);
  }, [props.active]);
  if (props.action == true) {
    x.value = repeat(withTiming(enemyTarget.x, { duration: 1000 }), 2, true);
    y.value = repeat(withTiming(enemyTarget.y + 202, { duration: 1000 }), 2, true);
  }
  const jump = () => {
    //x.value = withTiming(x.value + 10, {duration: 200, ease: Easing.linear});
    //y.value = repeat(withTiming(y.value-80, { duration: 100}), 2, true);
    scale.value = sequence(withTiming(fixedScale + 0.3, { duration: 200 }), withTiming(fixedScale, { duration: 200 }));  //위의 repeat과 같은 동작
  }

  const setColor = (c) => color.value = c;

  const activate = (newActive = true) => {
    setColor(newActive ? "orange" : "cyan");
    setActive(newActive);
  }

  const panHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
      ctx.dragged = false;
    },
    onActive: (event, ctx) => {
      if (ctx.dragged == false) {
        ctx.dragged = true;
        /* dragging을 처음 시작하게 된다면 */
      }
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onFinish: (_, ctx) => {
      if (ctx.dragged == true) {
        props.update(props.nickname, x.value, y.value);
        x.value = ctx.startX;
        y.value = ctx.startY;
        /* dragging을 했다면 */
        ordinary()
      }
    }
  });

  const onTap = () => {
    //jump();
    props.activate(!active);
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderRadius: 5,
      elevation: 0,
      //backgroundColor: color.value,
      left: 0,
      top: 0,
      transform: [
        { translateX: x.value },
        { translateY: y.value },
        { scale: scale.value }
      ]
    }
  });
  if (team == "Player")
    return (
      <PanGestureHandler onGestureEvent={panHandler} >
        <Animated.View style={[{ ...StyleSheet.absoluteFill }, animatedStyle]} >
          <TouchableWithoutFeedback
            onPress={onTap}>
            <Image source={imageSource} style={styles.itembox2} resizeMode="stretch" />
          </TouchableWithoutFeedback>
        </Animated.View>
      </PanGestureHandler>
    );
  else if (team == "Enemy")
    return (
      <Animated.View style={[{ ...StyleSheet.absoluteFill }, animatedStyle]} >
        <TouchableWithoutFeedback
          onPress={onTap}>
          <Image source={imageSource} style={styles.itembox2} resizeMode="stretch" />
        </TouchableWithoutFeedback>
      </Animated.View>
    );
}


let interactionInfo = [];

const Boxes = (props) => {
  for (let i = 0; i < props.unit.length; i++) {
    switch (props.unit[i].name) {
      case 0:
        props.unit[i].scale = 0.8
        props.unit[i].x = 0
        props.unit[i].y = 0
        break;
      case 1:
        props.unit[i].scale = 0.5
        props.unit[i].x = -80
        props.unit[i].y = 0
        break;
      case 2:
        props.unit[i].scale = 0.5
        props.unit[i].x = -40
        props.unit[i].y = -50
        break;
      case 3:
        props.unit[i].scale = 0.5
        props.unit[i].x = 40
        props.unit[i].y = -50
        break;
      case 4:
        props.unit[i].scale = 0.5
        props.unit[i].x = 80
        props.unit[i].y = 0
        break;
      case 5:
        props.unit[i].scale = 0.5
        props.unit[i].x = 40
        props.unit[i].y = 50
        break;
      case 6:
        props.unit[i].scale = 0.5
        props.unit[i].x = -40
        props.unit[i].y = 50
        break;
    }
  }

  const cleanupAction = () => {
    let myBoxes = [...props.unit]; // spread operator ...
    myBoxes.forEach((box) => {
      if (box.active == true)
        box.active = false;
    });
    props.unit = myBoxes;
  }

  const activate = (name, newActive) => {
    let myBoxes = [...props.unit]; // spread operator ...
    myBoxes.forEach((box) => {
      if (box.name == name)
        box.active = newActive;
    });
    props.unit = myBoxes;
  }

  const intersect = (x, y, s, x1, y1, s1) =>
    y + s >= y1 && y1 + s1 >= y && x + s >= x1 && x1 + s1 >= x;

  const update = (nickname, x, y) => {
    if (props.team != "Player")
      return;

    let EnemyBoxes = JSON.parse(JSON.stringify(enemy));

    if (props.team == "Player")
      EnemyBoxes.map((item) => item.y = item.y - 252);

    for (let i = 0; i < props.unit.length; i++) {
      let box = props.unit[i];
      if (box.nickname != nickname) { continue; }
      let nearEnemy = [-1, 1000]; // nearEnemy[0]은 Box의 번호, nearEnemy[1]은 거리를 의미
      for (let j = 0; j < EnemyBoxes.length; j++) {
        let length = Math.abs(Math.abs(x - EnemyBoxes[j].x) + Math.abs(y - EnemyBoxes[j].y));
        if (intersect(x, y, 100 * box.scale, EnemyBoxes[j].x, EnemyBoxes[j].y, 100 * EnemyBoxes[j].scale) &&
          nearEnemy[1] > length) {
          nearEnemy = [j, length];
          props.showEnemyInteraction();
        }
      }

      if (nearEnemy[0] >= 0) {
        interactionInfo.splice(0);
        interactionInfo.push(props.unit[i]);
        interactionInfo.push(EnemyBoxes[nearEnemy[0]]);
        interactionInfo.push(nearEnemy[0]);

        props.showEnemyInteraction();
        props.loadInteractionInfomation();
        props.unitInfoUpdate(player, enemy);
      }
    }
  }

  let attackUnit = 7;
  if (props.team == "Enemy")
    if (props.AttackAbled == true && player.length != 0) {
      attackUnit = Math.floor(Math.random() * 100) % 7;
      enemyTarget = player[Math.floor(Math.random() * 100) % player.length]
    }

  if(props.team == "Player")
    for (let i = 0; i < props.unit.length; i++)  
      console.log(player[i].name)

  let boxesRender = [];
  for (let i = 0; i < props.unit.length; i++) {
    let box = props.unit[i];
    boxesRender.push(<Box name={box.name} key={box.name} nickname={box.nickname}
      x={box.x} y={box.y} scale={box.scale}
      active={box.active} action={attackUnit == box.name ? true : false}
      team={props.team} cleanupAction={cleanupAction}
      activate={(flag) => activate(box.name, flag)}
      update={update}
    />
    );
  }

  return (
    <View style={{ alignSelf: 'center', width: '20%', height: '15%' }}>
      { boxesRender}
    </View>
  );

}


function GamePlayMainScene({ navigation }) {

  const [settingVisible, setSettingVisible] = useState(false);
  const showSetting = () => setSettingVisible(true);
  const hideSetting = () => setSettingVisible(false);

  const [EnemyInteractionVisible, setEnemyInteractionVisible] = useState(false);
  const showEnemyInteraction = () => {
    setEnemyInteractionVisible(true);
  }
  const hideEnemyInteraction = () => setEnemyInteractionVisible(false);


  const goToShop = () => {
    navigation.navigate("Shop");
  }

  const goToMain = () => {
    navigation.navigate("Main");
  }

  const [interactionInfomation, setInteractionInfomation] = useState(null);
  const loadInteractionInfomation = () => {
    let info =
      <View style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
        <View style={{ marginHorizontal: '11.8%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 25, textAlign: 'center'}}>{interactionInfo[0].nickname}</Text>
          <Image source={require('./../../assets/MiniGame/Player.png')} style={{ width: 50, height: 50, marginTop: '5%' }} resizeMode="stretch" />
        </View>
        <View style={{ marginHorizontal: '11.8%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 25, textAlign: 'center'}}>{interactionInfo[1].nickname}</Text>
          <Image source={require('./../../assets/MiniGame/Enemy_orange.png')} style={{ width: 50, height: 50, marginTop: '5%' }} resizeMode="stretch" />
        </View>
      </View>;

    setInteractionInfomation(info);
  }
  const Assassination = () => {
    if (money < 400)
      return;

    setEnemyInteractionVisible(false);

    money -= 400;

    if(Math.floor(Math.random() * 100) % 5 > 2) // 40% 확률 암살
      return;

    for (let i = 0; i < enemy.length; i++) {
      console.log(enemy[i].name, interactionInfo[1].name)
      if (enemy[i].name == interactionInfo[1].name) {
        enemy.splice(i, 1);
        break;
      }
    }
    setEnemyUnitInfo(<Boxes team="Enemy" unit={enemy} AttackAbled={enemyAttackAbled} />);
    playerUnit = player.length;
    EnemyUnit = enemy.length;
  }

  const Conciliate = () => {
    if (money < 700)
      return;

    setEnemyInteractionVisible(false);

    money -= 700;

    if(Math.floor(Math.random() * 100) % 5 < 2) // 60% 확률 회유
      return;

    for (let i = 0; i < enemy.length; i++) {
      console.log(enemy[i].name, interactionInfo[1].name)
      if (enemy[i].name == interactionInfo[1].name) {
        let unit = JSON.parse(JSON.stringify(enemy.splice(i, 1)[0]));
        for (let i = 0; i < 7; i++) {
          if (player.length <= i) {
            unit.name = i;
            player.push(unit)
            player.sort(function (a, b) { // 오름차순
              return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            })
            break;
          }

          if (player[i].name == i)
            continue;

          unit.name = i;
          player.push(unit)
          player.sort(function (a, b) { // 오름차순
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
          })
          break;
        }
        break;
      }
    }
    setEnemyUnitInfo(<Boxes team="Enemy" unit={enemy} AttackAbled={enemyAttackAbled} />);
    setPlayerUnitInfo(<Boxes team="Player" unit={player} showEnemyInteraction={showEnemyInteraction}
      loadInteractionInfomation={loadInteractionInfomation} unitInfoUpdate={unitInfoUpdate} />);
    playerUnit = player.length;
    EnemyUnit = enemy.length;
  }

  const unitInfoUpdate = (boxes, EnemyBoxes) => {
    playerUnit = boxes.length;
    EnemyUnit = EnemyBoxes.length;
  }
  unitInfoUpdate(player,enemy)

  const [enemyAttackAbled, setenemyAttackAbled] = useState(false)
  const [enemyUnitInfo, setEnemyUnitInfo] = useState(<Boxes team="Enemy" unit={enemy} AttackAbled={enemyAttackAbled} />)
  const [playerUnitInfo, setPlayerUnitInfo] = useState(<Boxes team="Player" unit={player} showEnemyInteraction={showEnemyInteraction}
    loadInteractionInfomation={loadInteractionInfomation} unitInfoUpdate={unitInfoUpdate} />)


  useEffect(() => {
    if (enemyAttackAbled == true) {
      setEnemyUnitInfo(<Boxes team="Enemy" unit={enemy} AttackAbled={enemyAttackAbled} />)
      setenemyAttackAbled(false)
    }

  }, [enemyAttackAbled]);


  const updateTimer = () => {
    const addUnit = (items) => {
      let units = [...items];
      if (units.length < 7) {
        let unit = {
          name: 0, nickname: personalNames[Math.floor(Math.random() * 100) % personalNames.length],
          x: 0, y: 0, scale: 0.8, active: false, team: ""
        }
        for (let i = 0; i < 7; i++) {
          if (units.length <= i) {
            unit.name = i;
            units.push(unit)
            units.sort(function (a, b) { // 오름차순
              return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            })
            break;
          }

          if (units[i].name == i)
            continue;

          unit.name = i;
          units.push(unit)
          units.sort(function (a, b) { // 오름차순
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
          })
          break;
        }
      }
      return units;
    }
    if (enemyAttack == true) {
      enemyAttack = false;
      setenemyAttackAbled(true);
      setTimeout(() => {
        if (Math.floor(Math.random() * 100) % 3 < 2) {
          for (let i = 0; i < player.length; i++) {
            if (player[i].name == enemyTarget.name) {
              player.splice(i, 1);
              break;
            }
          }
          setPlayerUnitInfo(<Boxes team="Player" unit={player} showEnemyInteraction={showEnemyInteraction}
            loadInteractionInfomation={loadInteractionInfomation} unitInfoUpdate={unitInfoUpdate} />);
          playerUnit = player.length;
          EnemyUnit = enemy.length;
        }
        else {
          for (let i = 0; i < enemy.length; i++) {
            if (player[i].name == enemyTarget.name) {
              let unit = JSON.parse(JSON.stringify(player.splice(i, 1)[0]));
              for (let i = 0; i < 7; i++) {
                if (enemy.length <= i) {
                  unit.name = i;
                  enemy.push(unit)
                  enemy.sort(function (a, b) { // 오름차순
                    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
                  })
                  break;
                }
      
                if (enemy[i].name == i)
                  continue;
      
                unit.name = i;
                enemy.push(unit)
                enemy.sort(function (a, b) { // 오름차순
                  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
                })
                break;
              }
              break;
            }
          }
        }
      }, 1000);
    }

    if ((playTime % 15) == 0 && addUnitAbled == true) {

      addUnitAbled = false;
      player = addUnit(player)
      enemy = addUnit(enemy)
      setEnemyUnitInfo(<Boxes team="Enemy" unit={enemy} AttackAbled={enemyAttackAbled} />);
      setPlayerUnitInfo(<Boxes team="Player" unit={player} showEnemyInteraction={showEnemyInteraction}
        loadInteractionInfomation={loadInteractionInfomation} unitInfoUpdate={unitInfoUpdate} />);
      playerUnit = player.length;
      EnemyUnit = enemy.length;
    }
  }

  
  const [successVisible, setSuccessVisible] = useState(false);
  const [failVisible, setfailVisible] = useState(false);

  const hideSuccess = () => setSuccessVisible(false);

  if(successVisible == false && enemy.length == 0)
    setSuccessVisible(true)
  
  if(failVisible == false && player.length == 0)
    setfailVisible(true)


  return (
    <PaperProvider theme={theme}>
      {(successVisible == true || failVisible == true) ? null : <Timer updateTimer={updateTimer} />}
      <Portal>
        {/* <Modal visible={settingVisible} onDismiss={hideSetting}
          contentContainerStyle={GamePlayModal} >
          <MaterialCommunityIcons style={{ flex: 1.15, marginRight: '80%' }} onPress={hideSetting}
            name="file-excel-box" size={50} color='black' />
          <View style={{ flex: 8, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
            <Octicons name="primitive-dot" size={130} color="black" />
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: "20%" }}>Setting</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "gray", marginBottom: "20%" }}>소리</Text>

            <Text style={{ fontSize: 20, fontWeight: "bold", color: 'gray', marginBottom: "30%" }}>밝기</Text>
          </View>
        </Modal> */}
        <Modal visible={EnemyInteractionVisible} onDismiss={hideEnemyInteraction}
          contentContainerStyle={{ ...ImageModalStyle, marginLeft: '3%', width: '94%', height: '59%' }}>
          <ImageBackground source={require('../../assets/MiniGame/InterectionPanel.png')} style={{ position: 'absolute', width: 400, height: 412 }} />
          <View style={{
            ...StyleSheet.absoluteFill,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: '#ffffff00',
          }}>
            {interactionInfomation}
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: "55%",
              height: "20%",
            }}>
              <TouchableOpacity onPress={Assassination} style={{ ...StyleSheet.absoluteFill, flex: 1, width: 210, height: 78, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/MiniGame/Assassination.png')} style={{ position: 'absolute', width: 210, height: 78 }} />
              </TouchableOpacity>
            </View>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: "55%",
              height: "20%",
            }}>
              <TouchableOpacity onPress={Conciliate} style={{ ...StyleSheet.absoluteFill, flex: 1, width: 210, height: 78, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/MiniGame/Conciliation.png')} style={{ position: 'absolute', width: 210, height: 78 }} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal visible={successVisible}
          contentContainerStyle={{ ...ImageModalStyle, marginLeft: '3%', width: '94%', height: '59%' }}>
          <ImageBackground source={require('../../assets/MiniGame/SuccessPanel.png')} style={{ position: 'absolute', width: 400, height: 412 }} />
          <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center', marginLeft: '25%', marginTop: '17%' }}>
            <Text style={{ fontSize: 35, fontWeight: 'bold' }}>  4</Text>
            <Text style={{ fontSize: 35, fontWeight: 'bold', marginTop: '10%' }}>  4</Text>
          </View>
          <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
            <TouchableOpacity onPress={goToMain} style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: '3%', marginBottom: '5%'}}>
              <ImageBackground source={require('../../assets/MiniGame/MenuButton.png')} style={{ width: 160, height: 74 }} >
                <Text style={{ ...styles.titleText, fontSize: 27, fontWeight: 'bold', marginTop: '5%' }}>보상 받기</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal visible={failVisible}
          contentContainerStyle={{ ...ImageModalStyle, marginLeft: '3%', width: '94%', height: '59%' }}>
          <ImageBackground source={require('../../assets/MiniGame/FailPanel.png')} style={{ position: 'absolute', width: 400, height: 412 }} />
          <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center', marginLeft: '25%', marginTop: '17%' }}>
            <Text style={{ fontSize: 35, fontWeight: 'bold' }}>  0</Text>
            <Text style={{ fontSize: 35, fontWeight: 'bold', marginTop: '10%' }}>  0</Text>
          </View>
          <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
            <TouchableOpacity onPress={goToMain} style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: '3%', marginBottom: '5%'}}>
              <ImageBackground source={require('../../assets/MiniGame/MenuButton.png')} style={{ width: 160, height: 74 }} >
                <Text style={{ ...styles.titleText, fontSize: 27, fontWeight: 'bold', marginTop: '5%' }}>넘어가기</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
      <Setting visible={settingVisible} hide={hideSetting} goToMain={goToMain} />

      <View style={{
        flexWrap: "wrap",
        flex: 1.5,
        flexDirection: 'row',
        paddingTop: '1%',
        backgroundColor: 'darkseagreen',
      }}>
        <View style={{
          flex: 1,
          height: '100%',
          justifyContent: 'flex-start',
          alignContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          <TouchableOpacity onPress={goToShop} style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: '3%' }}>
            <Image source={require('../../assets/MiniGame/icon_shop.png')} style={{ width: 50, height: 50 }} resizeMode='stretch' />
          </TouchableOpacity>
          
        </View>
        <View style={{
          flex: 4,
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        </View>

        <View style={{
          flex: 0.8,
        }}>
          <TouchableOpacity onPress={showSetting} style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: '3%' }}>
            <Image source={require('../../assets/MiniGame/icon_setting.png')} style={{ width: 50, height: 50 }} resizeMode='stretch' />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 7, justifyContent: "space-between", backgroundColor: 'darkseagreen', }}>
        {enemyUnitInfo}
        {playerUnitInfo}
        {/* <Boxes team="Enemy" unit = {enemyUnitInfo} />
        <Boxes team="Player" unit = {playerUnitInfo} showEnemyInteraction={showEnemyInteraction}
         loadInteractionInfomation={loadInteractionInfomation} unitInfoUpdate={unitInfoUpdate}/> */}
        <View style={{ flex: 0.23, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <UpdateStatus_UnderBar GameFinished = {(successVisible == true || failVisible == true)}/>
        </View>
      </View>
    </PaperProvider>
  );
}

const purchaseItemModal = {
  backgroundColor: 'white',
  padding: 5,
  height: "30%",
  width: "70%",
  marginLeft: "15%",
  marginTop: "-15%",
  alignItems: 'center',
  justifyContent: 'center',
};


let canBuyItemNum = [1, 2];
let canSellItemNum = [1];
function ShopScene() {

  const [purchaseItemlistVisible, setpurchaseItemlistVisible] = useState(true);
  const showpurchaseItemlistVisible = () => setpurchaseItemlistVisible(true);
  const showsellItemlistVisible = () => setpurchaseItemlistVisible(false);
  useEffect(() => { }, [purchaseItemlistVisible]);

  const [purchaseItem1Visible, setpurchaseItem1Visible] = useState(false);
  const showpurchaseItem1 = () => setpurchaseItem1Visible(true);
  const hidepurchaseItem1 = () => setpurchaseItem1Visible(false);

  const [sellItem1Visible, setSellItem1Visible] = useState(false);
  const showSellItem1 = () => setSellItem1Visible(true);
  const hideSellItem1 = () => setSellItem1Visible(false);

  useEffect(() => { }, [canBuyItems]);
  useEffect(() => { }, [canSellItems]);

  let canBuyItemlist = [];
  let canSellItemlist = [];

  const purchaseItem1 = () => {
    if (money < 2000)
      return;
    money = money - 2000;

    canSellItemNum.push(canBuyItemNum.splice(0, 1)[0]);
    pushCanBuyItemlist();
    pushCanSellItemlist();
    setcanBuyItems(canBuyItemlist);
    setcanSellItems(canSellItemlist);
    console.log(canBuyItemNum);
    console.log(canSellItemNum);
    hidepurchaseItem1();
  };

  const sellItem1 = () => {
    money = money + 200;

    canBuyItemNum.push(canSellItemNum.splice(0, 1)[0]);
    pushCanBuyItemlist();
    pushCanSellItemlist();
    setcanBuyItems(canBuyItemlist);
    setcanSellItems(canSellItemlist);
    console.log(canBuyItemNum);
    console.log(canSellItemNum);
    hideSellItem1();
  };


  const pushCanBuyItemlist = () => {
    canBuyItemlist.splice(0);
    var indexnumber = 0;
    canBuyItemNum.forEach((number) => {
      switch (number) {
        case 1:
          canBuyItemlist.push(
            <Pressable onPress={showpurchaseItem1} style={styles.itembox} key={indexnumber}>
              <Image source={require('./../../assets/item1.png')} style={styles.itembox2} resizeMode="stretch" />
            </Pressable>);
          break;
        case 2:
          canBuyItemlist.push(
            <Pressable onPress={showpurchaseItem1} style={styles.itembox} key={indexnumber}>
              <Image source={require('./../../assets/item2.png')} style={styles.itembox2} resizeMode="stretch" />
            </Pressable>);
          break;
      }
      indexnumber++;
    });
  }

  const pushCanSellItemlist = () => {
    canSellItemlist.splice(0);
    var indexnumber = 0;
    canSellItemNum.forEach((number) => {
      switch (number) {
        case 1:
          canSellItemlist.push(
            <Pressable onPress={showSellItem1} style={styles.itembox} key={indexnumber}>
              <Image source={require('./../../assets/item1.png')} style={styles.itembox2} resizeMode="stretch" />
            </Pressable>);
          break;
        case 2:
          canSellItemlist.push(
            <Pressable onPress={showSellItem1} style={styles.itembox} key={indexnumber}>
              <Image source={require('./../../assets/item2.png')} style={styles.itembox2} resizeMode="stretch" />
            </Pressable>);

          break;
      }
      indexnumber++;
    });
  }

  pushCanBuyItemlist();
  const [canBuyItems, setcanBuyItems] = useState(canBuyItemlist);

  pushCanSellItemlist();
  const [canSellItems, setcanSellItems] = useState(canSellItemlist);
  return (
    <PaperProvider theme={theme}>
      <Portal>
        <Modal visible={purchaseItem1Visible} onDismiss={hidepurchaseItem1}
          contentContainerStyle={purchaseItemModal}>

          <View style={{
            ...StyleSheet.absoluteFill,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: '#5A5A5A',
            borderWidth: 3,
          }}>
            <MaterialCommunityIcons style={{ flex: 1, marginRight: '80%' }} onPress={hidepurchaseItem1}
              name="file-excel-box" size={50} color='black' />
            <View style={{ flex: 1.3, alignItems: 'center', }}>
              <Text style={styles.titleText}>지휘자 목걸이</Text>
              <View style={{ flexDirection: "row", alignItems: 'center', }}>
                <MaterialCommunityIcons name="coin" size={25} color="black" />
                <Text style={styles.titleText}> 2000</Text>
              </View>
            </View>
            <View style={{
              flex: 1.5,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: "row",
            }}>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: "25%",
                height: "60%",
                backgroundColor: 'white',
                borderWidth: 3,
                marginHorizontal: '10%',
              }}>
                <Pressable onPress={purchaseItem1} style={{ ...StyleSheet.absoluteFill, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 20 }}>구입</Text>
                </Pressable>
              </View>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: "25%",
                height: "60%",
                backgroundColor: 'white',
                borderWidth: 3,
                marginHorizontal: '10%',
              }}>
                <Pressable onPress={hidepurchaseItem1} style={{ ...StyleSheet.absoluteFill, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 20 }}>취소</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Modal visible={sellItem1Visible} onDismiss={hideSellItem1}
          contentContainerStyle={purchaseItemModal}>

          <View style={{
            ...StyleSheet.absoluteFill,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: '#5A5A5A',
            borderWidth: 3,
          }}>
            <MaterialCommunityIcons style={{ flex: 1, marginRight: '80%' }} onPress={hideSellItem1}
              name="file-excel-box" size={50} color='black' />
            <View style={{ flex: 1.3, alignItems: 'center', }}>
              <Text style={styles.titleText}>지휘자 목걸이</Text>
              <View style={{ flexDirection: "row", alignItems: 'center', }}>
                <MaterialCommunityIcons name="coin" size={25} color="black" />
                <Text style={styles.titleText}> 2000</Text>
              </View>
            </View>
            <View style={{
              flex: 1.5,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: "row",
            }}>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: "25%",
                height: "60%",
                backgroundColor: 'white',
                borderWidth: 3,
                marginHorizontal: '10%',
              }}>
                <Pressable onPress={sellItem1} style={{ ...StyleSheet.absoluteFill, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 20 }}>판매</Text>
                </Pressable>
              </View>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: "25%",
                height: "60%",
                backgroundColor: 'white',
                borderWidth: 3,
                marginHorizontal: '10%',
              }}>
                <Pressable onPress={hideSellItem1} style={{ ...StyleSheet.absoluteFill, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 20 }}>취소</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </Portal>
      <View style={{ flex: 7, justifyContent: "space-between", }}>
        <View style={{ ...styles.itembox, flex: 1.8, justifyContent: "space-evenly" }}>
          {(purchaseItemlistVisible == true) ? canBuyItems : canSellItems}
        </View>
        <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <Button onPress={showpurchaseItemlistVisible} mode="contained">구입</Button>
          <Button onPress={showsellItemlistVisible} mode="contained">판매</Button>
        </View>
        <View style={{ flex: 0.37, flexDirection: 'row' }}>
          <ShowStatus_UnderBar />
        </View>
      </View>
    </PaperProvider>
  );
}

const Tab = createBottomTabNavigator();

export default function MiniGameMain() {
  return (
      <Tab.Navigator>
        <Tab.Screen name='InGame' component={InGameScene} options={{tabBarVisible: false}} />
        <Tab.Screen name='GamePlay' component={GamePlayScene}  options={{tabBarVisible: false}}/>
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startSceneContainer: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainSceneContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFDD87',
  },
  mainSceneTitleContainer: {
    flex: 0.5,
    paddingTop: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFDD87',
  },
  ScoreSceneContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFDD87',
  },
  ScoreTab: {
    flex: 1,
    
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFDD87',
  },
  titleText: {
    fontSize: 24,
    //fondWeight: 'bold',     // 이거 일단 안됨.
    color: 'black',
    textAlign: 'center',  // 가로방향 텍스트 위치맞추기
    textAlignVertical: 'center', // 세로방향 텍스트 위치맞추기
  },
  ScoreText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  GamePlayLeftTopIcon: {
    padding: 10,
    alignItems: 'flex-start',

  },
  GamePlayRightTopIcon: {
    padding: 10,
    alignItems: 'flex-end',
  },
  GamePlayEnemyIcon: {
    padding: 10,
    alignItems: 'flex-end',
  },
  itembox: {
    alignSelf: 'center',
    height: '30%',
    width: '80%',
    justifyContent: 'center',
  },
  itembox2: {
    alignSelf: 'center',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    resizeMode: "stretch"
  },
  enhancebox: {
    alignSelf: 'center',
    height: '85%',
    width: '100%',
    justifyContent: 'center',
  },
});