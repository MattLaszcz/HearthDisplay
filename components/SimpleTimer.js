import * as React from "react";
import { render } from "react-dom";
import { TouchableOpacity } from "react-native";
import { View, Switch, StyleSheet, Text, Button } from "react-native";
//import { Button } from "react-native-elements/dist/buttons/Button";
//import "./styles.css";

function SimpleTimer() {
  const [counter, setCounter] = React.useState(60);

  // First Attempts
  // setInterval(() => setCounter(counter - 1), 1000);

  // Second Attempts
  // React.useEffect(() => {
  //   counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
  // }, []);

  // Second Attempts - Inspection
  // React.useEffect(() => {
  //   counter > 0 &&
  //     setInterval(() => {
  //       console.log(counter);
  //       setCounter(counter - 1);
  //     }, 1000);
  // }, []);

  // Third Attempts
  // React.useEffect(() => {
  //   const timer =
  //     counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
  //   return () => clearInterval(timer);
  // }, [counter]);

  // Suggested by Laurent

  // function timer () {
  //   React.useEffect(() => {
  //       counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  //     }, [counter]);
    
  // }
  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  
  return (
    <View>
       <View>
        <Text>Countdown: {counter}</Text>
        {/* <TouchableOpacity><Button style={styles.button} title='start timer' onPress={this.timer}></Button></TouchableOpacity> */}
        <Text>Hello</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addprofile: {
        height: 200,
        width: 200,
        marginTop: 50
    },
    title: {
        fontSize: 32,
        marginBottom: 20
    },
    body: {
        fontSize: 15,
        width: 300,
        textAlign: 'center'
    },
    logogreen: {
        marginBottom: 100
    }, 
    button: {
        backgroundColor: 'green',
        width: 100,
        height: 50,
        color: 'green'
    }
});

//const rootElement = document.getElementById("root");
//render(<SimpleTimer />, rootElement);

export default SimpleTimer;