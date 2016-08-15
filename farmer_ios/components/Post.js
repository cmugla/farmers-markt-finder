import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet
} from 'react-native';
import {
  Content,
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

import styles from './styles'

export default class Post extends Component {

  constructor(props){
    super(props);

    this.state={
      postContent: ''
    }
  }

  handlePost(){
    console.log("From Post component: ", this.props.marketName)
    let postContent = {
      farmer_name: this.props.farmerName,
      content: this.state.postContent,
      market_name: this.props.marketName,
      farmer_id: this.props.farmerId
    }
    this.props.post(postContent)
    this.setState({
      postContent: ''
    })
  }

   /*
                     |
  ,---.,---.,---.,---|,---.,---.
  |    |---'|   ||   ||---'|
  `    `---'`   '`---'`---'`
  */
  render(){
    let market_name = this.props.marketName
    console.log("From Post component: ", market_name)

    if(market_name) {
      return(
        <Content>
          <Header>
            <Title>{this.props.farmerName}</Title>
          </Header>
          <Header>
            <Title>{market_name}</Title>
          </Header>
          <Text style={styles.margin}>Create a post to showcase any specials or tasty treats you'll be bringing along</Text>
          <List>
            <ListItem>
              <InputGroup>
                <Icon name="ios-create" />
                <Input
                  placeholder="What's new for this week's market?"
                  value={this.state.postContent}
                  onChangeText={(text)=>{
                    this.setState({
                      postContent: text
                    })
                  }} />
              </InputGroup>
            </ListItem>
            <Button style={styles.margin} onPress={this.handlePost.bind(this)}>
              Post
            </Button>
          </List>
        </Content>
      )
    } else {
      return (
        <Content>
          <Header>
            <Title>No Markets to post to.</Title>
          </Header>
          <Text style={styles.margin}>Search for the Market you have a booth at and register your farm so you can start posting updates!</Text>
        </Content>
      )
    }
  }
}
