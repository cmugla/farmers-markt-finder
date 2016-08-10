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
  Button
} from 'native-base';

export default class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      zipSearched: ''
    }
  }

  handleSubmit() {
    let zip = this.state.zipSearched
    this.props.getMarkets(zip)
  }

  render(){
    let here = this
    console.log(this.state.zipSearched)
    return (
      <Container>
        <Header searchBar rounded>
          <InputGroup>
            <Icon name="ios-search" />
            <Input
              placeholder="Enter Zip Code"
              value={here.state.zipSearched}
              onChangeText={(text)=>{
                here.setState({
                  zipSearched: text
                })
              }}
            />
          </InputGroup>
          <Button transparent onPress={this.handleSubmit.bind(this)}>
            Search
          </Button>
        </Header>
      </Container>
    )
  }
}
