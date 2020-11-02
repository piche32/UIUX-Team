import { StatusBar } from 'expo-status-bar';
import React, {useState, useRef} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image} from 'react-native';
import{NavigationContainer} from '@react-navigation/native';
import{createStackNavigator} from '@react-navigation/stack';
import{createDrawerNavigator} from '@react-navigation/drawer';
import{MaterialCommunityIcons} from '@expo/vector-icons';
import{DefaultTheme, Modal, Portal, Provider as PaperProvider} from 'react-native-paper';
import{createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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
      <Stack.Screen name = "Shop" component = {ShopScene}/>
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

const profileModalStyle = {
    backgroundColor: 'white',
    padding: 20,
    height: "70%",
    width: "70%",
    marginLeft: "15%",
};

const settingModalStyle = {
    backgroundColor: 'white',
    padding: 20,
    height: "70%",
    width: "70%",
    marginLeft: "15%",
};

const bagModalStyle = {
    backgroundColor: 'white',
    padding: 20,
    height: "70%",
    width: "70%",
    marginLeft: "15%",
};

const bottomBarModalStyle = {
  padding: "5%",
  backgroundColor: 'white',
  height: "40%",
  marginTop: "90%"
};

function MainScene({ navigation }) {
    const [profileVisible, setProfileVisible] = useState(false);
    const showProfile = () => setProfileVisible(true);
    const hideProfile = () => setProfileVisible(false);
    
    const [settingVisible, setSettingVisible] = useState(false);
    const showSetting = () => setSettingVisible(true);
    const hideSetting = () => setSettingVisible(false);

    const [bagVisible, setBagVisible] = useState(false);
    const showBag = () => setBagVisible(true);
    const hideBag = () => setBagVisible(false);

    const [bottomBarVisible, setBottomBarVisible] = useState(false);
    const showBottomBar = () => setBottomBarVisible(true);
    const hideBottomBar = () => setBottomBarVisible(false);

    const drawerBook = () => {
        navigation.navigate("Book");
    }
    const goToShop = () => {
        navigation.navigate("Shop");
    }

    const ref = useRef(null);

    return (
        <PaperProvider theme={theme}>
            <View style={styles.mainSceneContainer}>
                <Portal>
                    <Modal visible={profileVisible} onDismiss={hideProfile}
                        contentContainerStyle={profileModalStyle}>
                        <Text>Profile Modal. Click outside this area to dismiss </Text>
                    </Modal>
                    <Modal visible={settingVisible} onDismiss={hideSetting}
                        contentContainerStyle={settingModalStyle}>
                            <Text>Setting Modal. Click outsizd this area to dismiss</Text>
                    </Modal>
                    
                    <Modal visible={bagVisible} onDismiss={hideBag}
                        contentContainerStyle={bagModalStyle}>
                            <Text>Bag Modal. Click outsizd this area to dismiss</Text>
                    </Modal>
                    <Modal visible={bottomBarVisible} onDismiss={hideBottomBar}
                        contentContainerStyle={bottomBarModalStyle}>
              <ScrollView ref={ref}>
              <Image
                  source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
                  style={{ width: 400, height: 400 }}
                  key="1"
                />
                <Text>bottomBar Modal. Click outsizd this area to dismiss</Text>
              </ScrollView>
                            
                    </Modal>
                </Portal>
                <Button title="Profile" onPress={showProfile} />
                <Button title="Setting" onPress={showSetting} />
                <Button title="Shop" onPress={goToShop} />
                <Button title="Bag" onPress={showBag} />
                <Button title="Field" onPress={() => { }} />
                <Button title="ClosedBar" onPress={showBottomBar} />


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



function ShopSeed(){
  return(
    <View style = {styles.shopTab}>
      <Text>Seed</Text>
    </View>
  );
}
function ShopTree(){
  return(
    <View style = {styles.shopTab}>
      <Text>Tree</Text>
    </View>
  );
}
function ShopFertilizer(){
  return(
    <View style = {styles.shopTab}>
      <Text>Fertilizer</Text>
    </View>
  );
}
function ShopField(){
  return(
    <View style = {styles.shopTab}>
      <Text>Field</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function ShopScene(){
  return (
      <Tab.Navigator>
        <Tab.Screen name="shopSeed" component={ShopSeed} />
        <Tab.Screen name="shopTree" component={ShopTree} />
        <Tab.Screen name="shopFertilizer" component={ShopFertilizer} />
        <Tab.Screen name="shopField" component={ShopField} />
      </Tab.Navigator>           
    );
}

const Drawer = createDrawerNavigator();

export default function FlowerMain() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name ='Start' component={StartScene}/>
        <Drawer.Screen name ='InGame' component={InGameScene}/>
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
    //alignItems: 'center',
    justifyContent: 'center',
  },
  bookSceneContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopSceneContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopTab:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
