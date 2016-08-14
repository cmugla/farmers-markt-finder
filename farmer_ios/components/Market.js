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

import styles         from './styles'
import OpenUrlButton  from './OpenUrlButton'

export default class Market extends Component {
  render(){
    let posts   = this.props.currentPosts;
    let market  = this.props.marketClicked;

    return (
      <Content>
        <Header>
          <Button transparent onPress={this.props.showGuest}>
            <Icon name="ios-arrow-back" />
          </Button>
          <Title>{market.market_name}</Title>
        </Header>
        <Card>
          <CardItem>
            <Text>{market.address_line_1}</Text>
            <Text>{market.city}, {market.state}</Text>
          </CardItem>
          <CardItem style={styles.footer}>
            <Text style={styles.right}>{market.operation_hours}</Text>
            <Text style={styles.right}>{market.operation_season}</Text>
          </CardItem>
          {market.market_link ?
            <CardItem>
              <OpenUrlButton url={market.market_link.url} />
            </CardItem>
            : null
          }
          <CardItem header>
            <Text>Posts</Text>
          </CardItem>
          {posts ?
            posts.map((post, id)=>{
              return (
                <CardItem key={id}>
                  {post ?
                    <Text style={styles.bold}>{post.farmer_name}</Text>
                    : null
                  }
                    <Text>{post.content}</Text>
                  {post ?
                    <Text style={styles.finePrint}>{post.post_created}</Text>
                    : null
                  }
                  </CardItem>
              )
            })
            : null
          }
        </Card>
      </Content>
    )
  }
}



