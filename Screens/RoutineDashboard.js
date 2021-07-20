import React from 'react';
//import * as Font from 'expo-font';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, ScrollView, useState, Alert, Modal, ImageBackground } from 'react-native';
import TaskCard from '../components/TaskCard';
//import { AnimatedCircularProgress } from 'react-native-circular-progress';
//import AnimatedCircularProgress from 'react-native-animated-circular-progress';
import CircularProgress from '../components/CircularProgressBar';
//import CircularProgress1 from '../components/CircularProgressTimer1';
import DoneButton from '../components/DoneButton';
import TimerCountdown from '../components/TimerCountdown';
import TimerTest from './TimerTest';
import moment from 'moment';
import axios from 'axios';
import SimpleTimer from './TimerTest';
import Background from '../components/Background';
import CircularProgressBar from '../components/CircularProgressBar';


/**
 * Profile screen
 */
export default class Tasks extends React.Component {

    constructor() {
        super();
        this.d = new Date().toString();
    }

    state = {
        tasks: 2,
        completeTasks: 0,
        isVisible: true,
        setShouldShow: false,
        buttonShouldShow: false,
        homeLogoShouldShow: true,
        countDownShouldShow: false,
        counter_1: 90,
        intervalId: null,
        test: true
    }

    shouldShow () {
        this.setState({
            setShouldShow: true
        });

    }

    buttonShouldShow () {
        this.setState({
            buttonShouldShow: true,
            homeLogoShouldShow: false,
            countDownShouldShow: true,
            test: false
        });

    }

    
   
    completeTasksCheck () {
        
        if (this.state.completeTasks === this.state.tasks) {
            //this.shouldShow;
            console.log('You Finished 1')
            this.buttonShouldShow(); 
            this.setState({true: true});
            this.timer();
            return (
            
            console.log('You finished 2')
            //alert('You finihsed');
            )
        }
    }

    timer_1 () {
        if (this.state.counter_1 > 0) {
        this.setState({counter_1: this.state.counter_1 - 1})
        }
        else
            return;
    }


    timer () {
        this.setState({timer: true});
       
        if ((this.state.counter_1 > 0 && this.state.test === true)) {
            setInterval(() => 
            this.timer_1(),
            //this.setState({counter_1: this.state.counter_1 - 1}), 
            2000);
            
            //this.setState({counter_1: this.state.counter_1 - 1})
       }
        else 
            return;
        
    }

    componentDidMount() {
        
        // if ((this.state.counter_1 > 0 && this.state.test === true)) {
        //     setInterval(() => this.setState({counter_1: this.state.counter_1 - 1}), 1000);
        //     //setIntervalId(intervalId)
        // }
        
        if (this.state.test === true) {
            console.log("the initiation test worked")
        }
        
        //console.log('completeTasks1:' + this.state.completeTasks);
        axios.post('https://hearth-5d9ff-default-rtdb.firebaseio.com/users.json')
        .then( response => {
            // console.log( response );
            //const key = Object.keys(response.data);
            // console.log('KEY' + key);
            let keys = Object.keys(response.data);
                const posts = Object.values(response.data);
                const test = response.data[id];  //IMPORTANT----------------------------
                console.log(keys);
                console.log(posts);
                console.log('This was clicked');
            this.setState( { submitted: true } );
        } );

    //     fetch('https://hearth-5d9ff-default-rtdb.firebaseio.com/users.json', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //         //body: _data
            
    // })




    //     axios.get('https://hearth-5d9ff-default-rtdb.firebaseio.com/tasks.json', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         //body: _data
    // }).then( response => {
    //             //let posts = Object.values(response.data);
    //             let keys = Object.keys(response.data);
    //             const posts = Object.values(response.data);
    //             const test = response.data[id];  //IMPORTANT----------------------------
    //             console.log(keys);
    //             console.log(posts);
    //             console.log('This was clicked');
    //             //const data_1 = {
    //                // answer,
    //              //   isAnswered: true
    //            // };
    //             //const data_2 = JSON.stringify(data_1);
    //             //alert(data_2);
    //             //const data = this.state.posts;
       
            
    //         //axios.patch('posts/'+id+'.json', data_2);

            
    //         });


        //     var counter = 0;
        // React.Children.forEach(this.props.children, function(child) {
        //   if (child.id.task1) counter++;
        // });
        //  if (this.state.completeTasks === 2) {
        //     console.log('Finished')
        //    return (
        //         console.log('Finished')
        //    )
        // }
        // this.setState({
        //     tasks: counter
        // });    
        //console.log('counter'+ counter); LOGS THE INSTANCES COUNTED
        //return counter;

      }
 
