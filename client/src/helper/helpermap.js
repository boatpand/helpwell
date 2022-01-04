import React, { Component } from 'react'
import Header from './header'
import axios from 'axios';
import { InfoWindow, withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import Geocode from 'react-geocode';
import AutoComplete from "react-google-autocomplete";

// Old API KEY
// Geocode.setApiKey("AIzaSyBtuF_qV8V68Bf_YrT3UA9lXcAff5yQeyU")

// New API KEY
Geocode.setApiKey("AIzaSyA-fNGUBxtHqdiDpx9zfylTwXtZkkfGN_M")

export default class HelperMap extends Component {
    constructor(props){
        super(props)
    
        this.state ={
            Mobile:this.props.location.state.Mobile,
            helpRequest:[],
            user:"",
            flag:0,
            place:[],
            name:"",
            mobile:"",
            show_info:false,

            address:"",
            city:"",
            area:"",
            state:"",
            zoom:10,
            height:400,
            mapPosition:{lat:0,lng:0},
            markerPosition:{lat:0,lng:0},

            activeMarker: {},
            selectedPlace: {},
        }
    }

    async componentDidMount () {
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
        await axios.get('http://localhost:4000/request/all-request').then(res => {
        this.setState({
            helpRequest: res.data,
            flag: 1
        })
        }).catch((error)=>{
        console.log(error)
        })
        console.log(this.state.helpRequest)
    }

    async componentDidUpdate(prevProps,prevState){
        if(this.state.flag!==prevState.flag){
            let address_list = [], mobile_list = [], mobile = ""
            for (var y = 0; y < this.state.helpRequest.length; y++) {
                mobile = String(this.state.helpRequest[y].Mobile)
                await axios.get(`http://localhost:4000/victimuser/victim-profile/${mobile}`).then(res => {
                this.setState({
                user: res.data
            })
            }).catch((error)=>{
            console.log(error)
            })
            var mobile_pool = String(this.state.user.Mobile)
            if(mobile_list.indexOf(mobile_pool)<0){
                mobile_list.push(mobile_pool)
            }
            // console.log(mobile_list)
        }
        for(var a=0;a<mobile_list.length;a++){
            var tmp = {
                name:this.state.user.Firstname + " " + this.state.user.Lastname,
                lat:this.state.user.Lat,
                lng:this.state.user.Lng,
                mobile:this.state.user.Mobile
            }
            address_list.push(tmp);
        }
        this.setState({place:address_list})
        console.log(this.state.place)
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

    handleMarkerClick = (e) =>{
        this.setState({
            show_info:!this.state.show_block,
            mapPosition:{
                lat:e.latLng.lat(),
                lng:e.latLng.lng()
            }
        })
    }

    closeInfo = (e) =>{
        this.setState({show_info:false})
    }

    render() {
        // console.log(this.state.place.length)
        const markers = [];
        for (let i=0; i<this.state.place.length; i++){
            markers.push(
                <Marker draggable={false}
                        position={{lat: parseFloat(this.state.place[i].lat), 
                                    lng: parseFloat(this.state.place[i].lng)}}
                        clickable
                        onClick={this.handleMarkerClick}
                >
                    {this.state.show_info === true && (
                    <InfoWindow onCloseClick={this.closeInfo}>
                    <p>{this.state.place[i].name} <br/> {this.state.place[i].mobile}</p>
                    </InfoWindow>
                    )}
                </Marker>
            )
        }

        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
              defaultZoom={18}
              defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
            >
              {markers}
            </GoogleMap>
          ));

    return (
        <div>
            <Header Mobile={this.state.Mobile}/>
            <div class="container-lg" style={{width:"100%"}}>
            <div style={{margin:"8rem 0 0 15%", display:"flex"}}>
            <h2 style={{fontFamily:"Kanit", color:"#FFB172", textAlign:"left", fontSize:"1.5vw", 
                        fontWeight:"bold"}}>เขตที่ต้องการจะค้นหา</h2>
            <AutoComplete class="rounded-pill"
            style = {{ width:"50%", height:"2vw", marginLeft:"5%", fontSize:"1.5vw",
                    marginBottom:"4vw", border:"2px solid #B4B6BB", fontFamily:"Kanit"}}
            onPlaceSelected={this.onPlaceSelected}
            placeholder="   Search Here"
            // types={['(regions)']}
            options={{
                // types: ["(regions)"],
                types: ["(regions)"],
                componentRestrictions: { country: "th" },
            }} 
            />
            </div>
            
            <MapWithAMarker
                // Old
                // googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBtuF_qV8V68Bf_YrT3UA9lXcAff5yQeyU&v=3.exp&libraries=geometry,drawing,places"
                // New
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA-fNGUBxtHqdiDpx9zfylTwXtZkkfGN_M&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `35rem`, width:"100%", alignItems:"center" }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
            </div>
        </div>
    )
}
}
