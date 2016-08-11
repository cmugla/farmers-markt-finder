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

export default class SignUp extends Component {

  constructor(props){
    super(props)

    this.state = {
      inputs: {
        email: '',
        password: '',
        name: '',
        market_name: ''
      }
    }
  }

  handleSignUpPress(){
    let email       = this.state.inputs.email;
    let password    = this.state.inputs.password;
    let name        = this.state.inputs.name;
    let market_name = this.state.inputs.market_name;

    this.props.signUp(email, password, name, market_name)
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
                }} />
            </InputGroup>
          </ListItem>

          <ListItem>
            <InputGroup >
              <Input
                inlineLabel
                label="NAME"
                placeholder="Name of Farm"
                value={this.state.inputs.name}
                onChangeText={(text)=>{
                  this.setState({
                    inputs: {
                      name: text
                    }
                  })
                }} />
            </InputGroup>
          </ListItem>

          <ListItem>
            <InputGroup >
              <Input
                stackedLabel
                label="MARKET NAME"
                placeholder="Name of Farmer's Market"
                value={this.state.inputs.market_name}
                onChangeText={(text)=>{
                  this.setState({
                    inputs: {
                      market_name: text
                    }
                  })
                }}/>
            </InputGroup>
          </ListItem>
        </List>
        <Button style={{margin: 10}} onPress={this.handleSignUpPress.bind(this)}>
          SIGNUP
        </Button>
      </Content>
    )
  }
}
