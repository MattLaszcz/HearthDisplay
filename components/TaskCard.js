import React, { useState, useEffect } from "react";
import { View, Switch, StyleSheet, TouchableOpacity, Button, Text, Image, ScrollView, Pressable} from "react-native";
import DoneButton from '../components/DoneButton';
// import ProgressCircle from 'react-native-progress-circle';


let instancesCount = 0
const TaskCard = (props) => {
  
    useEffect(() => {
      instancesCount += 1
      console.log({instancesCount})
      return () => {
        instancesCount -= 1
        console.log({instancesCount})
      }
    }, [])

  const [shouldShow, setShouldShow] = useState(true);
  
  function toggleCheck  () {
    console.log('TOGGLE CHECK WORKED')
    props.clicked();
    
}

  return (
    <View>
    <View style={styles.container}>
    {/* <ProgressCircle
            percent={30}
            radius={50}
            borderWidth={8}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff"
        ><Text style={{ fontSize: 18 }}>{'30%'}</Text>Text</ProgressCircle> */}
     
      <View style={styles.taskitems}>
            <Image source={require('../assets/bed.png')}></Image>
            <Image source={require('../assets/starwithcolor.png')}></Image>
            <Text>{props.chore}</Text>
             {/* <DoneButton />  */}
            <TouchableOpacity >
               
                 {shouldShow ? (
              <Button 
                    title="Done"
                    color="#F79762"
                    //onPress={() => this.toggleCheck()}
                    //disabled={true}
                    style={styles.donebutton}
                    onPress={() => {setShouldShow(!shouldShow);toggleCheck();}}
              />
                 ) : null}
            </TouchableOpacity> 
            {!shouldShow ? (
            <Image source={require('../assets/check.png')}></Image>
            ) : null}
            {/* <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? 'black' : 'white' }, styles.btn ]}>
                {({ pressed }) => (
                  <Text style={[{ color: pressed ? 'white' : 'black' }, styles.btnText]}>
                    Pressable
                  </Text>
                )}
            </Pressable> */}

      </View>  
    </View>
   </View>

  );
}

const styles = StyleSheet.create({
  container: {
    
    alignItems: "center",
    justifyContent: "center",
    // borderRadius: 15,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 8,
    height: 100,
    width: '100%',
    // display: 'flex',
    backgroundColor: 'white',
    margin: 7,
    borderColor: '#F79762',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowColor: 'grey',
    shadowOpacity: 0.3,
    shadowRadius: 8
    
  },
  taskitems: {
    display: 'flex',
    flexDirection: 'row',
    // alignContent: 'space-around',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // margin: 15,
    // borderWidth: 2,
    // borderColor: 'red',
    width: '90%',
    
  },
  donebutton: {
    //   backgroundColor: '#1AA39B',
      color: 'orange',
      width: 75,
      height: 40,
      borderRadius:  25,
      borderWidth: 2,
      borderColor: '#F79762',
      //display: 'none'
  }
});

export default TaskCard;