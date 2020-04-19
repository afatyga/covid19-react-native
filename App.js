import React from 'react';
import { StyleSheet, Text, View , TextInput, TouchableHighlight} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import * as Permissions from 'expo-permissions';
import RNPickerSelect from 'react-native-picker-select';

Geocoder.init('AIzaSyAP3f4Eiq0zL1177qW1QkXnD-h_ahkfAj0')

getJson = (country) => {
    country = country.replace(" ", "-")
    const URL = `https://api.covid19api.com/total/country/${country}`;
    return fetch(URL)
            .then((res) => res.json());
}

getLiveJson = () => {
    const URL = `https://api.covid19api.com/world/total`;
    return fetch(URL)
            .then((res) => res.json());
}

export default class App extends React.Component {
  inputRefs = {};
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
    error: false,
    date: 'Live'
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

onDateChange(date2){
getJson(this.state.country)
  .then((res) => {            

    var date = new Date().getDate() -1;
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    if (month < 10) month = "0" + month
    if (date < 10) date = "0" + date
    var fullDate = year + "-" + month + "-" + date + "T00:00:00Z";
    
    if (date2 != 'Live') fullDate = date2 + "T00:00:00Z";

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
                      
                      if (this.state.date != 'Live' ) fullDate = this.state.date + "T00:00:00Z";

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
              latitudeDelta: 60.0,
              longitudeDelta: 60.0,
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
                (e) => {
                  this.onRegionChange(e.nativeEvent.coordinate);
                  this.setState({country:"Loading"});
                }
              }
              title={this.state.country}
            />
            <Text style={styles.title}>COVID-19 in the World</Text>
          
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

          <RNPickerSelect
            onValueChange={(value) => {
                this.setState({date: value});
                this.onDateChange(value)
              }}
            onUpArrow={() => {
               this.inputRefs.name.focus();
            }}
            onDownArrow={() => {
              this.inputRefs.picker2.togglePicker();
            }}
            style={{ ...styles }}
           
           value={this.state.date}
           ref={(el) => {
              this.inputRefs.picker = el;
           }}
          items={[
                { label: 'Today', value: 'Live' },

                { label: '4/18/2020', value: '2020-04-18' },
                { label: '4/17/2020', value: '2020-04-17' },
                { label: '4/16/2020', value: '2020-04-16' }, 
                { label: '4/15/2020', value: '2020-04-15' }, 
                { label: '4/14/2020', value: '2020-04-14' }, 
                { label: '4/13/2020', value: '2020-04-13' }, 
                { label: '4/12/2020', value: '2020-04-12' }, 
                { label: '4/11/2020', value: '2020-04-11' }, 
                { label: '4/10/2020', value: '2020-04-10' }, 
                { label: '4/09/2020', value: '2020-04-09' }, 
                { label: '4/08/2020', value: '2020-04-08' }, 
                { label: '4/07/2020', value: '2020-04-07' }, 
                { label: '4/06/2020', value: '2020-04-06' }, 
                { label: '4/05/2020', value: '2020-04-05' }, 
                { label: '4/04/2020', value: '2020-04-04' }, 
                { label: '4/03/2020', value: '2020-04-03' }, 
                { label: '4/02/2020', value: '2020-04-02' }, 
                { label: '4/01/2020', value: '2020-04-01' }, 
                { label: '3/31/2020', value: '2020-03-31' }, 
                { label: '3/30/2020', value: '2020-03-30' }, 
                { label: '3/29/2020', value: '2020-03-29' }, 
                { label: '3/28/2020', value: '2020-03-28' }, 
                { label: '3/27/2020', value: '2020-03-27' }, 
                { label: '3/26/2020', value: '2020-03-26' }, 
                { label: '3/25/2020', value: '2020-03-25' }, 
                { label: '3/24/2020', value: '2020-03-24' }, 
                { label: '3/23/2020', value: '2020-03-23' }, 
                { label: '3/22/2020', value: '2020-03-22' }, 
                { label: '3/21/2020', value: '2020-03-21' }, 
                { label: '3/20/2020', value: '2020-03-20' }, 
                { label: '3/19/2020', value: '2020-03-19' }, 
                { label: '3/18/2020', value: '2020-03-18' }, 
                { label: '3/17/2020', value: '2020-03-17' }, 
                { label: '3/16/2020', value: '2020-03-16' }, 
                { label: '3/15/2020', value: '2020-03-15' }, 
                { label: '3/14/2020', value: '2020-03-14' }, 
                { label: '3/13/2020', value: '2020-03-13' }, 
                { label: '3/12/2020', value: '2020-03-12' }
            ]}
            />
            <Text style= {styles.result1}>Total Cases: {this.state.totalCases}</Text>
            <Text style= {styles.result}>Total Deaths: {this.state.totalDeaths} </Text>
            <Text style= {styles.result}>Total Recovered: {this.state.totalRecovered} </Text>
            <Text style= {styles.result}>New Cases: {this.state.newCases} </Text>
            <Text style= {styles.result}>New Deaths: {this.state.newDeaths}</Text>        
            <Text style= {styles.result}>New Recovered: {this.state.newRecovered}</Text>
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
  title: {
    marginTop:20,
    fontSize: 18,
    backgroundColor: 'black',
    color: 'white',
    alignSelf: 'center',
    fontFamily:"Noteworthy"
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
    fontFamily:"Noteworthy",
  },
  button: {
    height: 40,
    flexDirection: 'row',
    backgroundColor:'white',
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
    result: {
    color: 'black',
    alignItems: 'center',
    fontSize: 14,
    marginLeft: 100,
    marginRight: 100,
    backgroundColor: 'white',
    fontFamily:"Noteworthy",
  },
    result1: {
    color: 'black',
    alignItems: 'center',
    fontSize: 14,
    marginTop: 300,
    marginLeft: 100,
    marginRight: 100,
    backgroundColor: 'white',
    fontFamily:"Noteworthy",
  },
  inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
  }

});