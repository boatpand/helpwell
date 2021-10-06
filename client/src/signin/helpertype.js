import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logohelper_signup from '../logohelper_signup.png';
import individual from '../individual.png';
import organization from '../organization.png';
import './helpertype.css';

export default class HelperType extends Component {
    render() {
        return (
            <div>
                <div className="selecttype">
                <div className="rolelogo">
                <img src={logohelper_signup} alt="llogohelper_signup"/>
                <h1>Select your type</h1>
                </div>
                <div className="roleimg">
                <Link to={"/individual"}><img src={individual} alt="individual img"/></Link>
                <Link to={"/organization"}><img src={organization} alt="organization img"/></Link>
                </div>
                </div>
            </div>
        )
    }
}