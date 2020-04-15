import React, { Component } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableHighlight} from 'react-native';

getJson = (country) => {
//    let username = name.toLowerCase().trim();
    country = country.replace(" ", "-")
    console.log(country)
    const URL = `https://api.covid19api.com/total/country/${country}`;
    return fetch(URL)
            .then((res) => res.json());
}


export default class FirstView extends Component {
  constructor(props) {
      super(props);
      this.state = {
        country: '',
        totalCases: '',
        totalRecovered: '',
        totalDeaths: '',
        newCases: '',
        newDeaths: '',
        newRecovered: '',
        error: false
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
      this.setState({
        country: e.nativeEvent.text
      });
    }

    handleSubmit() {
      getJson(this.state.country)
          .then((res) => {            
              var date = new Date().getDate();
              var month = new Date().getMonth() + 1;
              var year = new Date().getFullYear();
              if (month < 10)
                month = "0" + month
              if (date < 10)
                date = "0" + date
              var fullDate = year + "-" + month + "-" + date + "T00:00:00Z";
              for (let i = 0; i< res.length; i++){
                console.log(res[i]['Date'])
                if (fullDate == res[i]['Date']){
                  console.log(res[i])
                  this.setState({
                    totalCases: res[i]['Confirmed'],   
                    totalRecovered: res[i]['Recovered'],
                    totalDeaths: res[i]['Deaths'] 
                  });
                  this.setState({
                    newCases: parseInt(res[i]['Confirmed']) - parseInt(res[i-1]['Confirmed']), 
                    newDeaths: parseInt(res[i]['Deaths']) - parseInt(res[i-1]['Deaths']),
                    newRecovered: parseInt(res[i]['Recovered']) - parseInt(res[i-1]['Recovered']),
                  });
                }
                else{
                  this.setState({
                    totalCases: "Not Yet Updated Today", 
                    totalRecovered: "Not Yet Updated Today", 
                    totalDeaths: "Not Yet Updated Today", 
                    newCases: "Not Yet Updated Today", 
                    newDeaths: "Not Yet Updated Today", 
                    newRecovered: "Not Yet Updated Today", 
                  });
                }
              }
            
        });
    }
  render() {
    let showErr = (
      this.state.error ?
      <Text>
        {this.state.error}
      </Text> :
      <View></View>
    );
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Search by Country</Text>
        <TextInput
              style={styles.searchInput}
              onChange={this.handleChange}
        />
        <TouchableHighlight
                style = {styles.button}
                underlayColor= "white"
                onPress = {this.handleSubmit}
              >
              <Text
                  style={styles.buttonText}>
                  Search
              </Text>
        </TouchableHighlight>
        <Text style={styles.result}>Total Cases: {this.state.totalCases} </Text>
        <Text style={styles.result}>Total Deaths: {this.state.totalDeaths} </Text>
        <Text style={styles.result}>Total Recovered Cases: {this.state.totalRecovered} </Text>
        <Text style={styles.result}>New Cases: {this.state.newCases} </Text>
        <Text style={styles.result}>New Deaths: {this.state.newDeaths}</Text>        
        <Text style={styles.result}>New Recovered Cases: {this.state.newRecovered}</Text>
            {showErr}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
    marginTop: 25,
    marginBottom:25,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FF4720'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    color: 'white',
    textAlign: 'center'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor:'white',
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  result: {
    padding: 15,
    color: 'white',
    fontSize: 18
  }
});