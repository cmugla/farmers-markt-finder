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
  Tabs,
  Spinner
} from 'native-base';

import Feed     from './components/Feed'
import Homepage from './components/Homepage'
import Login    from './components/Login'
import SignUp   from './components/SignUp'

import Icon     from 'react-native-vector-icons/Ionicons'

import AjaxAdapter from './helpers/ajaxAdapter.js'

const ajax = new AjaxAdapter(fetch);

class App extends Component {

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
      location_name: '',
      markets: [],
      showLogin: false,
      showGuest: false,
      showSignUp: false,
      showFarmer: false,
      selectedTab: 'feed',
      loading: true,
      onHome: true
    };
  }

  componentDidMount() {
    let here = this

    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     console.log(position)
    //     this.setState({position})

        ajax.getZip(here.state.position.coords.longitude, here.state.position.coords.latitude)
          .then((address)=>{
            ajax.getMrktsZip(address.zip)
              .then((data)=>{
                this.setState({
                  markets: data,
                  zip: address.zip,
                  location_name: address.name,
                  loading: false
                })
                console.log(this.state.zip, this.state.location_name)
              })
          })
    //   }
    // );
  }

  toggleShowLogin(){
    this.setState({
      onHome: false,
      showLogin: !this.state.showLogin
    })
  }

  toggleShowSignUP(){
    this.setState({
      onHome: false,
      showSignUp: !this.state.showSignUp
    })
  }

  toggleShowGuest(){
    this.setState({
      onHome: false,
      showGuest: !this.state.showGuest
    })
  }

  getMarkets(zip) {
    this.setState({
      loading:true
    })

    ajax.getMrktsZip(zip)
      .then((data)=>{
        this.setState({
          markets: data,
          zip: zip,
          location_name: data[0].city,
          loading:false
        })
        console.log(this.state.zip, this.state.location_name)
      })
  }

  checkLogin(email, password){

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

    if(this.state.onHome) {
      return(
        <Homepage
          login={this.toggleShowLogin.bind(this)}
          signUp={this.toggleShowSignUP.bind(this)}
          skip={this.toggleShowGuest.bind(this)} />
      )
    } else if(!this.state.onHome && this.state.showGuest) {
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
            tintColor="crimson">
            <TabBarIOS.Item
              selected={this.state.selectedTab === 'feed'}
              systemIcon="favorites"
              onPress={() => {
                this.setState({
                  selectedTab: 'feed'
                });
              }}>
              {this.state.loading?
                <Spinner color="blue"/>
                : <Feed
                    marketData={this.state.markets}
                    location={this.state.location_name}
                    getMarkets={this.getMarkets.bind(this)} />
              }
            </TabBarIOS.Item>
          </TabBarIOS>
        </View>
      );
    } else if(!this.state.onHome && this.state.showLogin) {
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
          <Login checkLogin={this.checkLogin.bind(this)} />
        </View>
      )
    } else if(!this.state.onHome && this.state.showSignUp) {
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
          <SignUp />
        </View>
      )
    } else if(!this.state.onHome && this.state.showFarmer) {
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
            tintColor="crimson">
            <TabBarIOS.Item
              selected={this.state.selectedTab === 'feed'}
              systemIcon="favorites"
              onPress={() => {
                this.setState({
                  selectedTab: 'feed'
                });
              }}>
              {this.state.loading?
                <Spinner color="blue"/>
                : <Feed
                    marketData={this.state.markets}
                    location={this.state.location_name}
                    getMarkets={this.getMarkets.bind(this)} />
              }
            </TabBarIOS.Item>
            <TabBarIOS.Item
              selected={this.state.selectedTab === 'post'}
              icon="create"
              onPress={() => {
                this.setState({
                  selectedTab: 'post'
                });
              }}>
              <Post />
            </TabBarIOS.Item>
            <TabBarIOS.Item
              selected={this.state.selectedTab === 'profile'}
              systemIcon="contacts"
              onPress={() => {
                this.setState({
                  selectedTab: 'profile'
                });
              }}>
              <Profile />
            </TabBarIOS.Item>
          </TabBarIOS>
        </View>
      )
    }
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

AppRegistry.registerComponent('farmer_ios', () => App);
