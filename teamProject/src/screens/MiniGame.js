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
import { render } from 'react-dom';



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
    padding: 5,
    height: "70%",
    width: "70%",
    marginLeft: "15%",
    alignItems: 'center',
    justifyContent: 'center',
};

const TutorialModalStyle = {
  backgroundColor: 'white',
  padding: 5,
  height: "70%",
  width: "70%",
  marginLeft: "15%",
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
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
    const hideTutorial = () => {
      setTutorialVisible1(false);
      setTutorialVisible2(false);
      setTutorialVisible3(false);
      setTutorialVisible4(false);
      setTutorialVisible5(false);
    }
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
      money = 1000;
      playTime = 0;
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
                          <MaterialCommunityIcons style = {{flex: 1.15, marginRight: '80%'}} onPress = {hideSetting}
                             name="file-excel-box" size = {50} color='black'/>
                          <View style = {{flex: 8, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                          <Octicons name="primitive-dot" size={130} color="black"/>
                          <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: "20%"}}>Setting</Text>
                          <Text style={{fontSize: 20, fontWeight: "bold", color: "gray", marginBottom: "20%"}}>소리</Text>
                          
                          <Text style={{fontSize: 20, fontWeight: "bold", color: 'gray', marginBottom: "30%"}}>밝기</Text>
                          </View>
                            
                    </Modal>
                    <Modal visible={TutorialVisible1} onDismiss={changeTutorialModal}
                        contentContainerStyle={TutorialModalStyle}>
                            <MaterialCommunityIcons style = {{flex: 1.15}} onPress = {hideTutorial}
                             name="file-excel-box" size = {50} color='black'/>
                            <View style = {{flex: 2.5, justifyContent: 'center', alignItems: 'center', marginLeft: '32%'}}>
                            <MaterialCommunityIcons name="bug" size = {80} color='black'/>
                            <Text style={styles.titleText}> Tutorial </Text>
                            </View>
                            <View style = {{flex: 6.5, alignItems: 'center', marginTop: '5%',borderWidth: 4, backgroundColor: '#e0e0e0'}}>
                            <Text style={{fontSize: 20, fontWeight: "bold", color: 'black', margin: "5%"}}>1. 게임의 목표</Text>
                            <Text style={{fontSize: 19}}>상대방을 전부 섬멸, 혹은 항복 시켜 상대로부터 승리한다.</Text>
                            </View>
                    </Modal>
                    <Modal visible={TutorialVisible2} onDismiss={changeTutorialModal}
                        contentContainerStyle={TutorialModalStyle}>
                          <MaterialCommunityIcons style = {{flex: 1.15}} onPress = {hideTutorial}
                        name="file-excel-box" size = {50} color='black'/>
                       <View style = {{flex: 2.5, justifyContent: 'center', alignItems: 'center', marginLeft: '32%'}}>
                       <MaterialCommunityIcons name="bug" size = {80} color='black'/>
                       <Text style={styles.titleText}> Tutorial </Text>
                       </View>
                       <View style = {{flex: 6.5, alignItems: 'center', marginTop: '5%',borderWidth: 4, backgroundColor: '#e0e0e0'}}>
                       <Text style={{fontSize: 20, fontWeight: "bold", color: 'black', margin: "5%"}}>2. 상대방과 인터렉션</Text>
                       <Text style={{fontSize: 18}}>플레이어는 암살과 포섭 총 두 가지 인터렉션이 가능하다. </Text>
                       <Text/>
                       <Text style={{fontSize: 18}}>이를 이용하여 상대보다 빠르게 상대 조직의 수를 줄이고, 플레이어의 조직원 수를 늘려야 한다.</Text>
                       </View>
                    </Modal>
                    <Modal visible={TutorialVisible3} onDismiss={changeTutorialModal}
                        contentContainerStyle={TutorialModalStyle}>
                        <MaterialCommunityIcons style = {{flex: 1.15}} onPress = {hideTutorial}
                        name="file-excel-box" size = {50} color='black'/>
                       <View style = {{flex: 2.5, justifyContent: 'center', alignItems: 'center', marginLeft: '32%'}}>
                       <MaterialCommunityIcons name="bug" size = {80} color='black'/>
                       <Text style={styles.titleText}> Tutorial </Text>
                       </View>
                       <View style = {{flex: 6.5, alignItems: 'center', marginTop: '5%',borderWidth: 4, backgroundColor: '#e0e0e0'}}>
                       <Text style={{fontSize: 20, fontWeight: "bold", color: 'black', margin: "5%"}}>3. 암살 / 포섭 하기</Text>
                       <Text style={{fontSize: 18}}>플레이어는 원하는 상대 조직의 조직원을 터치해 터치한 조직원의 정보를 얻을 수 있다.</Text>
                       <Text/>
                       <Text style={{fontSize: 18}}>또한 이를 참고하여 자신의 자원을 소모하여 암살, 포섭를 할 수 있다.</Text>
                       </View>
                    </Modal>
                    <Modal visible={TutorialVisible4} onDismiss={changeTutorialModal}
                        contentContainerStyle={TutorialModalStyle}>
                        <MaterialCommunityIcons style = {{flex: 1.15}} onPress = {hideTutorial}
                        name="file-excel-box" size = {50} color='black'/>
                       <View style = {{flex: 2.5, justifyContent: 'center', alignItems: 'center', marginLeft: '32%'}}>
                       <MaterialCommunityIcons name="bug" size = {80} color='black'/>
                       <Text style={styles.titleText}> Tutorial </Text>
                       </View>
                       <View style = {{flex: 6.5, alignItems: 'center', marginTop: '5%',borderWidth: 4, backgroundColor: '#e0e0e0'}}>
                       <Text style={{fontSize: 20, fontWeight: "bold", color: 'black', margin: "5%"}}>4. 상점, 능력치</Text>
                       <Text style={{fontSize: 17}}>게임에는 상점과 능력치가 존재한다.</Text>
                       <Text/>
                       <Text style={{fontSize: 17}}>상점에는 지속성 아이템과 소모성 아이템이 있고, 능력치는 플레이어가 강화한 능력치에 따라 게임의 플레이를 변화시킬 수 있다.</Text>
                            </View>
                    </Modal>
                    <Modal visible={TutorialVisible5} onDismiss={hideTutorial}
                        contentContainerStyle={TutorialModalStyle}>
                        <MaterialCommunityIcons style = {{flex: 1.15}} onPress = {hideTutorial}
                        name="file-excel-box" size = {50} color='black'/>
                       <View style = {{flex: 2.5, justifyContent: 'center', alignItems: 'center', marginLeft: '32%'}}>
                       <MaterialCommunityIcons name="bug" size = {80} color='black'/>
                       <Text style={styles.titleText}> Tutorial </Text>
                       </View>
                       <View style = {{flex: 6.5, alignItems: 'center', marginTop: '5%',borderWidth: 4, backgroundColor: '#e0e0e0'}}>
                       <Text style={{fontSize: 20, fontWeight: "bold", color: 'black', margin: "5%"}}>5. 게임 즐기기</Text>
                       <Text style={{fontSize: 18}}>게임을 재미있게 즐겨보자.</Text>
                       <Text/>
                       <Text style={{fontSize: 18}}>클리어타임을 줄이는 것을 목표로 하는 것도 하나의 방법.</Text>
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
    padding: 5,
    height: "70%",
    width: "70%",
    marginLeft: "15%",
    marginTop: "-15%",
    alignItems: 'center',
    justifyContent: 'center',
};


  const GamePlayStack = createStackNavigator();

  var money = 1000;
  var playTime = 0;

  const updateGameState = () => {

    playTime = playTime+1;
    if(playTime % 10 == 0)
      money = money + 500;
  }

  class ShowStatus_UnderBar extends React.Component{
    constructor(){
      super()
      this.state = {
        count: 0
        }
    }

    componentDidMount(){
      this.interval = setInterval(this.inc, 250)
    }
  
    componentWillUnmount(){
      clearInterval(this.interval)
    }
  
    inc = () => {
      this.setState(prevState => ({
        count: prevState.count +1,
      }))
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
  class UpdateStatus_UnderBar extends React.Component{
    constructor(){
      super()
      this.state = {
        count: 0
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
        <ShowStatus_UnderBar/>
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
            <MaterialCommunityIcons style = {{flex: 1.15, marginRight: '80%'}} onPress = {hideSetting}
                             name="file-excel-box" size = {50} color='black'/>
                          <View style = {{flex: 8, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                          <Octicons name="primitive-dot" size={130} color="black"/>
                          <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: "20%"}}>Setting</Text>
                          <Text style={{fontSize: 20, fontWeight: "bold", color: "gray", marginBottom: "20%"}}>소리</Text>
                          
                          <Text style={{fontSize: 20, fontWeight: "bold", color: 'gray', marginBottom: "30%"}}>밝기</Text>
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
              <MaterialCommunityIcons style = {{flex: 0.23, marginRight: '80%', marginTop: '-10%'}} onPress = {hideEnemyInteraction}
                             name="file-excel-box" size = {50} color='black' />
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
              <UpdateStatus_UnderBar/>
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

  function ShopScene(){
    
    const [purchaseItem1Visible, setpurchaseItem1Visible] = useState(false);
    const showpurchaseItem1 = () => setpurchaseItem1Visible(true);
    const hidepurchaseItem1 = () => setpurchaseItem1Visible(false);
    
    
    const purchaseItem1 = () => {
      if(money >= 2000)
      money = money - 2000;
      hidepurchaseItem1();
    };
    const sellItem1 = () => {
      money = money + 200;
      hidepurchaseItem1();
    };
  
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
              <MaterialCommunityIcons style = {{flex: 1, marginRight: '80%'}} onPress = {hidepurchaseItem1}
                             name="file-excel-box" size = {50} color='black'/>
            <View style={{ flex: 1.3, alignItems: 'center', }}>
            <Text style={styles.titleText}>지휘자 목걸이</Text>
            <View style={{flexDirection: "row", alignItems: 'center', }}>
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
                <Pressable onPress={purchaseItem1} style = {{...StyleSheet.absoluteFill, flex:1, justifyContent: 'center', alignItems: 'center'}}>
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
                <Pressable onPress={sellItem1} style = {{...StyleSheet.absoluteFill, flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{ fontSize: 20 }}>판매</Text>
                </Pressable>
              </View>
              </View>
            </View>
          </Modal>
      </Portal>
        <View style={{ flex: 7, justifyContent: "space-between", paddingTop: '10%'}}>
         <Pressable onPress={showpurchaseItem1} style={styles.itembox}>
            <Image source={require('./../../assets/item1.png')}  style={styles.itembox2} resizeMode="stretch"/>
          </Pressable>
          <Pressable style={styles.itembox}>
            <Image source={require('./../../assets/item2.png')}  style={styles.itembox2} resizeMode="stretch"/>
          </Pressable>
        <View style={{ flex: 0.37, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <ShowStatus_UnderBar/>
            </View>
            </View>
            </PaperProvider>
      );
  }

  function EnhanceScene(){
    return (
        <View style={{ flex: 7, justifyContent: "space-between",}}>
            <Image source={require('./../../assets/enhance.png')}  style={styles.enhancebox} resizeMode="stretch"/>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
        <ShowStatus_UnderBar/>
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
  