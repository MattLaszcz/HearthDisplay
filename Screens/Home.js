import React, {useEffect} from 'react';

import { StyleSheet, View, Button, Text, StatusBar, TextInput, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import Firebase, { db } from '../config/Firebase'
import firebase from 'firebase';

//import store from '../../HearthNative/App';
import store from '../store/reducers/index_1';



import { bindActionCreators, getState } from 'redux'
import { connect, useSelector, useDispatch } from 'react-redux'
import { updateEmail, updatePassword, signup } from '../store/actions/user';
import * as authActions from '../store/actions/auth';
import { Component } from 'react';

/**
 * Home screen
 */
class Home extends React.Component {
    constructor(props) {
        super(props);

        // this.state = {
        //   email: ''
        // };
        this.state = {

            name: '',
            email: '',
            password: '',
            submitted: false,
            id: ''
        }
    }
    

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name'),
        };
    };

    // static navigationOptions = {
    //     title: 'Home',
    // };

    id(value) {
        this.props.id(value);
        console.log("ID FUNCTION RAN");
    }

    componentDidMount = () => {



        //const { email, password } = this.state

        // Firebase.auth()
        //     .signInWithEmailAndPassword(email, password)
        //     .then(() => this.props.navigation.navigate('AddProfiles'))
        //     .catch(error => console.log(error))
        //     console.log('SIGNED IN');
        //     axios.get('https://hearth-5d9ff-default-rtdb.firebaseio.com/users.json'
        //     //+ '-M_x0j3QNFBbiM2ZTpFa.json'
        // )
        //     .then((response) => {
        //         let keys = Object.keys(response.data['-M_x0j3QNFBbiM2ZTpFa']);
        //         let values = Object.values(response.data['-M_x0j3QNFBbiM2ZTpFa']);
        //         // console.log('RESPONSE DATA KEYS' + keys);
        //         // console.log('RESPONSE DATA VALUES' + values);
        //     });
    }


    handleSignUp = () => {

        // this.props.signup()
        this.props.navigation.navigate('Profiles')

        const { email, password } = this.state
        Firebase.auth()
            .createUserWithEmailAndPassword(email, password).then(cred => {
                return db.collection('users').doc(cred.user.uid).set({
                    test: 'test'
                })

            })
            //.then(() => this.props.navigation.navigate('Profile'))
            .catch(error => console.log(error))
        //.getInstance().getUser(uid)

        this.getInfoHandler();
    }

    getInfoHandler() {
        var docRef = db.collection('users').doc('document');

        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }



    sendInfo = () => {
        console.log('SEND INFO EXECUTE');
        this.props.task();

    }

    getUidHandler() {
        // axios.get('https://hearth-5d9ff-default-rtdb.firebaseio.com/users/' + 'ZU1tRqrKZYcHB0TIpujv9A9Psgw2' + '.json?auth=DATABASE-SECRET')
        //     .then((response) => {
        //     console.log('UID RESPONSE'+response('uid'))
        //     });

        //console.log('this.state.id'+this.state.id);
    }

    handleLogin = (load) => {

        //this.props.task();
        // const dispatch = useDispatch();

        // this.sendInfo();
        // const test = userSelector(state => state.task)

        //store.dispatch({ type: 'id', payload: load })

        const { email, password } = this.state

        // Firebase.auth()
        //     .signInWithEmailAndPassword(email, password)
        //     .then(async cred => {
        //         return db.collection('users').doc(cred.user.uid).set({
        //             test: 'test'
        //         })
        //     })
        //     .then(() => this.props.navigation.navigate('AddProfiles'))

        //     .catch(error => console.log(error))

//------------------------STACK OVERFLOW ANSWER------------------------------------------
        Firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(async cred => {
                const currentUser = firebase.auth().currentUser;
                const userId = currentUser["uid"];
                    this.setState({
                    id: userId
                    })
                console.log('SETTING ID FROM AUTH FUNCTION'+this.state.id);
                //this.props.id(cred.user.id);
                this.props.id(this.state.id);
                return db.collection('users').doc(cred.user.uid).set({
                    test: 'test'
                })
            })
            .then(() => this.props.navigation.navigate('AddTask'))

            .catch(error => console.log(error))

       
//--------------------CURRENT USER TEST--------------
        //const currentUser = firebase.auth().currentUser;
        //const currentUserJson = JSON.stringify(currentUser);
//---------------------------------------------------

        // const tasks = doc.data();

        // let keys = Object.keys(currentUserJson);
        //let first = currentUserJson.find(Boolean);
        //console.log(currentUserJson[Object.keys(currentUserJson)[0]]);
        // const firstKeyValue = currentUserJson[Object.keys(currentUserJson)];

        // for (let key of Object.keys(currentUserJson)) {
        //     console.log('ARRAY VALUES'+key); 
        //   }

        //------------------------------------------
        // console.log('firstkeyvalue' + firstKeyValue);
        
        //------------------------------------------

        
        //console.log('USER ID'+currentUserJson);
        //---------------ACCESS USER ID-------------------
        // console.log('USER ID' + currentUser["uid"]);
        // const userId = currentUser["uid"];
        
        //console.log('this.state.id'+this.state.id);
        //------------------------------------------------
        //(userId) => 



        //--------------------------------SET STATE TEST------------
        //  this.setState({
        //     id: currentUser['uid']
        //  })
        //this.props.id(this.state.id);
        //  this.props.id(currentUser['uid']);
        //-------------------------------------------------------------
        

        //console.log('KEYS '+keys);
        //const currentUserKeys = Object.keys(currentUserJson);

        // const updatedKeys = currentUserKeys.map( key => {    
        //     return {
        //         key, ...currentUser.data[key],

        //     }
        // } );
        //console.log('USER ID KEYS' + updatedKeys);
        //console.log('SIGNED IN');
        // const id = Firebase.auth.getInstance().getUser(uid);
        // console.log('Logged in UID'+id);


        // this.props.signup()
        // this.props.navigation.navigate('Profile')
        //this.sendInfo();
    }

    // incrementHandler(payload) {
    //     this.props.increment();

    // }




    // postDataHandler = () => {

    //     const { email, password } = this.state
    //     Firebase.auth()
    //         .createUserWithEmailAndPassword(email, password)
    //         .then(() => this.props.navigation.navigate('Profile'))
    //         .catch(error => console.log(error))


    //     this.props.navigation.navigate(
    //         'AddProfiles', { name: 'AddProfiles' }
    //     )

    //     const data = {
    //         name: this.state.name,
    //         email: this.state.email,
    //         password: this.state.password
    //     };
    //     const _data = JSON.stringify(data);
    //     console.log('_data' + _data);
    //     console.log(data);
    //     axios.post('https://hearth-5d9ff-default-rtdb.firebaseio.com/users.json', _data)
    //         .then(response => {
    //             // console.log( response );
    //             const key = Object.keys(response.data);
    //             console.log('KEY' + key);

    //             this.setState({ submitted: true });
    //         });

    //     fetch('https://hearth-5d9ff-default-rtdb.firebaseio.com/users.json', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: _data
    //     })

    //     axios.get('https://hearth-5d9ff-default-rtdb.firebaseio.com/users/' + 'ZU1tRqrKZYcHB0TIpujv9A9Psgw2' + '.json?auth=DATABASE-SECRET')
    //         .then((response) => {
    //             //console.log('UID RESPONSE'+response)
    //         });
    // }

    render() {



        const { navigate } = this.props.navigation;

        return (

            <View style={styles.container}>

                <Image
                    style={styles.logogreen}
                    source={require('../assets/logogreen.png')}

                />
                <Text style={styles.welcometext}>{this.props.test}</Text>
                <Text style={styles.welcometext}>Welcome to Hearth!</Text>
                <Text style={styles.introText}>Lets get your account set up so you can start making more intentional time with your family</Text>
                <StatusBar style="auto" />


                <View>
                    <Text style={styles.textlabel}>Name</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.setState({ name: text })}
                        //placeholder="Name"
                        // onChangeText={onChangeText}
                        value={this.state.name}
                    />
                    <Text style={styles.textlabel}>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.setState({ email: text })}
                        //placeholder="Email Address"
                        // onChangeText={onChangeText}
                        value={this.state.email}
                    />
                    <Text style={styles.textlabel}>Password</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.setState({ password: text })}
                        value={this.state.password}
                        // onChangeText = {(value) => this.props.id(value)} 
                        // value={this.props.value}
                        secureTextEntry={false}
                    />
                </View>

                <View style={styles.signupbuttoncontainer}>
                    <TouchableOpacity style={styles.signupbutton}>
                        <Button
                            color='white'
                            title="Sign Up"
                            onPress={() => this.handleSignUp()}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signupbutton}>
                        <Button
                            color='white'
                            title="Log in"
                            onPress={() => this.handleLogin()}

                        />
                    </TouchableOpacity>
                </View>
            </View>
        );

    }

}

