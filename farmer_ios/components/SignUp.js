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

import AjaxAdapter from '../helpers/ajaxAdapter.js'
const ajax = new AjaxAdapter(fetch);

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
    var value           = this.state
    let toggleLogin     = this.props.toggleLogin;
    let _onValueChange  = this._onValueChange;

    if (value) { // if validation fails, value will be null
      let farmer_info = {
        username: value.email,
        password: value.password,
        name: value.name
      }

      let login_info = {
        username: value.email,
        password: value.password,
      }

      ajax.signUpFarmer(farmer_info)
        .then(() => {
          ajax.loginFarmer(login_info)
          .then((r) => {
            console.log("FROM Login: ", r)
            _onValueChange(STORAGE_KEY, r.id_token)
            toggleLogin(r.farmer_id, r.farmer_name, r.market_id)
          })
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
