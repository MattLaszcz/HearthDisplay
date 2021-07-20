import React, { useState } from "react";
import { View, Switch, StyleSheet, TouchableOpacity, Button, Text, Image, Animated, Easing } from "react-native";
// import ProgressCircle from 'react-native-progress-circle';

const SpinningLogo = () => {

    spinValue = new Animated.Value(0);

    // First set up animation 
    Animated.loop(
      Animated.timing(
        this.spinValue,
        {
         toValue: 1,
         duration: 10000,
         easing: Easing.linear,
         useNativeDriver: true
        }
      )
     ).start();


// Next, interpolate beginning and end values (in this case 0 and 1)
const spin = this.spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg']
})


  
  return (
    <View style={styles.container}>
        <Animated.Image
            style={{transform: [{rotate: spin}] }}
            source={require('../assets/whitelogo.png')}>
                
        </ Animated.Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    alignItems: "center",
    justifyContent: "center",
    
    height: 100,
    width: 550,
    // display: 'flex',
    // backgroundColor: 'white',
    margin: 12,
    
  },
  
});

export default SpinningLogo;