const mapStateToProps = (state) => {
    return {
        counter: state.counter,
        value: state.id
    };
}

const mapDispatchToProps = dispatch => {
    return {
        //increment: () => dispatch({ type: 'email' },'email111'),
        id: (value) => dispatch({ type: 'id', payload: value })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "Cochin"
    },
    input: {
        height: 40,
        width: 350,
        margin: 12,
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 0,
        borderWidth: 1
    },
    introText: {
        flex: 0,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        marginBottom: 20,
        borderWidth: 1
    },
    signupbutton: {
        backgroundColor: '#1AA39B',
        color: 'white',
        width: 300,
        borderRadius: 25,
        marginTop: 20,
        borderWidth: 1
    },
    textlabel: {
        // alignItems: 'flex-start',
        paddingLeft: 20,
        opacity: 0.5,
        borderWidth: 1


    },
    welcometext: {
        fontSize: 32,
        marginBottom: 15,
        borderWidth: 1,
        height: '4%',
        width: '30%',
        
    },
    familytext: {
        fontSize: 32,
        marginBottom: 15
    },
    logogreen: {
        //marginBottom: 200,
        marginBottom: '10%',
        borderWidth: 1
    },
    signupbuttoncontainer: {
        borderWidth: 1,
        marginBottom: '2%'
    }
});


