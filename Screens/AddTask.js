import React from 'react';
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, TextInput} from 'react-native';
import ToggleSwitch from '../components/ToggleSwitch';

import store from '../store/reducers/index_1';
import {db, FireStore} from '../config/Firebase';

// const updateTaskInfo = (event) => {
//     const [name, setName] = useState('');
//     setName(event.target.value);
    
//     console.log(event.target.value);
// }

function AddTask ()  {
    
    const [name, setName] = useState('');
    const [assigned, setAssigned] = useState('');
    const [tag, setTag] = useState('');
    const [id, setId] = useState('');


    // const storeSubscribe = store.subscribe(() => {
    //     // When state will be updated(in our case, when items will be fetched), 
    //     // we will update local component state and force component to rerender 
    //     // with new data.
    //     console.log(store.getState().id);
    //     setId(store.getState().id)
    // });

    //const updateTaskInfo = event => setName(event.target.value);
    useEffect(() => {
        const storeId = store.getState().id;
        console.log(storeId);
        //storeSubscribe();
         store.subscribe(() => {
            // When state will be updated(in our case, when items will be fetched), 
            // we will update local component state and force component to rerender 
            // with new data.
            
            console.log(store.getState().id);
            setId(store.getState().id)
        },);
        console.log('name state '+name),name;
        console.log('id '+id,id);
    },[]);

    

    const updateTaskInfo = event => setName(event.target.value);


    const addTaskHandler = () => {
        //console.log('this state id' + this.state.id);
        db.collection('users').doc(this.state.id).collection('tasks').doc().set({
            name: this.state.name,
            assigned: this.state.assigned,
            tag: this.state.tag
        })
    }
    
        return (
            <View style={styles.container}>

                <Text
                    style={{marginBottom: 20}}
                >
                    {this.d}</Text>
                <View style={styles.buttonrow}>
                <TouchableOpacity style={styles.startroutine} >
                        <Button
                                color='white'
                                title="Event"
                                //onPress={() => navigate('RoutineDashboard')}
                            />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.startroutine} >
                        <Button
                                color='white'
                                title="Task"
                                //onPress={() => navigate('RoutineDashboard')}
                            />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.startroutine} >
                        <Button
                                color='white'
                                title="Routine"
                                //onPress={() => navigate('RoutineDashboard')}
                            />
                    </TouchableOpacity>
                </View>
                <View style={styles.breakline} />
                <Text style={styles.routinename}>Routine Name</Text>
                <View style={styles.routineitems}>
                    <Text>All Day</Text>
                    <ToggleSwitch />
                </View>
                <View style={styles.routineitems}>
                    <Text>All Day</Text>
                    <Text>None</Text>
                </View>
                <View style={styles.routineitems}>
                    <Text>All Day</Text>
                    <Text>None</Text>
                </View>
                <View style={styles.breakline} />
                <View style={styles.routineitems}>
                    <Text>All Day</Text>
                    
                </View>
                <View style={styles.routineitems}>
                    <TouchableOpacity>
                        <Image 
                            style={styles.addprofilebutton}
                            source={require('../assets/addprofilebutton.png')}>
                        
                        </Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.breakline} />
                <View style={styles.routineitems}>
                    <Text>Add A Reward Type</Text>
                    
                </View>
                <View style={styles.breakline} />
                <View style={styles.routineitems}>
                    <Text>Notes</Text>
                    <Text>None</Text>
                </View>
                <View style={styles.breakline} />
                <TextInput
                            //style={{ borderWidth: 1,
                            //alignContent:'center', placeholderTextAlign: 'center',placeholderTextColor: 'blue' }}
                            //style={styles.input}
                            onChangeText ={ value => setName(value) }
                            placeholder="Name"
                            //placeholderTextColor='blue'
                            //textAlign={'right'}
                            // onChangeText={onChangeText}
                            value={name}
                        />


                <TouchableOpacity style={styles.startroutine} >
                        <Button
                                color='white'
                                title="Start Free Time"
                                onPress={
                                    addTaskHandler
                                    //() => navigate('RoutineDashboard')
                                }
                            />
                    </TouchableOpacity>
            </View>
        );
}

    







const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    startroutine: {
        color:"#1AA39B",
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
        marginBottom: 20
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
    }
});

export default AddTask;