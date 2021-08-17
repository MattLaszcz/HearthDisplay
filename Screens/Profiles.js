import React from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from 'react-native';

import store from '../store/reducers/index_1';

// import { utils } from '@react-native-firebase/app';
// import storage from '@react-native-firebase/storage';

import Firebase, { db } from '../config/Firebase'; 

import timmyPhoto from '../assets/timmy.png';
/**
 * Profile screen
 */
export default class AddAProfile extends React.Component {

    constructor(props) {
        super(props);

        this.d = new Date().toString();
        
        store.subscribe(() => {
            // When state will be updated(in our case, when items will be fetched), 
            // we will update local component state and force component to rerender 
            // with new data.
            let stateId = store.getState().id;
            this.setState({
                id: stateId
            });
        });

        this.state = {
            id: store.getState().id
        }

        let stateId = store.getState().id;
        this.setState({
            id: stateId
        }); 
    }

    static navigationOptions = ({ navigation }) => {
        return {
             title: navigation.getParam('name'),
        };
    };

    getPhotoHandler() {
        var docRef = db.collection('users').doc(this.state.id).collection('tasks');
        
          var docRefTest = db.collection('users').doc(this.state.id).collection('tasks').get()
          .then(querySnapshot => {
            const documents = querySnapshot.docs.map(doc => doc.data());
            console.log('documents'+documents);
            this.setState({ tasks_: documents });
        });

        

           
       // var docRefTest = db.collection('users').doc(this.state.id).collection('tasks').docs.map(doc => doc.data());
        //console.log('docRefTest'+docRefTest);
        //return snapshot.docs.map(doc => doc.data());
        //.doc('Z6vzTZUu1p0VDIkQkbJW');

        docRef.get().then((doc) => {
            if (doc.exists) {
                const tasks = doc.data();
                let keys = Object.keys(tasks);
                let values = Object.values(tasks);
                const updatedPosts = keys.map(key => {
                    return {
                        key, ...tasks[key],

                    }
                });
                console.log('UPDATED POSTS ' + updatedPosts);
                console.log('THIS STATE TASKS' + tasks);
                console.log('keys ' + keys);
                console.log('values ' + values);

                console.log("Document data:", doc.data());
                //this.setState({ tasks_: keys });

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

//     downloadImage () {
//                     /**
//              * TODO(developer): Uncomment the following lines before running the sample.
//              */
//             // The ID of your GCS bucket
//             const bucketName = 'hearth';

//             // The ID of your GCS file
//             const fileName = 'Hearth downloaded photo';

//             // The path to which the file should be downloaded
//             const destFileName = '/Users/mattlaszcz/desktop';

//             // Imports the Google Cloud client library
//             const {Storage} = require('@google-cloud/storage');

//             // Creates a client
//             const storage = new Storage();

//             async function downloadFile() {
//             const options = {
//                 destination: destFileName,
//             };

//             // Downloads the file
//             await storage.bucket(bucketName).file(fileName).download(options);

//             console.log(
//                 `gs://${bucketName}/${fileName} downloaded to ${destFileName}.`
//             );
// }

// downloadFile().catch(console.error);
//     }

//     uploadImage = async () => {
//         if( image == null ) {
//           return null;
//         }
//         const uploadUri = image;
//         let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    
//         // Add timestamp to File Name
//         const extension = filename.split('.').pop(); 
//         const name = filename.split('.').slice(0, -1).join('.');
//         filename = name + Date.now() + '.' + extension;
    
//         setUploading(true);
//         setTransferred(0);
    
//         const storageRef = storage().ref(`photos/${filename}`);
//         const task = storageRef.putFile(uploadUri);
    
//         // Set transferred state
//         task.on('state_changed', (taskSnapshot) => {
//           console.log(
//             `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
//           );
    
//           setTransferred(
//             Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
//               100,
//           );
//         });
//     }

    submitPost = async () => {
        //const imageUrl = await uploadImage();

        const imageUrl = timmyPhoto;
        console.log('Image Url: ', imageUrl);
        console.log('Post: ', post);
    
        firestore()
        .collection('posts')
        .add({
          userId: user.uid,
          post: post,
          postImg: imageUrl,
          postTime: firestore.Timestamp.fromDate(new Date()),
          likes: null,
          comments: null,
        })
        .then(() => {
          console.log('Post Added!');
          Alert.alert(
            'Post published!',
            'Your post has been published Successfully!',
          );
          setPost(null);
        })
        .catch((error) => {
          console.log('Something went wrong with added post to firestore.', error);
        });
      }

    render() {

        const { navigate, state } = this.props.navigation;

        // const reference = storage().ref('TimmyPhoto.png');


        return (
        // <View style={styles.main}>
            <View style={styles.container}>

                {/* <View>
                    <Button
                        onPress={async () => {
                        // path to existing file on filesystem
                        const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/black-t-shirt-sm.png`;
                        // uploads file
                        await reference.putFile(pathToFile);
                        }}
                    />
                </View> */}

                {/* <Button
                    onPress={this.submitPost()}
                    title="Submit"
                    >

                </Button> */}

                <Text style={styles.title}>Profiles</Text>
                <Text style={styles.body}>View or Add A Profile</Text>
                <TouchableOpacity onPress={() => navigate('EntryScreen')}>
                <View style={{borderWidth: 1, width:'90%',display:'flex',flexDirection:'row', flexWrap: "wrap"}}>
                {/* {profiles.map((task) => {
                            return (
                                <TaskItem
                                    //key={task.key}
                                    notes={task.notes}
                                    reminder={task.reminder}
                                    name={task.name}
                                    assigned={task.assigned}
                                //type={task.type}
                                //body={task.body}
                                //answer={task.answer}
                                //onChange={(value, id) => this.postAnswerHandler(value, id)}
                                //clicked={(body) => this.displayAnswerHandler(body)}
                                />
                            );
                        })} */}
                    
                    <Image
                        style={styles.addprofile}
                        source={require('../assets/timmy.png')}
                        
                    />
                    <Image
                        style={styles.addprofile}
                        source={require('../assets/timmy.png')}
                        
                    />
                    <Image
                        style={styles.addprofile}
                        source={require('../assets/timmy.png')}
                        
                    />
                    <Image
                        style={styles.addprofile}
                        source={require('../assets/timmy.png')}
                        
                    />
                    <Image
                        style={styles.addprofile}
                        source={require('../assets/timmy.png')}
                        
                    />
                    <Image
                        style={styles.addprofile}
                        source={require('../assets/timmy.png')}
                        
                    />
                    <Image
                        style={styles.addprofile}
                        source={require('../assets/timmy.png')}
                        
                    />
                    <Image
                        style={styles.addprofile}
                        source={require('../assets/timmy.png')}
                        
                    />
                </View>
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
        height: 150,
        width: 150
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