// import React, {useEffect} from 'react';

// import { StyleSheet, View, Button, Text, StatusBar, TextInput, TouchableOpacity, Image } from 'react-native';
// import axios from 'axios';
// import Firebase, { db } from '../config/Firebase'
// import firebase from 'firebase';

// //import store from '../../HearthNative/App';
// import store from '../store/reducers/index_1';



// import { bindActionCreators, getState } from 'redux'
// import { connect, useSelector, useDispatch } from 'react-redux'
// import { updateEmail, updatePassword, signup } from '../store/actions/user';
// import * as authActions from '../store/actions/auth';
// import { Component } from 'react';

// /**
//  * Home screen
//  */
// class Home extends React.Component {
//     constructor(props) {
//         super(props);

//         // this.state = {
//         //   email: ''
//         // };
//         this.state = {

//             name: '',
//             email: '',
//             password: '',
//             submitted: false,
//             id: ''
//         }
//     }
    

//     static navigationOptions = ({ navigation }) => {
//         return {
//             title: navigation.getParam('name'),
//         };
//     };

//     // static navigationOptions = {
//     //     title: 'Home',
//     // };

//     id(value) {
//         this.props.id(value);
//     }

//     componentDidMount = () => {



//         const { email, password } = this.state

//         Firebase.auth()
//             .signInWithEmailAndPassword(email, password)
//             .then(() => this.props.navigation.navigate('AddProfiles'))
//             .catch(error => console.log(error))
//         console.log('SIGNED IN');
//         axios.get('https://hearth-5d9ff-default-rtdb.firebaseio.com/users.json'
//             //+ '-M_x0j3QNFBbiM2ZTpFa.json'
//         )
//             .then((response) => {
//                 let keys = Object.keys(response.data['-M_x0j3QNFBbiM2ZTpFa']);
//                 let values = Object.values(response.data['-M_x0j3QNFBbiM2ZTpFa']);
//                 // console.log('RESPONSE DATA KEYS' + keys);
//                 // console.log('RESPONSE DATA VALUES' + values);
//             });
//     }


//     handleSignUp = () => {

//         // this.props.signup()
//         this.props.navigation.navigate('Profiles')

//         const { email, password } = this.state
//         Firebase.auth()
//             .createUserWithEmailAndPassword(email, password).then(cred => {
//                 return db.collection('users').doc(cred.user.uid).set({
//                     test: 'test'
//                 })

//             })
//             //.then(() => this.props.navigation.navigate('Profile'))
//             .catch(error => console.log(error))
//         //.getInstance().getUser(uid)

