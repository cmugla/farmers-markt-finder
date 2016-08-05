/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

class tutorial extends Component {
  render() {
    return (
      <View>
        <View style={styles.toolbar}>
            <Text style={styles.toolbarButton}>Add</Text>
            <Text style={styles.toolbarTitle}>This is the title</Text>
            <Text style={styles.toolbarButton}>Like</Text>
        </View>
        <View style={styles.container}>
          <Image source={require('./radishes.jpg')} style={styles.backdrop}>
            <Text style={styles.welcome}>
              Hello World!
            </Text>
            <Text style={styles.instructions}>
              I've edited the file
            </Text>
            <Text style={styles.instructions}>
              This will soon be the farmer app
            </Text>
            <Bananas />
          </Image>
        </View>
      </View>
    );
  }
}

class Bananas extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <Image source={pic} style={{width: 193, height: 110}}/>
    );
  }
}

const styles = StyleSheet.create({
  backdrop: {
    paddingTop: 60,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    color: 'white'
  },
  toolbar:{
    backgroundColor:'#81c04d',
    paddingTop:30,
    paddingBottom:10,
    flexDirection:'row'
  },
  toolbarButton:{
    width: 50,
    color:'#fff',
    textAlign:'center'
  },
  toolbarTitle:{
    color:'#fff',
    textAlign:'center',
    fontWeight:'bold',
    flex:1
  }
});


AppRegistry.registerComponent('tutorial', () => tutorial);
