import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import{ NavigationContainer} from '@react-navigation/native';
import{createStackNavigator} from '@react-navigation/stack';
import{createDrawerNavigator} from '@react-navigation/drawer';
import{MaterialCommunityIcons} from '@expo/vector-icons';
import{DefaultTheme, Dialog, Modal, Portal, Provider as PaperProvider} from 'react-native-paper';


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

const BagModalStyle = {
    backgroundColor: 'white',
    padding: 20,
    height: "70%",
    width: "70%",
    marginLeft: "15%",
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

    const drawerBook = () => {
        navigation.navigate("Book");
    }
    const goToShop = () => {
        navigation.navigate("Shop");
    }
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
                        contentContainerStyle={BagModalStyle}>
                            <Text>Bag Modal. Click outsizd this area to dismiss</Text>
                    </Modal>
                </Portal>
                <Button title="Profile" onPress={showProfile} />
                <Button title="Setting" onPress={showSetting} />
                <Button title="Shop" onPress={goToShop} />
                <Button title="Bag" onPress={showBag} />
                <Button title="Field" onPress={() => { }} />
                <Button title="ClosedBar" onPress={() => { }} />


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



function ShopScene(){
    return(
        <View style = {styles.shopSceneContainer}>
        <Text>Shop</Text>
        </View>            
    );
}

const Drawer = createDrawerNavigator();

export default function FlowerMain() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name = "Start" component = {StartScene}/>
        <Drawer.Screen name = "InGame" component = {InGameScene}/>
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
});
