
import React, {useState,} from 'react';
import { Component } from 'react';
import { StyleSheet, View, Image, Animated, ScrollView, Text, Dimensions } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import {ToggleButton, Portal, Button, Modal, Provider as PaperProvider} from 'react-native-paper';
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
              <Bag/>
           
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
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', backgroundColor: 'purple', width: '100%'}}>
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
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', backgroundColor: 'purple', width: '100%'}}>
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
        </View><View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', backgroundColor: 'purple', width: '100%'}}>
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
        </View><View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', backgroundColor: 'purple', width: '100%'}}>
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
constructor(props){
    super(props);
  }

  render() {
    const bookCategory = this.props.route.params.bookCategory;
    const setBookCategory = (value)=> {
      this.props.navigation.setParams({bookCategory: value});
       console.log(bookCategory, "params: ", this.props);
      }
    return (
      <View style={{ flex: 1 }}>
        <FlowerList name />
        <ToggleButton.Row onValueChange={value => setBookCategory(value)} value={bookCategory}>
          <ToggleButton icon="flower" value="flower"/>
          <ToggleButton icon="pine-tree" value="tree"/>
          <ToggleButton icon="ladybug" value="bug"/>
        </ToggleButton.Row>
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
