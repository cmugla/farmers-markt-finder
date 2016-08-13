import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet
} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Header,
  Title
} from 'native-base';

export default class Profile extends Component {

  removerFromFarmer() {
    this.props.removeMarket(this.props.market_id, this.props.farmerId)
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
            <Title>{farmerName}</Title>
          </Header>
          {savedMarket ?
            <Card>
              <CardItem>
                <Text>{savedMarket}</Text>
              </CardItem>
              <CardItem>
                <Button block danger onPress={this.removerFromFarmer.bind(this)}>
                  Remove
                </Button>
              </CardItem>
            </Card>
            : <Text>No markets saved.</Text>
          }
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
