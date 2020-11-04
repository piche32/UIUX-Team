
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default function BookScene() {
    return (
      <View style={styles.bookSceneContainer}>
        <Text>Test</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    bookSceneContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  