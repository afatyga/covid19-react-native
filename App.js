import React from 'react';
import { StyleSheet, Text, View , TextInput, TouchableHighlight} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import * as Permissions from 'expo-permissions';

Geocoder.init('AIzaSyAP3f4Eiq0zL1177qW1QkXnD-h_ahkfAj0')

getJson = (country) => {
//    let username = name.toLowerCase().trim();
    country = country.replace(" ", "-")
    const URL = `https://api.covid19api.com/total/country/${country}`;
    return fetch(URL)
            .then((res) => res.json());
}

getLiveJson = () => {
//    let username = name.toLowerCase().trim();
    const URL = `https://api.covid19api.com/world/total`;
    return fetch(URL)
            .then((res) => res.json());
}

export default class App extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    country: 'Current Location',
    totalCases: 'Loading...',
    totalRecovered: 'Loading...',
    totalDeaths: 'Loading...',
    newCases: 'Loading...',
    newDeaths: 'Loading...',
    newRecovered: 'Loading...',
    error: false
  }
    async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.setState({ latitude, longitude });
         Geocoder.from(parseInt(latitude), parseInt(longitude))
        .then(json => {
            for (var i = 0; i < json.results[0].address_components.length; i++){
              if(json.results[0].address_components[i].types[0] == "country"){

                this.setState({country: json.results[0].address_components[i].long_name})
                getJson(json.results[0].address_components[i].long_name)
                  .then((res) => {            

                      var date = new Date().getDate() -1;
                      var month = new Date().getMonth() + 1;
                      var year = new Date().getFullYear();
                      if (month < 10) month = "0" + month
                      if (date < 10) date = "0" + date
                      var fullDate = year + "-" + month + "-" + date + "T00:00:00Z";
                      console.log(fullDate)

                      for (let i = 0; i< res.length; i++){
                        console.log(res[i]['Date'])

                        if (fullDate == res[i]['Date']){

                          this.setState({
                            totalCases: res[i]['Confirmed'],   
                            totalRecovered: res[i]['Recovered'],
                            totalDeaths: res[i]['Deaths'],
                            newCases: parseInt(res[i]['Confirmed']) - parseInt(res[i-1]['Confirmed']), 
                            newDeaths: parseInt(res[i]['Deaths']) - parseInt(res[i-1]['Deaths']),
                            newRecovered: parseInt(res[i]['Recovered']) - parseInt(res[i-1]['Recovered']),
                            });
                            break;
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
            }
          });
        },
      (error) => console.log('Error:', error)
    )

  }

  handleSubmit(){ //live world statistics!!
    getLiveJson()
      .then((res) => {
        var total = res['TotalConfirmed']
        var deaths = res['TotalDeaths']
        var recovered = res['TotalRecovered']
        var overallStr = "Confirmed Cases: " + total + "\nConfirmed Deaths: " + deaths + "\nConfirmed Recovered: " + recovered
        alert(overallStr)
      })
  }

  onRegionChange(region) { //get country and run covid api here - change states
    this.setState({ region });
    Geocoder.from(parseInt(region.latitude), parseInt(region.longitude))
        .then(json => {
            for (var i = 0; i < json.results[0].address_components.length; i++){
              if(json.results[0].address_components[i].types[0] == "country"){

                this.setState({country: json.results[0].address_components[i].long_name})

                getJson(json.results[0].address_components[i].long_name)
                  .then((res) => {            

                      var date = new Date().getDate() -1;
                      var month = new Date().getMonth() + 1;
                      var year = new Date().getFullYear();
                      if (month < 10) month = "0" + month
                      if (date < 10) date = "0" + date
                      var fullDate = year + "-" + month + "-" + date + "T00:00:00Z";

                      for (let i = 0; i< res.length; i++){

                        if (fullDate == res[i]['Date']){

                          this.setState({
                            totalCases: res[i]['Confirmed'],   
                            totalRecovered: res[i]['Recovered'],
                            totalDeaths: res[i]['Deaths'],
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
                break
              }
            }
        })
        //.catch(error => console.warn(error));
    
  }
  render() {
    var mapStyle=[{"elementType": "geometry", "stylers": [{"color": "#242f3e"}]},{"elementType": "labels.text.fill","stylers": [{"color": "#746855"}]},{"elementType": "labels.text.stroke","stylers": [{"color": "#242f3e"}]},{"featureType": "administrative.locality","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "poi","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "poi.park","elementType": "geometry","stylers": [{"color": "#263c3f"}]},{"featureType": "poi.park","elementType": "labels.text.fill","stylers": [{"color": "#6b9a76"}]},{"featureType": "road","elementType": "geometry","stylers": [{"color": "#38414e"}]},{"featureType": "road","elementType": "geometry.stroke","stylers": [{"color": "#212a37"}]},{"featureType": "road","elementType": "labels.text.fill","stylers": [{"color": "#9ca5b3"}]},{"featureType": "road.highway","elementType": "geometry","stylers": [{"color": "#746855"}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#1f2835"}]},{"featureType": "road.highway","elementType": "labels.text.fill","stylers": [{"color": "#f3d19c"}]},{"featureType": "transit","elementType": "geometry","stylers": [{"color": "#2f3948"}]},{"featureType": "transit.station","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "water","elementType": "geometry","stylers": [{"color": "#17263c"}]},{"featureType": "water","elementType": "labels.text.fill","stylers": [{"color": "#515c6d"}]},{"featureType": "water","elementType": "labels.text.stroke","stylers": [{"color": "#17263c"}]}];
    const { latitude, longitude } = this.state

    if (longitude){

      return (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 45.0,
              longitudeDelta: 45.0,
            }}
            customMapStyle={mapStyle}
          >
            <Marker
              draggable
              coordinate={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              }}
              onDragEnd={
                (e) => this.onRegionChange(e.nativeEvent.coordinate)
              }
              title={this.state.country}
            />
            <TouchableHighlight
                  style = {styles.button}
                  underlayColor= "white"
                  onPress = {this.handleSubmit}
            >
                <Text
                    style={styles.buttonText}>
                    Click for World Wide Live Stats
                </Text>
          </TouchableHighlight>


            <Text>Total Cases: {this.state.totalCases}</Text>
            <Text>Total Deaths: {this.state.totalDeaths} </Text>
            <Text>Total Recovered Cases: {this.state.totalRecovered} </Text>
            <Text>New Cases: {this.state.newCases} </Text>
            <Text>New Deaths: {this.state.newDeaths}</Text>        
            <Text>New Recovered Cases: {this.state.newRecovered}</Text>
          </MapView>
        </View>
      );
    }
    return (
        <View>
          <Text>Waiting on Permission... </Text>
        </View>
    );
    
  }
}
 
const styles = StyleSheet.create({
  container: {
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  map: {
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
  },
    buttonText: {
    fontSize: 18,
    marginTop: 5,
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
    marginTop: 400,
    marginLeft: 20,
    marginRight: 20,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
    result: {
    color: 'black',
    marginTop:200,
    alignItems: 'center',
    fontSize: 24,
    backgroundColor: 'white'
  }
});