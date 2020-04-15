import * as React from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, View, StatusBar } from 'react-native';

export default class App extends React.Component {
  state = {
    json: '',
    totalCases: '',
    totalRecovered: '',
    totalDeaths: '',
    newCases: '',
    newDeaths: '',
    newRecovered: '',
  };
  componentDidMount() {
//    var date = new Date().getDate();
    fetch('https://api.covid19api.com/total/country/united-states', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => { //holds the json response!!!
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        if (month < 10)
          month = "0" + month
        if (date < 10)
          date = "0" + date
        var fullDate = year + "-" + month + "-" + date + "T00:00:00Z";
        for (let i = 0; i< json.length; i++){
          if (fullDate == json[i]['Date']){
            this.setState({
              totalCases: json[i]['Confirmed'],   
              totalRecovered: json[i]['Recovered'],
              totalDeaths: json[i]['Deaths'] 
            });
            this.setState({
              newCases: parseInt(json[i]['Confirmed']) - parseInt(json[i-1]['Confirmed']), //"2",//json['Countries'][234]['NewConfirmed'],  //us
              newDeaths: parseInt(json[i]['Deaths']) - parseInt(json[i-1]['Deaths']),//json['Countries'][234]['NewDeaths'],  //us
              newRecovered: parseInt(json[i]['Recovered']) - parseInt(json[i-1]['Recovered']),//json['Countries'][234]['NewRecovered'],  //us
            });
          }
        }

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
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
});