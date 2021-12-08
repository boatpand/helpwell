import React, { Component } from 'react'
import axios from 'axios';
import logohelper_signup from'../logohelper_signup.png';

export default class HelperOtp extends Component {
    constructor(props){
        super(props);

        this.state = {
            phone:"",
            otp:"",
       
            Firstname:this.props.location.state.Firstname,
            Lastname:this.props.location.state.Lastname,
            Org_Name:this.props.location.state.Org_Name,
            isOrg:this.props.location.state.isOrg,
            Mobile:this.props.location.state.Mobile,
            Password:this.props.location.state.Password,

            Province:"กรุงเทพมหานคร",
            House_No:this.props.location.state.House_No,
            Soi:this.props.location.state.Soi,
            Road:this.props.location.state.Road,
            District:this.props.location.state.District,
            Subdistrict:this.props.location.state.Subdistrict,
            ZIP_Code:this.props.location.state.ZIP_Code,

            Food:this.props.location.state.Food,
            Medicine:this.props.location.state.Medicine,
            Bed:this.props.location.state.Bed,
            Hospital:this.props.location.state.Hospital,
            Home:this.props.location.state.Home,
            Other:this.props.location.state.Other,

            Lat:this.props.location.state.lat,
            Lng:this.props.location.state.lng,

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
                const helperObject = {
                Firstname:this.props.location.state.Firstname,
                Lastname:this.props.location.state.Lastname,
                Org_Name:this.props.location.state.Org_Name,
                isOrg:this.props.location.state.isOrg,
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

                axios.post('http://localhost:4000/helperuser/register-helper', helperObject).then(res =>{
                    alert(res.data.message);
                //console.log(res.data);
                })

                if(this.state.isOrg === true){
                    const helptypeObject = {
                        Mobile:this.props.location.state.Mobile,
                        Food:this.props.location.state.Food,
                        Medicine:this.props.location.state.Medicine,
                        Bed:this.props.location.state.Bed,
                        Hospital:this.props.location.state.Hospital,
                        Home:this.props.location.state.Home,
                        Other:this.props.location.state.Other,
                    }

                    axios.post('http://localhost:4000/helperuser/helptype', helptypeObject).then(res =>
                        console.log(res.data));
                        this.props.history.push('/')
                }
                else{this.props.history.push('/')}
                // this.props.history.push('/')
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
                <img src={logohelper_signup} alt="logohelper_signup"/>
                <h5 style={{color:"#707070", fontFamily:"Kanit"}}>ระบบได้ทำการส่ง OTP ไปยังเบอร์ {this.props.location.state.Mobile}</h5>
                <label style={{color:"#000000", fontFamily:"Kanit",display:(this.state.show_resend? 'block':'none')}}> ระบบได้ทำการส่ง OTP อีกคร้งแล้ว </label>
                <div style={{display:"flex", alignItems:"center", justifyContent:"center",}}>
                <input style={{borderRadius:"20px", border:"2px solid #B4B6BB"}}
                type="text" onChange={this.onChangeOtp}></input>
                <button style={{borderRadius:"20px", border:"2px solid #B4B6BB",
                 cursor:"pointer", color:"#707070", background:"#ffffff", marginLeft:"20px",
                marginRight:"20px", fontFamily:"Kanit"}} 
                 type="submit" onClick={this.onSubmit}>ยืนยัน OTP</button>
                <label style={{cursor:"pointer", color:"#FFB172"}} onClick={this.onSubmitResend}>ขอ OTP อีกครั้ง</label>
                </div>
                </form>
            </div>
        )
    }
}