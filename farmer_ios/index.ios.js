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
      <View>
        <Header>
          <Button transparent onPress={this.toggleShowLogin.bind(this)}>
            {loggedIn}
          </Button>
          <Title>NYC Markets</Title>
          <Button transparent>
            Create
          </Button>
        </Header>
        <TabBarIOS
          selectedTab={this.state.selectedTab}
          unselectedTintColor="#333"
          tintColor="darkslateblue">
          <TabBarIOS.Item
            selected={this.state.selectedTab === 'tabOne'}
            systemIcon="history"
            title="TabOne"
            onPress={() => {
              this.setState({
                selectedTab: 'tabOne'
              });
            }}>
            <TabOne/>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            selected={this.state.selectedTab === 'tabTwo'}
            systemIcon="search"
            title="TabTwo"
            onPress={() => {
              this.setState({
                selectedTab: 'tabTwo'
              });
            }}>
            <TabTwo/>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            selected={this.state.selectedTab === 'feed'}
            systemIcon="favorites"
            title="Feed"
            onPress={() => {
              this.setState({
                selectedTab: 'feed'
              });
            }}>
            <Feed marketData={this.state.markets} />
          </TabBarIOS.Item>
        </TabBarIOS>
      </View>
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





