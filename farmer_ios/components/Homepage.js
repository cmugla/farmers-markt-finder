import React, { Component } from 'react';
import {
  Image
} from 'react-native';
import {
  Text,
  View,
  Button
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
      <View>
        <Image source={require('../images/farm_bill_2.jpg')} style={styles.backgroundImage}>
          <View style={styles.centerHome}>
            <Text style={styles.header}>Welcome!</Text>
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
      </View>
    )
  }
}
