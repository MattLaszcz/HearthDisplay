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
            <View style={styles.container}>
                <Image
                    style={styles.logogreen}
                    source={require('../assets/logogreen.png')}
                    
                />
                <Text style={styles.title}>Add A Profile</Text>
                <Text style={styles.body}>Give every member of your family their own interactive profile that you can see and manage.</Text>
                <TouchableOpacity onPress={() => navigate('ProfileInfo')}>
                <Image
                    style={styles.addprofile}
                    source={require('../assets/addprofilebutton.png')}
                    
                />
                </TouchableOpacity>
                {/* <Button
                    title="Go to home screen"
                    onPress={() => navigate('ProfileInfo')}
                /> */}
                <Button
                    title="Skip For Now"
                    onPress={() => navigate('ProfileInfo')}
                />

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
    addprofile: {
        height: 200,
        width: 200,
        marginTop: 50
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
    logogreen: {
        marginBottom: 100
    }
});