import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  AsyncStorage,
  AlertIOS
} from 'react-native';
import {
  Content,
  Text,
  View,
  InputGroup,
  Icon,
  Input,
  Button,
  List,
  ListItem
} from 'native-base';

var STORAGE_KEY = 'id_token';

const options = {};

export default class SignUp extends Component {

  constructor(props){
    super(props)

    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  _userSignup() {
    console.log("INPUTS: ", this.state)
    var value = this.state
    if (value) { // if validation fails, value will be null
      fetch("http://localhost:3000/userapi/users", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          username: value.email,
          password: value.password,
          name: value.name
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("From signup: ",responseData)
        // this._onValueChange(STORAGE_KEY, responseData.id_token),
        AlertIOS.alert(
          "Signup Success!"
        )
      })
      .catch((err)=>{
        if(err) console.log(err)
      })
      .done();
    }
  }

  render(){
    return (
      <Content>
        <List>
          <ListItem>
            <InputGroup>
              <Icon name="ios-person" />
              <Input
                placeholder="EMAIL"
                value={this.state.email}
                onChangeText={(text)=>{
                  this.setState({
                      email: text
                  })
                }} />
            </InputGroup>
          </ListItem>

          <ListItem>
            <InputGroup>
              <Icon name="ios-unlock" />
              <Input
                placeholder="PASSWORD"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(text)=>{
                  this.setState({
                    password: text
                  })
                }} />
            </InputGroup>
          </ListItem>

          <ListItem>
            <InputGroup >
              <Input
                inlineLabel
                label="NAME"
                placeholder="Name of Farm"
                value={this.state.name}
                onChangeText={(text)=>{
                  this.setState({
                    name: text
                  })
                }} />
            </InputGroup>
          </ListItem>
        </List>
        <Button style={{margin: 10}} onPress={this._userSignup.bind(this)}>
          SIGNUP
        </Button>
      </Content>
    )
  }
}
