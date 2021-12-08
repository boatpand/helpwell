import React, { Component } from 'react'
import axios from 'axios';
import logo_signin from '../logo_signin.png';

export default class VictimOtp extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            phone:"",
            otp:"",
       
            Firstname:this.props.location.state.Firstname,
            Lastname:this.props.location.state.Lastname,
            Age:this.props.location.state.Age,
            Gender:this.props.location.state.Gender,
            Nationality:this.props.location.state.Nationality,
            Race:this.props.location.state.Race,
            // Cogenital_Disease:this.props.location.state.Cogenital_Disease,
            // Other_Disease:this.props.location.state.Other_Disease,
            Mobile:this.props.location.state.Mobile,
            Password:this.props.location.state.Password,

            Province:"กรุงเทพมหานคร",
            House_No:this.props.location.state.House_No,
            Soi:this.props.location.state.Soi,
            Road:this.props.location.state.Road,
            District:this.props.location.state.District,
            Subdistrict:this.props.location.state.Subdistrict,
            ZIP_Code:this.props.location.state.ZIP_Code,

            Lat:this.props.location.state.lat,
            Lng:this.props.location.state.lng,

            Disease:this.props.location.state.Disease,
            Other:this.props.location.state.Other,

            show_resend:false
        }
    }

    onChangeOtp = (e) => {this.setState({otp:e.target.value})}

    onSubmit = (e)=> {
        e.preventDefault()

        var phoneNumber = String(this.props.location.state.Mobile)
        phoneNumber = phoneNumber.substring(1)
        phoneNumber = '+66'+phoneNumber
        console.log(phoneNumber)
        const otpObject = {
            // phoneNumber:`+66910106466`,
            phoneNumber:phoneNumber,
            otp:this.state.otp
        }
        axios.post(`http://localhost:4000/verify/otp/`,otpObject).then(res =>{
            if(res.data.message==="sign up complete"){
                const victimObject = {
                Firstname:this.props.location.state.Firstname,
                Lastname:this.props.location.state.Lastname,
                Age:this.props.location.state.Age,
                Gender:this.props.location.state.Gender,
                Nationality:this.props.location.state.Nationality,
                Race:this.props.location.state.Race,
                // Cogenital_Disease:this.props.location.state.Cogenital_Disease,
                // Other_Disease:this.props.location.state.Other_Disease,
                Mobile:this.props.location.state.Mobile,
                Password:this.props.location.state.Password,

                Province:"กรุงเทพมหานคร",
                House_No:this.props.location.state.House_No,
                Soi:this.props.location.state.Soi,
                Road:this.props.location.state.Road,
                District:this.props.location.state.District,
                Subdistrict:this.props.location.state.Subdistrict,
                ZIP_Code:this.props.location.state.ZIP_Code,

                Lat:this.props.location.state.Lat,
                Lng:this.props.location.state.Lng,
            };

                axios.post('http://localhost:4000/victimuser/register-victim', victimObject).then(res =>{
                    alert(res.data.message);
                //console.log(res.data);
                })

                const congenitalObject = {
                    Mobile:this.props.location.state.Mobile,
                    Disease:this.props.location.state.Disease,
                    Other:this.props.location.state.Other,
                }

                axios.post('http://localhost:4000/victimuser/congenital', congenitalObject).then(res =>
                    console.log(res.data));
                    this.props.history.push('/')
                }
        });
    }

    onSubmitResend = (e) =>{
        e.preventDefault()

        var phoneNumber = String(this.props.location.state.Mobile)
        phoneNumber = phoneNumber.substring(1)
        phoneNumber = '+66'+phoneNumber
        console.log(phoneNumber)
        const phoneObject = {phoneNumber:phoneNumber}
        axios.post(`http://localhost:4000/verify/send/`,phoneObject);

        this.setState({show_resend:true})
    }

    render() {
        return (
            <div style={{alignItems:"center", justifyContent:"center", display:"flex",
                        margin:"0", minHeight:"100vh"}}>
                <form style={{borderRadius:"20px", border:"2px solid #B4B6BB", 
                    width:"550px", padding:"10px 40px", position:"relative"}}>
                <img src={logo_signin} alt="logohelper_signup"/>
                <h5 style={{color:"#707070", fontFamily:"Kanit"}}>ระบบได้ทำการส่ง OTP ไปยังเบอร์ {this.props.location.state.Mobile}</h5>
                <label style={{color:"#000000", fontFamily:"Kanit",display:(this.state.show_resend? 'block':'none')}}> ระบบได้ทำการส่ง OTP อีกคร้งแล้ว </label>
                <div style={{display:"flex", alignItems:"center", justifyContent:"center",}}>
                <input style={{borderRadius:"20px", border:"2px solid #B4B6BB"}}
                type="text" onChange={this.onChangeOtp}></input>
                <button style={{borderRadius:"20px", border:"2px solid #B4B6BB",
                 cursor:"pointer", color:"#707070", background:"#ffffff", marginLeft:"20px",
                marginRight:"20px", fontFamily:"Kanit"}} 
                 type="submit" onClick={this.onSubmit}>ยืนยัน OTP</button>
                <label style={{cursor:"pointer", color:"#2F4A8A"}} onClick={this.onSubmitResend}>ขอ OTP อีกครั้ง</label>
                </div>
                </form>
            </div>
        )
    }
}
