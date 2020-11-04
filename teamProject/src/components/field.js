
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Animated, Pressable, Text } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';


export default class Field extends React.Component {
  constructor(props) {
    super(props);
    this.translateX = new Animated.Value(0);
    this.translateY = new Animated.Value(0);
    this.lastOffset = {x: 0, y: 0};
    this.handleGesture = 
      Animated.event(
      [
        {
          nativeEvent:
          {
            translationX: this.translateX,
            translationY: this.translateY
          }
        }
      ],
      { useNativeDriver: true }
      );
  }
  handleGestureStateChange = event => {
    if(event.nativeEvent.oldState === State.ACTIVE) {
      this.lastOffset.x += event.nativeEvent.translationX;
      this.lastOffset.y += event.nativeEvent.translationY;
      this.translateX.setOffset(this.lastOffset.x);
      this.translateX.setValue(0);
      this.translateY.setOffset(this.lastOffset.y);
      this.translateY.setValue(0);

    }
  };
  render() {
      
    const { fn } = this.props;

    let circleTransformStyle
    circleTransformStyle = {
      transform: [
        {
          translateY: this.translateY
        },
        {
          translateX: this.translateX
        }
      ]
    }

    return (
      <View style = {{flex: 1,}}>
        <PanGestureHandler
        {...this.props}
         onGestureEvent = {this.handleGesture}
         onHandlerStateChange ={this.handleGestureStateChange}
         >
          <Animated.View style={[styles.field
          , circleTransformStyle
          ]}>
              <Text style = {{textAlign: "center"}}>Field</Text>
              <Pressable
                  onPress = { fn }
                  style = {{...StyleSheet.absoluteFill}}
                  >
              </Pressable>
          </Animated.View>
        </PanGestureHandler>
      </View>
    );
  }
}
  const styles = StyleSheet.create({
    field:
    {
        ...StyleSheet.absoluteFill,
        width: '20%',
        height: '15%',
        backgroundColor: 'cyan',
        borderWidth: 2,
        justifyContent: 'center',
    },
  });
  
