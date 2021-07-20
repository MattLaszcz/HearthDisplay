import React from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, Modal, Pressable } from 'react-native';

/**
 * Profile screen
 */
export default class EntryScreen extends React.Component {

    state = {
        modalVisible: false
      };
    
      setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }


    static navigationOptions = ({ navigation }) => {
        return {
             title: navigation.getParam('name'),
        };
    };

    render() {
        const { modalVisible } = this.state;
        const { navigate, state } = this.props.navigation;

        return (
        // <View style={styles.main}>
            <View style={styles.container}>

                <Text style={styles.title}>Monday January 3</Text>
                <Text style={styles.title}>7:30 AM</Text>
                <Image
                    style={styles.addprofile}
                    source={require('../assets/timmy.png')}
                    
                />
                
                <Text style={styles.title}>Good Morning, Timmy!</Text>
                <Text style={styles.body}>Time to check in. Remember that school starts at 8:00 am!</Text>
                <TouchableOpacity style={styles.startroutine} >
                <Button
                        color='white'
                        title="Start Morning Routine"
                        onPress={() => navigate('RoutineDashboard')}
                    />
                </TouchableOpacity>
                {/* <Button
                    title="Go to home screen"
                    onPress={() => navigate('ProfileInfo')}
                /> */}

                

            </View>
        //</View>
        );

    }

}

const styles = StyleSheet.create({
    main: {
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "Circular Std",
        marginRight: 50,
        marginBottom: 50,
        marginLeft: 50,
        marginTop: 50,
        backgroundColor: 'white',
        borderRadius: 15
    },
    addprofile: {
        height: 300,
        width: 300
    },
    title: {
        fontSize: 32,
        marginBottom: 20,
        
    },
    body: {
        fontSize: 15,
        width: 300,
        textAlign: 'center'
    },
    startroutine: {
        color:"#1AA39B",
        backgroundColor: '#1AA39B',
        color: 'white',
        width: 300,
        borderRadius: 25,
        marginTop: 100
    },
    
});