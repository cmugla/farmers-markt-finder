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

import styles from './styles'

export default class FarmerFeed extends Component {

  render(){
    let market  = this.props.marketData
    let posts   = this.props.currentPosts

    console.log("Current Posts: ", posts)
    console.log("Current Posts, props: ", this.props.currentPosts)
    console.log("Market Data: ", market)

    return (
      <Content>
        <Header>
          {market ?
            <Title>{market.market_name}</Title>
            : <Title>No Markets Saved Yet</Title>
          }
        </Header>
        {market ?
          <Card style={styles.margin}>
            <CardItem header>
              <Text>
                {market.market_name}
              </Text>
            </CardItem>
            <CardItem>
              <Text>{market.address_line_1}</Text>
              <Text>{market.city}, {market.state}</Text>
            </CardItem>
            <CardItem style={styles.footer}>
              <Text style={styles.right}>{market.operation_hours}</Text>
              <Text style={styles.right}>{market.operation_season}</Text>
            </CardItem>
            {posts.map((post, id)=>{
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
            })}
          </Card>
          : <Text style={styles.bold}>Use the Search feature to find a market you have a booth at</Text>
        }
      </Content>
    )
  }
}
