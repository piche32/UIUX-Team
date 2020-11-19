
import React, { useState } from 'react';
import { Component } from 'react';
import { StyleSheet, View, Image, Animated, ScrollView, Text, Dimensions } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { ToggleButton, Portal, Button, Modal, Provider as PaperProvider } from 'react-native-paper';
import Bag from '../components/bag';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';
const bagModalStyle = {
  backgroundColor: 'white',
  padding: 20,
  height: "70%",
  width: "70%",
  marginLeft: "15%",
};
function FlowerList(props) {
  const [bagVisible, setBagVisible] = useState(false);
  const showBag = () => setBagVisible(true);
  const hideBag = () => setBagVisible(false);
  return (
    <PaperProvider>
      <Portal>
        <Modal visible={bagVisible} onDismiss={hideBag}
          contentContainerStyle={bagModalStyle}>
          <Bag />

        </Modal>
      </Portal>
      <View style={styles.flowerList}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name="bag-personal"
            size={40} color='#A57939'
            onPress={showBag}
            style={{ width: '10%' }}
          />
        </View>
        <ScrollView style={styles.list}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', backgroundColor: 'purple', width: '100%' }}>
            <View style={styles.item}>
              <Image source={{ uri: props.uri }} style={styles.itemImage} />
              <View style={styles.itemTexts}>
                <Text style={styles.itemText}>
                  {props.name}</Text>
                <Text style={styles.itemText}>
                  {props.explain}
                </Text>
              </View>

            </View>
            <View style={styles.item}>
              <Image source={{ uri: props.uri }} style={styles.itemImage} />
              <View style={styles.itemTexts}>
                <Text style={styles.itemText}>
                  {props.name}</Text>
                <Text style={styles.itemText}>
                  {props.explain}
                </Text>
              </View>

            </View>
            <View style={styles.item}>
              <Image source={{ uri: props.uri }} style={styles.itemImage} />
              <View style={styles.itemTexts}>
                <Text style={styles.itemText}>
                  {props.name}</Text>
                <Text style={styles.itemText}>
                  {props.explain}
                </Text>
              </View>

            </View>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', backgroundColor: 'purple', width: '100%' }}>
            <View style={styles.item}>
              <Image source={{ uri: props.uri }} style={styles.itemImage} />
              <View style={styles.itemTexts}>
                <Text style={styles.itemText}>
                  {props.name}</Text>
                <Text style={styles.itemText}>
                  {props.explain}
                </Text>
              </View>

            </View>
            <View style={styles.item}>
              <Image source={{ uri: props.uri }} style={styles.itemImage} />
              <View style={styles.itemTexts}>
                <Text style={styles.itemText}>
                  {props.name}</Text>
                <Text style={styles.itemText}>
                  {props.explain}
                </Text>
              </View>

            </View>
            <View style={styles.item}>
              <Image source={{ uri: props.uri }} style={styles.itemImage} />
              <View style={styles.itemTexts}>
                <Text style={styles.itemText}>
                  {props.name}</Text>
                <Text style={styles.itemText}>
                  {props.explain}
                </Text>
              </View>

            </View>
          </View><View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', backgroundColor: 'purple', width: '100%' }}>
            <View style={styles.item}>
              <Image source={{ uri: props.uri }} style={styles.itemImage} />
              <View style={styles.itemTexts}>
                <Text style={styles.itemText}>
                  {props.name}</Text>
                <Text style={styles.itemText}>
                  {props.explain}
                </Text>
              </View>

            </View>
            <View style={styles.item}>
              <Image source={{ uri: props.uri }} style={styles.itemImage} />
              <View style={styles.itemTexts}>
                <Text style={styles.itemText}>
                  {props.name}</Text>
                <Text style={styles.itemText}>
                  {props.explain}
                </Text>
              </View>

            </View>
            <View style={styles.item}>
              <Image source={{ uri: props.uri }} style={styles.itemImage} />
              <View style={styles.itemTexts}>
                <Text style={styles.itemText}>
                  {props.name}</Text>
                <Text style={styles.itemText}>
                  {props.explain}
                </Text>
              </View>

            </View>
          </View><View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', backgroundColor: 'purple', width: '100%' }}>
            <View style={styles.item}>
              <Image source={{ uri: props.uri }} style={styles.itemImage} />
              <View style={styles.itemTexts}>
                <Text style={styles.itemText}>
                  {props.name}</Text>
                <Text style={styles.itemText}>
                  {props.explain}
                </Text>
              </View>

            </View>
            <View style={styles.item}>
              <Image source={{ uri: props.uri }} style={styles.itemImage} />
              <View style={styles.itemTexts}>
                <Text style={styles.itemText}>
                  {props.name}</Text>
                <Text style={styles.itemText}>
                  {props.explain}
                </Text>
              </View>

            </View>
            <View style={styles.item}>
              <Image source={{ uri: props.uri }} style={styles.itemImage} />
              <View style={styles.itemTexts}>
                <Text style={styles.itemText}>
                  {props.name}</Text>
                <Text style={styles.itemText}>
                  {props.explain}
                </Text>
              </View>

            </View>
          </View>


        </ScrollView>
      </View>
    </PaperProvider>
  );
}

