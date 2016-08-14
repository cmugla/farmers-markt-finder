import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Linking
} from 'react-native';
import {
  Button,
  Icon
} from 'native-base';

export default class OpenUrlButton extends Component {

  openUrl() {
    Linking.canOpenURL(this.props.url).then(supported => {
      if (supported) {
        Linking.openURL(this.props.url);
      } else {
        console.log('Don\'t know how to open URI: ' + this.props.url);
      }
    });
  }

  render() {
    return (
      <Button block iconRight onPress={this.openUrl.bind(this)}>
        <Icon name="ios-globe" />
        Go to Market website
      </Button>
    )
  }
}
