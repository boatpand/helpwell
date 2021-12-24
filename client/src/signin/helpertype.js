import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logohelper_signup from '../logohelper_signup.png';
import individual from '../individual.png';
import organization from '../organization.png';

export default class HelperType extends Component {
    render() {
        return (
            <div>
                <div class="container-lg" style={{display:"flex", alignItems:"center", justifyContent:"center", position:"relative", minHeight:"100vh"}}>
                <div style={{position:"absolute", width:"100%"}}>
                <img src={logohelper_signup} class="img-fluid" style={{width:"20%"}}/>
                <h1 style={{color:"#707070", fontFamily:"Kanit", margin:"2% 2% 10% 2%", fontSize:"2vw"}}>
                Select your type</h1>
                <div style={{display:"flex", justifyContent:"center"}}>
                <Link to={"/individual"}><img src={individual} class="img-fluid" 
                        style={{width:"50%"}}/></Link>
                <Link to={"/organization"}><img src={organization} class="img-fluid"
                        style={{width:"50%"}}/></Link>
                </div>
                </div>
                </div>
            </div>
        )
    }
}