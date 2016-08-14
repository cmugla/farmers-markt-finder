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

import OpenUrlButton from './OpenUrlButton'

export default class Market extends Component {
  render(){
    let posts   = this.props.currentPosts;
    let market  = this.props.marketClicked;

    return (
      <Content>
        <Header>
          <Title>{market.market_name}</Title>
        </Header>
      </Content>
    )
  }
}



// {posts ?
//   posts.map((post, id)=>{
//     return (
//       <CardItem key={id}>
//         <Text>{post.content}</Text>
//       </CardItem>
//     )
//   })
//   : null
// }
