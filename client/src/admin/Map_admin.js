import React, { Component } from 'react'
import '../helper/style.css'
import Header_admin from './Header_admin';
import axios from 'axios';
import { InfoWindow, withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import Geocode from 'react-geocode';
import AutoComplete from "react-google-autocomplete";

// New API KEY
Geocode.setApiKey("AIzaSyA-fNGUBxtHqdiDpx9zfylTwXtZkkfGN_M")

export default class HelperMap extends Component {
    constructor(props){
        super(props)
    
        this.state ={
            Mobile:this.props.location.state.Mobile,
            Org:[],
            user:"",
            flag:0,
            place_org:[],
            place_victim:[],
            name:"",
            mobile:"",
            // show_info:false,
            show_info:true,

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

            org_mobile:"",
            helptype:"",
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
        await axios.get('http://localhost:4000/helperuser/all-org').then(res => {
        this.setState({
            Org: res.data,
        })
        }).catch((error)=>{
        console.log(error)
        })
        console.log(this.state.Org)

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
            let address_org_list = [], mobile_org_list = [], mobile = ""
            for (var y = 0; y < this.state.Org.length; y++) {
                mobile = String(this.state.Org[y].Mobile)
                await axios.get(`http://localhost:4000/helperuser/helper-profile/${mobile}`).then(res => {
                this.setState({
                user: res.data
            })
            }).catch((error)=>{
            console.log(error)
            })
            console.log(this.state.user)
            var mobile_pool = String(this.state.user.Mobile)
            if(mobile_org_list.indexOf(mobile_pool)<0){
                mobile_org_list.push(mobile_pool)
                
                await axios.get(`http://localhost:4000/helperuser/helptype-org/${mobile}`).then(res => {
                this.setState({
                helptype: res.data
            })
            }).catch((error)=>{
            console.log(error)
            })
            console.log(this.state.helptype)

            let helptype_text=""
            if (this.state.helptype.Food === true){helptype_text=helptype_text+"อาหาร"+" "}
            if (this.state.helptype.Medicine === true){helptype_text=helptype_text+"ยา"+" "}
            if (this.state.helptype.Bed === true){helptype_text=helptype_text+"หาเตียง"+" "}
            if (this.state.helptype.Hospital === true){helptype_text=helptype_text+"นำส่งโรงพยาบาล"+" "}
            if (this.state.helptype.Home === true){helptype_text=helptype_text+"นำส่งภูมิลำเนา"+" "}
            if (this.state.helptype.Other !== ""){helptype_text=helptype_text+this.state.helptype.Other}
           
                var tmp ={
                    name:this.state.user.Org_Name,
                    lat:this.state.user.Lat,
                    lng:this.state.user.Lng,
                    mobile:this.state.user.Mobile,
                    helptype_text:helptype_text
                    }
                    address_org_list.push(tmp);
            }
            console.log(mobile_org_list)
            }

            let address_victim_list = [], mobile_victim_list = [], id=0
            for (var y = 0; y < this.state.helpRequest.length; y++) {
                mobile = String(this.state.helpRequest[y].Mobile)
                await axios.get(`http://localhost:4000/victimuser/victim-profile/${mobile}`).then(res => {
                this.setState({
                user: res.data,
            })
            }).catch((error)=>{
            console.log(error)
            })
            console.log(this.state.user)
            var mobile_pool = String(this.state.user.Mobile)
            if(mobile_victim_list.indexOf(mobile_pool)<0){
                mobile_victim_list.push(mobile_pool)

                var tmp ={
                id:id,
                name:this.state.user.Firstname + " " + this.state.user.Lastname,
                lat:this.state.user.Lat,
                lng:this.state.user.Lng,
                mobile:this.state.user.Mobile
                }
                address_victim_list.push(tmp);
                id+=1
            }
        }
    
        this.setState({place_org:address_org_list, place_victim:address_victim_list,flag:0})
        console.log(this.state.place_org)
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

    // handle radio box filter
    handleAll = (e) =>{
        axios.get('http://localhost:4000/helperuser/all-org').then(res => {
        this.setState({Org: res.data})}).catch((error)=>{console.log(error)})

        axios.get('http://localhost:4000/request/all-request').then(res => {
        this.setState({helpRequest: res.data, flag:1})}).catch((error)=>{console.log(error)})
    }


    handleFood = (e) => {
        //console.log("done")
        axios.get('http://localhost:4000/helperuser/food-request').then(res => {
        this.setState({Org: res.data})}).catch((error)=>{console.log(error)})

        axios.get('http://localhost:4000/request/food-request').then(res => {
        this.setState({helpRequest: res.data, flag:1})}).catch((error)=>{console.log(error)})}

    handleMedicine = (e) => {
        //console.log("done")
        axios.get('http://localhost:4000/helperuser/medicine-request').then(res => {
        this.setState({Org: res.data})}).catch((error)=>{console.log(error)})

        axios.get('http://localhost:4000/request/medicine-request').then(res => {
        this.setState({helpRequest: res.data, flag:1})}).catch((error)=>{console.log(error)})}
    
    handleHospital = (e) => {
        //console.log("done")
        axios.get('http://localhost:4000/helperuser/hospital-request').then(res => {
        this.setState({Org: res.data})}).catch((error)=>{console.log(error)})

        axios.get('http://localhost:4000/request/hospital-request').then(res => {
        this.setState({helpRequest: res.data, flag:1})}).catch((error)=>{console.log(error)})}
    
    handleHome = (e) => {
        //console.log("done")
        axios.get('http://localhost:4000/helperuser/home-request').then(res => {
        this.setState({Org: res.data})}).catch((error)=>{console.log(error)})

        axios.get('http://localhost:4000/request/home-request').then(res => {
        this.setState({helpRequest: res.data, flag:1})}).catch((error)=>{console.log(error)})}
    
    handleBed = (e) => {
        //console.log("done")
        axios.get('http://localhost:4000/helperuser/bed-request').then(res => {
        this.setState({Org: res.data})}).catch((error)=>{console.log(error)})

        axios.get('http://localhost:4000/request/bed-request').then(res => {
        this.setState({helpRequest: res.data, flag:1})}).catch((error)=>{console.log(error)})}
    
    handleOther = (e) => {
        //console.log("done")
        axios.get('http://localhost:4000/helperuser/other-request').then(res => {
        this.setState({Org: res.data})}).catch((error)=>{console.log(error)})

        axios.get('http://localhost:4000/request/other-request').then(res => {
        this.setState({helpRequest: res.data, flag:1})}).catch((error)=>{console.log(error)})}
    
    onClickName = async(e) => {
        console.log(e.target.value)
        await this.setState({vic_mobile:e.target.value})
        this.props.history.push({
            pathname: `/helper/history/${e.target.value}`,
            search: '',
            state: {Mobile:this.state.Mobile, vic_mobile:this.state.vic_mobile} 
          })
    }

    render() {
        // console.log(this.state.place.length)
        const org_markers = [], victim_markers = [];
        for (let i=0; i<this.state.place_org.length; i++){
            org_markers.push(
                <Marker draggable={false}
                        position={{lat: parseFloat(this.state.place_org[i].lat), 
                                    lng: parseFloat(this.state.place_org[i].lng)}}
                        onClick={this.handleMarkerClick}
                        icon={'http://maps.google.com/mapfiles/ms/icons/orange-dot.png'}
                >
                    {this.state.show_info === true && (
                    <InfoWindow>
                    <p><button style={{background:"#ffffff", border:"0"}} value={this.state.place_org[i].mobile}>{this.state.place_org[i].name}</button> 
                    <br/> 
                    {this.state.place_org[i].mobile}
                    <br/>
                    ความช่วยเหลือ : {this.state.place_org[i].helptype_text}
                    </p>
                    </InfoWindow>
                    )}
                </Marker>
            )
        }

        for (let i=0; i<this.state.place_victim.length; i++){
            victim_markers.push(
                <Marker draggable={false}
                        position={{lat: parseFloat(this.state.place_victim[i].lat), 
                                    lng: parseFloat(this.state.place_victim[i].lng)}}
                        onClick={this.handleMarkerClick}
                        icon={'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}
                >
                    {this.state.show_info === true && (
                    <InfoWindow>
                    <p><button style={{background:"#ffffff", border:"0"}} onClick={this.onClickName} value={this.state.place_victim[i].mobile}>{this.state.place_victim[i].name}</button> 
                    <br/> 
                    {this.state.place_victim[i].mobile}
                    </p>
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
              {org_markers}
              {victim_markers}
            </GoogleMap>
          ));

    return (
        <div>
            <Header_admin Mobile={this.state.Mobile}/>
            <div class="container-lg" style={{width:"100%"}}>
            <div style={{margin:"4rem 0 0 15%", display:"flex"}}>
            <h2 style={{fontFamily:"Kanit", color:"#90D1CB", textAlign:"left", fontSize:"1.5vw", 
                        fontWeight:"bold"}}>เขตที่ต้องการจะค้นหา</h2>
            <AutoComplete class="rounded-pill"
            style = {{ width:"50%", height:"2vw", marginLeft:"5%", fontSize:"1.5vw",
                    border:"2px solid #B4B6BB", fontFamily:"Kanit"}}
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

            <div style={{display:"flex"}}>
            <div style={{fontFamily:"Kanit", color:"#90D1CB", textAlign:"left", margin:"5% 0 0 0", position:"fixed", width:"20%"}}>
            <h4 style={{fontSize:"2vw", color:"#90D1CB", textAlign:"left"}}>Filter</h4>
            <div className="filter-form-check">
            <input
                class="admin-check-input"
                type="radio"
                name="helpfil"
                value="ทั้งหมด"
                onChange={this.handleAll}
                defaultChecked
            />
            <label class="filter-check-label" for="flexCheckChecked" 
                    style={{fontFamily:"Kanit", fontSize:"1.5vw", margin:"0 0 2% 10%"}}>
                ทั้งหมด
            </label>
            </div>
            <div className="filter-form-check">
            <input
                className="admin-check-input"
                type="radio"
                name="helpfil"
                value="อาหาร"
                onChange={this.handleFood}
            />
            <label class="filter-check-label" for="flexCheckChecked" 
                    style={{fontFamily:"Kanit", fontSize:"1.5vw", margin:"0 0 2% 10%"}}>
                อาหาร
            </label>
            </div>
            <div className="filter-form-check">
            <input
                class="admin-check-input"
                type="radio"
                name="helpfil"
                value="ยา"
                onChange={this.handleMedicine}
            />
            <label class="filter-check-label" for="flexCheckChecked" 
                    style={{fontFamily:"Kanit", fontSize:"1.5vw", margin:"0 0 2% 10%"}}>
                ยา
            </label>
            </div>
            <div className="filter-form-check">
            <input
                class="admin-check-input"
                type="radio"
                name="helpfil"
                value="นำส่งโรงพยาบาล"
                onChange={this.handleHospital}
            />
            <label class="filter-check-label" for="flexCheckDefault" 
                    style={{fontFamily:"Kanit", fontSize:"1.5vw", margin:"0 0 2% 10%"}}>
                นำส่งโรงพยาบาล
            </label>
            </div>
            <div className="filter-form-check">
            <input
                class="admin-check-input"
                type="radio"
                name="helpfil"
                value="นำส่งภูมิลำเนา"
                onChange={this.handleHome}
            />
            <label class="filter-check-label" for="flexCheckDefault" 
                    style={{fontFamily:"Kanit", fontSize:"1.5vw", margin:"0 0 2% 10%"}}>
                นำส่งภูมิลำเนา
            </label>
            </div>
            <div className="filter-form-check">
            <input
                class="admin-check-input"
                type="radio"
                name="helpfil"
                value="หาเตียง"
                onChange={this.handleBed}
            />
            <label class="filter-check-label" for="flexCheckDefault" 
                    style={{fontFamily:"Kanit", fontSize:"1.5vw", margin:"0 0 2% 10%"}}>
                หาเตียง
            </label>
            </div>
            <div className="filter-form-check">
            <input
                class="admin-check-input"
                type="radio"
                name="helpfil"
                value="อื่นๆ"
                onChange={this.handleOther}
            />
            <label class="filter-check-label" for="flexCheckDefault" 
                    style={{fontFamily:"Kanit", fontSize:"1.5vw", margin:"0 0 2% 10%"}}>
                อื่นๆ
            </label>
            </div>
            </div>
            
            <MapWithAMarker
                // New
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA-fNGUBxtHqdiDpx9zfylTwXtZkkfGN_M&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `35rem`, width:"80%", margin:"5% 0 0 20%"}} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
            </div>

            </div>
        </div>
    )
}
}
