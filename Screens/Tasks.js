import React from 'react';
//import * as Font from 'expo-font';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, ScrollView, useState, Alert, Modal, ImageBackground, Pressable } from 'react-native';
import { SearchBar } from 'react-native-elements';
import TaskCard from '../components/TaskCard';
//import { AnimatedCircularProgress } from 'react-native-circular-progress';
//import AnimatedCircularProgress from 'react-native-animated-circular-progress';
import CircularProgress from '../components/CircularProgressBar';
import DoneButton from '../components/DoneButton';
import TimerCountdown from '../components/TimerCountdown';
import moment from 'moment';
import axios from 'axios';
import { ToolbarAndroid } from 'react-native';
import TaskItem from '../components/TaskItem';
import Icon from 'react-native-vector-icons/Feather';
import AddEvent from './AddEvent';
import TimerTest from './TimerTest';
//import Search from '../components/SearchBar';
//import store from '../../HearthNative/App';
import { connect, useDispatch } from 'react-redux'
//import { useSelector } from 'react-redux';
import Firebase, { db } from '../config/Firebase';
import store from '../store/reducers/index_1';


/**
 * Profile screen
 */
export default class Tasks extends React.Component {

    constructor(props) {
        super(props);

        this.d = new Date().toString();
        
        store.subscribe(() => {
            // When state will be updated(in our case, when items will be fetched), 
            // we will update local component state and force component to rerender 
            // with new data.
            let stateId = store.getState().id;
            this.setState({
                id: stateId
            });
        });

        this.state = {
            tasks: 6,
            completeTasks: 0,
            isVisible: true,
            setShouldShow: false,
            buttonShouldShow: false,
            homeLogoShouldShow: true,
            allShouldShow: true,
            tasks_: [],
            modalVisible: false,
            selectedCountriesValues: ['uk'],
            selectedCountries: [{ label: 'UK', value: 'uk', icon: () => <Icon name="plus" size={18} color="#900" /> }],
            countries: 'France',
            name: '',
            assigned: '',
            id: store.getState().id
        }

        let stateId = store.getState().id;
        this.setState({
            id: stateId
        });
        // When state will be updated(in our case, when items will be fetched), 
        // we will update local component state and force component to rerender 
        // with new data.

        // this.setState({
        //   id: store.getState().id
        // });

        
        
    }



