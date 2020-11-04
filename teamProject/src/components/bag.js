import React from 'react';

import { StyleSheet, View,ScrollView, Dimensions, Image } from 'react-native';


import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Bag() {
    return (
        <View style={styles.bagList}>
            
            <ScrollView style={styles.list}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', backgroundColor: 'gray', width: '100%' }}>
                    <View style={styles.item}>
                    <MaterialCommunityIcons name="seed" size={24} color="black" />
                    </View>
                    <View style={styles.item}>
                    </View>
                    <View style={styles.item}>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', backgroundColor: 'gray', width: '100%' }}>
                    <View style={styles.item}>
                    </View>
                    <View style={styles.item}>
                    </View>
                    <View style={styles.item}>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', backgroundColor: 'gray', width: '100%' }}>
                    <View style={styles.item}>
                    </View>
                    <View style={styles.item}>
                    </View>
                    <View style={styles.item}>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', backgroundColor: 'gray', width: '100%' }}>
                    <View style={styles.item}>
                    </View>
                    <View style={styles.item}>
                    </View>
                    <View style={styles.item}>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', backgroundColor: 'gray', width: '100%' }}>
                    <View style={styles.item}>
                    </View>
                    <View style={styles.item}>
                    </View>
                    <View style={styles.item}>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', backgroundColor: 'gray', width: '100%' }}>
                    <View style={styles.item}>
                    </View>
                    <View style={styles.item}>
                    </View>
                    <View style={styles.item}>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', backgroundColor: 'gray', width: '100%' }}>
                    <View style={styles.item}>
                    </View>
                    <View style={styles.item}>
                    </View>
                    <View style={styles.item}>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', backgroundColor: 'gray', width: '100%' }}>
                    <View style={styles.item}>
                    </View>
                    <View style={styles.item}>
                    </View>
                    <View style={styles.item}>
                    </View>
                </View>


            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    bagList: {
        flex: 1,
        backgroundColor: '#fff',

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
        height: Dimensions.get('window').height * 10 / 100,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        marginVertical: Dimensions.get('window').height * 1 / 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
