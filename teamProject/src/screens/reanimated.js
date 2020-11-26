import React, { Component, useState } from 'react';
import { Dimensions, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Animated, { Easing, useSharedValue, repeat, useAnimatedGestureHandler, withTiming, sequence, useAnimatedStyle, } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const Box = (props) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);

    const killMe = () => {
        scale.value = sequence(withTiming(1.3, { duration: 70, easing: Easing.in }),
            withTiming(0, { duration: 250, easing: Easing.out }));
        setTimeout(() => props.removeBox(props.myId), 500);
    }
    
    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startX = translateX.value;
            ctx.startY = translateY.value;
        },
        onActive: (event, ctx) => {
            translateX.value = ctx.startX + event.translationX;
            translateY.value = ctx.startY + event.translationY;
        },
        onEnd: (event, ctx) => {
            scale.value = repeat(sequence(
                withTiming(1.1, { duration: 200 }),
                withTiming(1.0, { duration: 200 }),
                withTiming(0.9, { duration: 100 }),
                withTiming(1.0, { duration: 100 })), -1);
        }
    });
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { scale: scale.value }
            ]
        }
    });
    return (
        <PanGestureHandler key={Math.random.toString()} onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.box, props.style, animatedStyle]}>
                <TouchableOpacity style={{ flex: 1 }} onPress={killMe} />
            </Animated.View>
        </PanGestureHandler>
    )
}

export default class ReanimatedBox extends Component {
    constructor(props) {
        super(props);
        this.state = { boxes: [], preloadedBoxes: [] };
        this.window = Dimensions.get('window');

        //load boxes dynamically.
        for (let i = 0; i < 10; i++) {
            this.state.preloadedBoxes.push(
                <Box key={Math.random().toString()}
                    myId={Math.random().toString()}
                    removeBox={this.removeBox}
                    style={{ backgroundColor: '#' + Math.random().toString(16).substr(2, 6) }}
                />
            );
        }
    };

    removeBox = (id) => {
        const idx = this.state.boxes.findIndex((box) => box.props.myId === id);
        if (idx == -1) return;
        this.state.boxes.splice(idx, 1);
        this.setState({ boxes: this.state.boxes });
    }
    addBox = () => {
        this.state.boxes.push(<Box key={Math.random().toString()}
            myId={Math.random().toString()}
            removeBox={this.removeBox}
            style={{ position: 'absolute', top: 0, left: 0 }}
        />);
        this.setState({ boxes: this.state.boxes });
    }

    render() {

        return (
            <View style={styles.container}>
                <TouchableOpacity style={[styles.box, { backgroundColor: 'red' }]}
                    onPress={this.addBox}>
                    <Text style={styles.commandText}>
                        힁구
                        </Text>
                </TouchableOpacity>
                <View style={{ flex: 0.5, position: 'absolute', top: '50%' }}>
                    <View style={styles.wrapRowContainer}>
                        {this.state.preloadedBoxes}
                    </View>
                </View>
                <View style={{ flex: 1, position: 'absolute' }}>
                    {this.state.boxes}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
    },
    box: {
        width: 80,
        height: 80,
        backgroundColor: "blue",
    },
    commandText: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
    },
    wrapRowContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    }
});
