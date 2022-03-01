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
            Helpdetai:[],
            user:"",
            // flag:0,
            place:[],
            name:"",
            mobile:"",

            address:"",
            city:"",
            area:"",
            state:"",
            zoom:10,
            height:400,
            mapPosition:{lat:0,lng:0},
            markerPosition:{lat:0,lng:0},

            vic_mobile:"",

            activeMarker:"",
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
            // flag: 1
        })
        }).catch((error)=>{
        console.log(error)
        })
        console.log(this.state.helpRequest)
    }

    async componentDidUpdate(prevProps,prevState){
        if(this.state.helpRequest!==prevState.helpRequest){
            let address_list = [], mobile_list = [], mobile = "", id=0
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
            if(mobile_list.indexOf(mobile_pool)<0){
                mobile_list.push(mobile_pool)

                var tmp ={
                id:id,
                name:this.state.user.Firstname + " " + this.state.user.Lastname,
                lat:this.state.user.Lat,
                lng:this.state.user.Lng,
                mobile:this.state.user.Mobile
                }
                address_list.push(tmp);
                id+=1
            }
            // console.log(mobile_list)
            // console.log(mobile_list.length)
        }
        // console.log(address_list)
        this.setState({place:address_list, flag:0})
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

    handleActiveMarker = (marker) => {
        if (marker === this.state.activeMarker) {
            return;
          }
          this.setState({activeMarker:marker});
    }

    // handle radio box filter
    handleAll = (e) =>{
        axios.get('http://localhost:4000/request/all-request').then(res => {
        this.setState({helpRequest: res.data, flag:1})}).catch((error)=>{console.log(error)})}
    
    handleFood = async(e) => {
        await axios.get('http://localhost:4000/request/food-request').then(res => {
        this.setState({Helpdetail: res.data})}).catch((error)=>{console.log(error)})

        let request_list=[];
        for(var i=0;i<this.state.Helpdetail.length;i++){
        let id = this.state.Helpdetail[i].RequestID
        await axios.get(`http://localhost:4000/request/request-detail/${id}`).then(res => {
        request_list.push(res.data)}).catch((error)=>{console.log(error)})
        }
        console.log(request_list)
        await this.setState({helpRequest:request_list})
    }

    handleMedicine = async(e) => {
        await axios.get('http://localhost:4000/request/medicine-request').then(res => {
        this.setState({Helpdetail: res.data})}).catch((error)=>{console.log(error)})
      
        let request_list=[];
        for(var i=0;i<this.state.Helpdetail.length;i++){
          let id = this.state.Helpdetail[i].RequestID
          await axios.get(`http://localhost:4000/request/request-detail/${id}`).then(res => {
           request_list.push(res.data)}).catch((error)=>{console.log(error)})
        }
        await this.setState({helpRequest:request_list})
      }
        
      handleHospital = async(e) => {
        await axios.get('http://localhost:4000/request/hospital-request').then(res => {
        this.setState({Helpdetail: res.data})}).catch((error)=>{console.log(error)})
      
        let request_list=[];
        for(var i=0;i<this.state.Helpdetail.length;i++){
          let id = this.state.Helpdetail[i].RequestID
          await axios.get(`http://localhost:4000/request/request-detail/${id}`).then(res => {
           request_list.push(res.data)}).catch((error)=>{console.log(error)})
        }
        await this.setState({helpRequest:request_list})
      }
      
      handleHome = async(e) => {
        await axios.get('http://localhost:4000/request/home-request').then(res => {
        this.setState({Helpdetail: res.data})}).catch((error)=>{console.log(error)})
      
        let request_list=[];
        for(var i=0;i<this.state.Helpdetail.length;i++){
          let id = this.state.Helpdetail[i].RequestID
          await axios.get(`http://localhost:4000/request/request-detail/${id}`).then(res => {
           request_list.push(res.data)}).catch((error)=>{console.log(error)})
        }
        await this.setState({helpRequest:request_list})
      }
      
      handleBed = async(e) => {
        await axios.get('http://localhost:4000/request/bed-request').then(res => {
        this.setState({Helpdetail: res.data})}).catch((error)=>{console.log(error)})
        
        let request_list=[];
        for(var i=0;i<this.state.Helpdetail.length;i++){
          let id = this.state.Helpdetail[i].RequestID
          await axios.get(`http://localhost:4000/request/request-detail/${id}`).then(res => {
           request_list.push(res.data)}).catch((error)=>{console.log(error)})
        }
        await this.setState({helpRequest:request_list})
      }
      
      handleOther = async(e) => {
        await axios.get('http://localhost:4000/request/other-request').then(res => {
        this.setState({Helpdetail: res.data})}).catch((error)=>{console.log(error)})
      
        let request_list=[];
        for(var i=0;i<this.state.Helpdetail.length;i++){
          let id = this.state.Helpdetail[i].RequestID
          await axios.get(`http://localhost:4000/request/request-detail/${id}`).then(res => {
           request_list.push(res.data)}).catch((error)=>{console.log(error)})
        }
        await this.setState({helpRequest:request_list})
      }
      
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
        const markers = [];
        for (let i=0; i<this.state.place.length; i++){
            markers.push(
                {
                    id:i+1,
                    name:this.state.place[i].name,
                    mobile:this.state.place[i].mobile,
                    // value:this.state.place[i].mobile,
                    position:{lat:parseFloat(this.state.place[i].lat),lng: parseFloat(this.state.place[i].lng)}
                }
            )
        }

        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
              defaultZoom={18}
              onClick={() => this.setState({activeMarker:""})}
              defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
            >
            {markers.map(({ id, name, mobile, position }) => (
            <Marker
            key={id}
            position={position}
            onClick={() => this.handleActiveMarker(id)}
            >
            {this.state.activeMarker === id ? (
                <InfoWindow onCloseClick={() => this.setState({activeMarker:""})}>
                <div>
                <p><button style={{background:"#ffffff", border:"0"}} onClick={this.onClickName} value={mobile}>
                    ชื่อ : {name}</button></p>
                <p>ช่องทางติดต่อ : {mobile}</p>
                </div>
                </InfoWindow>
            ) : null}
            </Marker>
            ))}
            </GoogleMap>
          ));

    return (
        <div>
            <Header Mobile={this.state.Mobile}/>
            <div class="container-lg" style={{width:"100%"}}>
            <div style={{margin:"4rem 0 0 15%", display:"flex"}}>
            <h2 style={{fontFamily:"Kanit", color:"#FFB172", textAlign:"left", fontSize:"1.5vw", 
                        fontWeight:"bold"}}>ค้นหาผู้ขอความช่วยเหลือด้วยเขต</h2>
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
            <div style={{fontFamily:"Kanit", color:"#FFB172", textAlign:"left", margin:"5% 0 0 0", position:"fixed", width:"20%"}}>
            <h4 style={{fontSize:"2vw", color:"#FFB172", textAlign:"left"}}>Filter</h4>
            <div className="filter-form-check">
            <input
                class="filter-check-input"
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
                class="filter-check-input"
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
                class="filter-check-input"
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
                class="filter-check-input"
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
                class="filter-check-input"
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
                class="filter-check-input"
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
                class="filter-check-input"
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
                // Old
                // googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBtuF_qV8V68Bf_YrT3UA9lXcAff5yQeyU&v=3.exp&libraries=geometry,drawing,places"
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
