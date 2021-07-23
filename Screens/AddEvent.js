import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Touchable, Image, TextInput, Modal, Pressable } from 'react-native';
import ToggleSwitch from '../components/ToggleSwitch';
import axios from 'axios';
//import DropDown from '../components/Picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
//import LocationIcon from 'react-native-vector-icons/location-sharp';
import store from '../store/reducers/index_1';
import {db, FireStore} from '../config/Firebase';
/**
 * Profile screen
 */
export default class AddEvent extends React.Component {

    constructor(props) {
        super(props);
        this.d = new Date().toString();

        this.state = {
            buttonShouldShow: false,
            eventShouldShow: true,
            reminder: '',
            notes: '',
            modalVisible: false,
            selectedCountriesValues: ['uk'],
            selectedCountries: [{ label: 'UK', value: 'uk', icon: () => <Icon name="plus" size={18} color="#900" /> }],
            countries: 'France',
            name: '',
            assigned: '',
            tag: '',
            id: store.getState().id
            
        }

        store.subscribe(() => {
            // When state will be updated(in our case, when items will be fetched), 
            // we will update local component state and force component to rerender 
            // with new data.

            this.setState({
                id: store.getState().id
            });
        });
    }

    state = {
        buttonShouldShow: false,
        eventShouldShow: true,
        modalVisible: false,
        selectedCountriesValues: ['uk'],
        selectedCountries: [{ label: 'UK', value: 'uk', icon: () => <Icon name="plus" size={18} color="#900" /> }],
        countries: 'France',
        name: '',
        assigned: '',
        tag: '',
        id: '',
        reminder: '',
        notes: '',
    }



    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
        this.postDataHandler();
    }

    buttonShouldShow() {
        this.setState({
            buttonShouldShow: true,
            eventShouldShow: false
        });
    }

    eventShouldShow() {
        this.setState({
            buttonShouldShow: false,
            eventShouldShow: true
        });
    }

    addTaskHandler () {
        console.log('this state id' + this.state.id);
        db.collection('users').doc(this.state.id).collection('tasks').doc().set({
            name: this.state.name,
            assigned: this.state.assigned,
            tag: this.state.tag
        })
    }


    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         title: navigation.getParam('name'),
    //     };
    // };

    // static navigationOptions = ({ navigation }) => {
    //     return {
    //          title: navigation.getParam('name'),
    //     };
    // };

    postDataHandler = () => {

        //() => this.setModalVisible(!modalVisible)

        const data = {
            reminder: this.state.reminder,
            notes: this.state.notes,
            name: this.state.name,
            assigned: this.state.assigned,
            tag: this.state.tag
        };
        const _data = JSON.stringify(data);
        console.log('_data' + _data);
        console.log(data);
        axios.post('https://hearth-5d9ff-default-rtdb.firebaseio.com/tasks.json', _data)
            .then(response => {
                console.log(response);
                const key = Object.keys(response.data);
                console.log('KEY' + key);

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

    render() {
        const { modalVisible } = this.state;
        //const { navigate, state } = this.props.navigation;

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
                                onPress={() => this.eventShouldShow()}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.startroutine} >
                            <Button 
                                color='white'
                                title="Task"
                                onPress={() => this.buttonShouldShow()}
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

                    {this.state.eventShouldShow ? (
                        <Text style={styles.routinename}>Routine Name</Text>
                    ) : null}
                    {this.state.buttonShouldShow ? (
                        <View style={styles.routineitems}>

                        <TextInput
                            type='submit'
                            style={styles.input}
                            onChangeText={text => this.setState({ name: text })}
                            title='Name'
                            placeholder="Task Name"
                            // onChangeText={onChangeText}
                            value={this.state.name}
                        />

                    </View>
                    

                    ) : null}
                    <View style={styles.breakline} />
                    <View style={{flexDirection: 'row', width: '90%'}}>
                        <Icon style={{marginRight: 25}} name="location" size={18} color="#900" />
                        <Text style={{color:'lightgrey'}}>Location</Text>
                    </View>
            {/* </View> */}
                <View style={styles.breakline} />

                {this.state.eventShouldShow ? (
                    <View style={styles.routineitems}>
                        <Text>All Day</Text>
                        <ToggleSwitch />
                    </View>
                ) : null}


                {this.state.eventShouldShow ? (
                    <View style={styles.routineitems}>
                        <Text>Starts</Text>
                        <Text>None</Text>
                    </View>
                ) : null}

                {this.state.eventShouldShow ? (
                    <View style={styles.routineitems}>
                        <Text>Ends</Text>
                        <Text>None</Text>
                    </View>
                ) : null}

                {this.state.eventShouldShow ? (
                    // <View style={styles.breakline} />
                    <View style={styles.routineitems}>
                        <Text>Who's coming?</Text>

                    </View>

                ) : null}


                {this.state.eventShouldShow ? (
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
                {this.state.buttonShouldShow ? (
                    <View style={styles.routineitems}>

                        <Text style={{ }}>Reminder</Text>
                        <TextInput
                            style={{ borderWidth: 1,
                            alignContent:'center', placeholderTextAlign: 'center',placeholderTextColor: 'blue' }}
                            style={styles.input}
                            onChangeText={text => this.setState({ reminder: text })}
                            placeholder="Reminder"
                            //placeholderTextColor='blue'
                            textAlign={'right'}
                            // onChangeText={onChangeText}
                            value={this.state.reminder}
                        />
                    </View>
                ) : null}
                <View style={styles.breakline} />
                <View style={styles.routineitems}>
                    <Text>Notes</Text>
                    {/* <Text>None</Text> */}
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.setState({ notes: text })}
                        placeholder="Notes"
                        textAlign={'right'}
                        // onChangeText={onChangeText}
                        value={this.state.notes}
                    />
                </View>
                {this.state.buttonShouldShow ? (
                    <View style={styles.breakline} />) : null}
                {this.state.buttonShouldShow ? (
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

                            defaultValue={this.state.countries}
                            containerStyle={{ height: 40, width: 150 }}
                            itemStyle={{
                                justifyContent: 'flex-start', borderRadius: 20
                            }}
                            onChangeItem={item => this.setState({
                                tag: item // an array of the selected items values
                            })}
                            onChangeItemMultiple={item => this.setState({
                                tag: item // an array of the selected items
                            })}
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

                    <TouchableOpacity>
                        <Button
                        title='ADD'
                        //color="#ff5c5c"
                        onPress={this.addTaskHandler()}>
                        
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
        );

    }

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
    }
});