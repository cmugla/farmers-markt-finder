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
  }

   /*
                     |
  ,---.,---.,---.,---|,---.,---.
  |    |---'|   ||   ||---'|
  `    `---'`   '`---'`---'`
  */
  render(){
    console.log("From Post component: ", this.props.marketName)
    return(
      <Content>
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
          <Button onPress={this.handlePost.bind(this)}>
            Post
          </Button>
        </List>
      </Content>
    )
  }
}
