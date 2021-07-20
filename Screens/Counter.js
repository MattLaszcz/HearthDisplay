import React, { Component,setState } from 'react';
import { StyleSheet, View, Button, Text, StatusBar, TextInput, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { 
    //useSelector, 
    //useDispatch, 

    connect 
} from 'react-redux';
import TaskItem from '../components/TaskItem';


class Counter extends Component {

    constructor(props) {
        super(props);
    
        // this.state = {
        //   email: ''
        // };
    }

    state = {
        text: '',
        tasks_: [],
    }

// handleChange(inputText) {
//     this.setState({
//       email: inputText,
//     });
// }

componentDidMount() {
    axios.get('https://hearth-5d9ff-default-rtdb.firebaseio.com/tasks.json')
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
                    //console.log('This state tasks'+this.state.tasks_);
                    return this.state.tasks_
            } )
            .catch( error => {
                console.log( error );
                // this.setState({error: true});
            } );
}

  tasksHandler() {
    this.props.tasks();
  }  
    
  incrementHandler() {
    this.props.increment();
  }

  decrementHandler() {
    this.props.decrement();
  }

  email(value) {
    
    //console.log('Email Text'+text);
      this.props.email(value);
  }

  toggleCounterHandler() {}

  render() {
    const tasks1 = this.state.tasks_;
    const tasks = this.props.tasks
    return (
      <View>

        <Text style={styles.welcometext}>Redux Counter</Text>
        <View ><Text style={styles.welcometext}>{this.props.counter}</Text></View>
        <View ><Text style={styles.welcometext}>{this.props.value}</Text></View>

        {this.props.email.value}
        <View>
          <TouchableOpacity  title="Sign Up" style={styles.signupbutton}> 
                    <Button
                        color='white'
                        title="Increment"
                        onPress={this.incrementHandler.bind(this)}
                    />
                    </TouchableOpacity>
          <TouchableOpacity  title="Sign Up" style={styles.signupbutton}> 
                    <Button
                        color='white'
                        title="Decrement"
                        onPress={this.decrementHandler.bind(this)}
                    />
                    </TouchableOpacity>
                    <TextInput
                    style={styles.input}
                    //onChangeText= {this.emailHandler()}
                    //onChangeText={this.handleChange} 
                    onChangeText = {(value) => this.props.email(value)} 
                    value={this.props.value}
                    secureTextEntry={false}
                    />
                    <View>{this.props.tasks_}</View>
                    <View style={styles.tasks}>
                    {/* {tasks.map((task) => {
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
                        </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      counter: state.counter,
      value: state.email,
      tasks: state.tasks
    };
  }

  //const mapStateToProps = (state) => { return { value: state.email }; }
  
  const mapDispatchToProps = dispatch => {
    return {
      increment: () => dispatch({ type: 'increment' }),
      decrement: () => dispatch({ type: 'decrement' }),
      tasks: () => dispatch({ type: 'tasks', payload: this.state.tasks_ }),
      email: (value) => dispatch({
          type: 'email',
          payload: value
        })
      //() => dispatch({type: 'email', text: this.state.text})
    }
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(Counter);

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
      borderWidth: 0
    },
    introText: {
      flex: 0,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      width: 200,
      marginBottom: 20
    },
    signupbutton: {
      backgroundColor: '#1AA39B',
      color: 'white',
      width: 300,
      borderRadius: 25,
      marginTop: 20
    },
    textlabel: {
        // alignItems: 'flex-start',
        paddingLeft: 20,
        opacity: 0.5
        

    },
    welcometext: {
        fontSize: 32,
        marginBottom:15,
        color: 'black'
    },
    familytext: {
        fontSize: 32,
        marginBottom:15
    },
    logogreen: {
        marginBottom: 200
    }
  });

