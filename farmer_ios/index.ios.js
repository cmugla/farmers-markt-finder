import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  MapView,
  Navigator,
  TabBarIOS
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

import TabOne   from './components/TabOne'
import TabTwo   from './components/TabTwo'
import Feed     from './components/Feed'

import Icon     from 'react-native-vector-icons/Ionicons'

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
      showLogin: false,
      selectedTab: 'feed'
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
              })
          })
    //   }
    // );
  }

  toggleShowLogin(){
    this.setState({
      showLogin: !this.state.showLogin
    })
  }

  render() {
    let here = this;
    let loggedIn;

    console.log("logged In state: ", this.state.showLogin)

    if(this.state.showLogin) {
      loggedIn = 'Hi!'
    } else if(!this.state.showLogin) {
      loggedIn = 'Login'
    }

    return (
      <Container>
        <Header>
          <Button transparent onPress={this.toggleShowLogin.bind(this)}>
            {loggedIn}
          </Button>
          <Title>NYC Markets</Title>
          <Button transparent>
            Create
          </Button>
        </Header>
        <Content>
          <Feed marketData={this.state.markets} />
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





