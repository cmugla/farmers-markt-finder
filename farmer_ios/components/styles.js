import {
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  centerHome: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    margin: 10,
  },
  header: {
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 34,
  },
  margin: {
    margin:10
  },
  right: {
    textAlign: 'right'
  },
  footer: {
    flex: 1,
    backgroundColor: 'white'
  },
  bold: {
    fontWeight: 'bold'
  },
  finePrint: {
    fontSize: 10,
    textAlign: 'right',
    color: 'hotpink'
  },
  center: {
    textAlign: 'center'
  }
});
