import React, { Component } from 'react'
import logohelper_signup from'../logohelper_signup.png';
import './individual.css'

export default class Individual extends Component {
    render() {
        return (
            <body className="signinbody">
        <div className="signupcontainer">
            <form className="signupform">
            <img src={logohelper_signup} alt="logohelper_signup"/>
                <div className="form-controll">
                    <label>Firstname</label>
                    <input type="text" placeholder="   Firstname"/>
                    {/* <small>error message</small> */}
                </div>
                <div className="form-controll">
                    <label>Lastname</label>
                    <input type="text" placeholder="   Lastname"/>
                    {/* <small>error message</small> */}
                </div>
                <div className="form-controll">
                    <label>Mobile Number</label>
                    <input type="text" placeholder="   Mobile Number"/>
                    {/* <small>error message</small> */}
                </div>
                <div className="form-controll">
                    <label>Password</label>
                    <input type="password" placeholder="   Password"/>
                    {/* <small>error message</small> */}
                </div>
                <div className="form-controll">
                    <label>Retype Password</label>
                    <input type="password" placeholder="   Retype Password"/>
                    {/* <small>error message</small> */}
                </div>
                <div className="signinup">
                <button className="signupbutton" type="submit">next</button>
                </div>
            </form>
        </div>    
        </body>
        )
    }
}
