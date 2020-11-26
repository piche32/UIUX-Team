import React, { Component, useState, useRef, useEffect } from 'react';
import { Dimensions, View, StyleSheet, TouchableOpacity, Pressable, TouchableWithoutFeedback } from 'react-native';
import { Modal, Text, Button, TouchableRipple } from 'react-native-paper';
import { State, TapGestureHandler, PanGestureHandler, RotationGestureHandler } from 'react-native-gesture-handler';
import Animated, { Easing, useSharedValue, useDerivedValue, interpolateColors,
     withSpring, useAnimatedStyle, repeat, delay, useAnimatedGestureHandler, withTiming, sequence, EasingNode, cancelAnimation } from 'react-native-reanimated';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';


const Box = (props) => {
    console.log('Box', props);
    const x = useSharedValue(0);
    const y = useSharedValue(0);
    const color = useSharedValue("blue");
    const scale = useSharedValue(1);
    const [active, setActive] = useState(false);
        
    useEffect(() => {activate(props.active);        
},[props.active]);

       
useEffect(() => {
    switch(props.action) {
        case "jump": jump(); props.cleanupAction(); break;
    }        
},[props.action]);


    const jump = () => {
        x.value = withTiming(x.value + 20, {duration: 200, ease: Easing.linear});
        y.value = repeat(withTiming(y.value - 80, {duration: 100}), 2, true);
        
     }

    const blink = () => { }

    const setColor = (c)=> color.value = c;

    const activate = (newActive=true)=> {
        if (newActive) {
            setColor("orange");
        } else {
            setColor("blue");
        }
        setActive(newActive);
    }
    

    const panHandler = useAnimatedGestureHandler( {
        onStart: (_, ctx) => {
            ctx.startX = x.value;
            ctx.startY = y.value;
            ctx.dragged = false;
        },
        onActive: (event, ctx) => {
            if (ctx.dragged == false) {
                ctx.dragged = true;
                /* dragging를 처음 시작하게 된다면 */               
            }
            x.value = ctx.startX + event.translationX;
            y.value = ctx.startY + event.translationY;
        },
        onFinish: (_, ctx) => {
            if (ctx.dragged == true) {
                /* dragging을 했다면 */
            }
        }
    });

    const onTap = () => {
        props.activate();
        //activate(!active);
    }


    const animatedStyle = useAnimatedStyle( ()=> {
        return {
            borderRadius: 5,
            elevation: 10,
            backgroundColor: color.value,
            left: props.left,
            top: props.top,
            transform: [ 
                {translateX: x.value },
                {translateY: y.value },
                {scale: scale.value }
            ]
        }
    });
    return (
        <PanGestureHandler onGestureEvent={panHandler} >
            <Animated.View style={[styles.box, animatedStyle]} >
                <TouchableWithoutFeedback 
                    onPress = {onTap} >
                    <Text style={styles.commandText} >
                        test
                    </Text>
                </TouchableWithoutFeedback>
            </Animated.View>
        </PanGestureHandler>
    );
}

const Boxes = (props) => {
    const [boxes, setBoxes] = useState([{
        name: 'box 1',
        left: 0,  top: 0, width: 100, height: 10, active: false},
    {
        name: 'box 2',
        left: 100, top: 100, width: 100, height: 10, active: false},
    ]
    );

    const intersect = ( x, y, w, h, x1, y1, w1, h1) => 
        y + h >= y1 && y1 + h1 >= y && x + w >= x1 && x1 + w1 >= x;

    const cleanupAction = (name) => {
        let myBoxes = [... boxes];
        myBoxes.forEach((box) => {
            if(box.name == name){
                box.action = null;
            }
        });
        setBoxes(myBoxes);
    }

    const jump = ()=> {
        console.log("Boxes jump called");
        let myBoxes = [...boxes];
        myBoxes.forEach((box) => {
            if(box.active == true){
                box.action = "jump";
            }
        });
        setBoxes(myBoxes);
}
    const blink = () => {}
    
    const activate = (name, newActive) => {
        let myBoxes = [... boxes];
        myBoxes.forEach((box)=> {
            if(box.name == name){
                box.active = newActive;
            }
        });
        setBoxes(myBoxes);
    }

    let boxesRender = [];
    for(let i =0; i<boxes.length; i++){

    let box = boxes[i];
        boxesRender.push(<Box left={box.left} top={box.top}
            width={box.width} height={box.height}
             name={box.name} key ={box.name}
             active={box.active} action ={box.action}
             cleanupAction = {() => cleanupAction(box.name)}
             activate ={()=>activate(box.name, !box.active)}
             />);
    }
    return <View key="boxContainer" style={styles.absoluteContainer} >
        {
            boxesRender
            /* box 정보로 부터 Box 콤포넌트 구축 */
        }
        <View key="buttons" style={styles.menu} >
            <Button onPress={jump} >점프</Button>
            <Button onPress={blink} >깜빡</Button>
            <Button onPress={()=>console.log(boxes)} >박스 정보보기</Button>

        </View>
    </View>
}

export default class ReanimatedScreen extends React.Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        return (
            <View style={styles.absoluteContainer}>
                <View style={[styles.container, {backgroundColor: 'yellow'}]}>
                    <Boxes />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent"
    },
    absoluteContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    menu: {
        height:30, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    box: {
        position: 'absolute',
        width: 80,
        height: 80,
        backgroundColor: "blue",
    },
    commandText: {
        flex:1,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white'
    },
    wrapRowContainer: {
        flex: 1, 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'flex-start'
    },
    border: {
        borderColor: 'yellow',
        borderWidth: 10,
        borderStyle: 'dashed',
    }
});