    setModalVisible = (visible) => {

        // store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about stores' })
        // store.dispatch(tasksReducer('Dispatch Worked'));

        this.setState({ modalVisible: visible });
        //this.postDataHandler();
        const data = {
            reminder: this.state.reminder,
            notes: this.state.notes,
            name: this.state.name,
            assigned: this.state.assigned
        };
        const _data = JSON.stringify(data);
        //('_data'+_data);
        //console.log(data);
        axios.post('https://hearth-5d9ff-default-rtdb.firebaseio.com/tasks.json', _data)
            .then(response => {
                //console.log( response );
                const key = Object.keys(response.data);
                //console.log('KEY' + key);

                this.setState({ submitted: true });
            });

        fetch('https://hearth-5d9ff-default-rtdb.firebaseio.com/users.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: _data
        })
    }

    shouldShow() {
        this.setState({
            setShouldShow: true
        });

    }

    buttonShouldShow() {
        this.setState({
            buttonShouldShow: true,
            homeLogoShouldShow: false
        });
    }

    completeTasksCheck() {
        if (this.state.completeTasks === this.state.tasks) {
            //this.shouldShow;
            //console.log('You Finished 1')
            this.buttonShouldShow();


            // return (

            // console.log('You finished 2')
            // //alert('You finihsed');
            // )
        }
    }

    componentDidMount() {

        store.subscribe(() => {
            // When state will be updated(in our case, when items will be fetched), 
            // we will update local component state and force component to rerender 
            // with new data.
            let stateId = store.getState().id;
            this.setState({
                id: stateId
            });
        });

        this.getInfoHandler();
        console.log('TASKS RECEIVED ID'+ this.state.id);
        //    AXIOS------------------------------------------------------------     
        //console.log('COMPONENT DID MOUNT TEST');
        axios.get('https://hearth-5d9ff-default-rtdb.firebaseio.com/tasks.json')
            .then(response => {
                //let posts = Object.values(response.data);
                let keys = Object.keys(response.data);
                //console.log('object KEYS'+keys);

                const updatedPosts = keys.map(key => {
                    return {
                        key, ...response.data[key],

                    }
                });
                const updatedPosts_1 = JSON.stringify(updatedPosts)
                //console.log('updatedposts'+updatedPosts_1);

                //------------------SET STATE TASKS---------------
                //this.setState( { tasks_: updatedPosts } );
                //console.log('This state tasks'+this.state.tasks_);
            })
            .catch(error => {
                console.log(error);
                // this.setState({error: true});
            });

        //console.log('completeTasks1:' + this.state.completeTasks);
        axios.post('https://hearth-5d9ff-default-rtdb.firebaseio.com/users.json')
            .then(response => {
                // console.log( response );
                //const key = Object.keys(response.data);
                // console.log('KEY' + key);
                let keys = Object.keys(response.data);
                const posts = Object.values(response.data);
                const test = response.data[id];  //IMPORTANT----------------------------
                //console.log(keys);
                //console.log(posts);
                //console.log('This was clicked');
                this.setState({ submitted: true });
            });

        //    AXIOS------------------------------------------------------------  

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
        //const data_1 = {
        // answer,
        //   isAnswered: true
        // };
        //const data_2 = JSON.stringify(data_1);
        //alert(data_2);
        //const data = this.state.posts;


        //axios.patch('posts/'+id+'.json', data_2);


        // });

        //-----------INSTANCE COUNTER--------------------------------------------------------------
        //     var counter = 0;
        // React.Children.forEach(this.props.children, function(child) {
        //   if (child.id.task1) counter++;
        // });
        // //  if (this.state.completeTasks === 2) {
        // //     console.log('Finished')
        // //    return (
        // //         console.log('Finished')
        // //    )
        // // }
        // // this.setState({
        // //     tasks: counter
        // // });    
        // //console.log('counter'+ counter); LOGS THE INSTANCES COUNTED
        // return counter;

    }

    updateTaskCountHandler(className) {
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
        //console.log('Initial complete tasks'+this.state.completeTasks);

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
        }, () => {
            this.completeTasksCheck();
            console.log('completeTasks:' + this.state.completeTasks);
        })


        // {this.state.setShouldShow ? (


        //         ) : null}

        // this.setState({
        //     completeTasks: this.taskCount;

        // })

        //console.log('completeTasks:' + this.state.completeTasks);
        //console.log('className:'+ className);



    }

    getInfoHandler() {
        var docRef = db.collection('users').doc('H7pFwl0uuRV1NMt8y55S42hxpTi2').collection('tasks').doc('Z6vzTZUu1p0VDIkQkbJW');

        docRef.get().then((doc) => {
            if (doc.exists) {
                const tasks = doc.data();
                let keys = Object.keys(tasks);
                let values = Object.values(tasks);
                const updatedPosts = keys.map(key => {
                    return {
                        key, ...tasks[key],

                    }
                });
                console.log('UPDATED POSTS ' + updatedPosts);
                console.log('THIS STATE TASKS' + tasks);
                console.log('keys ' + keys);
                console.log('values ' + values);

                console.log("Document data:", doc.data());
                this.setState({ tasks_: keys });

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    showAllTasksHandler() {
        // this.setState({

        // })
    }

    showCategoriesHandler() {
        // this.setState({

        // })
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name'),
        };
    };

    render() {
        const { modalVisible } = this.state;
        const percentage = 50;
        const _percentage = (this.state.completeTasks / this.state.tasks) * 100;

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



        const tasks1 = this.state.tasks_;

        return (



            <View style={styles.container}>

                {/* <TouchableOpacity style={styles.startroutine} >
                        <Button
                                color='white'
                                title="Start Free Time"
                                onPress={() => navigate('TimerTest')}
                            />
                    </TouchableOpacity> */}

                {/* <ImageBackground 
               //src={'../assets/backgroundgradient.png'} 
               style={styles.backgroundimage}
               source={require('../assets/backgroundgradient.png')}
               > */}
                {/* <Image source={require('../assets/gradientbackground.png')} style={styles.backgroundImage}>

            </Image> */}



                <View style={styles.circularprogress}>




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


                {/* TASK MODAL BUTTON---------------------------------------*/}
                {/* <Pressable
                            style={[styles.button, styles.buttonOpen]}
                            onPress={() => this.setModalVisible(true)}
                            >
                            <Text style={styles.textStyle}>Task</Text>
                </Pressable> */}

                {/* TASKS---------------------------------------*/}
                <Modal
                    style={styles.modal}
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        //Alert.alert("Modal has been closed.");
                        this.setModalVisible(!modalVisible);
                    }}>
                    <View
                        style={styles.centeredView}
                    >

                        <View style={styles.modalView}>
                            <AddEvent />
                            <Pressable
                                title="Close"
                                color='white'

                                style={[
                                    styles.button,
                                    styles.buttonClose,
                                    styles.modalitem

                                ]}
                                onPress={() => this.setModalVisible(!modalVisible)} />
                            {/* <Button title = "close">
                                        <Text>Close</Text>
                                    </Button> */}
                        </View>
                    </View>
                </Modal>
                <ScrollView style={styles.taskcontainer}>

                    <View style={styles.header}>
                        <View style={styles.search}>
                            <Text style={styles.searchbarText}>Tasks</Text>
                            <View style={styles.searchbar}>
                                <SearchBar
                                    //style={styles.searchbar}
                                    //backgrouindColor='white'
                                    placeholder="Search"
                                    //onChangeText={this.updateSearch}
                                    //value={search}
                                    containerStyle={{ backgroundColor: '#E9F5F5' }}
                                    inputStyle={{ backgroundColor: 'white' }}
                                    platform={Platform.OS}
                                />
                            </View>
                        </View>
                        {/* --------------------------------------------------------------------------------------- */}
                        <View style={styles.addcategory}>
                            <View>
                                <Text>Sort by:</Text>
                            </View>
                            {/* {this.state.allShouldShow ? ( */}
                            <View><Text
                            //onPress={this.showAllTasksHandler()}
                            >
                                View All</Text></View>
                            {/* ) : null} */}
                            {/* {this.state.allShouldShow ? ( */}
                            <View><Text
                            //onPress={this.showAllTasksHandler()}
                            >
                                Category</Text></View>
                            {/* ) : null} */}
                            <View style={styles.profileimageContainer}>
                                <Image style={styles.profileimage} source={require('../assets/mom.png')}></Image>
                                <Image style={styles.profileimage} source={require('../assets/mom.png')}></Image>
                                <Image style={styles.profileimage} source={require('../assets/mom.png')}></Image>
                            </View>
                            {this.state.setShouldShow ? (
                                <View><Text
                                //onPress={this.showCategoriesHandler()}
                                >View Category</Text></View>
                            ) : null}
                        </View>
                        {/* --------------------------------------------------------------------------------------- */}


                        <View style={styles.categoryandtasks}>

                        </View>
                        <View >
                            <Pressable style={styles.filter}>
                                <Text onPress={() => this.setModalVisible(true)}>Add Category</Text><Icon name="plus" size={18} color="black" />
                            </Pressable>
                        </View>
                    </View>
                    <View>
                        <View style={styles.taskcategory}>
                            <View>
                                <Text>Home</Text>
                            </View>
                            <View style={styles.plusicon}><Icon name="plus" size={18} color="black" /></View>
                        </View>
                    </View>
                    <View style={styles.tasks}>
                        {tasks1.map((task) => {
                            return (
                                <TaskItem
                                    //key={task.key}
                                    notes={task.notes}
                                    reminder={task.reminder}
                                    name={task.name}
                                    assigned={task.assigned}
                                //type={task.type}
                                //body={task.body}
                                //answer={task.answer}
                                //onChange={(value, id) => this.postAnswerHandler(value, id)}
                                //clicked={(body) => this.displayAnswerHandler(body)}
                                />
                            );
                        })}
                    </View>
                    {/* <View>
                        <TaskItem />
                        <TaskItem />
                        <TaskItem />
                        <TaskItem />
                    </View> */}

                    <View>
                        <View style={styles.taskcategory}>
                            <View>
                                <Text>Work</Text>
                            </View>
                            <View><Icon name="plus" size={18} color="black" /></View>
                        </View>
                    </View>
                    <View style={styles.tasks}>
                        {tasks1.map((task) => {
                            return (
                                <TaskItem
                                    //key={task.key}
                                    notes={task.notes}
                                    reminder={task.reminder}
                                    name={task.name}
                                    assigned={task.assigned}
                                //type={task.type}
                                //body={task.body}
                                //answer={task.answer}
                                //onChange={(value, id) => this.postAnswerHandler(value, id)}
                                //clicked={(body) => this.displayAnswerHandler(body)}
                                />
                            );
                        })}
                    </View>
                    {/* <View>
                    <TaskItem />
                    <TaskItem />
                    <TaskItem />
                    <TaskItem />
                </View> */}

                    <View>
                        <View style={styles.taskcategory}>
                            <View>
                                <Text>Chores</Text>
                            </View>
                            <View><Icon name="plus" size={18} color="black" /></View>
                        </View>
                    </View>
                    <View style={styles.tasks}>
                        {tasks1.map((task) => {
                            return (
                                <TaskItem

                                    //key={task.key}
                                    notes={task.notes}
                                    reminder={task.reminder}
                                    name={task.name}
                                    assigned={task.assigned}
                                //type={task.type}
                                //body={task.body}
                                //answer={task.answer}
                                //onChange={(value, id) => this.postAnswerHandler(value, id)}
                                //clicked={(body) => this.displayAnswerHandler(body)}
                                />
                            );
                        })}
                    </View>



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
        backgroundColor: '#E9F5F5',
        borderColor: 'red',
        // borderWidth: 2,
        //fontFamily: 'Open Sans'

    },
    modal: {
        width: '50%',
        height: '100%'
    },
    taskcontainer: {
        //borderWidth: 1,
        //borderColor: 'red',
        //alignItems: 'center',
        //justifyContent: 'center',

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
        width: 300,
        height: 100,
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
        marginTop: 50
    },
    circularprogress: {
        marginTop: 300,
        // borderColor: 'red',
        // borderWidth: 2,

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
    search: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        // borderWidth: 1,
        borderColor: 'blue'

    },
    searchbar: {
        // borderWidth: 1,
        borderColor: 'red',
        width: '80%',
        //marginRight: 0
        backgroundColor: 'white',
        //height: '80%'

    },
    filter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        //justifyContent: 'center',
        marginBottom: 20


    },
    addcategory: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        //alignContent: 'center',
        // marginBottom: 20,
        // marginLeft: 0,
        // marginRight: 10,
        // borderWidth: 1,
        borderColor: 'yellow',
        height: 50,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    taskcategory: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        //alignItems: 'center',
        //justifyContent: 'center',
        alignContent: 'space-between',
        //borderWidth: 1,
        //borderColor: 'red',
        marginBottom: 15,
        marginTop: 15,
        marginLeft: 15
    },
    header: {
        // display: 'flex',
        // flexDirection: 'row',
        // borderColor: 'green',
        // borderWidth: 1
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
        // borderWidth: 2,
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        color: 'white',
        fontSize: 10
    },
    buttonOpen: {
        backgroundColor: '#1AA39B',
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    startroutine: {
        color: "#1AA39B",
        backgroundColor: '#1AA39B',
        color: 'white',
        width: 100,
        borderRadius: 25,
        marginRight: 30
    },
    buttonrow: {
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: '',
        alignItems: 'flex-start',
        width: '90%',
        marginLeft: 0


    },
    routinename: {
        fontSize: 28,
        left: 0
    },
    routineitems: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        //alignItems: 'flex-start',
        width: '90%',
        // marginLeft: 100,
        // marginRight: 100
        marginBottom: 20,
        //borderColor: 'blue'
    },
    breakline: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '90%',
        marginTop: 10,
        marginBottom: 10
    },
    addprofilebutton: {
        width: 50,
        height: 50
    },
    input: {
        height: 40,
        width: '30%',
        // //margin: 12,
        // borderWidth: 1,
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 0
    },
    modalView: {
        margin: 20,
        marginTop: '25%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        width: '70%',
        //height: '50%',
        height: 700,
        shadowOffset: {
            width: 0,
            height: 2,
            borderWidth: 2,
            borderColor: 'red'
        },
        alignSelf: 'center'
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: '#1AA39B',
    },
    buttonClose: {
        //backgroundColor: "#2196F3",
        color: "white",
        backgroundColor: '#1AA39B',
        color: 'white',
        width: 100,
        borderRadius: 25,
        marginRight: 30
    },
    input: {
        height: 40,
        width: 250,
        margin: 12,
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 0,
        borderWidth: 1
    },
    picker: {
        height: 15
    },
    profilephotos: {
        //   borderColor: 'red',
        //   borderWidth: 1,
        width: '20%',
        height: '20%',
        position: 'absolute',
        marginTop: -30,

    },
    modalitems: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-between',
        //position: 'relative',
        //   borderColor: 'red',
        //   borderWidth: 1,
        marginTop: 50,
        height: '70%',
        alignContent: 'center',
        width: '50%'

    },
    modalitem: {
        alignSelf: 'center',
        // borderWidth: 2,
        borderColor: 'red'
    },
    profileimage: {
        width: '50%',
        height: '100%',
        //borderWidth: 2,
        marginLeft: 10,
        marginRight: 10
    },
    tasks: {
        // borderWidth: 2,
        borderColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileimageContainer: {
        height: '100%',
        // borderWidth: 2,
        borderColor: 'purple',
        width: 80,
        display: "flex",
        flexDirection: 'row',
        alignContent: 'space-between'

    },
    searchbarText: {
        fontSize: 40,
    },
    categoryandtasks: {
        // borderWidth: 5,
        // borderColor: 'lightgreen'
    },
    plusicon: {
        marginRight: 0
    }
});