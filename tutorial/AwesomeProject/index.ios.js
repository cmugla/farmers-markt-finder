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
  Navigator
} from 'react-native';

import MyScene from './MyScene.js'

class AwesomeProject extends Component {
  render() {
    console.log('My view being triggered')
    return (
      <View>
        <View style={styles.toolbar}>
            <Text style={styles.toolbarButton}>Login</Text>
            <Text style={styles.toolbarTitle}>Farmer's Market</Text>
            <Text style={styles.toolbarButton}>Create</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit index.ios.js
          </Text>
          <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+D or shake for dev menu
          </Text>
        </View>
        <View style={styles.footer}>
          <Navigator
            initialRoute={{ title: 'Awesome Scene', index: 0 }}
            renderScene={(route, navigator) =>
              <Text>Hello {route.title}!</Text>
            }
            style={{padding: 100}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
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
  },
  footer:{
    flex:1
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