    updateTaskCountHandler (className) {
        // if (this.state.completeTasks === this.state.tasks) {
        //     //this.shouldShow;
        //     console.log('You Finished 1')
        //     this.buttonShouldShow(); 

            
        //     return (
            
        //     console.log('You finished 2')
        //     //alert('You finihsed');
        //     )
        // }
        
        
        // const currentTaskCount = this.state.completeTasks;
        // console.log('currentTaskCount:'+ currentTaskCount);
        // const updatedTaskCount = currentTaskCount + 1;
        // console.log('updatedTaskCount:'+ updatedTaskCount);
        console.log('Initial complete tasks'+this.state.completeTasks);

        //let taskCount = this.state.completeTasks;
        //taskCount = taskCount + 1;

        //console.log('taskCount'+' '+taskCount);
        //this.setState({completeTasks: taskCount});

        //   this.setState((state) => {
        //       return {completeTasks:  this.state.completeTasks + 1};
        //       console.log('completeTasks:' + this.state.completeTasks);
              
        //   });

          this.setState({
                completeTasks: (this.state.completeTasks + 1)
            },()=>{
                this.completeTasksCheck();
          console.log('completeTasks:' + this.state.completeTasks);
        })

        

          
        // this.setState({
        //     completeTasks: this.taskCount;
           
        // })
        
        console.log('completeTasks:' + this.state.completeTasks);
        console.log('className:'+ className);
       
        
        
    }   

    

    static navigationOptions = ({ navigation }) => {
        return {
             title: navigation.getParam('name'),
        };
    };

    // timer () {
    //     // if (counter === 0) {
    //     //     return;
    //     // }
    //   if (this.state.counter > 0) {
    //       const id = setInterval(() => this.setState({counter: this.state.counter - 1}), 1000);
    //       this.setState({intervalId: this.state.intervalId})
    //   }
    //   else if (counter === 0) {
    //     return (
    //         console.log('Counting is done')
    //     )
    //   }
    
    // }

