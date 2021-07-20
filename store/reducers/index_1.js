import React from 'react';
import { createStore } from 'redux';



const initialState = { counter: 0, email:'email', tasks:[], id: ''}

const counterReducer = (state = initialState,
    //{ counter: 0, email:'email' }, 
    action) => {
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
    };
  }
  if (action.type === 'tasks') {
    return {
      tasks: action.payload,
    };
  }

  if (action.type === 'email') {
      console.log(action.payload);
      console.log(state);
    return {
        
    ...state,
    email: action.payload,
      
    };

    
  }
  if (action.type === 'id') {
    console.log('Store'+ action.payload);
    return {
     
      id: action.payload,
    };
  }

  
  return state;
};

const store = createStore(counterReducer);

export default store;