import React from 'react';
import { StyleSheet, View, Button, Text, StatusBar, TextInput, Image, TouchableOpacity, navigate} from 'react-native';
import ImageSelector from '../components/ImageSelector';
import ToggleSwitch from '../components/ToggleSwitch';
import axios from 'axios';
//import ImageSelector from '../components/ImageSelector';
/**
 * Home screen
 */
export default class ProfileInfo extends React.Component {

    state = {
            firstName: '',
            lastName: '',
            birthday: '',
            phoneNumber: '',
            email: '',
            password: '' 
    }
    

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name'),
        };
    };

    postDataHandler = () => {
        
        this.props.navigation.navigate(
            'Profiles', { name: 'Profiles' }
        )
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            birthday: this.state.birthday,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            password: this.state.password 
        };
        const _data = JSON.stringify(data);
        console.log('_data'+_data);
        console.log(data);
        axios.post('https://hearth-5d9ff-default-rtdb.firebaseio.com/profiles.json', _data )
            .then( response => {
                // console.log( response );
                //const key = Object.keys(response.data);
                // console.log('KEY' + key);
                
                this.setState( { submitted: true } );
            } );

            fetch('https://hearth-5d9ff-default-rtdb.firebaseio.com/profiles.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: _data
        })
    }

    // postImageHandler () {
    //     this.props.navigation.navigate(
    //         'Profiles', { name: 'Profiles' }
    //     )

    //     //props.clicked();       
       
    // }

    render() {

        const { navigate } = this.props.navigation;

        return (
            
            <View style={styles.container}>
                {/* <Text >Welcome to Hearth!</Text>
                <Text style={styles.introText}>Lets get your account set up so you can start making more intentional time with your family</Text> */}
                 {/* <Image
                    // style={styles.profilephotos}
                    source={require('../assets/mom.png')}
                /> */}
                {/* <ImageSelector style={styles.image}/> */}
                <View style={styles.toggle}>
                    <Text style={styles.momtext}>MOM</Text>
                    <ToggleSwitch />
                </View>
                
                <StatusBar style="auto" />
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    onChangeText={text => this.setState( { firstName: text } )}
                    // onChangeText={onChangeText}
                    value={this.state.firstName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    onChangeText={text => this.setState( { lastName: text } )}
                    // onChangeText={onChangeText}
                    value={this.state.lastName}
                    // value={text}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Birthday"
                    onChangeText={text => this.setState( { birthday: text } )}
                    // onChangeText={onChangeText}
                    // value={text}
                    value={this.state.birthday}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={text => this.setState( { email: text } )}
                    // onChangeText={onChangeText}
                    // value={text}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    onChangeText={text => this.setState( { phoneNumber: text } )}
                    // onChangeText={onChangeText}
                    // value={text}
                    value={this.state.phoneNumber}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Notes"
                    onChangeText={text => this.setState( { notes: text } )}
                    // onChangeText={onChangeText}
                    // value={text}
                    value={this.state.notes}
                />
                <TouchableOpacity style={styles.signupbutton}>
                    <Button
                        // buttonStyle={{
                        //     backgroundColor:'red'
                        //   }}
                        // style={styles.signupbutton}
                        color='white'
                        title='save'
                        
                        onPress={() => this.postDataHandler()}
                    /> 
                </TouchableOpacity>
               
                
            </View>
        
        );

    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E9F5F5',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      borderWidth: 1
      
    },
    input: {
      height: 40,
      width: 200,
      margin: 12,
      borderWidth: 1,
    //   borderRadius: 20,
      width: '100%',
      alignItems: 'center',
    //   color: 'white',
      backgroundColor: 'white',
      borderWidth: 0
    },
    introText: {
      flex: 0,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      width: 200
    },
    signupbutton: {
    //   color:"#1AA39B",
      backgroundColor: '#1AA39B',
      color: 'white',
      width: 300,
      borderRadius: 25
      
      
    },
    toggle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        
    },
    momtext: {
        marginRight: 30
    },
    image: {
        width: '20%',
        height: '20%'
    }
  });