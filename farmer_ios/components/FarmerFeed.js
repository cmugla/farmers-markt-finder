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

export default class FarmerFeed extends Component {

  render(){
    let market = this.props.marketData

    return (
      <Container>
        <Content>
          <Header>
            <Title>{market[0].market_name}</Title>
          </Header>
          <Card style={styles.margin}>
            <CardItem header>
              <Text>
                {market[0].market_name}
              </Text>
            </CardItem>
            <CardItem>
              <Text>{market[0].address_line_1}</Text>
              <Text>{market[0].city}, {market[0].state}</Text>
            </CardItem>
            <CardItem style={styles.footer}>
              <Text style={styles.right}>{market[0].operation_hours}</Text>
              <Text style={styles.right}>{market[0].operation_season}</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  margin: {
    margin:10
  },
  right: {
    textAlign: 'right'
  },
  footer: {
    flex: 1,
    backgroundColor: 'white'
  }
})
