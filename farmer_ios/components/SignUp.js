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
  render(){
    return (
      <Content>
        <List>
          <ListItem>
            <InputGroup>
              <Icon name="ios-person" />
              <Input placeholder="EMAIL" />
            </InputGroup>
          </ListItem>

          <ListItem>
            <InputGroup>
              <Icon name="ios-unlock" />
              <Input placeholder="PASSWORD" secureTextEntry={true}/>
            </InputGroup>
          </ListItem>

          <ListItem>
            <InputGroup >
              <Input inlineLabel label="NAME" placeholder="Name of Farm" />
            </InputGroup>
          </ListItem>

          <ListItem>
            <InputGroup >
              <Input stackedLabel label="Address Line 1" placeholder="Address" />
            </InputGroup>
          </ListItem>
        </List>
        <Button style={{margin: 10}}>
          SIGNUP
        </Button>
      </Content>
    )
  }
}