    render() {
      
        const percentage = 50;
        const _percentage = (this.state.completeTasks/this.state.tasks)*100;

        const { navigate, state } = this.props.navigation;
        //const date = moment().format('MMMM Do YYYY, h:mm:ss a');
    //     const getCurrentDate=()=>{

    //         var date = new Date().getDate();
    //         var month = new Date().getMonth() + 1;
    //         var year = new Date().getFullYear();
      
    //         //Alert.alert(date + '-' + month + '-' + year);
    //         // You can turn it in to your desired format
    //         return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
    //   }

    
   

        return (
        
            <View style={styles.container}>
                {/* <Background></Background> */}
               {/* <ImageBackground 
               //src={'../assets/backgroundgradient.png'} 
               style={styles.backgroundimage}
               source={require('../assets/backgroundgradient.png')}
               > */}
            {/* <Image source={require('../assets/gradientbackground.png')} style={styles.backgroundImage}>

            </Image> */}
           {/* <Text>Countdown: {this.state.counter}</Text>
                <CircularProgressBar percent={counter}></CircularProgressBar>
                <TouchableOpacity><Button style={styles.button} title='start timer' onPress={this.timer()}></Button></TouchableOpacity> */}
            <View style={styles.circularprogress}>
            {/* {this.state.countDownShouldShow ? (<TimerTest style={styles.timertest} start={true}></TimerTest>) : null} */}
                        {this.state.countDownShouldShow ?  
                        <View className="App">
                            {/* <Text>Countdown: {this.state.counter_1}</Text> */}
                            <CircularProgressBar percent={this.state.counter_1} ringColor= '#1AA39B'
                ringBgColor='lightgrey'></CircularProgressBar>
                            {/* <TouchableOpacity><Button style={styles.button} title='start timer' onPress={timer}></Button></TouchableOpacity> */}
                        </View> : null}
                        {!this.state.countDownShouldShow ? <CircularProgress  percent={_percentage}></ CircularProgress > : null }
                
                {/* <CircularProgress
                    id = 'CountDownProgress'
                    ringColor= 'blue'
                    ringBgColor='#1AA39B'
                
                ></ CircularProgress > */}
           
                {this.state.setShouldShow ? (
            <CircularProgress
                id = 'CountDownProgress'
                ringColor= 'blue'
                ringBgColor='#1AA39B'
        
                ></ CircularProgress >
       
                ) : null}
            {this.state.buttonShouldShow ? (
            
             <Image style={styles.stars} source={require('../assets/stars.png')}>
             
            </Image>
           
            ) : null}
            </View>
                
                <Image
                    style={styles.addprofile}
                    source={require('../assets/timmy.png')}
                    
                />
                <View style={styles.timeanddate}>
                   {/* <Text style={styles.date}>Monday, January 3, 2021</Text> 
                   <Text style={styles.time}>9:41 AM</Text> */}
                   <Text>{this.d}</Text>
                   
                </View>
                <View>
                {this.state.homeLogoShouldShow ? (
                <Text style={styles.text}>What have you done this morning? Complete Your Routine</Text>
                ) : null}
                </View>

                {this.state.buttonShouldShow ? (
                <Text style={styles.freetime}>FREE TIME UNLOCKED</Text>
                ) : null}

                <ScrollView style={styles.taskitems}>
                    
                    <TaskCard style={styles.taskcard} clicked={() => this.updateTaskCountHandler("task1")} id='task1' chore='Get Dressed'/>
                    <TaskCard clicked={() => this.updateTaskCountHandler("task1")} chore='Make Bed'/>
                    <TaskCard clicked={() => this.updateTaskCountHandler("task1")} chore='Brush Teeth'/>
                    <TaskCard clicked={() => this.updateTaskCountHandler("task1")} chore='Eat Breakfast'/>
                    <TaskCard clicked={() => this.updateTaskCountHandler("task1")} chore='Shower'/>
                    <TaskCard clicked={() => this.updateTaskCountHandler("task1")} chore='Clean Bathroom'/>
                    {/* <TaskCard clicked={() => this.updateTaskCountHandler("task1")} chore='Get Dressed'/>
                    <TaskCard clicked={() => this.updateTaskCountHandler("task1")} chore='Make Bed'/>
                    <TaskCard clicked={() => this.updateTaskCountHandler("task1")} chore='Brush Teeth'/>  */}
                   
                    
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => navigate('AddAProfile')}>
                        <Text style={styles.homebutton}>Home</Text>
                    </TouchableOpacity>
                    {this.state.homeLogoShouldShow ? (
                    <Image
                        style={styles.blacklogo}
                        source={require('../assets/blacklogo.png')}
                        
                    />
                    ) : null}
                    {this.state.buttonShouldShow ? (
                    <TouchableOpacity style={styles.startroutine} >
                        <Button
                                color='white'
                                title="Start Free Time"
                                onPress={() => navigate('Tasks')}
                            />
                    </TouchableOpacity>
                    ) : null}

                    <View>
                    
                    
                    
                    <Image
                        style={styles.blacklogo}
                        source={require('../assets/reward.png')}
                    
                    />
                    
                    <Text style={styles.homebutton}>Rewards</Text>
                    </View>
                </View>
                {/* </ImageBackground> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "Circular Std",
        //backgroundColor: '#E9F5F5',
        // borderColor: 'red',
        // borderWidth: 2,
        //fontFamily: 'Open Sans'
        
    },
    backgroundimage: {
        //flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    addprofile: {
        position: 'absolute',
        top: 20,
        left: 10,
        width: 150,
        height: 150,
        //color: 'black'
    },
    timeanddate: {
        position: 'absolute',
        top: 20,
        right: 25,
        width: '50%',
        height: '10%',
        // borderColor: 'red',
        // borderWidth: 1,
        // backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',

    },
    date: {
      
    },
    time: {
        
    },
    text: {
        //fontFamily: 'Open Sans'
    },
    progress: {
        marginBottom: 100
    },
    taskitems: {
       marginTop: 50,
       width: '90%'
    },
    circularprogress: {
        marginTop: 300,
        // borderColor: 'red',
        // borderWidth: 2,
        
    },
    taskcard: {
        width: '100%'
    },
    footer: {
        position: 'relative',
        bottom: 0,
        height: 100,
        backgroundColor: 'white',
        // alignSelf: 'stretch'
        width: '100%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderWidth: 2,
        borderColor: '#ECE9E9',
        // borderColor: 'red',
        // borderWidth: 2,
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 50,
        paddingRight: 50
        
    },
    blacklogo: {
        height: 30,
        width: 30,
        alignSelf: 'center'

    },
    // backgroundImage: {
    //     flex: 0,
    //     resizeMode: 'cover', // or 'stretch'
    // },
    homebutton: {
        marginLeft: 0
    },
    startroutine: {
        color:"#1AA39B",
        backgroundColor: '#1AA39B',
        color: 'white',
        width: 300,
        borderRadius: 25,
        
    },
    freetime: {
        fontSize: 24,
        color: '#1AA39B',
        marginTop: 20
    },
    stars: {
        position: 'absolute',
        alignItems: 'center',
        marginLeft: -75,
        //borderWidth: 1,
        bottom: 20
    },
    timertest: {
        marginBottom: 100,
        borderWidth: 2
    }
});