import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo_signin from '../logo_signin.png';
import victimrole from '../victimrole.png';
import helperrole from '../helperrole.png';
import './signup.css'

export default class Signup extends Component {
    render() {
        return (
            <div>
                <div className="selectrole">
                <div className="rolelogo">
                <img src={logo_signin} alt="logo of sign in form"/>
                <h1>Select your role</h1>
                </div>
                <div className="roleimg">
                <Link to={"/signup-victim"}><img src={victimrole} alt="victimrole img"/></Link>
                <Link to={"/helpertype"}><img src={helperrole} alt="helperrole img"/></Link>
                </div>
                </div>
            </div>
        )
    }
}
