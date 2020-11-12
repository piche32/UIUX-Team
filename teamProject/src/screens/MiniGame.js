import { StatusBar } from 'expo-status-bar';
import React, {useState, useRef, version} from 'react';
import { StyleSheet, Text, View, Button, Pressable, ScrollView, Image} from 'react-native';
import{NavigationContainer} from '@react-navigation/native';
import{createStackNavigator} from '@react-navigation/stack';
import{createDrawerNavigator} from '@react-navigation/drawer';
import{MaterialCommunityIcons, MaterialIcons, Entypo, Octicons} from '@expo/vector-icons';
import{DefaultTheme, Avatar, Modal, Portal, Provider as PaperProvider, DataTable, List} from 'react-native-paper';
import{createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TouchableHighlight } from 'react-native-gesture-handler';



function StartScene({navigation}){
    const pressBT = () => {
        navigation.navigate("InGame");
    }
    return(
      <View style = {styles.startSceneContainer}>
        <MaterialCommunityIcons name="human-handsdown" size ={126} color="white"/>
        <MaterialCommunityIcons name="flower" size = {50} color='white'/>
        <Button onPress={pressBT} title="START"/>
      </View>
    );
  }
  
  const Stack = createStackNavigator();

  function InGameScene(){
    
    return(
      <Stack.Navigator>
        <Stack.Screen name = "Main" component = {MainScene}/>
        <Stack.Screen name = "Book" component = {BookScene}/>
        <Stack.Screen name = "Score" component = {ScoreScene}/>
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
    backgroundColor: 'white',
    padding: 20,
    height: "70%",
    width: "70%",
    marginLeft: "15%",
    alignItems: 'center',
    justifyContent: 'center',
};

  function MainScene({ navigation }) {
    const [settingVisible, setSettingVisible] = useState(false);
    const showSetting = () => setSettingVisible(true);
    const hideSetting = () => setSettingVisible(false);

    const [TutorialVisible1, setTutorialVisible1] = useState(false);
    const [TutorialVisible2, setTutorialVisible2] = useState(false);
    const [TutorialVisible3, setTutorialVisible3] = useState(false);
    const [TutorialVisible4, setTutorialVisible4] = useState(false);
    const [TutorialVisible5, setTutorialVisible5] = useState(false);
    const showTutorial = () => setTutorialVisible1(true);
    const hideTutorial = () => setTutorialVisible5(false);
    const changeTutorialModal = () => {
        if (TutorialVisible1) {
            setTutorialVisible1(false);
            setTutorialVisible2(true);
        } else if (TutorialVisible2) {
            setTutorialVisible2(false);
            setTutorialVisible3(true);
        } else if (TutorialVisible3) {
            setTutorialVisible3(false);
            setTutorialVisible4(true);
        } else if (TutorialVisible4) {
            setTutorialVisible4(false);
            setTutorialVisible5(true);
        } else{hideTutorial}
    }
    
    const [GameStartVisible, setGameStartVisible] = useState(false);
    const showGameStart = () => setGameStartVisible(true);
    const hideGameStart = () => setGameStartVisible(false);

    const goToGamePlay = () => {
      navigation.navigate("GamePlay");
  }

    const drawerBook = () => {
        navigation.navigate("Book");
    }
    const goToScore = () => {
        navigation.navigate("Score");
    }

    const ref = useRef(null);

    return (
        <PaperProvider theme={theme}>
            <View style={styles.mainSceneTitleContainer}>
                <MaterialCommunityIcons name="bug" size = {80} color='black'/>
                <Text style={styles.titleText}> MiniGame </Text>    
            </View>

            <View style={styles.mainSceneContainer}>
                <Portal>
                    <Modal visible={settingVisible} onDismiss={hideSetting}
                        contentContainerStyle={defaultModalStyle}>
                          <View style = {{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                          <Octicons name="primitive-dot" size={130} color="black" style = {{top: "5%"}} />
                          <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: "20%"}}>Setting</Text>
                          <Text style={{fontSize: 20, fontWeight: "bold", color: "gray", marginBottom: "20%"}}>소리</Text>
                          
                          <Text style={{fontSize: 20, fontWeight: "bold", color: 'gray', marginBottom: "30%"}}>밝기</Text>
                          </View>
                            
                    </Modal>
                    <Modal visible={TutorialVisible1} onDismiss={changeTutorialModal}
                        contentContainerStyle={defaultModalStyle}>
                            <MaterialCommunityIcons name="bug" size = {80} color='black'/>
                            <Text style={styles.titleText}> Tutorial </Text>
                            <View>
                            <Text>1. 게임의 목표</Text>
                            <Text>상대방을 전부 섬멸, 혹은 항복 시켜 상대로부터 승리한다.</Text>
                            </View>
                    </Modal>
                    <Modal visible={TutorialVisible2} onDismiss={changeTutorialModal}
                        contentContainerStyle={defaultModalStyle}>
                        <MaterialCommunityIcons name="bug" size = {80} color='black'/>
                            <Text style={styles.titleText}> Tutorial </Text>
                            <View>
                            <Text>2. 상대방과 인터렉션</Text>
                            <Text></Text>
                            <Text>플레이어는 암살과 회유 총 두 가지 인터렉션을 사용하여 상대 조직의 수를 줄이고, 플레이어의 조직원 수를 늘릴 수 있다.</Text>
                            <Text>물론, 상대 또한 똑같이 플레이어의 조직원에게 암살, 회유를 시도가 가능하다.</Text>
                            </View>
                    </Modal>
                    <Modal visible={TutorialVisible3} onDismiss={changeTutorialModal}
                        contentContainerStyle={defaultModalStyle}>
                        <MaterialCommunityIcons name="bug" size = {80} color='black'/>
                            <Text style={styles.titleText}> Tutorial </Text>
                            <View>
                            <Text>3. 암살 / 회유 하기</Text>
                            <Text>플레이어는 원하는 상대 조직의 조직원을 터치해 터치한 조직원의 정보를 얻을 수 있다.</Text>
                            <Text></Text>
                            <Text>또한 이를 참고하여 자신의 자원을 소모하여 암살, 회유를 할 수 있다.</Text>
                            </View>
                    </Modal>
                    <Modal visible={TutorialVisible4} onDismiss={changeTutorialModal}
                        contentContainerStyle={defaultModalStyle}>
                        <MaterialCommunityIcons name="bug" size = {80} color='black'/>
                            <Text style={styles.titleText}> Tutorial </Text>
                            <View>
                            <Text>4. 상점, 능력치</Text>
                            <Text>게임에는 상점과 능력치가 존재한다.</Text>
                            <Text></Text>
                            <Text>상점에는 지속성 아이템과 소모성 아이템이 있고, 능력치는 플레이어가 강화한 능력치에 따라 게임의 플레이를 변화할 수 있다.</Text>
                            </View>
                    </Modal>
                    <Modal visible={TutorialVisible5} onDismiss={hideTutorial}
                        contentContainerStyle={defaultModalStyle}>
                        <MaterialCommunityIcons name="bug" size = {80} color='black'/>
                            <Text style={styles.titleText}> Tutorial </Text>
                            <View>
                            <Text>5. 게임 즐기기</Text>
                            <Text>게임을 재미있게 즐기자.</Text>
                            <Text></Text>
                            <Text>클리어타임을 줄이는 것을 목표로 하는 것도 하나의 방법.</Text>
                            </View>
                    </Modal>
                    
                    <Modal visible={GameStartVisible} onDismiss={hideGameStart}
                        contentContainerStyle={defaultModalStyle}>
                            <MaterialCommunityIcons name="bug" size = {80} color='black'/>
                            <Text style={styles.titleText}> GameStart </Text>
                            <Text></Text><Text></Text>
                            <MaterialCommunityIcons onPress={goToGamePlay} name="emoticon" size = {80} color='green'/>
                            <Text> Easy </Text>
                            <Text></Text>
                            <MaterialCommunityIcons onPress={goToGamePlay}  name="emoticon-angry" size = {80} color='red'/>
                            <Text> Hard </Text>
                    </Modal>
                </Portal>

                <Button title="최고 기록" onPress={goToScore} />
                <Button title="환경 설정" onPress={showSetting} />
                <Button title="게임 방법" onPress={showTutorial} />
                <Button title="Game Start" onPress={showGameStart} />
                <MaterialCommunityIcons onPress={drawerBook} name="book-multiple" size={50} color="brown" />
            </View>
        </PaperProvider>
    );
}

function BookScene(){
  return(
    <View style = {styles.bookSceneContainer}>
      <Text>Test</Text>
    </View>
  );
}

const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function ScoreScene(){
  return (
      <View style = {styles.ScoreTab}>
      <MaterialCommunityIcons style = {styles.titleText} name="bug" size = {80} color='black'/>
      <Text style={styles.titleText}> MiniGame Score </Text>    
      <TopTab.Navigator>
        <TopTab.Screen name="Easy" component={ScoreEasy} />
        <TopTab.Screen name="Hard" component={ScoreHard} />
      </TopTab.Navigator>


      </View>
    );
}

function ScoreEasy(){
    return(
      <View style = {styles.ScoreTab}>
        <Text style = {styles.ScoreText}>1.  4:34</Text>
        <Text style = {styles.ScoreText}>2.  5:11</Text>
        <Text style = {styles.ScoreText}>3.  9:23</Text>
      </View>
    );
  }
  function ScoreHard(){
    return(
      <View style = {styles.ScoreTab}>
        <Text style = {styles.ScoreText}>1.  5:12</Text>
        <Text style = {styles.ScoreText}>2.  7:28</Text>
        <Text style = {styles.ScoreText}>3.  11:06</Text>
      </View>
    );
  }

  const GamePlayModal = {
    backgroundColor: 'white',
    padding: 20,
    height: "70%",
    width: "70%",
    marginLeft: "15%",
    marginTop: "-15%",
    alignItems: 'center',
    justifyContent: 'center',
};


  const GamePlayStack = createStackNavigator();

  const decimalPlaces = 0;
  const PlayTime = {
      isCounting: true,
      //start: 0,
      end: 9900,
      duration: 9900,  // 실행 주기(몇 초동안 실행할 건지)
      easing: 'linear', // easeOutCubic | easeInCubic | linear
      shouldUseToLocaleString: true,
      toLocaleStringParams: {
        locale: undefined, // set locale here
        // set options here
        options: {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces
        }
      },
      //prefix: "+",
      //suffix: " users",
      
      decimalPlaces,
      thousandsSeparator: '',
      decimalSeparator: '',
      preserveValue : true,
    };


  var money = 1000;
  var playTime = 0;

  const updateGameState = () => {
    playTime = playTime+1;
    if(playTime % 10 == 0)
      money = money + 500;
  }
  class UpdateStatus_UnderBar extends React.Component{
    constructor(){
      super()
      this.state = {
        count: 0,
        isUpdate: false,
        }
    }
  
    componentDidMount(){
      this.interval = setInterval(this.inc, 1000)
    }
  
    componentWillUnmount(){
      clearInterval(this.interval)
    }
  
    inc = () => {
      this.setState(prevState => ({
        count: prevState.count +1,
      })),
      updateGameState()
    }

    render(){
			return (
      <>
      <View style={{ flexDirection: 'row', alignSelf: 'flex-end', width: '70%', height: '100%', backgroundColor: 'gray' }}>
          <DataTable>
          <DataTable.Row>
            <DataTable.Cell><Entypo name="stopwatch" size={25} color="black"/>
            <Text style={styles.titleText}> {parseInt(playTime / 60)}:{parseInt(playTime % 60)}</Text>
             </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell><MaterialCommunityIcons name="coin" size={25} color="black"/> <Text style={styles.titleText}>{money}</Text></DataTable.Cell>
          </DataTable.Row>
          </DataTable>
        <View style={{ ...StyleSheet.absoluteFill, borderWidth: 2, borderColor: 'Black' }} />
      </View>
      <View style={{ flexDirection: 'row', alignSelf: 'flex-end', width: '30%', height: '100%', backgroundColor: 'gray' }}>
      <DataTable>
          <DataTable.Row>
            <DataTable.Cell>
                <MaterialCommunityIcons name="rectangle" size={25} color="red"/> <Text style={styles.titleText}>7</Text>
                </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
                <MaterialCommunityIcons name="rectangle" size={25} color="cyan"/> 
                <Text style={styles.titleText}> 5</Text>
                </DataTable.Cell>
          </DataTable.Row>
          </DataTable>
        <View style={{ ...StyleSheet.absoluteFill, borderWidth: 2, borderColor: 'Black' }} />
      </View>
      </>
			)
	}
}
  function GamePlayScene(){
    return(
      <GamePlayStack.Navigator>
        <GamePlayStack.Screen name = "GMain" component = {GamePlayMainScene} options={{headerShown: false}}/>
        <GamePlayStack.Screen name = "Shop" component = {ShopScene}/>
        <GamePlayStack.Screen name = "Enhance" component = {EnhanceScene}/>
        {/* <GamePlayStack.Screen name = "Garden" component = {Garden}/> */}
      </GamePlayStack.Navigator>
    );
  }

  function GamePlayMainScene({navigation}){
    
    const [settingVisible, setSettingVisible] = useState(false);
    const showSetting = () => setSettingVisible(true);
    const hideSetting = () => setSettingVisible(false);
    
    const [EnemyInteractionVisible, setEnemyInteractionVisible] = useState(false);
    const showEnemyInteraction = () => setEnemyInteractionVisible(true);
    const hideEnemyInteraction = () => setEnemyInteractionVisible(false);
    
    const [successVisible, setSuccessVisible] = useState(false);
    const showSuccess = () => {setEnemyInteractionVisible(false);
      setSuccessVisible(true);
    }
    const hideSuccess = () => setSuccessVisible(false);
    

    const goToShop = () => {
        navigation.navigate("Shop");
    }
    const goToEnhance = () => {
        navigation.navigate("Enhance");
    }
    
    return(
      <PaperProvider theme={theme}>
        <Portal>
          
          <Modal visible={settingVisible} onDismiss={hideSetting}
            contentContainerStyle={GamePlayModal} >
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
              <Octicons name="primitive-dot" size={130} color="black" style={{ top: "5%" }} />
              <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: "20%" }}>Setting</Text>
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "gray", marginBottom: "20%" }}>소리</Text>

              <Text style={{ fontSize: 20, fontWeight: "bold", color: 'gray', marginBottom: "30%" }}>밝기</Text>
            </View>
          </Modal>
          <Modal visible={EnemyInteractionVisible} onDismiss={hideEnemyInteraction}
            contentContainerStyle={GamePlayModal}>
            <View style={{
              ...StyleSheet.absoluteFill,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              backgroundColor: '#5A5A5A',
              borderWidth: 3,
            }}>
              <View>
              <Text style={{ fontSize: 20, textAlign: 'center' }}>James</Text>
              <MaterialCommunityIcons name="rectangle" size={70} color="black" />
              </View>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: "70%",
                height: "20%",
                backgroundColor: 'white',
                borderWidth: 3,
              }}>
                <Pressable onPress = {showSuccess} style = {{...StyleSheet.absoluteFill, flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{ fontSize: 20 }}>암살</Text>
                <View style={{ flexDirection: "row" }}>
                  <MaterialCommunityIcons name="coin" size={25} color="black" />
                  <Text style={styles.titleText}>400</Text>
                </View>
                </Pressable>
              </View>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: "70%",
                height: "20%",
                backgroundColor: 'white',
                borderWidth: 3,
              }}>
                <Text style={{ fontSize: 20 }}>회유</Text>
                <View style={{ flexDirection: "row" }}>
                  <MaterialCommunityIcons name="coin" size={25} color="black" />
                  <Text style={styles.titleText}>700</Text>
                </View>

              </View>
            </View>
          </Modal>
          <Modal visible={successVisible} onDismiss={hideSuccess}
            contentContainerStyle={GamePlayModal}>
            <View style = {{
              ...StyleSheet.absoluteFill,
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor: "#A5A5A5",
              borderWidth: 3,
              borderColor: '#5A5A5A'}}>
                <Text style = {{fontSize: 50, color: 'purple'}}>승리!!</Text>
               
                <View >
              <View style = {{flexDirection: 'row'}}>
              <MaterialCommunityIcons name="seed" size={30} color="black" />
              <Entypo name="cross" size={30} color="black" />
              <Text style = {{fontSize: 30}}>4</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <MaterialCommunityIcons name="sack" size={30} color="black" />
                  <Entypo name="cross" size={30} color="black" />
                  <Text style={{ fontSize: 30 }}>4</Text>
                </View>
              </View>
              <View style = {{borderWidth: 2, width: "40%", height: "10%", justifyContent: 'center'}}>
              <Pressable onPress = {() => {}} style = {{...StyleSheet.absoluteFill, flex:1, justifyContent: 'center', alignItems: 'center'}}>
                
                <Text style={{textAlign: 'center', fontSize: 20 }}>보상 받기</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </Portal>
        <View style={{
          flexWrap: "wrap",
          flex: 1.5,
          flexDirection: 'row',
          paddingTop: '1%'
          }}>
            <View style={{
              flex: 1,
              height: '100%',
              justifyContent: 'flex-start',
              alignContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
              <View style={{ alignSelf: 'center', borderColor:'green', borderWidth:1, marginTop: "5%" }}>
              <MaterialCommunityIcons onPress={goToShop} name="cart" size = {50} color='black'/>
              </View>
  
              <View style={{ alignSelf: 'center', borderColor:'green', borderWidth:1, marginTop: "5%" }}>
              <MaterialCommunityIcons onPress={goToEnhance} name="account-multiple-plus" size = {50} color='black'/>
              </View>
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
              <MaterialIcons onPress={showSetting} name="settings" size={50} color="black"/>
            </View>
          </View>
          <View style={{ flex: 7, justifyContent: "space-between" }}>
            <Pressable onPress={showEnemyInteraction} style={{ alignSelf: 'center', width: '20%', height: '15%', backgroundColor: "red" }}>
            <Text style = {styles.titleText}>Enemy</Text>
              <View style={{ ...StyleSheet.absoluteFill, borderWidth: 2, borderColor: 'Black' }}/>
            </Pressable>
            <View style={{ alignSelf: 'center', width: '20%', height: '15%', backgroundColor: "cyan" }}>
            <Text style = {styles.titleText}>Player</Text>
              <View style={{ ...StyleSheet.absoluteFill, borderWidth: 2, borderColor: 'Black' }}/>
            </View>
            <View style={{ flex: 0.23, flexDirection: 'row', justifyContent: 'flex-end' }}>
              <UpdateStatus_UnderBar />
            </View>
          </View>
      </PaperProvider>
    );
  }

  function ShopScene(){
    
    const purchaseItem = () => {
      
  }
    return (
        <View style={{ flex: 7, justifyContent: "space-between", paddingTop: '10%'}}>
         <Pressable onPress = {purchaseItem} style={styles.itembox}>
            <Image source={require('./../../assets/item1.png')} style={styles.itembox2} resizeMode="stretch"/>
          </Pressable>
          <Pressable style={styles.itembox}>
            <Image source={require('./../../assets/item2.png')}  style={styles.itembox2} resizeMode="stretch"/>
          </Pressable>
        <View style={{ flex: 0.37, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <UpdateStatus_UnderBar/>
            </View>
            </View>
      );
  }

  function EnhanceScene(){
    return (
        <View style={{ flex: 7, justifyContent: "space-between",}}>
            <Image source={require('./../../assets/enhance.png')}  style={styles.enhancebox} resizeMode="stretch"/>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
              <View style={{ flexDirection: 'row', alignSelf: 'flex-end', width: '70%', height: '100%', backgroundColor: 'gray' }}>
                  <DataTable>
                  <DataTable.Row>
                    <DataTable.Cell><Entypo name="stopwatch" size={25} color="black"/> <Text style={styles.titleText}>06:37</Text></DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell><MaterialCommunityIcons name="coin" size={25} color="black"/> <Text style={styles.titleText}>3700</Text></DataTable.Cell>
                  </DataTable.Row>
                  </DataTable>
                <View style={{ ...StyleSheet.absoluteFill, borderWidth: 2, borderColor: 'Black' }} />
              </View>
              <View style={{ flexDirection: 'row', alignSelf: 'flex-end', width: '30%', height: '100%', backgroundColor: 'gray' }}>
              <DataTable>
                  <DataTable.Row>
                    <DataTable.Cell>
                        <MaterialCommunityIcons name="rectangle" size={25} color="red"/> <Text style={styles.titleText}>7</Text>
                        </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>
                        <MaterialCommunityIcons name="rectangle" size={25} color="cyan"/> 
                        <Text style={styles.titleText}> 5</Text>
                        </DataTable.Cell>
                  </DataTable.Row>
                  </DataTable>
                <View style={{ ...StyleSheet.absoluteFill, borderWidth: 2, borderColor: 'Black' }} />
              </View>
            </View>
            </View>
      );
  }



  const Drawer = createDrawerNavigator();

export default function MiniGameMain() {
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name ='Start' component={StartScene}/>
          <Drawer.Screen name ='InGame' component={InGameScene}/>
          <Drawer.Screen name ='GamePlay' component = {GamePlayScene}/>
        </Drawer.Navigator>
      </NavigationContainer> 
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
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',      
    },
    mainSceneTitleContainer: {
        flex: 0.5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    bookSceneContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ScoreSceneContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ScoreTab:{
      flex: 1,
      padding: 20,
      paddingLeft: 30,
      backgroundColor: '#fff',
    },
    titleText:{
      fontSize: 24,
      //fondWeight: 'bold',     // 이거 일단 안됨.
      color: 'black',
      textAlign: 'center',  // 가로방향 텍스트 위치맞추기
      textAlignVertical: 'center', // 세로방향 텍스트 위치맞추기
    },
    ScoreText:{
        fontSize: 24,
    },
    GamePlayLeftTopIcon: {
        padding: 10,
        alignItems:'flex-start',
      
    },
    GamePlayRightTopIcon: {
      padding: 10,
      alignItems:'flex-end',
  },
    GamePlayEnemyIcon: {
      padding: 10,
      alignItems:'flex-end',
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
      resizeMode : "stretch"
    },
    enhancebox: {
        alignSelf: 'center',
        height: '85%',
        width: '100%',
        justifyContent: 'center',
      },
  });
  