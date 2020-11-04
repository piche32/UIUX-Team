import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image, Pressable, Animated, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DefaultTheme, Avatar, Modal, Portal, Provider as PaperProvider } from 'react-native-paper';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Field from '../components/field';
import BookScene from './book';
import Bag from '../components/bag';

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
  marginTop: "100%",
  height: '40%',
  backgroundColor: 'white',
};

export default function MainScene({ navigation }) {
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


  return (
    <PaperProvider theme={theme}>
      <View style={styles.mainSceneContainer}>
        <Portal>
          <Modal visible={profileVisible} onDismiss={hideProfile}
            contentContainerStyle={profileModalStyle}>
            <Text>Lv. 1 </Text>
            <Text>성장속도 100% </Text>
            <Text>추가 수입 0</Text>
            <Text>최대 밭 갯수 5</Text>
          </Modal>
          <Modal visible={settingVisible} onDismiss={hideSetting}
            contentContainerStyle={settingModalStyle}>
            <Text>Setting Modal. Click outsizd this area to dismiss</Text>
          </Modal>
          <Modal visible={bagVisible} onDismiss={hideBag}
            contentContainerStyle={bagModalStyle}>
              <Bag/>
           
          </Modal>
          <Modal visible={bottomBarVisible} onDismiss={hideBottomBar}
            contentContainerStyle={bottomBarModalStyle}>
            <ScrollView style={styles.list}>
              <WorkerUI/>
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
            <Pressable onPress={showProfile} style={{ backgroundColor: 'gray', }}>
              <Avatar.Text size={50} label='LV1' style={{ justifyContent: "center" }} />
            </Pressable>

            <View style={{ alignSelf: 'center', borderColor: 'green', borderWidth: 1, marginTop: "5%" }}>
              <MaterialCommunityIcons name="bag-personal" size={40} color='#A57939' onPress={showBag} />
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
            <View style={{ flex: 0.4, borderColor: 'pink', borderWidth: 1, flexDirection: 'row' }}>
              <MaterialCommunityIcons name="coin" size={24} color="black" />
              <View style={{ backgroundColor: 'gray', width: '70%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'black' }}>99.99a</Text>
              </View>
            </View>
            <View style={{ flex: 0.4, borderColor: 'pink', borderWidth: 1, flexDirection: 'row' }}>
              <MaterialCommunityIcons name="flower" size={24} color="black" />
              <View style={{ backgroundColor: 'gray', width: '70%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'black' }}>3/3</Text>
              </View>
            </View>
          </View>

          <View style={{
            flex: 0.8,
            borderWidth: 1,
            borderColor: 'cyan',
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
          }}>
            <Field fn = {showBag}/>
          </View>
          <Pressable onPress={showBottomBar} style={{ alignSelf: 'center', width: '20%', height: '3%', backgroundColor: 'red' }}>
            <View style={{ ...StyleSheet.absoluteFill, borderWidth: 2, borderColor: 'Black' }} />
          </Pressable>
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
