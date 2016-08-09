/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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

// with class definition syntax we extend Component instead of calling createClass
class Waypoint extends React.Component {

  // Don't need the function keyword when defining functions.
  // The constructor function is executed when a new instance of the Waypoint is being created
  // Props is the object passed new Waypoint(), e.g., new Waypoint({ prop1: value, prop2: value })
  constructor(props) {
    // super(props) creates a new instance of the superclass
    // In this case the superclass is React.Component
    // super(props) does the same thing that SuperClass.call(this, props) does in pseudoclassical style
    // super() MUST be called beforing refering to the 'this' of the Waypoint subclass
    super(props);
    this.state = {
      position: {
        coords: {},
      },
      zip: '12009',
      markets: []
    };
  } // look ma, no commas!

  // this function will execute after rendering on the client occurs
  componentDidMount() {

    // navigator is available via the Geolocation polyfill in React Native
    // http://facebook.github.io/react-native/docs/geolocation.html#content
    //
    // navigator is the object through which you interact with the Geolocation interface
    //
    // *** Polyfill definition needs to be verified
    // React Native allows for polyfills--code that provides functionality available in the browser, but
    // that is not currently available in the runtime environment on mobile devices ***
    // Geolocation is enabled by default when you create a project with react-native init.

    // getCurrentPosition() and watchPostion() take a success callback, error callback, and options object
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

        // ajax.getMrktsLonLat(here.state.position.coords.longitude, here.state.position.coords.latitude)
        //   .then((data)=>{
        //     this.setState({markets: data})
        //     console.log(this.state.markets)
        //   })
      }
    );

  }

  //Add title and current location to map
  render() {
    let here = this
    return (
      <Container>
        <Content>
          {here.state.markets.map((market, id)=>{
            return (
              <Card key={id}>
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

AppRegistry.registerComponent('farmer_ios', () => Waypoint);





