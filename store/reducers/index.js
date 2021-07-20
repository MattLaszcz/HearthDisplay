import { combineReducers } from 'redux'
import { LOGIN, SIGNUP, UPDATE_EMAIL, UPDATE_PASSWORD } from '../actions/user'

//const { email, password } = this.state

        // Firebase.auth()
        //     .signInWithEmailAndPassword(email, password)
        //     .then(() => this.props.navigation.navigate('AddProfiles'))
        //     .catch(error => console.log(error))
        //     console.log('SIGNED IN');
        //     axios.get('https://hearth-5d9ff-default-rtdb.firebaseio.com/users.json' 
        //             //+ '-M_x0j3QNFBbiM2ZTpFa.json'
        //             )
        //     .then((response) => {
        //     let keys = Object.keys(response.data['-M_x0j3QNFBbiM2ZTpFa']);
        //     let values = Object.values(response.data['-M_x0j3QNFBbiM2ZTpFa']);
        //     console.log('RESPONSE DATA KEYS'+keys);
        //     console.log('RESPONSE DATA VALUES'+values);
        //     });

        const taskState = {
            task: 'test test test test'
        }
        
        function getInfo() { axios.get('https://hearth-5d9ff-default-rtdb.firebaseio.com/users.json')
        .then( response => {
            //let posts = Object.values(response.data);
            let keys = Object.keys(response.data);
            //console.log('object KEYS'+keys);

            const updatedPosts = keys.map( key => {    
                return {
                    key, ...response.data[key],
                    
                }
            } );
                 const updatedPosts_1 = JSON.stringify(updatedPosts)
                //console.log('updatedposts'+updatedPosts_1);
                this.setState( { tasks_: updatedPosts } );
                console.log('This state tasks'+this.state.tasks_);
        } )
        .catch( error => {
            console.log( error );
            // this.setState({error: true});
        } );

        return updatedPosts;
    }


    const appReducer = (state = taskState, action) => {
        
          
            return {
              ...state,
              payload: action.payload
            }
    }

const userReducer = (state = taskState, action) => {
    switch (action.type) {
        case 'test':
            return {task: 'This dispatch worked'}
        case SIGNUP:
            return action.payload
        case UPDATE_EMAIL:
            return { ...state, email: action.payload }
        case UPDATE_PASSWORD:
            return { ...state, password: action.payload }
        default:
            return state
    }
}

const dispatchTest = (text) => {
    return {
        payload: text
      }
}


const tasksReducer = (state=taskState, action) => {
    return state;
}

// const rootReducer = combineReducers({
//     user: userReducer,
//     tasks: tasksReducer
// });

export default userReducer
//export default dispatchTest