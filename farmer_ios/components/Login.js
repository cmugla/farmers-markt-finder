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
import styles       from './styles'
import AjaxAdapter  from '../helpers/ajaxAdapter.js'

const ajax        = new AjaxAdapter(fetch);
const STORAGE_KEY = 'id_token';

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

  _userLogin() {
    let here = this
    var value = this.state;

    let login_info = {
      username: value.email,
      password: value.password,
    }

    if (value) { // if validation fails, value will be null
      ajax.loginFarmer(login_info)
        .then((r) => {
          console.log("FROM LOGIN: ", r)
          this._onValueChange(STORAGE_KEY, r.id_token)
          here.props.toggleLogin(r.farmer_id, r.farmer_name, r.market_id)
        })
        .catch((err)=>{
          if(err) console.log(err)
        })
        .done();
    }
  }

   /*
                     |
  ,---.,---.,---.,---|,---.,---.
  |    |---'|   ||   ||---'|
  `    `---'`   '`---'`---'`
  */
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
        <Button style={styles.margin} onPress={this._userLogin.bind(this)}>
          LOGIN
        </Button>
      </Content>
    )
  }
}
