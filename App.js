import React from 'react';

import { ThemeProvider } from 'styled-components';
import { registerRootComponent } from 'expo';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './store/reducers';

// Components
import Home from './Screens/Home';
import Profile from './Screens/Profile';
import AddAProfile from './Screens/AddAProfile';
import AddProfiles from './Screens/AddProfiles';
import ProfileInfo from './Screens/ProfileInfo';
import Profiles from './Screens/Profiles';
import RoutineDashboard from './Screens/RoutineDashboard';
import Landing from './Screens/Landing';
import EntryScreen from './Screens/EntryScreen';
//import AddEvent from './Screens/AddEvent';
//import DailyCalendar from './Screens/DailyCalendar';
import Tasks from './Screens/Tasks';
//import TimerTest from './Screens/TimerTest';
import Login from './Screens/Login';
import userReducer from './store/reducers/index';
import tasksReducer from './store/reducers/index';
import dispatchTest from './store/reducers/index';
//import Counter from './Screens/Counter';

import store from './store/reducers/index_1';
/**
 * createStackNavigator
 *
 * Creates a stack of our routes.
 *
*/
//  const root = combineReducers({
//     tasks: userReducer
//  })





//const middleware = applyMiddleware(thunkMiddleware)
//const store = createStore(rootReducer, middleware)

//const store = createStore(userReducer);

const Navigator = createStackNavigator({
    
    Home: { screen: Home },
    //Counter: { screen: Counter },
    RoutineDashboard: { screen: RoutineDashboard },

    Landing: { screen: Landing },
    Home: { screen: Home },
    //Login: {screen: Login},
    Profile: { screen: Profile },
    AddAProfile: { screen: AddAProfile },
    AddProfiles: { screen: AddProfiles },
    ProfileInfo: { screen: ProfileInfo },
    Profiles: { screen: Profiles },
    EntryScreen: { screen: EntryScreen },
    //AddEvent: {screen: AddEvent},
    RoutineDashboard: { screen: RoutineDashboard },
    //DailyCalendar: { screen: DailyCalendar },
    Tasks: { screen: Tasks },
    //TimerTest: { screen: TimerTest },

});



/**
 * createAppContainer
 *
 * Responsible for managing app state and linking
 * the top-level navigator to the app environment.
 *
*/

const App_1 = createAppContainer(Navigator);

export default class App extends React.Component {
    render() {

        return (
            <Provider store={store}>
                <App_1 />
            </Provider>
        )
    }
}



//export default App;