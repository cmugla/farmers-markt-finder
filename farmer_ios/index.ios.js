import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  MapView
} from 'react-native';
import { Container, Content, Card, CardItem, Text } from 'native-base';

import AjaxAdapter from './helpers/ajaxAdapter.js'

const ajax = new AjaxAdapter(fetch);

class Waypoint extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      position: {
        coords: {},
      },
      zip: '12009',
      markets: []
    };
  }

  componentDidMount() {
    let here = this

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        this.setState({position})

        ajax.getZip(here.state.position.coords.longitude, here.state.position.coords.latitude)
          .then((zip)=>{
            ajax.getMrktsZip(zip)
              .then((data)=>{
                this.setState({markets: data})
                console.log(this.state.markets)
              })
          })
      }
    );

  }

  render() {
    let here = this
    return (
      <Container style={styles.container}>
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





