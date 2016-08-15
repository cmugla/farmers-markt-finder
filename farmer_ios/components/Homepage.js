import React, { Component } from 'react';
import {
  Image
} from 'react-native';
import {
  Container,
  Content,
  Text,
  View,
  Button,
  Icon
} from 'native-base';
import styles from './styles'

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
            <View style={styles.centerHome}>
              <Image source={require('../images/logo2.png')} />
              <View style={{alignItems: 'center'}}>
                <Button primary style={styles.button} onPress={this.handleLoginPress.bind(this)}>
                  Login
                </Button>
                <Button danger style={styles.button} onPress={this.handleSignUpPress.bind(this)}>
                  Sign Up
                </Button>
                <Button success iconRight style={styles.button} onPress={this.handleSkipPress.bind(this)}>
                  <Icon name="ios-arrow-forward" />
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
