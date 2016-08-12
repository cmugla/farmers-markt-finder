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

import AjaxAdapter from '../helpers/ajaxAdapter.js'

const ajax = new AjaxAdapter(fetch);

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

  saveMarket(market_name, address_line_1, city, state, operation_hours, operation_season) {
    let data = {
      market_name: market_name,
      address_line_1: address_line_1,
      city: city,
      state: state,
      operation_hours: operation_hours,
      operation_season: operation_season,
      farmer_id: this.props.farmerId
    }
    ajax.addMarket(data)
      .then(data=>{
        console.log("Saved Market: ", data)
      })
  }

  render(){
    let here = this
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
                {here.props.isFarmerHere ?
                  <CardItem>
                    <Button block danger onPress={()=>this.saveMarket(market.market_name, market.address_line_1, market.city, market.state, market.operation_hours, market.operation_season)}>
                      Register Me to this Market
                    </Button>
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
