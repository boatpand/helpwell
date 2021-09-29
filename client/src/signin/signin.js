import React, { Component } from 'react'
import './signin.css'

export default class Signin extends Component {
    render() {
        return (
        <body className="signinbody">
        <div className="signincontainer">
            <form className="signinform">
                <img src="logo_signin.png" alt="logo of sign in form"/>
                <div className="form-controll">
                    <label>Mobile Number</label>
                    <input type="text" placeholder="   Mobile Number"/>
                    {/* <small>error message</small> */}
                </div>
                <div className="form-controll">
                    <label>Password</label>
                    <input type="password" placeholder="   Password"/>
                    {/* <small>error message</small> */}
                    <label><a href="/">forget password</a></label>
                </div>
                <div className="signinup">
                <button className="signinbutton" type="submit">sign in</button>
                <label><a href="/">sign up</a></label>
                </div>
            </form>
        </div>    
        </body>
        )
    }
}