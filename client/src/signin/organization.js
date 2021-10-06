import React, { Component } from 'react'
import logohelper_signup from'../logohelper_signup.png';
import './organization.css'

export default class Organization extends Component {
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
                    <label>Organization Name</label>
                    <input type="text" placeholder="   Organization Name"/>
                    {/* <small>error message</small> */}
                </div>
                <div className="help-form-check">
                <input
                class="filter-check-input"
                type="checkbox"
                name="helpfil"
                value="อาหาร"
                />
                <label class="filter-check-label" for="flexCheckDefault">
                อาหาร
                </label>
                </div>
                <div className="help-form-check">
                <input
                class="filter-check-input"
                type="checkbox"
                name="helpfil"
                value="ยา"
                />
                <label class="filter-check-label" for="flexCheckDefault">
                ยา
                </label>
                </div>
                <div className="help-form-check">
                <input
                class="filter-check-input"
                type="checkbox"
                name="helpfil"
                value="นำส่งโรงพยาบาล"
                />
                <label class="filter-check-label" for="flexCheckDefault">
                นำส่งโรงพยาบาล
                </label>
                </div>
                <div className="help-form-check">
                <input
                class="filter-check-input"
                type="checkbox"
                name="helpfil"
                value="นำส่งภูมิลำเนา"
                />
                <label class="filter-check-label" for="flexCheckDefault">
                นำส่งภูมิลำเนา
                </label>
                </div>
                <div className="help-form-check">
                <input
                class="filter-check-input"
                type="checkbox"
                name="helpfil"
                value="หาเตียง"
                />
                <label class="filter-check-label" for="flexCheckDefault">
                หาเตียง
                </label>
                </div>
                <div className="help-form-check">
                <input
                class="filter-check-input"
                type="checkbox"
                name="helpfil"
                value="อื่นๆ"
                />
                <label class="filter-check-label" for="flexCheckDefault">
                อื่นๆ
                </label>
                <input class="othertype" type="text" placeholder="   ระบุ"/>
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