//         this.getInfoHandler();
//     }

//     getInfoHandler() {
//         var docRef = db.collection('users').doc('document');

//         docRef.get().then((doc) => {
//             if (doc.exists) {
//                 console.log("Document data:", doc.data());
//             } else {
//                 // doc.data() will be undefined in this case
//                 console.log("No such document!");
//             }
//         }).catch((error) => {
//             console.log("Error getting document:", error);
//         });
//     }



//     sendInfo = () => {
//         console.log('SEND INFO EXECUTE');
//         this.props.task();

//     }

//     getUidHandler() {
//         // axios.get('https://hearth-5d9ff-default-rtdb.firebaseio.com/users/' + 'ZU1tRqrKZYcHB0TIpujv9A9Psgw2' + '.json?auth=DATABASE-SECRET')
//         //     .then((response) => {
//         //     console.log('UID RESPONSE'+response('uid'))
//         //     });

//         //console.log('this.state.id'+this.state.id);
//     }

//     handleLogin = (load) => {

//         //this.props.task();
//         // const dispatch = useDispatch();

//         // this.sendInfo();
//         // const test = userSelector(state => state.task)

//         //store.dispatch({ type: 'id', payload: load })

//         const { email, password } = this.state

//         // Firebase.auth()
//         //     .signInWithEmailAndPassword(email, password)
//         //     .then(async cred => {
//         //         return db.collection('users').doc(cred.user.uid).set({
//         //             test: 'test'
//         //         })
//         //     })
//         //     .then(() => this.props.navigation.navigate('AddProfiles'))

//         //     .catch(error => console.log(error))

// //------------------------STACK OVERFLOW ANSWER------------------------------------------
//         Firebase.auth()
//             .signInWithEmailAndPassword(email, password)
//             .then(async cred => {
//            const currentUser = firebase.auth().currentUser;
//           const userId = currentUser["uid"];
//                 this.setState({
//                  id: userId
//                 })
                 
//                 this.props.id(cred.user.id);
//                 return db.collection('users').doc(cred.user.uid).set({
//                     test: 'test'
//                 })
//             })
//             .then(() => this.props.navigation.navigate('AddProfiles'))

//             .catch(error => console.log(error))

       

//         const currentUser = firebase.auth().currentUser;
//         const currentUserJson = JSON.stringify(currentUser);
//         // const tasks = doc.data();
//         let keys = Object.keys(currentUserJson);
//         //let first = currentUserJson.find(Boolean);
//         //console.log(currentUserJson[Object.keys(currentUserJson)[0]]);
//         const firstKeyValue = currentUserJson[Object.keys(currentUserJson)];

//         // for (let key of Object.keys(currentUserJson)) {
//         //     console.log('ARRAY VALUES'+key); 
//         //   }

//         console.log('firstkeyvalue' + firstKeyValue);

//         const uid = currentUserJson.uid;
//         console.log('uid' + uid);
//         //console.log('USER ID'+currentUserJson);
//         //---------------ACCESS USER ID-------------------
//         console.log('USER ID' + currentUser["uid"]);
//         const userId = currentUser["uid"];
        
//         //console.log('this.state.id'+this.state.id);
//         //------------------------------------------------
//         //(userId) => 
//         this.setState({
//             id: userId
//         })
//         this.props.id(this.state.id);
        
        

//         //console.log('KEYS '+keys);
//         //const currentUserKeys = Object.keys(currentUserJson);

//         // const updatedKeys = currentUserKeys.map( key => {    
//         //     return {
//         //         key, ...currentUser.data[key],

//         //     }
//         // } );
//         //console.log('USER ID KEYS' + updatedKeys);
//         //console.log('SIGNED IN');
//         // const id = Firebase.auth.getInstance().getUser(uid);
//         // console.log('Logged in UID'+id);


//         // this.props.signup()
//         // this.props.navigation.navigate('Profile')
//         //this.sendInfo();
//     }

//     incrementHandler(payload) {
//         this.props.increment();

//     }




//     postDataHandler = () => {

//         const { email, password } = this.state
//         Firebase.auth()
//             .createUserWithEmailAndPassword(email, password)
//             .then(() => this.props.navigation.navigate('Profile'))
//             .catch(error => console.log(error))


