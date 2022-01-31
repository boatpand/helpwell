/*global google*/
import React, { Component } from 'react'
import axios from 'axios';
import Header from './header';
import { withRouter } from "react-router-dom";
import { InfoWindow, withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer} from 'react-google-maps';
import Geocode from 'react-geocode';

Geocode.setApiKey("AIzaSyA-fNGUBxtHqdiDpx9zfylTwXtZkkfGN_M")

class Navigation extends Component {
    constructor(props){
        super(props);

        this.state = {
            RequestID:this.props.location.state.RequestID,
            Helper_Mobile:this.props.location.state.Helper_Mobile,
            Mobile:this.props.location.state.Mobile,

            address:"",
            city:"",
            area:"",
            state:"",
            zoom:10,
            height:400,
            mapPosition:{lat:0,lng:0},
            markerPosition:{lat:0,lng:0},

            currentLocation: { lat: 0, lng: 0},
            victimLocation: { lat: 0, lng: 0},
            directions:null,

            Cancel:this.props.location.state.Cancel,
            request:[],

            curTime : null,

            route:"",
            distance:"",
            time:""
        }
    }
    
    async componentDidMount(){
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(position => {
              this.setState({
                  mapPosition: {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude
                  },
                  currentLocation:{lat:this.state.mapPosition.lat, lng:this.state.mapPosition.lng},
                  markerPosition: {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude
                  }
              }, () => {
                  Geocode.fromLatLng(position.coords.latitude,position.coords.longitude).then(response =>{
                      console.log('response', response)
                      const address = response.results[0].formatted_address,
                            addressArray = response.results[0].address_components,
                            city = this.getCity(addressArray),
                            area = this.getArea(addressArray),
                            state = this.getState(addressArray)
          
                      this.setState({
                          address: (address) ? address: "",
                          area: (area) ? area : "",
                          city: (city) ? city:"",
                          state: (state) ? state:"",
  
                          currentLocation:{lat:this.state.mapPosition.lat, lng:this.state.mapPosition.lng}
                      })
                      console.log(this.state.currentLocation)
                  })
              })
          })
      }
  
        console.log(`Helper_Mobile : ${this.state.Helper_Mobile}`)
        console.log(this.state.RequestID)
  
        let mobile = this.state.Mobile
        await axios.get(`http://localhost:4000/victimuser/victim-profile/${mobile}`).then(res => {
              this.setState({
              user: res.data
        })
          }).catch((error)=>{
            console.log(error)
          })
          console.log(this.state.user)
          this.setState({
              victimLocation:{lat:parseFloat(this.state.user.Lat), lng:parseFloat(this.state.user.Lng)}
          })

          console.log(this.state.victimLocation)
          console.log(this.state.currentLocation)