export default class BookScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flowerSpacies: 0,
      flowerMaxSpacies: 100,
      treeSpacies: 0,
      treeMaxSpacies: 30,
      bugSpacies: 0,
      bugMaxSpacies: 25,
      bookCategory: 'flower',
    }
    let icon = <View style={{
      paddingRight: '15%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center'
    }}>
      <MaterialCommunityIcons name="flower" size={24} color="black" />
      <View style={{
        backgroundColor: 'gray',
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{ color: 'black' }}>{this.state.flowerSpacies}/{this.state.flowerMaxSpacies}</Text>
      </View>
    </View>
    this.props.navigation.setOptions({
      headerRight: () => icon  });

  }

  changeCategory = () => {
    let icon = null;
    if (this.state.bookCategory === 'flower') {
      icon = <View style={{
        paddingRight: '15%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
      }}>
        <MaterialCommunityIcons name="flower" size={24} color="black" />
        <View style={{
          backgroundColor: 'gray',
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{ color: 'black' }}>{this.state.flowerSpacies}/{this.state.flowerMaxSpacies}</Text>
        </View>
      </View>
    }
    else if (this.state.bookCategory === 'tree') {
      icon = <View style={{
        paddingRight: '15%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
      }}>
        <MaterialCommunityIcons name="pine-tree" size={24} color="black" />
        <View style={{
          backgroundColor: 'gray',
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{ color: 'black' }}>{this.state.treeSpacies}/{this.state.treeMaxSpacies}</Text>
        </View>
      </View>
    }
    else if (this.state.bookCategory === 'bug') {
      icon = <View style={{
        paddingRight: '15%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
      }}>
        <MaterialCommunityIcons name="ladybug" size={24} color="black" />
        <View style={{
          backgroundColor: 'gray',
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{ color: 'black' }}>{this.state.bugSpacies}/{this.state.bugMaxSpacies}</Text>
        </View>
      </View>
    }
    this.props.navigation.setOptions({
      headerRight: () => icon  });
  }


  setBookCategory = (value) => {
    this.state.bookCategory = value;
    this.changeCategory();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlowerList name />
        <View style={{ flexDirection: 'row' }}>
          <Button style={{flex:1}} icon="flower" mode="contained" onPress={() => this.setBookCategory("flower")}>flower</Button>
          <Button style={{flex:1}} icon="pine-tree" mode="contained" onPress={() => this.setBookCategory("tree")}>tree</Button>
          <Button style={{flex:1}} icon="ladybug" mode="contained" onPress={() => this.setBookCategory("bug")}>bug</Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    backgroundColor: 'gray',
    flexWrap: 'wrap',
    //alignItems: 'center',
    //justifyContent: 'space-around',
  },
  item: {
    //flex: 1,
    width: "30%",
    height: Dimensions.get('window').height * 20 / 100,
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
});
