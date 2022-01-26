import React, { Component } from 'react'
import logo_signin from '../logo_signin.png';
import axios from 'axios';

import { InfoWindow, withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import Geocode from 'react-geocode';
import AutoComplete from "react-google-autocomplete";

import adminAuth from './protected/admin-auth';
import victimAuth from './protected/victim-auth';
import helperAuth from './protected/helper-auth';

export default class Signin extends Component {
    constructor(props){
        super(props)
    
        this.state ={
            Mobile:'',
            Password:'',
            role:'',

            mes:"",
            show_mes:false
        }
    }

    onChangeMobile = (e) =>{
        this.setState({Mobile:e.target.value})
    }
    onChangePassword = (e) =>{
        this.setState({Password:e.target.value})
    }

    onSubmitLogin=(e)=>{
        e.preventDefault()
    
        const loginObject = {
          Mobile: this.state.Mobile,
          Password: this.state.Password,
        }
        
        if(this.state.Mobile !=="" && this.state.Password !== ""){

          if(this.state.Mobile==="0123456789"){
            console.log("admin")
            axios.post('http://localhost:4000/admin/login', loginObject).then(res =>{
            console.log(res.data)
            // console.log(res.data.message)
            const role = res.data.message;
            if(role==="Incorrect Mobile or Password"){
                //alert(role)
                this.setState({mes:role, show_mes:true})
            }else(this.setState({show_mes:false}))
            // alert(res.data.message);
            if(role==="admin"){
                this.setState({show_mes:false})
                // for protected route
                adminAuth.login(()=>{
                console.log(adminAuth.login)
                this.props.history.push({
                  pathname: '/admin/database',
                  search: '',
                  state: {Mobile:this.state.Mobile} 
                })
              });
            }
          })
          }
          else{
          axios.post('http://localhost:4000/victimuser/login', loginObject).then(res =>{
            console.log(res.data)
            // console.log(res.data.message)
            const role = res.data.message;
            if(role==="Incorrect Mobile or Password"){
                //alert(role)
                this.setState({mes:role, show_mes:true})
            }else(this.setState({show_mes:false}))
            // alert(res.data.message);
            if(role==="victim"){
                this.setState({show_mes:false})
                // for protected route
                victimAuth.login(()=>{
                // console.log(victimAuth.login)
                console.log(this.state.Mobile)
                this.props.history.push({
                  pathname: '/victims',
                  search: '',
                  state: {Mobile:this.state.Mobile} 
                })
              });
            }
            else if (role==="helper"){
                this.setState({show_mes:false})
                // for protected route
                helperAuth.login(()=>{
                // console.log(victimAuth.login)
                this.props.history.push({
                    pathname: `/helper`,
                    search: '',
                    state: {Mobile:this.state.Mobile} 
                  })
              });
            }
          })
        }
        } 
        // else{alert("All input is required")}
        else{this.setState({mes:"All input is required", show_mes:true})}
      }

      render() {
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
          <AutoComplete 
              style = {{display:"none"}}
              options={{
                  types: ["address"],
                  componentRestrictions: { country: "th" },
                }} 
          />
        ));

        return (
        <div>
          <div class="container-lg" style={{display:"flex", alignItems:"center", justifyContent:"center", position:"relative", minHeight:"100vh"}}>
          <form class="rounded" 
                onSubmit={this.onSubmitLogin}
                style={{border:"2px solid #B4B6BB", width:"60%"}}>
          <img class="img-fluid" src={logo_signin} style={{margin:"5% 0 0 0", width:"30%"}}></img>

          <label style={{color:"red", fontSize:"1vw", display:(this.state.show_mes? 'block':'none')}}>{this.state.mes}</label>
          <div style={{display:"flex",margin:"5% 0 0 0",justifyContent:"center"}}>
          <label style={{fontSize:"1.5vw", color:"#707070", display:"flex"}}>Mobile Number :</label>
          <input class="rounded-pill" type="text" pattern="[0-9]{10}" placeholder="   Mobile Number" 
                  onChange={this.onChangeMobile}
                  style={{border:"2px solid #B4B6BB", fontSize:"1.5vw", marginLeft:"2%", width:"40%"}}/>
          </div>

          <div style={{display:"flex",margin:"5% 0 0 0", justifyContent:"center"}}>
          <label style={{fontSize:"1.5vw", color:"#707070", display:"flex"}}>Password : </label>
          <input class="rounded-pill" type="password" placeholder="   Password" 
                  onChange={this.onChangePassword}
                  style={{border:"2px solid #B4B6BB", fontSize:"1.5vw", marginLeft:"8%", width:"40%"}}/>
          </div>
          <h1 style={{fontSize:"1.2vw", marginLeft:"50%", textAlign:"left", fontFamily:"Kanit"}}><a href="/forget-pass">forget password</a></h1>
          <button class="rounded-pill" style={{background:"#2F4A8A", color:"#ffffff", 
                  fontSize:"1.5vw", fontFamily:"Kanit", border:"2px solid #B4B6BB", width:"70%", marginTop:"5%"}}>sign in</button>
          <h1 style={{fontSize:"1.2vw", fontFamily:"Kanit" ,marginBottom:"2%"}}><a href="/signup">sign up</a></h1>
          </form> 

          <MapWithAMarker
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA-fNGUBxtHqdiDpx9zfylTwXtZkkfGN_M&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `25rem` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            />

          </div>
        </div>
        )
      }
    }