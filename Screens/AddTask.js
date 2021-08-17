import  React from 'react';
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, TextInput, CheckBox, Switch} from 'react-native';
import ToggleSwitch from '../components/ToggleSwitch';

import store from '../store/reducers/index_1';
import {db, FireStore} from '../config/Firebase';

import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';


function AddTask (props)  {
    
    const [name, setName] = useState('');
    const [assigned, setAssigned] = useState('');
    const [tag, setTag] = useState('');
    const [id, setId] = useState('');
    const [tasks, setTasks] = useState('');
    const [completeTasks, setCompleteTasks] = useState(0);
    //const [isVisible, setisVisible] = useState(true);
    const [selectedCountriesValues, setselectedCountriesValues] = useState('uk');
    const [buttonShouldShow, setbuttonShouldShow] = useState(false);
    const [eventShouldShow, seteventShouldShow] = useState(true);
    const [countries, setcountries] = useState('France');
    const [modalVisible, setmodalVisible] = useState(true);
    const [notes, setnotes] = useState('');
    const [reminder, setreminder] = useState('');
    const [isSelected, setSelection] = useState(false);
    const [priority, setPriority] = useState(false);
    
    const { onStateChange } = props;
    
    const toggleSwitch = () => setPriority(previousState => !previousState);

    const userId = useSelector((state) => state.id)
    console.log('userId '+ userId);
    // const storeSubscribe = store.subscribe(() => {
    //     // When state will be updated(in our case, when items will be fetched), 
    //     // we will update local component state and force component to rerender 
    //     // with new data.
    //     console.log(store.getState().id);
    //     setId(store.getState().id)
    // });

    //const updateTaskInfo = event => setName(event.target.value);

    const getInfoHandler = () => {
        var docRef = db.collection('users').doc(id).collection('tasks');
        
          var docRefTest = db.collection('users').doc(id).collection('tasks').get()
          .then(querySnapshot => {
            const documents = querySnapshot.docs.map(doc => doc.data());
            console.log('documents'+documents);
            setTasks({documents});
        });

        

           
       // var docRefTest = db.collection('users').doc(this.state.id).collection('tasks').docs.map(doc => doc.data());
        //console.log('docRefTest'+docRefTest);
        //return snapshot.docs.map(doc => doc.data());
        //.doc('Z6vzTZUu1p0VDIkQkbJW');

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
                //this.setState({ tasks_: keys });

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    function thissetModalVisible (visible) {
        setModalVisible( visible );
        postDataHandler();
    }

    function thisbuttonShouldShow () {
        setbuttonShouldShow(true);
        seteventShouldShow(false);
    }

    function thiseventShouldShow () {
        setbuttonShouldShow(false);
        seteventShouldShow(true);
    }

    useEffect(() => {
        thisaddTaskHandler
    })

    function thisaddTaskHandler (props) {
        console.log('this state id' + id);
        db.collection('users').doc(id).collection('tasks').doc().set({
            name: name,
            assigned: assigned,
            tag: tag,
            priority: priority
        })
        props.setModalVisible;
        const closeModal = !modalVisible;
        setmodalVisible(closeModal); 
        console.log('MODAL VISIBLE '+ modalVisible);
        //const updatedState = modalVisible;
        //onStateChange(updatedState);
    }

    useEffect(() => {
        getInfoHandler
        console.log('tasks 1'+ tasks);
        console.log('PRIORITY ' + priority);
    });

    console.log('tasks 2'+ tasks);

    useEffect(() => {
        console.log('userId TEST'+ userId);
        console.log('name state '+name,name);
        setId(userId);
        
         store.subscribe(() => {
            // When state will be updated(in our case, when items will be fetched), 
            // we will update local component state and force component to rerender 
            // with new data.
            let stateId = store.getState().id;
            console.log('store get state id '+store.getState().id);
            setId(stateId);
            console.log('id 1 '+id,id);
        });
        console.log('id 2'+id,id);
        
    });

    

    const updateTaskInfo = event => setName(event.target.value);

   

    // const addTaskHandler = () => {
    //     //console.log('this state id' + this.state.id);
    //     db.collection('users').doc(this.state.id).collection('tasks').doc().set({
    //         name: this.state.name,
    //         assigned: this.state.assigned,
    //         tag: this.state.tag
    //     })
    // }
    
        return (
            <View style={styles.container}>
                {/* <View> */}
                    {/* <Text
                    style={{marginBottom: 20}}
                  >
                    {this.d}</Text> */}
                    
                    <View style={styles.buttonrow}>
                        <TouchableOpacity style={styles.startroutine} >
                            <Button
                                color='white'
                                title="Event"
                                onPress={thiseventShouldShow}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.startroutine} >
                            <Button 
                                color='white'
                                title="Task"
                                onPress={thisbuttonShouldShow}
                            />
                        </TouchableOpacity>
                        {/* <Pressable
                            style={[styles.button, styles.buttonOpen]}
                            onPress={() => this.setModalVisible(true)}
                            >
                            <Text style={styles.textStyle}>Task</Text>
                        </Pressable> */}
                        <TouchableOpacity style={styles.startroutine} >
                            <Button
                                color='white'
                                title="Routine"
                            //onPress={() => navigate('RoutineDashboard')}
                            />
                        </TouchableOpacity>
                    </View>

                    {buttonShouldShow ? (
                    <View style={styles.routineitems}>
                       
                        <TextInput
                            type='submit'
                            style={styles.input}
                            onChangeText ={ value => setName(value)}
                            value={name}
                            title='Name'
                            placeholder="Task Name"
                            // onChangeText={onChangeText}
                            //value={this.state.name}
                        />
                        <View style = {{display: 'flex', flexDirection:'row'}}>
                         <Text style={{borderWidth: 0,alignSelf: 'center', marginRight: 0}}>Priority</Text>
                        {/* <ToggleSwitch 
                            onValueChange={toggleSwitch}
                        /> */}
                        <View style={styles.container}>
                            <Switch
                                trackColor={{ false: "#767577", true: "#BAE3E1" }}
                                thumbColor={priority ? "#30ACA5" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={priority}
                            />
                            </View>
                        </View>
                    </View>
                ) : null}

                    {eventShouldShow ? (
                    <View>
                        <Text style={styles.routinename}>Routine Name</Text>
                    </View>
                            
                    ) : null}
                    {/* {buttonShouldShow ? (
                        <View style={styles.routineitems}>

                        <TextInput
                            type='submit'
                            style={styles.input}
                            onChangeText ={ value => setName(value)}
                            value={name}
                            title='Name'
                            placeholder="Task Name"
                            // onChangeText={onChangeText}
                            //value={this.state.name}
                        />

                    </View>
                    

                    ) : null} */}
                    <View style={styles.breakline} />
                    <View style={{flexDirection: 'row', width: '90%'}}>
                        <Icon style={{marginRight: 25}} name="location" size={18} color="#900" />
                        <Text style={{color:'lightgrey'}}>Location</Text>
                    </View>
            {/* </View> */}
                <View style={styles.breakline} />

                {eventShouldShow ? (
                    <View style={styles.routineitems}>
                        <Text>All Day</Text>
                        <ToggleSwitch />
                    </View>
                ) : null}


                {eventShouldShow ? (
                    <View style={styles.routineitems}>
                        <Text>Starts</Text>
                        <Text>None</Text>
                    </View>
                ) : null}

                {eventShouldShow ? (
                    <View style={styles.routineitems}>
                        <Text>Ends</Text>
                        <Text>None</Text>
                    </View>
                ) : null}

                {eventShouldShow ? (
                    // <View style={styles.breakline} />
                    <View style={styles.routineitems}>
                        <Text>Who's coming?</Text>

                    </View>

                ) : null}


                {eventShouldShow ? (
                    <View style={styles.breakline} />
                ) : null}
                <View style={styles.whosresponsible}>
                {/* </View></View><View style={styles.routineitems}> */}
                    <Text 
                            // style={{ borderWidth: 1 }}
                            >
                                
                            Who's Responsible?</Text>
                {/* </View> */}


                {/* <View style={styles.routineitems}> */}
                    <TouchableOpacity style={{ }}>
                        <Image 
                            // style={{ borderWidth: 1 }}
                            style={styles.addprofilebutton}
                            source={require('../assets/addprofilebutton.png')}>

                        </Image>
                    </TouchableOpacity>
                {/* </View> */}
                </View>
                <View style={styles.breakline} />
                {/* <View style={styles.routineitems}>
                    {this.state.eventShouldShow ? (
                        <Text>Reminder</Text>
                    ) : null}
                </View> */}
                {buttonShouldShow ? (
                    <View style={styles.routineitems}>

                        <Text style={{ }}>Reminder</Text>
                        <TextInput
                            style={{ borderWidth: 1,
                            alignContent:'center', placeholderTextAlign: 'center',placeholderTextColor: 'blue' }}
                            style={styles.input}
                            onChangeText ={ value => setName(value)}
                            value={reminder}
                            placeholder="Reminder"
                            //placeholderTextColor='blue'
                            textAlign={'right'}
                            // onChangeText={onChangeText}
                            //value={this.state.reminder}
                        />
                    </View>
                ) : null}
                <View style={styles.breakline} />
                <View style={styles.routineitems}>
                    <Text>Notes</Text>
                    {/* <Text>None</Text> */}
                    <TextInput
                        style={styles.input}
                        onChangeText ={ value => setName(value)}
                        value={notes}
                        placeholder="Notes"
                        textAlign={'right'}
                        // onChangeText={onChangeText}
                        //value={this.state.notes}
                    />
                </View>
                {buttonShouldShow ? (
                    <View style={styles.breakline} />) : null}
                {buttonShouldShow ? (
                    <View style={styles.routineitems}>
                        <Text>Category</Text>
                        <DropDownPicker
                            //value={this.state.type} onChange={( event ) => this.setState( { type: event.target.value } )}
                            style={{ zIndex: 1 }}
                            placeholder="Tags"
                            items={[
                                { label: 'Chores', value: 'Chores', icon: () => <Image source={require('../assets/addprofilebuttonicon.png')} /> },
                                { label: 'School', value: 'School', icon: () => <Image source={require('../assets/addprofilebuttonicon.png')} /> },
                                { label: 'After-School', value: 'After-School', icon: () => <Image source={require('../assets/addprofilebuttonicon.png')} /> },


                            ]}

                            multiple={true}
                            multipleText="%d items have been selected."
                            min={0}
                            max={10}

                            defaultValue={countries}
                            containerStyle={{ height: 40, width: 150 }}
                            itemStyle={{
                                justifyContent: 'flex-start', borderRadius: 20
                            }}
                            onChangeItem={item => setTag(
                                item // an array of the selected items values
                            )}
                            onChangeItemMultiple={item => setTag(
                                item // an array of the selected items
                            )}
                            style={styles.picker} />
                        {/* <TouchableOpacity style={styles.tag} title='tag'>
                            <Text>Tag</Text> */}
                            {/* <Image 
                            style={styles.addprofilebutton}
                            source={require('../assets/addprofilebutton.png')}>
                        
                        </Image> */}
                            {/* <Button
                            style={styles.tagbutton}
                            title='tag'
                        >

                        </Button> */}
                        {/* </TouchableOpacity> */}
                    </View>) : null}

                <View style={styles.breakline} />

                {/* <View style={styles.checkboxContainer}>
                            <CheckBox
                            value={isSelected}
                            onValueChange={setSelection}
                            style={styles.checkbox}
                            />
                            <Text style={styles.label}>Do you like React Native?</Text>
                    </View> */}
                            {/* <Text>Is CheckBox selected: {isSelected ? "👍" : "👎"}</Text> */}
                    
                        <TouchableOpacity >
                            <Button
                            title='ADD'
                            //color="#ff5c5c"
                            onPress={() => props.changeModal(false)}
                            //onPress={() => props.setValue(true)}
                            >

                            
                            </Button>
                        </TouchableOpacity>
                  
                {/* <TouchableOpacity style={styles.startroutine} >
                        <Button
                                color='white'
                                title="Routine Builder"
                                onPress={() => this.setModalVisible(!modalVisible)}
                                //onPress={() =>  this.props.navigation.navigate(
                                    //'RoutineDashboard', { name: 'RoutineDashboard' }
                                //)}
                            />
                    </TouchableOpacity> */}
                {/* <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            this.setModalVisible(!modalVisible);
                        }}
                    >
                        
                        <View style={styles.centeredView}>
                        
                            <View style={styles.modalView}>
                            <View style={styles.profilephotos}>
                            <Image
                            
                            source={require('../assets/mom.png')}
                            />
                        </View>

                       
                        <View style={styles.modalitems}>
                            <View style={styles.modalitem}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={text => this.setState( { name: text } )}
                                    placeholder="Task Name"
                                    // onChangeText={onChangeText}
                                    value={this.state.name}
                                />
                            </View>

                            <View style={styles.modalitem}>

                            <DropDownPicker 
                                //value={this.state.type} onChange={( event ) => this.setState( { type: event.target.value } )}
                                style={{zIndex: 8}}
                                placeholder="Category"
                                items={[
                                    {label: 'Chores', value: 'Chores', icon: () => <Icon name="flag" size={18} color="#900" />},
                                    {label: 'School', value: 'School', icon: () => <Icon name="flag" size={18} color="#900" />},
                                
                                ]}
                            
                                multiple={true}
                                multipleText="%d items have been selected."
                                min={0}
                                max={10}
                            
                                defaultValue={this.state.countries}
                                containerStyle={{height: 40,width: 300}}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                onChangeItem={item => this.setState({
                                    assigned: item // an array of the selected items values
                                })}
                                onChangeItemMultiple={item => this.setState({
                                    selectedCountries: item // an array of the selected items
                                })}
                                style={styles.picker}/>
                                </View>
                                <View style={styles.modalitem}>

                                <DropDownPicker
                                style={{zIndex: 9}} 
                                placeholder="Assign To"
                                items={[
                                    {label: 'Matt', value: 'Matt', icon: () => <Icon name="plus" size={18} color="#900" />},
                                    {label: 'Nat', value: 'Nat', icon: () => <Icon name="plus" size={18} color="#900" />},
                                    {label: 'Mei Lin', value: 'Mei Lin', icon: () => <Icon name="plus" size={18} color="#900" />},
                                    {label: 'Susie', value: 'Susie', icon: () => <Icon name="plus" size={18} color="#900" />},
                                ]}
                            
                                multiple={true}
                                multipleText="%d items have been selected."
                                min={0}
                                max={10}
                            
                                defaultValue={this.state.countries}
                                containerStyle={{height: 40,width: 300}}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                onChangeItem={item => this.setState({
                                    selectedCountriesValues: item // an array of the selected items values
                                })}
                                onChangeItemMultiple={item => this.setState({
                                    selectedCountries: item // an array of the selected items
                                })}
                                style={styles.picker}/>
                                </View>
                            <Pressable
                                style={[styles.button, styles.buttonClose,styles.modalitem]}
                                onPress={() => this.setModalVisible(!modalVisible)}
                                
                            >
                                <Text style={{zIndex: 10}} style={styles.textStyle}>Add Task</Text>
                            </Pressable>
                            </View>
                            </View>
                        </View>
                        </Modal> */}

            </View>



            // <View style={styles.container}>

            //     <Text
            //         style={{marginBottom: 20}}
            //     >
            //         {this.d}</Text>
            //     <View style={styles.buttonrow}>
            //     <TouchableOpacity style={styles.startroutine} >
            //             <Button
            //                     color='white'
            //                     title="Event"
            //                     //onPress={() => navigate('RoutineDashboard')}
            //                 />
            //         </TouchableOpacity>
            //         <TouchableOpacity style={styles.startroutine} >
            //             <Button
            //                     color='white'
            //                     title="Task"
            //                     //onPress={() => navigate('RoutineDashboard')}
            //                 />
            //         </TouchableOpacity>
            //         <TouchableOpacity style={styles.startroutine} >
            //             <Button
            //                     color='white'
            //                     title="Routine"
            //                     //onPress={() => navigate('RoutineDashboard')}
            //                 />
            //         </TouchableOpacity>
            //     </View>
            //     <View style={styles.breakline} />
            //     <Text style={styles.routinename}>Routine Name</Text>
            //     <View style={styles.routineitems}>
            //         <Text>All Day</Text>
            //         <ToggleSwitch />
            //     </View>
            //     <View style={styles.routineitems}>
            //         <Text>All Day</Text>
            //         <Text>None</Text>
            //     </View>
            //     <View style={styles.routineitems}>
            //         <Text>All Day</Text>
            //         <Text>None</Text>
            //     </View>
            //     <View style={styles.breakline} />
            //     <View style={styles.routineitems}>
            //         <Text>All Day</Text>
                    
            //     </View>
            //     <View style={styles.routineitems}>
            //         <TouchableOpacity>
            //             <Image 
            //                 style={styles.addprofilebutton}
            //                 source={require('../assets/addprofilebutton.png')}>
                        
            //             </Image>
            //         </TouchableOpacity>
            //     </View>
            //     <View style={styles.breakline} />
            //     <View style={styles.routineitems}>
            //         <Text>Add A Reward Type</Text>
                    
            //     </View>
            //     <View style={styles.breakline} />
            //     <View style={styles.routineitems}>
            //         <Text>Notes</Text>
            //         <Text>None</Text>
            //     </View>
            //     <View style={styles.breakline} />
            //     <TextInput
            //                 //style={{ borderWidth: 1,
            //                 //alignContent:'center', placeholderTextAlign: 'center',placeholderTextColor: 'blue' }}
            //                 //style={styles.input}
            //                 onChangeText ={ value => setName(value)}
            //                 value={name}
            //                 placeholder="Name"
            //                 //placeholderTextColor='blue'
            //                 //textAlign={'right'}
            //                 // onChangeText={onChangeText}
            //                 value={name}
            //             />


            //     <TouchableOpacity style={styles.startroutine} >
            //             <Button
            //                     color='white'
            //                     title="Start Free Time"
            //                     onPress={
            //                         addTaskHandler
            //                         //() => navigate('RoutineDashboard')
            //                     }
            //                 />
            //         </TouchableOpacity>
            // </View>
        );
}

    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        // borderWidth: 2,
        borderColor: 'blue'
    },
    startroutine: {
        color: "#1AA39B",
        backgroundColor: '#1AA39B',
        color: 'white',
        width: 100,
        borderRadius: 25,
        marginRight: 30,
        // borderWidth: 2,
    },
    buttonrow: {
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: '',
        alignItems: 'flex-start',
        marginBottom: 20,
        marginLeft: 0,
        // borderWidth: 2,
        // borderColor: 'red',
        width: '90%'


    },
    routinename: {
        fontSize: 28,
        //width: '100%',
        left: 0,
        marginLeft: 0,
        // borderWidth: 1
    },
    routineitems: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        //alignItems: 'flex-start',
        width: '90%',
        // marginLeft: 100,
        // marginRight: 100
        //marginBottom: 20,
        borderColor: 'red',
        alignItems: 'center', //Centered vertically
        //borderWidth: 1
    },
    breakline: {
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
        width: '90%',
        marginTop: 10,
        marginBottom: 10,
        
    },
    addprofilebutton: {
        width: 50,
        height: 50
    },
    input: {
        height: 40,
        width: '30%',
        //margin: 12,
        // borderWidth: 1,
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 0,
        fontSize: 50,
        textAlignVertical:'bottom', 
        paddingTop: 0, 
        paddingBottom:0,
        textAlign: 'right'
    },
    modalView: {
        //borderWidth: 2,
        //borderColor: 'blue',
        margin: 20,
        marginTop: '30%',
        marginBottom: 50,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        width: '70%',
        height: '90%',
        shadowOffset: {
            width: 0,
            height: 2,

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
        backgroundColor: "#2196F3",
    },
    input: {
        height: 40,
        width: 250,
        marginBottom: 12,
        //borderWidth: 1,
        borderRadius: 0,
        backgroundColor: 'white',
        // borderWidth: 0,
        // borderWidth: 1,
        
        //borderBottomWidth: 1
    },
    picker: {
        height: 15,
        borderRadius: 20
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

    },
    tag: {
        width: 75,
        height: 20,
        backgroundColor: 'white',
        // borderRadius: 10,
        // borderWidth: 1,
        borderColor: '#2196F3',
        color: 'black',
        alignItems: "center",
        justifyContent: 'center'
    },
    tagbutton: {
        backgroundColor: 'black'
    },
    whosresponsible: {
        display: "flex",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        // borderWidth: 1,
        width: '90%'
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
      },
      checkbox: {
        alignSelf: "center",
        height: 40,
        width: 40
      },
      label: {
        margin: 8,
      }
});

export default AddTask;