import React, { Component } from 'react'
import axios from 'axios';
import Header from './header';

import { InfoWindow, withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import Geocode from 'react-geocode';
import AutoComplete from "react-google-autocomplete";

Geocode.setApiKey("AIzaSyBtuF_qV8V68Bf_YrT3UA9lXcAff5yQeyU")

export default class HelperEditProfile extends Component {
    constructor(props){
        super(props)
    
        this.state ={
            Mobile:this.props.location.state.Mobile,
            user:"",
            helptype:"",

            Firstname: "",
            Lastname: "",
            Org_Name: "",
            isOrg: false,
            // Mobile:"",
            // Password:"",

            Food:false,
            Medicine:false,
            Bed:false,
            Hospital:false,
            Home:false,
            Other:"",
            
            Lat:"",
            Lng:"",
            House_No:"",
            Soi:"",
            Road:"",
            Subdistrict:"",
            District:"",
            ZIP_Code:"",
            Province:"",

            SubdistrictList:[],
            District_Code:"",

            address:"",
            city:"",
            area:"",
            state:"",
            zoom:10,
            height:400,
            mapPosition:{lat:0,lng:0},
            markerPosition:{lat:0,lng:0},

            show_district:false,
            show_subdistrict:false            
        }
    }

    async componentDidMount(){
        const mobile = String(this.state.Mobile)
        await axios.get(`http://localhost:4000/helperuser/helper-profile/${mobile}`).then(res => {
            this.setState({
            user: res.data
          })
        }).catch((error)=>{
          console.log(error)
        })
        console.log(this.state.user)
        this.setState({Firstname:this.state.user.Firstname,
                        Lastname:this.state.user.Lastname,
                        Org_Name:this.state.user.Org_Name,
                        isOrg:this.state.user.isOrg,
                        // isOrg:true,

                        Lat:this.state.user.Lat,
                        Lng:this.state.user.Lng,
                        House_No:this.state.user.House_No,
                        Soi:this.state.user.Soi,
                        Road:this.state.user.Road,
                        // Subdistrict:this.state.user.Subdistrict,
                        // District:this.state.user.District,
                        // ZIP_Code:this.state.user.ZIP_Code,
                        Subdistrict:"",
                        District:"",
                        ZIP_Code:"",
                        Province:this.state.user.Province,
            })
            console.log(this.state.isOrg)
            if(this.state.isOrg===true){
                // console.log('aa')
                await axios.get(`http://localhost:4000/helperuser/helper-helptype/${mobile}`).then(res => {
                    this.setState({
                    helptype: res.data
                    })
                }).catch((error)=>{
                console.log(error)
                })
                console.log(this.state.helptype)
                this.setState({Food:this.state.helptype.Food,
                                Medicine:this.state.helptype.Medicine,
                                Bed:this.state.helptype.Bed,
                                Hospital:this.state.helptype.Hospital,
                                Home:this.state.helptype.Home,
                                Other:this.state.helptype.Other,
                    })
            }
            // console.log(this.state.Food)
        
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

    onChangeFirstname = (e) => {this.setState({Firstname:e.target.value})}
    onChangeLastname = (e) => {this.setState({Lastname:e.target.value})}

    onChangeOrg_Name = (e) => {this.setState({Org_Name:e.target.value})}
    handleFood = async(e) => {await this.setState({Food: !this.state.Food});console.log(this.state.Food)}
    handleMedicine = async(e) => {await this.setState({Medicine: !this.state.Medicine})}
    handleBed = async(e) => {await this.setState({Bed: !this.state.Bed})}
    handleHospital = async(e) => {await this.setState({Hospital: !this.state.Hospital})}
    handleHome = async(e) => {await this.setState({Home: !this.state.Home})}
    handleOther = (e) => {this.setState({Other: e.target.value})}

    onChangeHouse_No = (e) => {this.setState({House_No:e.target.value})}
    onChangeSoi = (e) => {this.setState({Soi:e.target.value})}
    onChangeRoad = (e) => {this.setState({Road:e.target.value})}
    onChangeDistrict = async (e) => {
        await this.setState({District:e.target.value})
        var district = this.state.District
        if(district===""){
            this.setState({ZIP_Code:"",District_Code:"",Subdistrict:""})
        }else{
            await axios.get(`http://localhost:4000/district/${district}`).then(res => {
            this.setState({
                District_Code:res.data.District_Code,
                ZIP_Code:res.data.ZIP_Code
             })
            })
            var code = this.state.District_Code
            await axios.get(`http://localhost:4000/subdistrict/${code}`).then(res => {
            this.setState({
                SubdistrictList:res.data
            })
        })
        }
    }
    onChangeSubdistrict = (e) =>{this.setState({Subdistrict:e.target.value})}

    onSubmit=(e)=>{
        e.preventDefault()

        console.log(`district : ${this.state.District}`)
        console.log(`Subdistrict : ${this.state.Subdistrict}`)

        if(this.state.District===""){
            this.setState({show_district:true, show_subdistrict:false})
        }

        else if(this.state.Subdistrict===""){
            this.setState({show_subdistrict:true, show_district:false})
        }

        else{
            const updateObject = {Firstname:this.state.Firstname,
                                Lastname:this.state.Lastname,
                                Org_Name:this.state.Org_Name,
                                isOrg:this.state.isOrg,
                                Mobile:this.state.Mobile,

                                Province:this.state.Province,
                                House_No:this.state.House_No,
                                Soi:this.state.Soi,
                                Road:this.state.Road,
                                District:this.state.District,
                                Subdistrict:this.state.Subdistrict,
                                ZIP_Code:this.state.ZIP_Code,

                                Lat:this.state.mapPosition.lat,
                                Lng:this.state.mapPosition.lng
            }

            axios.put(`http://localhost:4000/helperuser/update-profile`, updateObject).then(res => {
            console.log(res.data);
            // Redirect to sign in page
            const text=res.data.message;
            if(text==="update user success!!"){
                // this.props.history.push({
                //     pathname: '/helper',
                //     search: '',
                //     state: {Mobile:this.state.Mobile} 
                //   }) 
                alert(text)}
            }).catch((error)=>{
            console.log(error)
            });

            if(this.state.isOrg === true){
                const helptypeObject = {
                    Mobile:this.state.Mobile,
                    Food:this.state.Food,
                    Medicine:this.state.Medicine,
                    Bed:this.state.Bed,
                    Hospital:this.state.Hospital,
                    Home:this.state.Home,
                    Other:this.state.Other,
                }

                axios.put('http://localhost:4000/helperuser/update-helptype', helptypeObject).then(res =>
                    console.log(res.data));
                    this.props.history.push({
                        pathname: '/helper',
                        search: '',
                        state: {Mobile:this.state.Mobile} 
                    }) 
            }
            else{this.props.history.push({
                pathname: '/helper',
                search: '',
                state: {Mobile:this.state.Mobile} 
            }) }
            // this.props.history.push('/')
        }
    }

    render() {
        var subObject = this.state.SubdistrictList
        var sub_name = [""]
        for (var i = 0;i< subObject.length;i++){
            sub_name.push(subObject[i].Subdistrict_Name)
        }

        const scroll =[];
        for (let i = 0; i < sub_name.length; i++) {
            scroll.push(<option>{sub_name[i]}</option>)
        }

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

            {/* <AutoComplete 
                style = {{ width:"50%", height:"40px", paddingLeft:"16px", marginTop:"40px", marginBottom:"2rem"}}
                onPlaceSelected={this.onPlaceSelected}
                // types={['(regions)']}
                options={{
                    // types: ["(regions)"],
                    types: ["(regions)"],
                    componentRestrictions: { country: "th" },
                  }} 
                // defaultValue={this.props.location.state.Subdistrict}
            /> */}

            </GoogleMap>
        ));

        return (
            <div>
                <Header Mobile={this.state.Mobile}/>
                <div style={{marginTop:"100px",color:"#FFB172"}}><h1>Edit Profile</h1></div>

                <form style={{marginLeft:"300px", display:"block", fontSize:"18px", marginRight:"300px"}}>
                    <div style={{marginTop:"40px", display:"flex"}}>
                        <label style={{marginRight:"10px", color:"#707070"}}>Firstname</label>
                        <input style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"300px", 
                        marginRight:"30px", fontFamily:"Kanit"}} 
                        type="text" 
                        placeholder="   Firstname" 
                        value={this.state.Firstname}
                        onChange={this.onChangeFirstname}/>

                        <label style={{marginRight:"10px", color:"#707070"}}>Lastname</label>
                        <input style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"300px", 
                        marginRight:"30px", fontFamily:"Kanit"}} type="text"
                        placeholder="   Lastname"
                        value={this.state.Lastname} 
                        onChange={this.onChangeLastname}/>
                    </div>

                    <div style={{marginTop:"40px", display:(this.state.isOrg? 'flex':'none')}}>
                        <label style={{marginRight:"10px", color:"#707070"}}>Organization Name</label>
                        <input type="text" placeholder="   Organization Name" style={{marginRight:"20px", 
                        borderRadius:"20px", border:"2px solid #B4B6BB", width:"650px", fontFamily:"Kanit"}}
                        value={this.state.Org_Name}
                        onChange={this.onChangeOrg_Name}></input>
                    </div>

                    <div className="signupform" style={{marginLeft:"-50px",marginTop:"20px", 
                    display:(this.state.isOrg? 'inline-block':'none')}}>
                        <label style={{marginRight:"10px", color:"#707070"}}>Help : </label>

                        <input type="checkbox" style={{marginRight:"10px"}} 
                        checked={this.state.Food}
                        onChange={this.handleFood}></input>
                        <label style={{marginRight:"10px", color:"#707070"}}>Food</label>

                        <input type="checkbox" style={{marginRight:"10px"}}
                        checked={this.state.Medicine}
                        onChange={this.handleMedicine}></input>
                        <label style={{marginRight:"10px", color:"#707070"}}>Medicine</label>

                        <input type="checkbox" style={{marginRight:"10px"}}
                        checked={this.state.Bed}
                        onChange={this.handleBed}></input>
                        <label style={{marginRight:"10px", color:"#707070"}}>Bed</label>

                        <input type="checkbox" style={{marginRight:"10px"}}
                        checked={this.state.Hospital}
                        onChange={this.handleHospital}></input>
                        <label style={{marginRight:"10px", color:"#707070"}}>Hospital</label>

                        <input type="checkbox" style={{marginRight:"10px"}}
                        checked={this.state.Home}
                        onChange={this.handleHome}></input>
                        <label style={{marginRight:"10px", color:"#707070"}}>Home</label>

                        <label style={{marginLeft:"30px", marginRight:"10px", color:"#707070"}}>Other</label>
                        <input type="text" placeholder="   ระบุ" style={{marginRight:"10px", 
                        borderRadius:"20px", border:"2px solid #B4B6BB", fontFamily:"Kanit"}}
                        value={this.state.Other}
                        onChange={this.handleOther}></input>
                    </div>

                    <div  style={{marginTop:"20px", display:"flex"}}>
                        <label style={{marginRight:"10px", color:"#707070"}}>Province</label>
                        <input value="กรุงเทพมหานคร" 
                        style={{fontFamily:"Kanit", textAlign:"center", marginRight:"20px", 
                        borderRadius:"20px", border:"2px solid #B4B6BB", width:"730px"}}/>
                    </div>
                <div style={{marginTop:"20px", display:"flex", marginBottom:"20px"}}>
                    <label style={{marginRight:"10px", color:"#707070"}}>House No.</label>
                    <input style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"120px", 
                    marginRight:"30px"}} 
                    value={this.state.House_No}
                    type="text"
                    onChange={this.onChangeHouse_No}/>
                    <label style={{marginRight:"10px", color:"#707070"}}>Soi</label>
                    <input style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"195px", 
                    marginRight:"30px", fontFamily:"Kanit"}} 
                    value={this.state.Soi}
                    type="text"
                    onChange={this.onChangeSoi}/>
                    <label style={{marginRight:"10px", color:"#707070"}}>Road</label>
                    <input style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"195px", 
                    marginRight:"30px", fontFamily:"Kanit"}} 
                    type="text"
                    value={this.state.Road}
                    onChange={this.onChangeRoad}/>                    
                    </div>
                    <label style={{color:"red", display:(this.state.show_district? 'block':'none')}}>Please Select District </label>
                    <label style={{color:"red", display:(this.state.show_subdistrict? 'block':'none')}}>Please Select Subdistrict </label>
                    <div style={{marginTop:"30px", display:"flex", marginBottom:"20px"}}>
                    <label style={{marginRight:"10px", color:"#707070"}}>District</label>
                    <select style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"150px", marginRight:"30px",fontFamily:"Kanit",fontSize:"18px"}} 
                    class="form-control form-control-sm"
                    // value={this.state.District}
                    onChange={this.onChangeDistrict}>
                    <option style={{fontFamily:"Kanit"}}></option>
                    <option style={{fontFamily:"Kanit"}}>พระนคร</option>
                    <option style={{fontFamily:"Kanit"}}>ดุสิต</option>
                    <option style={{fontFamily:"Kanit"}}>หนองจอก</option>
                    <option style={{fontFamily:"Kanit"}}>บางรัก</option>
                    <option style={{fontFamily:"Kanit"}}>บางเขน</option>
                    <option style={{fontFamily:"Kanit"}}>บางกะปิ</option>
                    <option style={{fontFamily:"Kanit"}}>ปทุมวัน</option>
                    <option style={{fontFamily:"Kanit"}}>ป้อมปราบศัตรูพ่าย</option>
                    <option style={{fontFamily:"Kanit"}}>พระโขนง</option>
                    <option style={{fontFamily:"Kanit"}}>มีนบุรี</option>
                    <option style={{fontFamily:"Kanit"}}>ลาดกระบัง</option>
                    <option style={{fontFamily:"Kanit"}}>ยานนาวา</option>
                    <option style={{fontFamily:"Kanit"}}>สัมพันธวงศ์</option>
                    <option style={{fontFamily:"Kanit"}}>พญาไท</option>
                    <option style={{fontFamily:"Kanit"}}>ธนบุรี</option>
                    <option style={{fontFamily:"Kanit"}}>บางกอกใหญ่</option>
                    <option style={{fontFamily:"Kanit"}}>ห้วยขวาง</option>
                    <option style={{fontFamily:"Kanit"}}>คลองสาน</option>
                    <option style={{fontFamily:"Kanit"}}>ตลิ่งชัน</option>
                    <option style={{fontFamily:"Kanit"}}>บางกอกน้อย</option>
                    <option style={{fontFamily:"Kanit"}}>บางขุนเทียน</option>
                    <option style={{fontFamily:"Kanit"}}>ภาษีเจริญ</option>
                    <option style={{fontFamily:"Kanit"}}>หนองแขม</option>
                    <option style={{fontFamily:"Kanit"}}>ราษฎร์บูรณะ</option>
                    <option style={{fontFamily:"Kanit"}}>บางพลัด</option>
                    <option style={{fontFamily:"Kanit"}}>ดินแดง</option>
                    <option style={{fontFamily:"Kanit"}}>บึงกุ่ม</option>
                    <option style={{fontFamily:"Kanit"}}>สาทร</option>
                    <option style={{fontFamily:"Kanit"}}>บางซื่อ</option>
                    <option style={{fontFamily:"Kanit"}}>จตุจักร</option>
                    <option style={{fontFamily:"Kanit"}}>บางคอแหลม</option>
                    <option style={{fontFamily:"Kanit"}}>ประเวศ</option>
                    <option style={{fontFamily:"Kanit"}}>คลองเตย</option>
                    <option style={{fontFamily:"Kanit"}}>สวนหลวง</option>
                    <option style={{fontFamily:"Kanit"}}>จอมทอง</option>
                    <option style={{fontFamily:"Kanit"}}>ดอนเมือง</option>
                    <option style={{fontFamily:"Kanit"}}>ราชเทวี</option>
                    <option style={{fontFamily:"Kanit"}}>ลาดพร้าว</option>
                    <option style={{fontFamily:"Kanit"}}>วัฒนา</option>
                    <option style={{fontFamily:"Kanit"}}>บางแค</option>
                    <option style={{fontFamily:"Kanit"}}>หลักสี่</option>
                    <option style={{fontFamily:"Kanit"}}>สายไหม</option>
                    <option style={{fontFamily:"Kanit"}}>คันนายาว</option>
                    <option style={{fontFamily:"Kanit"}}>สะพานสูง</option>
                    <option style={{fontFamily:"Kanit"}}>วังทองหลาง</option>
                    <option style={{fontFamily:"Kanit"}}>คลองสามวา</option>
                    <option style={{fontFamily:"Kanit"}}>บางนา</option>
                    <option style={{fontFamily:"Kanit"}}>ทวีวัฒนา</option>
                    <option style={{fontFamily:"Kanit"}}>ทุ่งครุ</option>
                    <option style={{fontFamily:"Kanit"}}>บางบอน</option>
                    </select>

                    <label style={{marginRight:"10px", color:"#707070"}}>Subdistrict</label>
                    <select style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"150px", marginRight:"30px",fontFamily:"Kanit",fontSize:"18px"}} 
                    class="form-control form-control-sm"
                    onChange={this.onChangeSubdistrict}>
                    {scroll}
                    </select>

                    <label style={{marginRight:"10px", color:"#707070"}}>ZIP Code</label>
                    <input style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"120px", 
                    marginRight:"30px", fontFamily:"Kanit", textAlign:"center"}} 
                    type="text" value={this.state.ZIP_Code}/>
                    </div>

                    {/* Map here */}
                    <AutoComplete 
                    style = {{ width:"100%", height:"40px", paddingLeft:"16px", marginTop:"40px", 
                            marginBottom:"2rem"}}
                    onPlaceSelected={this.onPlaceSelected}
                    placeholder="   Search Here"
                    // types={['(regions)']}
                    options={{
                        // types: ["(regions)"],
                        types: ["address"],
                        componentRestrictions: { country: "th" },
                    }} 
                    // defaultValue={this.props.location.state.Subdistrict}
                    />

                    <MapWithAMarker
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBtuF_qV8V68Bf_YrT3UA9lXcAff5yQeyU&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    />

                    <div>
                    <button style={{backgroundColor:"#FFB172", width:"840px", marginBottom:"100px"}} 
                    className="signupbutton" 
                    type="submit"
                    onClick={this.onSubmit}>SAVE</button>
                    </div>
                </form>
            </div>
        )
    }
}
