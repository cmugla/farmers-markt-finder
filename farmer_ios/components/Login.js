import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  AlertIOS,
  AsyncStorage
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

export default class Login extends Component {

  constructor(props){
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  handleLoginPress(){
    let email     = this.state.inputs.email
    let password  = this.state.inputs.password
    this.props.checkLogin(email, password)
  }

  _userLogin() {
    var value = this.state;
    if (value) { // if validation fails, value will be null
      fetch("http://localhost:3000/userapi/authenticate", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: value.email,
          password: value.password,
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("FROM LOGIN: ", responseData)
        AlertIOS.alert(
          "Login Success!"
        ),
        this._onValueChange(STORAGE_KEY, responseData.id_token)
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
                }}
                />
            </InputGroup>
          </ListItem>
        </List>
        <Button style={{margin: 10}} onPress={this._userLogin.bind(this)}>
          LOGIN
        </Button>
      </Content>
    )
  }
}
