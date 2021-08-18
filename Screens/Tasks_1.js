import React, { useEffect, useState } from 'react';
//import * as Font from 'expo-font';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, ScrollView, Alert, Modal, ImageBackground, Pressable } from 'react-native';
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
//import AddEvent from './AddEvent';
import AddTask from './AddTask';
import TimerTest from './TimerTest';
//import Search from '../components/SearchBar';
//import store from '../../HearthNative/App';
import { connect, useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import Firebase, { db } from '../config/Firebase';
import store from '../store/reducers/index_1';


function Tasks_1 () {

    const [name, setName] = useState('');
    const [assigned, setAssigned] = useState('');
    const [tag, setTag] = useState('');
    const [id, setId] = useState('');
    const [tasks, setTasks] = useState([]);
    const [tasks_, setTasks_] = useState([]);
    const [completeTasks, setCompleteTasks] = useState(0);
    const [isVisible, setisVisible] = useState(true);
    const [selectedCountriesValues, setselectedCountriesValues] = useState('uk');
    const [buttonShouldShow, setbuttonShouldShow] = useState(false);
    const [eventShouldShow, seteventShouldShow] = useState(true);
    const [countries, setcountries] = useState('France');
    const [modalVisible, setmodalVisible] = useState(false);
    const [notes, setnotes] = useState('');
    const [reminder, setreminder] = useState('');
    const [setShouldShow, setsetShouldShow] = useState(false);
    const [homeLogoShouldShow, sethomeLogoShouldShow] = useState(true);
    const [allShouldShow, setallShouldShow] = useState(true);
    // const [selectedCountries, setselectedCountries] = useState([{ label: 'UK', value: 'uk', icon: () => <Icon name="plus" size={18} color="#900" /> }]);

   


//--------------------GET INFO------------------------------
// useEffect(() => {
//     setId(userId);
//     console.log('TASKS_1 USER ID' + userId);
// });

//    const getInfoHandler = () => {
//     var docRef = db.collection('users').doc(id).collection('tasks');
    
//       var docRefTest = db.collection('users').doc(id).collection('tasks').get()
//       .then(querySnapshot => {
//         const documents = querySnapshot.docs.map(doc => doc.data());
//         console.log('documents'+documents);
//         setTasks(documents);
//     });

//     docRef.get().then((doc) => {
//         if (doc.exists) {
//             const tasks = doc.data();
//             let keys = Object.keys(tasks);
//             let values = Object.values(tasks);
//             const updatedPosts = keys.map(key => {
//                 return {
//                     key, ...tasks[key],

//                 }
//             });
//             console.log('UPDATED POSTS ' + updatedPosts);
//             console.log('THIS STATE TASKS' + tasks);
//             console.log('keys ' + keys);
//             console.log('values ' + values);

//             console.log("Document data:", doc.data());
//             //this.setState({ tasks_: keys });
//         } else {

//             // doc.data() will be undefined in this case
//             console.log("No such document!");
//         }
//     }).catch((error) => {
//         console.log("Error getting document:", error);
//     });
// }

const userId = useSelector((state) => state.id);
console.log('USERID '+userId);


//--------------------GET INFO------------------------------
// useEffect(() => {

//     //const setUserId = setId(userId);

//     if (id !== '') {
//         db.collection('users').doc(id).collection('tasks').onSnapshot((snapshot)=>{
//             const tempTasks = [];
//             snapshot.forEach(
//                doc => {
//                    tempTasks.push(doc.data());
//                }
//             )
//             setTasks(tempTasks);
//         });
//     }
// });

useEffect(() => {

    // this will make sure you only set id when userId
    // is a valid value, and it won't reset it every
    // serenader
  if(userId!=='' && id !== userId)
     setId(userId);

  if (id !== '') {
      db.collection('users').doc(id).collection('tasks').onSnapshot((snapshot)=>{
          const tempTasks = [];
          snapshot.forEach(
             doc => {
                 tempTasks.push(doc.data());
             }
          )
          setTasks(tempTasks);
      });
  }

},[id, userId]);

useEffect(()=> console.log('here'),[userId]);



const thissetModalVisible = (visible) => {
        setmodalVisible(visible);
    }

// const shouldShow = () => {
//         setsetShouldShow(true);
//     }

    // function buttonShouldShow() {
    //     this.setState({
    //         buttonShouldShow: true,
    //         homeLogoShouldShow: false
    //     });
    // }

    // const thisbuttonShouldShow = () => {
    //     setbuttonShouldShow(true);
    //     seteventShouldShow(false);
    // }


    // componentDidUpdate () {
    //    // this.getInfoHandler();
    //    this.state.tasks
    // }


    // const showAllTasksHandler = () => {
    //     // this.setState({

    //     // })
    // }

    // const showCategoriesHandler = () => {
    //         // this.setState({

    //         // })
    //     }


        //--------NAVIGATION--------------------------------
        // static navigationOptions = ({ navigation }) => {
        //     return {
        //         title: navigation.getParam('name'),
        //     };
        // };

    
      
        //const { modalVisible } = modalVisible;
        // const percentage = 50;
        // const _percentage = (completeTasks / tasks) * 100;

        //const { navigate, state } = this.props.navigation;
        //const date = moment().format('MMMM Do YYYY, h:mm:ss a');
        //     const getCurrentDate=()=>{

        //         var date = new Date().getDate();
        //         var month = new Date().getMonth() + 1;
        //         var year = new Date().getFullYear();

        //         //Alert.alert(date + '-' + month + '-' + year);
        //         // You can turn it in to your desired format
        //         return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
        //   }


        const tasks1 = tasks;

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
                    {/* <Text>{this.d}</Text> */}

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
                    // onRequestClose={
                    //     //Alert.alert("Modal has been closed.");
                    //     //setModalVisible(!modalVisible)
                    // }
                    >
                    <View
                        style={styles.centeredView}
                    >

                        <View style={styles.modalView}>
                             <AddTask 
                                changeModal={(modal) => setmodalVisible(modal)}
                             />
                        {/* <TouchableOpacity style={styles.startroutine} >
                            <Button
                                color='white'
                                title="SAVE"
                                onPress={()=>setmodalVisible(!modalVisible)}
                            />
                        </TouchableOpacity> */}
                            {/* <TouchableOpacity styles={{backgrounfColor: "#1AA39B"}}>
                            <Button
                                title="Close"
                                color= "#1AA39B"
                                //backgroundColor="#1AA39B"
                                style={[
                                    styles.button,
                                    styles.buttonClose,
                                    styles.modalitem

                                ]}
                                onPress={() => this.setModalVisible(!modalVisible)} />
                                </TouchableOpacity> */}
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
                            {setShouldShow ? (
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
                                <Text onPress={() => setmodalVisible(true)}>Add Category</Text><Icon name="plus" size={18} color="black" />
                            </Pressable>
                        </View>
                    </View>
                    <ScrollView>
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
                    </ScrollView>
                    {/* <View>
                        <TaskItem />
                        <TaskItem />
                        <TaskItem />
                        <TaskItem />
                    </View> */}
                    <ScrollView>
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
                    </ScrollView>
                    {/* <View>
                    <TaskItem />
                    <TaskItem />
                    <TaskItem />
                    <TaskItem />
                </View> */}
                    <ScrollView>
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

                </ScrollView>

                <View 
                    style={{width: 50,borderWidth: 1, borderColor: 'red', marginBottom: '5%', marginRight: '5%'}}
                    >
                <TouchableOpacity 
                    onPress={() => setmodalVisible(true)}
                    style={{width: 50,height: 50, borderWidth: 2, borderColor: 'blue', zIndex:5, marginBottom: 100, position: 'absolute' }}>
                        <Image 
                            
                            style={styles.addprofilebutton}
                            source={require('../assets/addprofilebutton.png')}>

                        </Image>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity 
                    onPress={() => navigate('AddAProfile')}
                    >
                        <Text style={styles.homebutton}>Home</Text>
                    </TouchableOpacity>
                    {homeLogoShouldShow ? (
                        <Image
                            style={styles.blacklogo}
                            source={require('../assets/blacklogo.png')}

                        />
                    ) : null}
                    {buttonShouldShow ? (
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
        fontColor: 'white',
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
    },
    startroutine: {
        color: "#1AA39B",
        backgroundColor: '#1AA39B',
        color: 'white',
        width: 100,
        borderRadius: 25,
        //marginRight: 30,
        // borderWidth: 2,
    }
});

export default Tasks_1;
