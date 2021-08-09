import React from 'react';
import { StyleSheet, View, Button, Text, TextInput, TouchableOpacity, Image, Pressable } from 'react-native';
import SpinningLogo from '../components/SpinningLogo';
/**
 * Home screen
 */
export default class Landing extends React.Component {

    static navigationOptions = {
        title: 'Landing',
    };

    render() {

        const { navigate } = this.props.navigation;

        return (
            
            <View style={styles.container}>
                {/* <ImageBackground source={require('../assets/whitelogo.png')} style={styles.image}>
                    
                </ImageBackground> */}
                {/* <Text>Hello</Text> */}
                {/* <Image
                    // style={styles.addprofile}
                    source={require('../assets/whitelogo.png')}
                    
                /> */}
                <SpinningLogo />
                <TouchableOpacity style={styles.signupbutton}>
                    <Button
                        color='white'
                        title="Home"
                        onPress={() => navigate(
                            'Home', { name: 'Home' }
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
      backgroundColor: '#47B5AF',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "Cochin"
    },
    // image: {
    //     flex: 1,
    //     resizeMode: "cover",
    //     justifyContent: "center"
    //   }
    signupbutton: {
        backgroundColor: '#1AA39B',
        color: 'white',
        width: 300,
        borderRadius: 25,
        top: 100
      }
  });