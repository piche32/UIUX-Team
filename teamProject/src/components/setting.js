import React, { useState, Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Modal, Text, ProgressBar, Colors, Title, RadioButton, Button , Headline} from 'react-native-paper';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const settingModalStyle = {
    backgroundColor: 'white',
    padding: 20,
    height: "50%",
    width: "80%",
    marginHorizontal: "10%",
    justifyContent: 'space-evenly',
};


export default class Setting extends Component {
    constructor(props){
        super(props);
        this.translateX = new Animated.Value(0);
        this.state = {
            BGMMuteIcon: 'volume-off',
            BGMValue: 0,
        }

    }

    setBGMMuteIcon = (BGMMuteIcon) => {
        this.setState({BGMMuteIcon: BGMMuteIcon});
    }
    setBGMValue = (BGMValue) => {
        this.setState({BGMValue: BGMValue});
    }
    
    gestureHandler = (evt) => {
        let{nativeEvent} = evt;
        console.log(nativeEvent);
        Animated.event([{nativeEvent: {translationX: this.translateX} }], {useNativeDriver: true})
        this.setBGMValue = (this.state.BGMValue+this.translateX);
        console.log(this.state.BGMValue);
    }
   

    render() {
        return (
            <Modal
                visible={this.props.visible} onDismiss={this.props.onDismiss}
                contentContainerStyle={settingModalStyle}>
            <Title style={{ alignSelf: 'center'}}>Setting</Title>
            <View style={[styles.setting, { marginTop: '10%'}]}>
                <Text style = {styles.settingText}>BGM</Text>
                <View style={styles.objects}>
                    <View style={{ flex: 8,  marginTop: '5%', }}>
                    <PanGestureHandler onGestureEvent={this.gestureHandler}>
                        <View>
                        <ProgressBar progress={this.state.BGMValue} color={Colors.orange500} />
                        
                        </View>
                        </PanGestureHandler>
                        <View style={styles.soundValue}>
                            <Text>0%</Text>
                            <Text>100%</Text>
                        </View>
                    </View>
                        <Button icon={this.state.BGMMuteIcon} mode="text" 
                        style = {{ borderColor: "red", width: '1%'}}
                         onPress={() => {
                            if(this.state.BGMMuteIcon === 'volume-off'){
                                this.setBGMMuteIcon('volume-high');
                            this.setBGMValue(1);
                            }
                            else{
                                this.setBGMMuteIcon('volume-off');
                            this.setBGMValue(0);
                            }
                        }} />


                </View>
            </View>
            <View style={[styles.setting, {marginBottom: '10%', borderWidth: 1,}]}>
                <Text>Sound Effect</Text>
                <View>
                    <ProgressBar progress={0.5} color={Colors.purple200} />
                    <View style={styles.soundValue}>
                        <Text>0%</Text>
                        <Text>100%</Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

}
const styles = StyleSheet.create({
    setting: {
        flex: 1,
        justifyContent: 'space-evenly',
    },
    settingText: {
        fontWeight: 'bold',
        flex:2,
    },
    objects: {
        flex: 8,
        flexDirection: 'row',
    },
    soundValue: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});