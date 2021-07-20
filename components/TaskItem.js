import React, { useState, useEffect } from "react";
import { TextInput } from "react-native";
import { View, Switch, StyleSheet, TouchableOpacity, Button, Text, Image, ScrollView, Pressable} from "react-native";
import DoneButton from '../components/DoneButton';
// import ProgressCircle from 'react-native-progress-circle';
import {useSelector} from 'react-redux';


let instancesCount = 0
const TaskItem = (props) => {


  //const resduxStoreTest = useSelector(state => state.tasks.task);
  
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
    {/* <Text>{resduxStoreTest}</Text> */}
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
            <Image source={require('../assets/Checked-task.png')}></Image>
            {/* <View>{props.notes}</View>
            <View>{props.reminder}</View> */}
            <Text>{props.name}</Text>
            <Text>{props.chore}</Text>
            <Text>{props.assigned}</Text>
             {/* <DoneButton />  */}
            {/* <Text>Email the HOA</Text> */}
              <Text>Assigned:</Text>
              <Image style={styles.profileimage} source={require('../assets/mom.png')}></Image>
              <Image style={styles.profileimage} source={require('../assets/mom.png')}></Image>
            

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
    height: 50,
    width: 550,
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
    width: 500,
    borderWidth: 2,
    height: '90%'
    
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
  },
  profileimage: {
      width: '6%',
      height: '70%',
      borderWidth: 2
  }
});

export default TaskItem;