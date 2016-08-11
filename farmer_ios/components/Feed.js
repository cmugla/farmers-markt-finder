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

export default class Markets extends Component {

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
    console.log("FROM MARKETS COMPONENET: ", this.props.location)
    return (
      <Container>
        <Content>
          <Header>
            <Title>Nearby Markets to {this.props.location}</Title>
          </Header>
          <Header searchBar rounded>
            <InputGroup>
              <Icon name="ios-search" />
              <Input
                placeholder="Enter Zip Code"
                value={this.state.zipSearched}
                onChangeText={(text)=>{
                  this.setState({
                    zipSearched: text
                  })
                }}
              />
            </InputGroup>
            <Button transparent onPress={this.handleSubmit.bind(this)}>
              Search
            </Button>
          </Header>
          {this.props.marketData.map((market, id)=>{
            return (
              <Card key={id} style={styles.margin}>
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
                {market.market_link ?
                  <CardItem>
                    <OpenUrlButton url={market.market_link.url} />
                  </CardItem>
                  : null
                }
              </Card>
            )
          })}
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
