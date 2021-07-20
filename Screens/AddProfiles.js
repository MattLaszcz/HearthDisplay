import React from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import store from '../store/reducers/index_1';


/**
 * Profile screen
 */
export default class AddProfiles extends React.Component {
    constructor(props) {
        super(props);
        const id = store.getState().id
        // console.log('value' + store.getState().value);
        // console.log('counter' + store.getState().counter);
        console.log('id' + store.getState().id);
        this.state = {
            id: store.getState().id
        }
       
    }


    componentDidMount() {
         store.subscribe(() => {
            // When state will be updated(in our case, when items will be fetched), 
            // we will update local component state and force component to rerender 
            // with new data.

            this.setState({
                id: store.getState().id
            });
        });
    }


    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name'),
        };
    };

    render() {
        const id = this.state.id
        const { navigate, state } = this.props.navigation;
        //const id = useSelector((state) => state.counter)
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.state.id}</Text>
                {/* <Text style={styles.welcometext}>{this.props.value}</Text> */}
                <Text style={styles.title}>Your Family All In One Place </Text>
                <Text style={styles.body}>Manage your family, let them share their progress on chores and tasks, and coordinate day to day events.</Text>
                <Image
                    style={styles.profilephotos}
                    source={require('../assets/profilephotos.png')}
                />
                {/* <Button
                    title="Go to Add A Profile"
                    onPress={() => navigate('AddAProfile')}
                /> */}
                <TouchableOpacity style={styles.signupbutton}>
                    <Button
                        // buttonStyle={{
                        //     backgroundColor:'red'
                        //   }}
                        // style={styles.signupbutton}
                        color='white'
                        title="Add Profiles"
                        onPress={() => navigate(
                            'AddAProfile', { name: 'AddAProfile' }
                        )}
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
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    profilephotos: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        width: 400
    },
    title: {
        fontSize: 32,
        marginBottom: 20
    },
    body: {
        fontSize: 15,
        width: 300,
        textAlign: 'center'
    },
    signupbutton: {
        //   color:"#1AA39B",
        backgroundColor: '#1AA39B',
        color: 'white',
        width: 300,
        borderRadius: 25
    }
})