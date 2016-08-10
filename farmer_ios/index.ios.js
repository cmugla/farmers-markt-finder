import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  MapView,
  Navigator,
  TouchableHighlight
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
  Button,
  Tabs
} from 'native-base';

import Icon from 'react-native-vector-icons/Ionicons'

import AjaxAdapter from './helpers/ajaxAdapter.js'

const ajax = new AjaxAdapter(fetch);

class Waypoint extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      position: {
        coords: {
          latitude: '40.72975',
          longitude: '-73.98682'
        },
      },
      zip: '',
      markets: [],
      isLoggedIn: 'false'
    };
  }

  componentDidMount() {
    let here = this

    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     console.log(position)
    //     this.setState({position})

        ajax.getZip(here.state.position.coords.longitude, here.state.position.coords.latitude)
          .then((zip)=>{
            ajax.getMrktsZip(zip)
              .then((data)=>{
                this.setState({markets: data})
                console.log(this.state.markets)
              })
          })
    //   }
    // );
  }

  toggleLogin(){
    this.setState({
      isLoggedIn: !this.state.isLoggedIn
    })
  }

  render() {
    let here = this;
    let loggedIn;

    if(this.state.isLoggedIn){
      loggedIn = <Text>Logged in!</Text>
    } else {
      loggedIn = <Text>Login</Text>
    }

    console.log(this.state.isLoggedIn)

    return (
      <Container>
        <Header>
          <Button transparent onClick={this.toggleLogin.bind(this)}>
            {loggedIn}
          </Button>
          <Title>NYC Markets</Title>
          <Button transparent>
            Create
          </Button>
        </Header>
        <Content>
          {here.state.markets.map((market, id)=>{
            return (
              <Card key={id} style={styles.margin}>
                <CardItem header>
                  <Text>
                    {market.market_name}
                  </Text>
                </CardItem>
                <CardItem>
                  <Text>{market.operation_hours}</Text>
                  <Text>{market.address_line_1}</Text>
                  <Text>{market.city}, {market.state}</Text>
                </CardItem>
                <CardItem header>
                  <Text>{market.operation_season}</Text>
                </CardItem>
              </Card>
            )
          })}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:15
  },
  margin: {
    margin:10
  }
})

AppRegistry.registerComponent('farmer_ios', () => Waypoint);





