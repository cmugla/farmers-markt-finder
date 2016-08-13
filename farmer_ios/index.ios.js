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

import Search     from './components/Search'
import Homepage   from './components/Homepage'
import Login      from './components/Login'
import SignUp     from './components/SignUp'
import Post       from './components/Post'
import FarmerFeed from './components/FarmerFeed'
import Profile    from './components/Profile'

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
      farmerIdLoggedIn: '',
      isFarmerHere: false,
      selectedTab: 'search',
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
      showLogin: true,
      showSignUp: false,
      showFarmer: false,
      showGuest: false
    })
  }

  toggleShowSignUP(){
    this.setState({
      onHome: false,
      showSignUp: true,
      showLogin: false,
      showFarmer: false,
      showGuest:false
    })
  }

  toggleShowGuest(){
    this.setState({
      onHome: false,
      showGuest: true,
      showFarmer: false,
      showLogin: false,
      showSignUp: false
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

  getSavedMktById(){
    this.setState({
      loading: true
    })

    let farmer_id = this.state.farmerIdLoggedIn

    ajax.getMDataByFId(farmer_id)
      .then(r=>{
        ajax.getMrktById(r.market_id)
          .then((data)=>{
            console.log("From get Market by Id: ", data)
            this.setState({
              farmersMarkets: data,
              location_name: data.city,
              loading: false,
              market_name: data.market_name
            })
            ajax.getPostsByMName(data.market_name)
              .then(data=>{
                console.log("From get Posts: ", data)
                this.setState({
                  currentPosts: data,
                  loading:false
                })
              })
              .catch(err=>{
                if(err) console.log("From get posts, error: ",err)
              })
          })
      })
      .catch(err=>{
        if(err) console.log("no markets: ", err)
      })
  }

  loginFarmer(farmer_id, farmer_name, market_id){
    this.setState({
      showFarmer: true,
      showLogin: false,
      showSignUp: false,
      showGuest:false,
      onHome: false,
      farmerIdLoggedIn: farmer_id,
      farmerNameLoggedIn: farmer_name,
      isFarmerHere: true
    })
  }

  handlePost(postContent){
    ajax.addPost(postContent)
      .then((data)=>{
        console.log(data)
      })
  }

  /*
                     |
  ,---.,---.,---.,---|,---.,---.
  |    |---'|   ||   ||---'|
  `    `---'`   '`---'`---'`
  */
  render() {

    if(this.state.market_name) {
      this.setState({
        selectedTab: 'feed'
      })
    }

    if(this.state.onHome) {
      return(
        <Homepage
          login={this.toggleShowLogin.bind(this)}
          signUp={this.toggleShowSignUP.bind(this)}
          skip={this.toggleShowGuest.bind(this)} />
      )
    } else if(!this.state.onHome) {
      return (
        <View>
          {this.state.showFarmer ?
            <Header>
              <Title>{this.state.farmerNameLoggedIn}</Title>
            </Header>
            : <Header>
                <Button transparent onPress={this.toggleShowLogin.bind(this)}>
                  Login
                </Button>
                <Title>NYC Markets</Title>
                <Button transparent onPress={this.toggleShowSignUP.bind(this)}>
                  Create
                </Button>
              </Header>
          }
        {/*
                            |
        ,---..   .,---.,---.|---
        |   ||   ||---'`---.|
        `---|`---'`---'`---'`---'
        `---'
        */}
          {this.state.showGuest ?
            <TabBarIOS
              selectedTab={this.state.selectedTab}
              unselectedTintColor="#333"
              tintColor="crimson">
              <TabBarIOS.Item
                selected={this.state.selectedTab === 'search'}
                systemIcon="favorites"
                onPress={() => {
                  this.setState({
                    selectedTab: 'search'
                  });
                }}>
                {this.state.loading?
                  <Spinner color="blue"/>
                  : <Search
                      marketData={this.state.markets}
                      location={this.state.location_name}
                      getMarkets={this.getMarkets.bind(this)} />
                }
              </TabBarIOS.Item>
            </TabBarIOS>
        {/*
        ,---.
        |__. ,---.,---.,-.-.,---.,---.
        |    ,---||    | | ||---'|
        `    `---^`    ` ' '`---'`
        */}
            : this.state.showFarmer ?
              <TabBarIOS
                selectedTab={this.state.selectedTab}
                unselectedTintColor="#333"
                tintColor="crimson">
                <TabBarIOS.Item
                  selected={this.state.selectedTab === 'feed'}
                  systemIcon="favorites"
                  onPress={() => {
                    this.getSavedMktById();
                    this.setState({
                      selectedTab: 'feed'
                    });
                  }}>
                  <FarmerFeed
                    marketData={this.state.farmersMarkets}
                    location={this.state.location_name}
                    isFarmerHere={this.state.isFarmerHere}
                    farmerId={this.state.farmerIdLoggedIn}
                    farmerName={this.state.farmerNameLoggedIn}
                    currentPosts={this.state.currentPosts} />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                  title='Post'
                  systemIcon='history'
                  selected={this.state.selectedTab === 'post'}
                  onPress={() => {
                    this.getSavedMktById();
                    this.setState({
                      selectedTab: 'post'
                    });
                  }}>
                  <Post
                    farmerName={this.state.farmerNameLoggedIn}
                    farmerId={this.state.farmerIdLoggedIn}
                    marketName={this.state.market_name}
                    post={this.handlePost.bind(this)} />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                  selected={this.state.selectedTab === 'search'}
                  systemIcon="search"
                  onPress={() => {
                    this.setState({
                      selectedTab: 'search'
                    });
                  }}>
                  <Search
                    marketData={this.state.markets}
                    location={this.state.location_name}
                    getMarkets={this.getMarkets.bind(this)}
                    isFarmerHere={this.state.isFarmerHere}
                    farmerId={this.state.farmerIdLoggedIn}
                    market_name={this.state.market_name} />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                  selected={this.state.selectedTab === 'profile'}
                  systemIcon="contact"
                  onPress={() => {
                    this.setState({
                      selectedTab: 'profile'
                    });
                  }}>
                  <Profile />
                </TabBarIOS.Item>
              </TabBarIOS>
              : null
          }
        {/*
        |              o        /     o
        |    ,---.,---..,---.  / ,---..,---.,---..   .,---.
        |    |   ||   |||   | /  `---.||   ||   ||   ||   |
        `---'`---'`---|``   '/   `---'``---|`   '`---'|---'
                  `---'                `---'          |
        */}
          {this.state.showLogin ?
            <Content>
              <Header><Title>LOGIN</Title></Header>
              <Login toggleLogin={this.loginFarmer.bind(this)} />
              {!this.state.showGuest ?
                <Button bordered danger style={styles.margin} onPress={this.toggleShowGuest.bind(this)}>
                  Skip
                </Button>
                : null }
            </Content>
          : this.state.showSignUp ?
            <Content>
              <Header><Title>SIGN UP AS A FARMER</Title></Header>
              <SignUp toggleLogin={this.loginFarmer.bind(this)} />
              {!this.state.showGuest ?
                <Button bordered danger style={styles.margin} onPress={this.toggleShowGuest.bind(this)}>
                  Skip
                </Button>
                : null }
            </Content>
            : null
          }
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
