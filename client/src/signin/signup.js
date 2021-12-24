import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo_signin from '../logo_signin.png';
import victimrole from '../victimrole.png';
import helperrole from '../helperrole.png';

export default class Signup extends Component {
    render() {
        return (
            <div>
                <div class="container-lg" style={{display:"flex", alignItems:"center", justifyContent:"center", position:"relative", minHeight:"100vh"}}>
                <div>
                <img src={logo_signin} class="img-fluid" style={{width:"30%"}}/>
                <h1 style={{color:"#707070", fontFamily:"Kanit", margin:"2% 2% 10% 2%", fontSize:"2vw"}}>
                Select your role</h1>
                <div style={{display:"flex", justifyContent:"center"}}>
                <Link to={"/signup-victim"}><img src={victimrole} class="img-fluid" 
                        style={{width:"50%"}}/></Link>
                <Link to={"/helpertype"}><img src={helperrole} class="img-fluid"
                        style={{width:"50%"}}/></Link>
                </div>
                </div>
                </div>
            </div>
        )
    }
}