          // Re render after 3s (get real time position)
          setInterval( () => {
            this.setState({
              curTime : new Date().toLocaleString()
            })
          },3000)
      }

      componentDidUpdate(prevProps,prevState){
        if(this.state.currentLocation!==prevState.currentLocation){
            if(this.state.currentLocation.lat!==0){
              const directionsService = new google.maps.DirectionsService();
              const origin = { lat: this.state.currentLocation.lat, lng: this.state.currentLocation.lng };
              const destination = { lat: this.state.victimLocation.lat, lng: this.state.victimLocation.lng };
      
              directionsService.route(
                {
                  origin: origin,
                  destination: destination,
                  travelMode: google.maps.TravelMode.DRIVING
                },
                async(result, status) => {
                  if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                      directions: result,
                      route:result.routes[0].summary,
                      distance:result.routes[0].legs[0].distance.text,
                      time:result.routes[0].legs[0].duration.text
                    });
                  } else {
                    console.error(`error fetching directions ${result}`);
                  }
                  await console.log(this.state.directions)
                }
              );
              }
          }
    }

    getCity = (addressArray) => {
        let city="";
        for(let index = 0; index < addressArray.length; index++){
            if(addressArray[index].types[0] && "administrative_area_level_2" === addressArray[index].types[0]){
                city = addressArray[index].long_name;
                return city;
            }
        }
    }
  
    getArea = (addressArray) => {
        let area="";
        for(let index = 0; index < addressArray.length; index++){
            if(addressArray[index].types[0]){
                for(let j=0; j<addressArray.length; j++){
                    if('sublocality_level_1' === addressArray[index].types[j] || 
                    'locality' === addressArray[index].types[j]){
                        area = addressArray[index].long_name;
                        return area;
                    }
                }
            } 
        }
    }
  
    getState = (addressArray) => {
        let state="";
        for(let index = 0; index < addressArray.length; index++){
            for(let index = 0; index < addressArray.length; index++){
                if(addressArray[index].types[0] && "administrative_level_1" === addressArray[index].types[0]){
                    state = addressArray[index].long_name;
                    return state;
                }
            }
        }
    }
  
    onMarkerDragEnd = (event) => {
  
        let newLat = event.latLng.lat();
        let newLng = event.latLng.lng();
  
        // console.log('newLat',newLat)
        Geocode.fromLatLng(newLat,newLng).then(response =>{
            console.log('response', response)
            const address = response.results[0].formatted_address,
                  addressArray = response.results[0].address_components,
                  city = this.getCity(addressArray),
                  area = this.getArea(addressArray),
                  state = this.getState(addressArray)
  
            this.setState({
                address: (address) ? address: "",
                area: (area) ? area : "",
                city: (city) ? city:"",
                state: (state) ? state:"",
                markerPosition: {
                    lat:newLat,
                    lng:newLng
                }, 
                mapPosition:{
                    lat:newLat,
                    lng:newLng
                }
            })
        })
    }
  
    onPlaceSelected = (place) => {
        const address = place.formatted_address,
            addressArray = place.address_components,
            city = this.getCity(addressArray),
            area = this.getArea(addressArray),
            state = this.getState(addressArray),
            newLat = place.geometry.location.lat(),
            newLng = place.geometry.location.lng();
        this.setState({
            address: (address) ? address: "",
            area: (area) ? area : "",
            city: (city) ? city:"",
            state: (state) ? state:"",
            markerPosition: {
                lat:newLat,
                lng:newLng
            }, 
            mapPosition:{
                lat:newLat,
                lng:newLng
            }
        }) 
    }

    render() {
        const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
              defaultCenter={{ lat: this.state.currentLocation.lat, lng: this.state.currentLocation.lng }}
              defaultZoom={50}
              >
                <DirectionsRenderer
                  directions={this.state.directions}
                />
            </GoogleMap>
          ));

        return (
            <div>
                <div style={{display:"flex", margin:"8rem 0 0 10%"}}>
                <h1 style={{fontFamily:"kanit", fontSize:"1.5vw"}}>เส้นทางแนะนำ :</h1>
                <h1 style={{fontFamily:"kanit", fontSize:"1.5vw", color:"#707070"}}>&nbsp;{this.state.route}</h1>
                <h1 style={{fontFamily:"kanit", fontSize:"1.5vw", marginLeft:"2%"}}>ระยะทาง</h1>
                <h1 style={{fontFamily:"kanit", fontSize:"1.5vw", color:"#707070"}}>&nbsp;{this.state.distance}</h1>
                <h1 style={{fontFamily:"kanit", fontSize:"1.5vw", marginLeft:"2%"}}>ใช้เวลาประมาณ</h1>
                <h1 style={{fontFamily:"kanit", fontSize:"1.5vw", color:"#707070"}}>&nbsp;{this.state.time}</h1>
                </div>

                <Header Mobile={this.state.Helper_Mobile}/>
                <GoogleMapExample
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA-fNGUBxtHqdiDpx9zfylTwXtZkkfGN_M&v=3.exp&libraries=geometry,drawing,places"
                containerElement={<div style={{ height: `40rem`, width: "90%", 
                display: "block", marginLeft: "auto", 
                marginRight: "auto", marginTop:"2%", marginBottom:"2%" }} />}
                mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        )
    }
}
export default withRouter(Navigation);