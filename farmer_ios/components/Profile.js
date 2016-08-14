import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Header,
  Title,
  Icon
} from 'native-base';

var STORAGE_KEY = 'id_token';

export default class Profile extends Component {

  removerFromFarmer() {
    this.props.removeMarket(this.props.market_id, this.props.farmerId)
  }

  async _userLogout() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      this.props.showGuest();
    } catch (error) {
      console.log('Profile AsyncStorage error: ' + error.message);
    }
  }

  /*
                     |
  ,---.,---.,---.,---|,---.,---.
  |    |---'|   ||   ||---'|
  `    `---'`   '`---'`---'`
  */
  render() {
    let savedMarket = this.props.market_name
    let farmerName  = this.props.farmerName
    let posts       = this.props.farmerPosts

    console.log("Saved Market is: ", savedMarket);
    console.log("Farmer Name is: ", farmerName)
    console.log("Trying to render posts: ", posts)

    return (
      <Container>
        <Content>
          <Header>
            <Title>Howdy!</Title>
          </Header>
          <Card>
            <CardItem header>
              <Text style={styles.titleText}>Your Market</Text>
            </CardItem>
            <CardItem>
              {savedMarket ?
                <Text>{savedMarket}</Text>
                : <Text>No markets saved.</Text>
              }
            </CardItem>
            {savedMarket ?
              <CardItem>
                <Button danger onPress={this.removerFromFarmer.bind(this)}>
                  Remove
                  <Icon name="ios-trash" />
                </Button>
              </CardItem>
              : null
            }
            <CardItem header style={styles.titleText}>
              <Text>Your Posts</Text>
            </CardItem>
            {this.props.farmerPosts.map((post, id)=>{
              return (
                <CardItem key={id}>
                {post ?
                  <Text>{post.market_name}</Text>
                  : null
                }
                  <Text>{post.content}</Text>
                {post ?
                  <Text>{post.post_created}</Text>
                  : null
                }
                </CardItem>
              )
            })}
            <CardItem>
              <Button danger block onPress={this._userLogout.bind(this)}>
                Logout
              </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({

})
