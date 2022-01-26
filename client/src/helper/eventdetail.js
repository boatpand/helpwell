/*global google*/
import React, { Component } from 'react'
import axios from 'axios';
import Header from './header';
import { withRouter } from "react-router-dom";
import { InfoWindow, withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer} from 'react-google-maps';
import Geocode from 'react-geocode';

// Old API KEY
// Geocode.setApiKey("AIzaSyBtuF_qV8V68Bf_YrT3UA9lXcAff5yQeyU")

// New API KEY
Geocode.setApiKey("AIzaSyA-fNGUBxtHqdiDpx9zfylTwXtZkkfGN_M")

class EventDetail extends Component {
    constructor(props){
        super(props);

        this.state = {
            Mobile:"",
            Food:false,
            count_Food:0,
            Medicine:false,
            count_Medicine:0,
            Hospital:false,
            count_Hospital:0,
            Home:false,
            count_Home:0,
            Bed:false,
            count_Bed:0,
            Other:"",
            count_Other:0,
            Option:'',
            Status:'',
            Status_Text:'',
            date:'',
        
            show_soi:true,
            show_road:true,
            count:0,

            RequestID:"",
            Helper_Mobile:this.props.location.state.Mobile,

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

            route:"",
            distance:"",
            time:"",

            user:"",
            Firstname: "",
            Lastname: "",
            Org_Name: "",
            isOrg: false,
        }
    }

    async componentDidMount(){
      // check cancel button
      console.log(this.state.Cancel)

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
        console.log(this.props.match.params.id)
        let id = this.props.match.params.id 
        await axios.get(`http://localhost:4000/request/request-detail/${id}`).then(res=>{
            this.setState({
                Mobile:res.data.Mobile,
                Food:res.data.Food,
                count_Food:res.data.count_Food,
                Medicine:res.data.Medicine,
                count_Medicine:res.data.count_Medicine,
                Hospital:res.data.Hospital,
                count_Hospital:res.data.count_Hospital,
                Home:res.data.Home,
                count_Home:res.data.count_Home,
                Bed:res.data.Bed,
                count_Bed:res.data.count_Bed,
                Other:res.data.Other,
                count_Other:res.data.count_Other,
                Option:res.data.Option,
                Status:res.data.Status,
                Status_Text:res.data.Status_Text,
                date:res.data.date,

                RequestID:id,
                requestID_state:[]
            })
        });

        let mobile = this.state.Mobile
        await axios.get(`http://localhost:4000/victimuser/victim-profile/${mobile}`).then(res => {
            this.setState({
            user: res.data
          })
        }).catch((error)=>{
          console.log(error)
        })
        console.log(this.state.user)
        this.setState({House_No:this.state.user.House_No,
            Soi:this.state.user.Soi,
            Road:this.state.user.Road,
            Subdistrict:this.state.user.Subdistrict,
            District:this.state.user.District,
            ZIP_Code:this.state.user.ZIP_Code,
            Province:this.state.user.Province,

            victimLocation:{lat:parseFloat(this.state.user.Lat), lng:parseFloat(this.state.user.Lng)}
        })
        if(this.state.Soi==""){this.setState({show_soi:false})}
        if(this.state.Road==""){this.setState({show_road:false})}
        console.log(this.state.victimLocation)
        console.log(this.state.currentLocation)

        mobile = String(this.state.Helper_Mobile)
        await axios.get(`http://localhost:4000/accept/status/${mobile}`).then(res => {
            this.setState({
            request: res.data
          })
        }).catch((error)=>{
          console.log(error)
        })
        console.log(this.state.request)

        var requestID_list = []
        for(var x=0; x<this.state.request.length; x++){
          requestID_list.push(this.state.request[x].RequestID)
        }
        console.log(requestID_list)
        this.setState({requestID_state:requestID_list})
        console.log(this.state.requestID_state)
    }

