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
            // RequestSchema
            Mobile:"",
            RequestID:"",
            Other:"",
            Status:"",
            Status_Text:"",
            date:"",

            // RequestDetailSchema
            Detail:[],

            // check each status
            // wait:true,
            // all:false,
  
            // show user address
            show_soi:true,
            show_road:true,
            count:0,

            // RequestID:"",
            // From eventtablerow.js
            Helper_Mobile:this.props.location.state.Mobile,
            HelpTopic:this.props.location.state.HelpTopic,

            // map : get user location
            address:"",
            city:"",
            area:"",
            state:"",
            zoom:10,
            height:400,
            mapPosition:{lat:0,lng:0},
            markerPosition:{lat:0,lng:0},

            // map : direction
            currentLocation: { lat: 0, lng: 0},
            victimLocation: { lat: 0, lng: 0},
            directions:null,

            // map : direction detail
            route:"",
            distance:"",
            time:"",

            // helper check accept help
            Cancel:this.props.location.state.Cancel,
            request:[],
            user:"",
            Firstname: "",
            Lastname: "",
            Org_Name: "",
            isOrg: false,

            // datetime format
            datet:"",
            month:"",
            datetime:""
        }
    }

    async componentDidMount(){
      // check cancel button
      console.log(this.state.Cancel)
      console.log(this.state.Helper_Mobile)

      // get location
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

      // get request from RequestID
      console.log(`Helper_Mobile : ${this.state.Helper_Mobile}`)
        console.log(this.props.match.params.id)
        let id = this.props.match.params.id 
        await axios.get(`http://localhost:4000/request/request-detail/${id}`).then(res=>{
            this.setState({
                Mobile:res.data.Mobile,
                RequestID:res.data.RequestID,
                Other:res.data.Other,
                Status:res.data.Status,
                Status_Text:res.data.Status_Text,
                date:res.data.date,

                // format datetime
                month:res.data.date.slice(5,7),
                datet:"วันที่ " + res.data.date.slice(8,10) + " / " + res.data.date.slice(5,7) + " / " + res.data.date.slice(0,4),
                datetime:" เวลา " + res.data.date.slice(11,16) + " " + "น."
            })
        });

        // get request detail from RequestID
        await axios.get(`http://localhost:4000/request/request-detail-detail/${id}`).then(res=>{
            this.setState({
              Detail:res.data
            })
        });
        console.log(this.state.Detail)

        let detail=[];
        // let help=""; let option=""; let count=0; let status="";
        let tmp={};
        for(var i=0;i<this.state.Detail.length;i++){
          if(this.state.Detail[i].Helpcode==="101"){
            // if(this.state.Detail[i].Status==="รอการช่วยเหลือ"){
            //   this.setState({wait:true, all:false})
            // }
            // else if(this.state.Detail[i].Status==="ช่วยเหลือสำเร็จ"){
            //   this.setState({wait:false, all:true})
            // }
            tmp={
              help:"อาหาร",
              option:this.state.Detail[i].Option,
              count:this.state.Detail[i].Count,
              status:this.state.Detail[i].Status,
            }
          }
          if(this.state.Detail[i].Helpcode==="102"){
            // if(this.state.Detail[i].Status==="รอการช่วยเหลือ"){
            //   this.setState({wait:true, all:false})
            // }
            // else if(this.state.Detail[i].Status==="ช่วยเหลือสำเร็จ"){
            //   this.setState({wait:false, all:true})
            // }
            tmp={
              help:"ยา",
              option:this.state.Detail[i].Option,
              count:this.state.Detail[i].Count,
              status:this.state.Detail[i].Status,
            }
          }
          if(this.state.Detail[i].Helpcode==="103"){
            // if(this.state.Detail[i].Status==="รอการช่วยเหลือ"){
            //   this.setState({wait:true, all:false})
            // }
            // else if(this.state.Detail[i].Status==="ช่วยเหลือสำเร็จ"){
            //   this.setState({wait:false, all:true})
            // }
            tmp={
              help:"เตียง",
              option:this.state.Detail[i].Option,
              count:this.state.Detail[i].Count,
              status:this.state.Detail[i].Status,
            }
          }
          if(this.state.Detail[i].Helpcode==="104"){
            // if(this.state.Detail[i].Status==="รอการช่วยเหลือ"){
            //   this.setState({wait:true, all:false})
            // }
            // else if(this.state.Detail[i].Status==="ช่วยเหลือสำเร็จ"){
            //   this.setState({wait:false, all:true})
            // }
            tmp={
              help:"รถนำส่งโรงพยาบาล",
              option:this.state.Detail[i].Option,
              count:this.state.Detail[i].Count,
              status:this.state.Detail[i].Status,
            }
          }
          if(this.state.Detail[i].Helpcode==="105"){
            // if(this.state.Detail[i].Status==="รอการช่วยเหลือ"){
            //   this.setState({wait:true, all:false})
            // }
            // else if(this.state.Detail[i].Status==="ช่วยเหลือสำเร็จ"){
            //   this.setState({wait:false, all:true})
            // }
            tmp={
              help:"รถนำส่งภูมิลำเนา",
              option:this.state.Detail[i].Option,
              count:this.state.Detail[i].Count,
              status:this.state.Detail[i].Status,
            }
          }
          if(this.state.Detail[i].Helpcode==="106"){
            // if(this.state.Detail[i].Status==="รอการช่วยเหลือ"){
            //   this.setState({wait:true, all:false})
            // }
            // else if(this.state.Detail[i].Status==="ช่วยเหลือสำเร็จ"){
            //   this.setState({wait:false, all:true})
            // }
            tmp={
              help:"อื่นๆ",
              option:this.state.Detail[i].Option,
              count:this.state.Detail[i].Count,
              status:this.state.Detail[i].Status,
            }
          }
          detail.push(tmp)
        }
        console.log(detail)
        this.setState({Detail:detail})

        // get victim address 
        let mobile = this.state.Mobile
        console.log(mobile)
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

        // chek accept help
        mobile = String(this.state.Helper_Mobile)
        console.log(`${mobile}`)
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

  // accept help
    onSubmit = async(e) =>{
        e.preventDefault();

        var RequestID_Check = String(this.state.RequestID)
        var RequestID_Checklist = this.state.requestID_state

        if(RequestID_Checklist.includes(RequestID_Check)){
          alert('คุณให้ความช่วยเหลือรายการนี้อยู่แล้ว')
        }
        else{
          const acceptObject = {
          RequestID:this.state.RequestID,
          Helper_Mobile:this.state.Helper_Mobile,
          Status:'กำลังช่วยเหลือ'
          }
          await axios.post('http://localhost:4000/accept/accept', acceptObject).then(res =>
          console.log(res.data));

          const eventObject = {
            Mobile:this.state.Mobile,
            Other:this.state.Other,
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

          const detailObject = {
            Status:'กำลังช่วยเหลือ',
          }
          axios.put(`http://localhost:4000/request/update-help-detail/${RequestID}`,detailObject).then((res)=>{
              console.log('event detail successfully updated')
              console.log(res.data);
          }).catch((error)=>{
              console.log(error)
          });

        // Redirect to helplist
        this.props.history.push({pathname:`/helperprofile/${this.state.Helper_Mobile}`,state:{Mobile:this.state.Helper_Mobile}})
        }
    }

    render() {        
        const inputs = [];
        for (var i=0;i<this.state.Detail.length;i++){
          inputs.push(
            <div style={{fontFamily:"Kanit", fontSize:"1.5vw", width:"100%"}}>
            <label>ความต้องการ&nbsp;&nbsp;&nbsp;</label>
            <input class="rounded-pill" style={{width:"20%", textAlign:"center", border:"2px solid #B4B6BB", marginTop:"2%"}} 
                name={`input-${i}`} value ={this.state.Detail[i].help}/>
            <label>&nbsp;&nbsp;&nbsp;จำนวน&nbsp;&nbsp;&nbsp;</label>
            <input class="rounded-pill" style={{width:"5%", textAlign:"center", border:"2px solid #B4B6BB", marginTop:"2%"}}
                name={`input-${i}`} value={this.state.Detail[i].count}/>
            <label>&nbsp;&nbsp;&nbsp;สถานะ&nbsp;&nbsp;&nbsp;</label>
            {/* <input class="rounded-pill" style={{width:"20%", textAlign:"center", border:"2px solid #B4B6BB", color:"#B4B6BB", display:(this.state.wait ? 'inline-flex':'none'), marginTop:"2%"}}
                name={`input-${i}`} value={this.state.Detail[i].status}/>
            <input class="rounded-pill" style={{width:"20%", textAlign:"center", border:"2px solid #B4B6BB", color:"#2ECC71", display:(this.state.all ? 'inline-flex':'none'), marginTop:"2%"}}
                name={`input-${i}`} value={this.state.Detail[i].status}/> */}
            <input class="rounded-pill" style={{width:"20%", textAlign:"center", border:"2px solid #B4B6BB", marginTop:"2%"}}
                name={`input-${i}`} value={this.state.Detail[i].status}/>
            <div>
            <label>&nbsp;&nbsp;&nbsp;หมายเหตุ&nbsp;&nbsp;&nbsp;</label>
            <input class="rounded-pill" style={{width:"65%", textAlign:"center", border:"2px solid #B4B6BB", marginTop:"2%"}}
                name={`input-${i}`} value={this.state.Detail[i].option}/>
            </div>
            </div>)} 
                
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
      <Header />
      <div class="container-lg" style={{width:"100%"}}>
      <h1 style={{fontFamily:"Kanit", color:"#FFB172", textAlign:"left", margin:"4rem 0 0 2%"}}>รายละเอียดผู้ขอความช่วยเหลือ</h1>
      <form onSubmit={this.onSubmit}>
      
      <div style={{display:"flex", margin:"5% 0 0 3%"}}>

      <div style={{width:"60%", textAlign:"left", display:"flex"}}>
      <h1 style={{fontFamily:"Kanit", fontSize:"1.5vw"}}>ความช่วยเหลือที่ต้องการ</h1>
      <h1 style={{fontFamily:"Kanit", fontSize:"1.5vw",color:"#707070", marginLeft:"5%"}} >{this.state.HelpTopic}</h1>
      </div>

      <div style={{width:"40%", textAlign:"left"}}>
      {/* <h1 style={{color:"#707070", marginLeft:"30%", fontFamily:"Kanit", fontSize:"1.5vw"}}>เวลาที่ขอความช่วยเหลือ : {this.state.date} </h1> */}
      <h1 style={{color:"#707070", margin:"0 0 0 0", fontFamily:"Kanit", fontSize:"1.5vw"}}>ขอความช่วยเหลือเมื่อ : {this.state.datet}</h1>
      <h1 style={{color:"#707070", margin:"0 0 0 45%", fontFamily:"Kanit", fontSize:"1.5vw"}}>{this.state.datetime}</h1>
      </div>
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
      <hr style={{marginBottom:"3%"}}/>
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
                          border:"2px solid #B4B6BB", width:"100%", fontSize:"1.5vw"}}>ให้ความช่วยเหลือ</button>
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