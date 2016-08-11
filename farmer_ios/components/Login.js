import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet
} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  View,
  Header,
  Title,
  InputGroup,
  Icon,
  Input,
  Button,
  List,
  ListItem
} from 'native-base';

export default class Login extends Component {

  constructor(props){
    super(props)

    this.state = {
      inputs: {
        email: '',
        password: ''
      }
    }
  }

  handleLoginPress(){
    let email     = this.state.inputs.email
    let password  = this.state.inputs.password
    this.props.checkLogin(email, password)
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
                value={this.state.inputs.email}
                onChangeText={(text)=>{
                  this.setState({
                    inputs: {
                      email: text
                    }
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
                value={this.state.inputs.password}
                onChangeText={(text)=>{
                  this.setState({
                    inputs: {
                      password: text
                    }
                  })
                }}
                />
            </InputGroup>
          </ListItem>
        </List>
        <Button style={{margin: 10}} onPress={this.handleLoginPress.bind(this)}>
          LOGIN
        </Button>
      </Content>
    )
  }
}
