import axios from 'axios';
import React, { Component } from 'react'
import logo_signin from '../logo_signin.png';
import { InfoWindow, withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import Geocode from 'react-geocode';
import AutoComplete from "react-google-autocomplete";

// Old API KEY
// Geocode.setApiKey("AIzaSyBtuF_qV8V68Bf_YrT3UA9lXcAff5yQeyU")

// New API KEY
Geocode.setApiKey("AIzaSyA-fNGUBxtHqdiDpx9zfylTwXtZkkfGN_M")

export default class signupvictim2 extends Component {

    constructor(props){
        super(props);

        this.state = {
            Firstname:this.props.location.state.Firstname,
            Lastname:this.props.location.state.Lastname,
            Age:this.props.location.state.Age,
            Gender:this.props.location.state.Gender,
            Nationality:this.props.location.state.Nationality,
            Race:this.props.location.state.Race,
            // Congenital_Disease:this.props.location.state.Congenital_Disease,
            // Other_Disease:this.props.location.state.Other_Disease,
            Mobile:this.props.location.state.Mobile,
            Password:this.props.location.state.Password,
            
            Province:"กรุงเทพมหานคร",
            House_No:this.props.location.state.House_No,
            Soi:this.props.location.state.Soi,
            Road:this.props.location.state.Road,
            District:this.props.location.state.District,
            Subdistrict:this.props.location.state.Subdistrict,
            ZIP_Code:this.props.location.state.ZIP_Code,

            address:"",
            city:"",
            area:"",
            state:"",
            zoom:10,
            height:400,
            mapPosition:{lat:0,lng:0},
            markerPosition:{lat:0,lng:0},

            Disease:this.props.location.state.Congenital_Disease,
            Other:this.props.location.state.Other_Disease,
        }
    }

    componentDidMount() {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    mapPosition: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    },
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
                        })
                    })
                })
            })
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

    onSubmitSignup = async(e) => {
        e.preventDefault()

        var phoneNumber = String(this.props.location.state.Mobile)
        phoneNumber = phoneNumber.substring(1)
        phoneNumber = '+66'+phoneNumber
        console.log(phoneNumber)
        const phoneObject = {phoneNumber:phoneNumber}
        axios.post(`http://localhost:4000/verify/send/`,phoneObject);

        this.props.history.push({
            pathname: '/victim-otp',
              search: '',
              state: {Firstname:this.props.location.state.Firstname,
                        Lastname:this.props.location.state.Lastname,
                        Age:this.props.location.state.Age,
                        Gender:this.props.location.state.Gender,
                        Nationality:this.props.location.state.Nationality,
                        Race:this.props.location.state.Race,
                        // Cogenital_Disease:this.props.location.state.Cogenital_Disease,
                        // Other_Disease:this.props.location.state.Other_Disease,
                        Mobile:this.props.location.state.Mobile,
                        Password:this.props.location.state.Password,

                        Province:"กรุงเทพมหานคร",
                        House_No:this.props.location.state.House_No,
                        Soi:this.props.location.state.Soi,
                        Road:this.props.location.state.Road,
                        District:this.props.location.state.District,
                        Subdistrict:this.props.location.state.Subdistrict,
                        ZIP_Code:this.props.location.state.ZIP_Code,

                        Lat:this.state.markerPosition.lat,
                        Lng:this.state.markerPosition.lng,

                        Disease:this.props.location.state.Congenital_Disease,
                        Other:this.props.location.state.Other_Disease,
                    } 
        })
    }

    render() {
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
              defaultZoom={18}
              defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
            >
              <Marker 
              draggable={true}
              onDragEnd={this.onMarkerDragEnd}
              position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
              >
                {/* <InfoWindow>
                    <div>hello</div>
                </InfoWindow> */}
              </Marker>

            <AutoComplete 
                style = {{ width:"100%", height:"40px", paddingLeft:"16px", marginTop:"2px", marginBottom:"2rem"}}
                onPlaceSelected={this.onPlaceSelected}
                // types={['(regions)']}
                options={{
                    // types: ["(regions)"],
                    types: ["address"],
                    componentRestrictions: { country: "th" },
                  }} 
                // defaultValue={this.props.location.state.Subdistrict}
            />
            </GoogleMap>
          ));

        return (
            <div>
            <div class="container-lg">
            <div style={{margin:"5rem 0 0 0"}}>
            <img src={logo_signin} class="img-fluid" style={{width:"15%", marginBottom:"5%"}}/>
                
            <MapWithAMarker
            // Old
            // googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBtuF_qV8V68Bf_YrT3UA9lXcAff5yQeyU&v=3.exp&libraries=geometry,drawing,places"
            // New
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA-fNGUBxtHqdiDpx9zfylTwXtZkkfGN_M&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `25rem` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            />

            <div style={{marginTop:"4%"}}>
            <button class="rounded-pill"
                    style={{margin:"10% 0 5% 0", backgroundColor:"#2F4A8A", color:"#ffffff",
                            border:"2px solid #B4B6BB", width:"50%", fontSize:"1.5vw"}} 
                    type="submit"
                    onClick={this.onSubmitSignup}>Submit</button>
            </div>
            </div>
            </div>    
            </div>
        )
    }
}