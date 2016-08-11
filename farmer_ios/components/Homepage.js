import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  MapView,
  Navigator,
  TabBarIOS,
  Image
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

export default class Homepage extends Component {

  handleLoginPress(){
    this.props.login()
  }

  handleSignUpPress(){
    this.props.signUp()
  }

  handleSkipPress(){
    this.props.skip()
  }

  render() {
    return (
      <Container>
        <Content>
          <Image source={require('../images/farm_bill_2.jpg')} style={styles.backgroundImage}>
            <View style={styles.center}>
              <Text style={styles.header}>Welcome to NYC Markets!</Text>
              <View style={{alignItems: 'center'}}>
                <Button danger style={styles.button} onPress={this.handleLoginPress.bind(this)}>
                  Login
                </Button>
                <Button danger style={styles.button} onPress={this.handleSignUpPress.bind(this)}>
                  Sign Up
                </Button>
                <Button bordered danger style={styles.button} onPress={this.handleSkipPress.bind(this)}>
                  Skip
                </Button>
              </View>
            </View>
          </Image>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  center: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    margin: 10,
  },
})
