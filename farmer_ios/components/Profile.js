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

  render() {
    let savedMarket = this.props.market_name
    let farmerName  = this.props.farmerName

    console.log("Saved Market is: ", savedMarket);
    console.log("Farmer Name is: ", farmerName)

    return(
      <Container>
        <Content>
          <Header>
            <Title>Howdy!</Title>
          </Header>
          {savedMarket ?
            <Card>
              <CardItem header>
                <Text style={styles.titleText}>Your Market</Text>
              </CardItem>
              <CardItem>
                <Text>{savedMarket}</Text>
              </CardItem>
              <CardItem>
                <Button danger onPress={this.removerFromFarmer.bind(this)}>
                  Remove
                  <Icon name="ios-trash" />
                </Button>
              </CardItem>
            </Card>
            : <Text>No markets saved.</Text>
          }
          <Button danger block onPress={this._userLogout.bind(this)}>
            Logout
          </Button>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  titleText: {
    textAlign: 'center'
  }
})
