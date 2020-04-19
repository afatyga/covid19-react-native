import React, { Component } from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

export default class SecondView extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text> Made it Here </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350
  }
});