    componentDidUpdate(prevProps,prevState){
      if(this.state.Status!==prevState.Status){
        var t = "";
            // var count = 0;
            if (this.state.Food === true) {
              t= t+"อาหาร"+" ";
            //   count++;
            }
            if (this.state.Medicine === true) {
              t= t+"ยา"+" ";
              // count++;
            }
            if (this.state.Hospital === true) {
              t= t+"นำส่งโรงพยาบาล"+" ";
              // count++;
            }
            if (this.state.Home === true) {
              t= t+"นำส่งภูมิลำเนา"+" ";
              // count++;
            }
            if (this.state.Bed === true) {
              t= t+"หาเตียง"+" ";
              // count++;
            }
            if (this.state.Other !== "") {
                t= t+this.state.Other;
              // count++;
            }
            t=t+" "
            this.setState({help:t})
      }
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
                // await console.log(`distance: ${this.state.directions.routes[0].legs[0].distance.text}`)
                // await console.log(`time: ${this.state.directions.routes[0].legs[0].duration.text}`)
                // await console.log(`route: ${this.state.directions.routes[0].summary}`)
                await console.log(this.state.route)
                await console.log(this.state.distance)
                await console.log(this.state.time)
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

    onSubmit = async(e) =>{
        e.preventDefault();

        var RequestID_Check = String(this.state.RequestID)
        var RequestID_Checklist = this.state.requestID_state

        let mobile = this.state.Helper_Mobile
        await axios.get(`http://localhost:4000/helperuser/helper-profile/${mobile}`).then(res => {
            this.setState({
            user: res.data
          })
        }).catch((error)=>{
          console.log(error)
        })
        this.setState({Firstname:this.state.user.Firstname,
                      Lastname:this.state.user.Lastname,
                      Org_Name:this.state.user.Org_Name,
                      isOrg:this.state.user.isOrg,
                    })

        if(RequestID_Checklist.includes(RequestID_Check)){
          alert('คุณให้ความช่วยเหลือรายการนี้อยู่แล้ว')
        }

        else{
          const acceptObject = {
          Firstname:this.state.user.Firstname,
          Lastname:this.state.user.Lastname,
          Org_Name:this.state.user.Org_Name,
          isOrg:this.state.user.isOrg,
          RequestID:this.state.RequestID,
          Helper_Mobile:this.state.Helper_Mobile,
          Status:'กำลังช่วยเหลือ'
        }

        await axios.post('http://localhost:4000/accept/accept', acceptObject).then(res =>
        console.log(res.data));

        const eventObject = {
          Mobile:this.state.Mobile,
          Food:this.state.Food,
          count_Food:this.state.count_Food,
          Medicine:this.state.Medicine,
          count_Medicine:this.state.count_Medicine,
          Hospital:this.state.Hospital,
          count_Hospital:this.state.count_Hospital,
          Home:this.state.Home,
          count_Home:this.state.count_Home,
          Bed:this.state.Bed,
          count_Bed:this.state.count_Bed,
          Other:this.state.Other,
          count_Other:this.state.count_Other,
          Option:this.state.Option,
          Status:'กำลังช่วยเหลือ',
          Status_Text:this.state.Status_Text,
          date:this.state.date,
        }

        let RequestID = String(this.state.RequestID)
        axios.put(`http://localhost:4000/request/update-help/${RequestID}`,eventObject).then((res)=>{
            console.log('event status successfully updated')
            console.log(res.data);
        }).catch((error)=>{
            console.log(error)
        });

        // Redirect to helplist
        this.props.history.push({pathname:`/helper`,state:{Mobile:this.state.Helper_Mobile}})
        }
      }

    render() {
        var t = [];
        if (this.state.Food === true) {t.push("อาหาร");}
        if (this.state.Medicine === true) {t.push("ยา");}
        if (this.state.Hospital === true) {t.push("นำส่งโรงพยาบาล");}
        if (this.state.Home === true) {t.push("นำส่งภูมิลำเนา");}
        if (this.state.Bed === true) {t.push("หาเตียง")}
        if (this.state.Other !== "") {t.push(this.state.Other);}

        var n = [];
        if (this.state.count_Food !== 0) {n.push(this.state.count_Food);}
        if (this.state.count_Medicine !== 0) {n.push(this.state.count_Medicine);}
        if (this.state.count_Hospital !== 0) {n.push(this.state.count_Hospital);}
        if (this.state.count_Home !== 0) {n.push(this.state.count_Home);}
        if (this.state.count_Bed !== 0) {n.push(this.state.count_Bed);}
        if (this.state.count_Other !== 0) {n.push(this.state.count_Other);}
        // console.log(n)

        const inputs = [];
        for (let i = 0; i < t.length; i++) {
        inputs.push(
        <label style={{fontFamily:"Kanit", fontSize:"1.5vw"}}>ความต้องการ
        <input  style={{marginRight:"10%" ,marginLeft:"10%", width:"20%", textAlign:"center", fontFamily:"Kanit"}} 
                name={`input-${i}`} value ={t[i]}/>จำนวน
        <input  style={{marginLeft:"10%", width:"10%", textAlign:"center", fontFamily:"Kanit"}}
                name={`input-${i}`} value={n[i]}/></label>)}  
                
        const GoogleMapExample = withGoogleMap(props => (
          <GoogleMap
            defaultCenter={{ lat: this.state.currentLocation.lat, lng: this.state.currentLocation.lng }}
            defaultZoom={18}
            >
              <DirectionsRenderer
                directions={this.state.directions}
              />
          </GoogleMap>
        ));

  return (
  <div>
      <Header Mobile={this.state.Helper_Mobile}/>
      <div class="container-lg" style={{width:"100%"}}>
      <h1 style={{fontFamily:"Kanit", color:"#FFB172", textAlign:"left", margin:"5rem 0 0 2%"}}>รายละเอียดผู้ขอความช่วยเหลือ</h1>
      <form onSubmit={this.onSubmit}>
      
      <div style={{display:"flex", margin:"3% 0 0 3%"}}>
      <h1 style={{fontFamily:"Kanit", fontSize:"1.5vw"}}>ความช่วยเหลือ : </h1>
      <h1 style={{fontFamily:"Kanit", fontSize:"1.5vw",color:"#707070", marginLeft:"5%"}} >{this.state.help}</h1>
      <h1 style={{color:"#707070", marginLeft:"30%", fontFamily:"Kanit", fontSize:"1.5vw"}}>เวลาที่ขอความช่วยเหลือ : {this.state.date}</h1>
      </div>

      <div style={{display:"flex", margin:"3% 0 0 3%"}}>
      <h1 style={{fontFamily:"Kanit", fontSize:"1.5vw"}} >รายละเอียด :</h1>
      <h1 style={{fontFamily:"Kanit", fontSize:"1.5vw",color:"#707070", marginLeft:"5%"}} >{this.state.Option}</h1>
      </div>

      <div style={{display:"flex", margin:"3% 0 0 3%"}}>
      <h1 style={{fontFamily:"Kanit", fontSize:"1.5vw"}} >ความคืบหน้า :</h1>
      <h1 style={{fontFamily:"Kanit", fontSize:"1.5vw",color:"#707070", marginLeft:"5%"}} >{this.state.Status_Text}</h1>
      </div>

      <div style={{display:"flex", margin:"3% 0 0 3%"}}>
      <h1 style={{fontFamily:"Kanit", fontSize:"1.5vw"}} >ที่อยู่ : </h1>
      <h1 style={{fontFamily:"Kanit", fontSize:"1.5vw",color:"#707070", marginLeft:"5%"}} >{this.state.House_No}</h1>
      <h1 style={{fontFamily:"Kanit", fontSize:"1.5vw",color:"#707070", display:(this.state.show_soi? 'block':'none')}}> &nbsp; ซอย {this.state.Soi}</h1>  
      <h1 style={{fontFamily:"Kanit", fontSize:"1.5vw",color:"#707070", display:(this.state.show_road? 'block':'none')}}> &nbsp; ถนน {this.state.Road}</h1>
      <h1 style={{fontFamily:"Kanit", fontSize:"1.5vw",color:"#707070"}}> &nbsp; แขวง {this.state.Subdistrict}</h1>
      <h1 style={{fontFamily:"Kanit", fontSize:"1.5vw",color:"#707070"}}> &nbsp; เขต {this.state.District}</h1>
      <h1 style={{fontFamily:"Kanit", fontSize:"1.5vw",color:"#707070"}}> &nbsp; {this.state.ZIP_Code}</h1>
      <h1 style={{fontFamily:"Kanit", fontSize:"1.5vw",color:"#707070"}}> &nbsp; {this.state.Province}</h1>
      </div>

      <div style={{display:"flex", margin:"3% 0 0 3%"}}>
      <h1 style={{fontFamily:"Kanit", fontSize:"1.5vw"}} >ช่องทางติดต่อ :</h1>
      <h1 style={{fontFamily:"Kanit", fontSize:"1.5vw",color:"#707070", marginLeft:"5%"}} >{this.state.Mobile}</h1>
      </div>

      <div>
      <hr style={{marginBottom:"5%"}}/>
      {inputs}  
      </div>
      <div>

      <div style={{display:"flex", margin:"5% 0 0 10%"}}>
      <h1 style={{fontFamily:"kanit", fontSize:"1.5vw"}}>เส้นทางแนะนำ :</h1>
      <h1 style={{fontFamily:"kanit", fontSize:"1.5vw", color:"#707070"}}>&nbsp;{this.state.route}</h1>
      <h1 style={{fontFamily:"kanit", fontSize:"1.5vw", marginLeft:"2%"}}>ระยะทาง</h1>
      <h1 style={{fontFamily:"kanit", fontSize:"1.5vw", color:"#707070"}}>&nbsp;{this.state.distance}</h1>
      <h1 style={{fontFamily:"kanit", fontSize:"1.5vw", marginLeft:"2%"}}>ใช้เวลาประมาณ</h1>
      <h1 style={{fontFamily:"kanit", fontSize:"1.5vw", color:"#707070"}}>&nbsp;{this.state.time}</h1>
      </div>

      <GoogleMapExample
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA-fNGUBxtHqdiDpx9zfylTwXtZkkfGN_M&v=3.exp&libraries=geometry,drawing,places"
        containerElement={<div style={{ height: `25rem`, width: "80%", 
        display: "block", marginLeft: "auto", 
        marginRight: "auto", marginTop:"2%", marginBottom:"5%" }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
      <div class="col-12" style={{display:(this.state.Cancel? 'none':'block')}}>
          <button  class="rounded-pill" onClick={this.onSubmit}
                  style={{marginBottom:"5%", background:"#FFB172", color:"#ffffff",
                          border:"2px solid #B4B6BB", width:"100%", fontSize:"1.5vw"}}>Confirm</button>
      </div>

      {/* Cancel? */}
      {/* <div class="col-12" style={{display:(this.state.Cancel? 'block':'none')}}>
          <button  class="rounded-pill" onClick={this.onCancel}
                  style={{marginTop:"5%", marginBottom:"5%", background:"red", color:"#ffffff",
                          border:"2px solid #B4B6BB", width:"100%", fontSize:"1.5vw"}}>Cancel</button>
      </div> */}
      </form>
      </div>
  </div>
)
}
}
export default withRouter(EventDetail);