//         this.props.navigation.navigate(
//             'AddProfiles', { name: 'AddProfiles' }
//         )

//         const data = {
//             name: this.state.name,
//             email: this.state.email,
//             password: this.state.password
//         };
//         const _data = JSON.stringify(data);
//         console.log('_data' + _data);
//         console.log(data);
//         axios.post('https://hearth-5d9ff-default-rtdb.firebaseio.com/users.json', _data)
//             .then(response => {
//                 // console.log( response );
//                 const key = Object.keys(response.data);
//                 console.log('KEY' + key);

//                 this.setState({ submitted: true });
//             });

//         fetch('https://hearth-5d9ff-default-rtdb.firebaseio.com/users.json', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: _data
//         })

//         axios.get('https://hearth-5d9ff-default-rtdb.firebaseio.com/users/' + 'ZU1tRqrKZYcHB0TIpujv9A9Psgw2' + '.json?auth=DATABASE-SECRET')
//             .then((response) => {
//                 //console.log('UID RESPONSE'+response)
//             });
//     }

//     render() {



//         const { navigate } = this.props.navigation;

//         return (

//             <View style={styles.container}>

//                 <Image
//                     style={styles.logogreen}
//                     source={require('../assets/logogreen.png')}

//                 />
//                 <Text style={styles.welcometext}>{this.props.test}</Text>
//                 <Text style={styles.welcometext}>Welcome to Hearth!</Text>
//                 <Text style={styles.introText}>Lets get your account set up so you can start making more intentional time with your family</Text>
//                 <StatusBar style="auto" />


//                 <View>
//                     <Text style={styles.textlabel}>Name</Text>
//                     <TextInput
//                         style={styles.input}
//                         onChangeText={text => this.setState({ name: text })}
//                         //placeholder="Name"
//                         // onChangeText={onChangeText}
//                         value={this.state.name}
//                     />
//                     <Text style={styles.textlabel}>Email Address</Text>
//                     <TextInput
//                         style={styles.input}
//                         onChangeText={text => this.setState({ email: text })}
//                         //placeholder="Email Address"
//                         // onChangeText={onChangeText}
//                         value={this.state.email}
//                     />
//                     <Text style={styles.textlabel}>Password</Text>
//                     <TextInput
//                         style={styles.input}
//                         onChangeText={text => this.setState({ password: text })}
//                         value={this.state.password}
//                         // onChangeText = {(value) => this.props.id(value)} 
//                         // value={this.props.value}
//                         secureTextEntry={false}
//                     />
//                 </View>
//                 <TouchableOpacity style={styles.signupbutton}>
//                     <Button
//                         color='white'
//                         title="Sign Up"
//                         onPress={() => this.handleSignUp()}
//                     />
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.signupbutton}>
//                     <Button
//                         color='white'
//                         title="Log in"
//                         onPress={(payload) => this.handleLogin()}

//                     />
//                 </TouchableOpacity>
//             </View>
//         );

//     }

// }

// const mapStateToProps = (state) => {
//     return {
//         counter: state.counter,
//         value: state.id
//     };
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         //increment: () => dispatch({ type: 'email' },'email111'),
//         id: (value) => dispatch({ type: 'id', payload: value })
//     }
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Home)

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#E9F5F5',
//         alignItems: 'center',
//         justifyContent: 'center',
//         fontFamily: "Cochin"
//     },
//     input: {
//         height: 40,
//         width: 350,
//         margin: 12,
//         borderWidth: 1,
//         borderRadius: 20,
//         backgroundColor: 'white',
//         borderWidth: 0
//     },
//     introText: {
//         flex: 0,
//         textAlign: 'center',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: 200,
//         marginBottom: 20
//     },
//     signupbutton: {
//         backgroundColor: '#1AA39B',
//         color: 'white',
//         width: 300,
//         borderRadius: 25,
//         marginTop: 20
//     },
//     textlabel: {
//         // alignItems: 'flex-start',
//         paddingLeft: 20,
//         opacity: 0.5


//     },
//     welcometext: {
//         fontSize: 32,
//         marginBottom: 15
//     },
//     familytext: {
//         fontSize: 32,
//         marginBottom: 15
//     },
//     logogreen: {
//         marginBottom: 200
//     }
// });