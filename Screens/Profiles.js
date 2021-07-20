import React from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from 'react-native';

/**
 * Profile screen
 */
export default class AddAProfile extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
             title: navigation.getParam('name'),
        };
    };

    render() {

        const { navigate, state } = this.props.navigation;

        return (
        // <View style={styles.main}>
            <View style={styles.container}>

                <Text style={styles.title}>Profiles</Text>
                <Text style={styles.body}>View or Add A Profile</Text>
                <TouchableOpacity onPress={() => navigate('EntryScreen')}>
                <Image
                    style={styles.addprofile}
                    source={require('../assets/timmy.png')}
                    
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
    }
});