import * as React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

export default class App extends React.Component {
  state = {
    totalCases: '',
    totalRecovered: '',
    totalDeaths: '',
    newCases: '',
    newDeaths: '',
    newRecovered: '',
  };
  componentDidMount() {
    fetch('https://api.covid19api.com/summary', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => { //holds the json response!!!
        this.setState({
          totalCases: json['Countries'][235]['TotalConfirmed'],  //us
        });
        this.setState({
          totalRecovered: json['Countries'][235]['TotalRecovered'],  //us
        });        
        this.setState({
          totalDeaths: json['Countries'][235]['TotalDeaths'],  //us
        });
        this.setState({
          newCases: json['Countries'][235]['NewConfirmed'],  //us
        });
        this.setState({
          newDeaths: json['Countries'][235]['NewDeaths'],  //us
        });
        this.setState({
          newRecovered: json['Countries'][235]['NewRecovered'],  //us
        });

      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    return (  //styling happens here!
      <View style={styles.container}>
        <Text style={styles.bigBlue}>United States COVID-19 Cases </Text>
        <Text style={styles.red}>Total Cases: {this.state.totalCases} </Text>
        <Text style={styles.red}>Total Deaths: {this.state.totalDeaths} </Text>
        <Text style={styles.red}>Total Recovered Cases: {this.state.totalRecovered} </Text>
        <Text style={styles.red}>New Cases: {this.state.newCases} </Text>
        <Text style={styles.red}>New Deaths: {this.state.newDeaths}</Text>        
        <Text style={styles.red}>New Recovered Cases: {this.state.newRecovered}</Text>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: 125,
    width: 450,
    height: 400,
    backgroundColor: "black"
  },
  bigBlue: {
    color: 'blue',
    padding:17.5,
    fontWeight: 'bold',
    fontSize: 22.5,
    fontFamily:"Georgia"
  },
  red: {
    color: 'red',
    padding: 10,
    fontSize:20,
    fontFamily:"Georgia"
  },
});