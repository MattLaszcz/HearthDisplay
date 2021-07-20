import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Touchable, Image} from 'react-native';
import ToggleSwitch from '../components/ToggleSwitch';
import axios from 'axios';

/**
 * Profile screen
 */
export default class AddEvent extends React.Component {

    constructor() {
        super();
        this.d = new Date().toString();
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

    render() {

        const { navigate, state } = this.props.navigation;

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


                <TouchableOpacity style={styles.startroutine} >
                        <Button
                                color='white'
                                title="Start Free Time"
                                onPress={() => navigate('RoutineDashboard')}
                            />
                    </TouchableOpacity>
            </View>
        );

    }

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