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

import OpenUrlButton  from './OpenUrlButton'
import styles         from './styles'

import AjaxAdapter    from '../helpers/ajaxAdapter.js'
const ajax = new AjaxAdapter(fetch);

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

    let getMarketById = this.props.getMarketById

    console.log(data)

    ajax.addMarket(data)
      .then(data=>{
        console.log("Saved Market: ", data)
        getMarketById(data.market_id)
        ajax.updateFarmer(data)
          .then(data=>{
            console.log("Updated Farmer: ", data)
          })
          .catch(err=>{
            if(err) console.log("Error updating farmer: ", err)
          })
      })
      .catch(err=>{
        if(err) console.log("Error at ajax call: ", err)
      })
  }

  /*
                     |
  ,---.,---.,---.,---|,---.,---.
  |    |---'|   ||   ||---'|
  `    `---'`   '`---'`---'`
  */
  render(){
    let isLoggedIn    = this.props.isFarmerHere;
    let marketData    = this.props.marketData;
    let savedMarket   = this.props.market_name;
    let location      = this.props.location;
    let handleSubmit  = this.handleSubmit;
    let posts         = this.props.currentPosts;

    return (
      <Container>
        <Content>
          <Header>
            <Title>Nearby Markets to {location}</Title>
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
            <Button transparent onPress={handleSubmit.bind(this)}>
              Search
            </Button>
          </Header>
          {marketData ?
            marketData.map((market, id)=>{
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
                  {isLoggedIn ?
                    null
                    : <CardItem>
                        <Button block success onPress={()=>{
                          this.props.showOneMarket(market)
                        }}>
                          Show More
                        </Button>
                      </CardItem>
                  }
                  {market.market_link ?
                    <CardItem>
                      <OpenUrlButton url={market.market_link.url} />
                    </CardItem>
                    : null
                  }
                  {isLoggedIn ?
                    savedMarket===market.market_name ?
                      <CardItem>
                        <Text style={styles.center}>Registered!</Text>
                      </CardItem>
                      : savedMarket ?
                        null
                        : <CardItem>
                            <Button
                              block danger
                              onPress={()=>this.saveMarket(market.market_name, market.address_line_1, market.city, market.state, market.operation_hours, market.operation_season)}>
                              Register Me to this Market
                            </Button>
                          </CardItem>
                    : null
                  }
                </Card>
              )
            })
            : <Text style={styles.margin}>I'm sorry that zip code didn't match with any Farmer's Markets in New York, please try another area</Text>
          }
        </Content>
      </Container>
    )
  }
}
