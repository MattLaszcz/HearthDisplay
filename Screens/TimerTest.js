// import * as React from "react";
// //import { CircularProgressbar } from "react-circular-progressbar";
// import { render } from "react-dom";
// import { View, Switch, StyleSheet, Text, Button, TouchableOpacity } from "react-native";
// //import "./styles.css";
// import CircularProgressBar from '../components/CircularProgressBar';

// function SimpleTimer(props) {
//     const [counter, setCounter] = React.useState(5);
//     const [intervalId, setIntervalId] = React.useState(null)
//     const [initiate, setInitiate] = React.useState(true)
    
//     function timer (props) {
//         // if (counter === 0) {
//         //     return;
//         // }
//       if ((counter > 0)) {
//           const id = setInterval(() => setCounter(counter => counter - 1), 1000);
//           setIntervalId(intervalId)
//       }
//       else if (counter === 0) {
//         return (
//             console.log('Counting is done')
//         )
//       }
      
//     }
  
//     return (
//       <View className="App">
//         <Text>Countdown: {counter}</Text>
//         <CircularProgressBar percent={counter}></CircularProgressBar>
//         {/* <TouchableOpacity><Button style={styles.button} title='start timer' onPress={timer}></Button></TouchableOpacity> */}
//       </View>
//     );
//   }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     addprofile: {
//         height: 200,
//         width: 200,
//         marginTop: 50
//     },
//     title: {
//         fontSize: 32,
//         marginBottom: 20
//     },
//     body: {
//         fontSize: 15,
//         width: 300,
//         textAlign: 'center'
//     },
//     logogreen: {
//         marginBottom: 100
//     }, 
//     button: {
//         backgroundColor: 'green',
//         width: 100,
//         height: 50,
//         color: 'green'
//     }
// });

// //const rootElement = document.getElementById("root");
// //render(<SimpleTimer />, rootElement);

// export default SimpleTimer;