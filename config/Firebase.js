// fire.js



import firebase from 'firebase';
import {
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    MESSAGE_SENDER_ID,
    APP_ID
} from '@env'
//'react-native-dotenv'

// ... after other imports
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCfkLymgITvlrvnMOAg_CGZst3uj-lbOrM",
    authDomain: "hearth-5d9ff.firebaseapp.com",
    databaseURL: "https://hearth-5d9ff-default-rtdb.firebaseio.com/",
    projectId: "hearth-5d9ff",
    storageBucket: "phone-book-fe436.appspot.com",
    messagingSenderId: "357247078028",
    appId: "1:357247078028:ios:31eb229b6ce20308fd75a9"
};





// avoid deprecated warnings
// db.settings({
//     timestampsInSnapshots: true
// })

// Initialize Firebase
let Firebase = firebase.initializeApp(firebaseConfig)

// ... before export default statemen
export const db = firebase.firestore()

export default Firebase;



// try {
//   firebase.initializeApp(firebaseConfig);
// } catch (err) {
//   if (!/already exists/.test(err.message)) {
//     console.error('Firebase initialization error', err.stack);
//   }
// }
// const Firease = firebase;
// export default Firebase;