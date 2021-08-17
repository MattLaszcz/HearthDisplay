import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Alert, Image, ScrollView} from 'react-native';
// import * as ImagePicker from 'expo-image-picker'; 
// import * as Permissions from 'expo-permissions';

import axios from 'axios';

const ImageSelector = (props) => {
const [pickedImage, setPickedImage] =  useState();
const [photos, setPhotos] =  useState([]);

//    function postImageHandler (image) {
//     //const _data = JSON.stringify(data);
//     //console.log('_data'+_data);
//     //console.log(data);
//     axios.post('https://hearth-5d9ff-default-rtdb.firebaseio.com/images.json', image )
//         .then( response => {
//             // console.log( response );
//             //const key = Object.keys(response.data);
//             // console.log('KEY' + key);
            
//             this.setState( { submitted: true } );
//         } );

//         fetch('https://hearth-5d9ff-default-rtdb.firebaseio.com/images.json', {
//             method: 'POST',
//             headers: {
//                 'content-type': 'multipart/form-data'
//             },
//             body: image
//     })

// }

    const verifyPermissions = async () => {
        const result =  await Permissions.askAsync(Permissions.CAMERA );
            if (result.status != 'granted') {
                Alert.alert('Insufficient Permissions', [{text:'OK'}]);
                return false;
            }
            return true;
    };

    const takeImageHandler = async() => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission){
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9], 
            quality: 0.5
        });
        //console.log(image);
        setPickedImage(image.uri);
        postImageHandler(image.uri);
    };

    return (

        <View>
            
        {/* <View >
                {!pickedImage ? <Text>No Image Selected</Text>
                 : <Image style={styles.image} source={{uri: pickedImage}}/>}
        </View>
            <Button
                title='Take Image'
                onPress={takeImageHandler}
            >
            </Button> */}
        </View>
    )
};

const styles = StyleSheet.create({
    image: {
        width: '30%',
        height: '30%',
        //position: 'relative'
        borderWidth: 2,
        borderColor: 'black'
    }
    
});

export default ImageSelector; 