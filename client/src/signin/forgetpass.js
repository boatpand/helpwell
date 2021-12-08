import React, { Component } from 'react'
import axios from 'axios';

export default class Forgetpass extends Component {
    constructor(props){
        super(props);

        this.state = {
            phone:"",
            otp:"",

            show_resend:false,
            show_mobileInput:true,
            show_mobile:false,
            show_digit:false,
            show_first:false,
            show_otp:false,

            show_newpw:false,
            show_verify:true,
            // for test
            // show_newpw:true,
            // show_verify:false,

            Newpw:"",
            Repw:"",
            show_same:false,
            show_empty:false,

            user:"",

            Firstname: "",
            Lastname: "",
            Org_Name: "",
            isOrg: false,
            // Mobile:"",
            Password:"",
            Lat:"",
            Lng:"",
            House_No:"",
            Soi:"",
            Road:"",
            Subdistrict:"",
            District:"",
            ZIP_Code:"",
            Province:"",
        }
    }

    onChangeOtp = (e) => {this.setState({otp:e.target.value})}
    onChangeMobile = (e) => {this.setState({phone:e.target.value})}
    onChangeNewpw = (e) => {this.setState({Newpw:e.target.value})}
    onChangeRepw = (e) => {this.setState({Repw:e.target.value})}

    onSubmit = (e)=> {
        e.preventDefault()

        var phoneNumber = String(this.state.phone)
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
                this.setState({show_newpw:true,show_verify:false})
            };  
        });
    }

    onSubmitPhone = (e)=> {
        e.preventDefault()

        this.setState({phone:this.state.phone})
        
        var phoneNumber = String(this.state.phone)
        if(this.state.phone.length!==10){
            this.setState({show_digit:true, show_mobile:false, show_otp:false, show_mobileInput:true})
                // alert("Mobile should be 10 digits")
        }

        else if(phoneNumber.substring(0,1)!=="0"){
            this.setState({show_first:true, show_mobile:false, show_otp:false, show_mobileInput:true})
                // alert("Mobile should start with 0")
        }

        else{
            this.setState({show_first:false, show_digit:false, show_mobile:true, show_otp:true, show_mobileInput:false})
        }

        phoneNumber = phoneNumber.substring(1)
        phoneNumber = '+66'+phoneNumber
        console.log(phoneNumber)
        const phoneObject = {phoneNumber:phoneNumber}
        axios.post(`http://localhost:4000/verify/send/`,phoneObject);
    }

    onSubmitResend = (e) =>{
        e.preventDefault()

        var phoneNumber = String(this.state.phone)
        phoneNumber = phoneNumber.substring(1)
        phoneNumber = '+66'+phoneNumber
        console.log(phoneNumber)
        const phoneObject = {phoneNumber:phoneNumber}
        axios.post(`http://localhost:4000/verify/send/`,phoneObject);

        this.setState({show_resend:true})
    }

    onSubmitUpdate = (e) =>{
        e.preventDefault()
        
        if((this.state.Newpw || this.state.Repw)===""){this.setState({show_empty:true})}
        else if(this.state.Newpw!==this.state.Repw){this.setState({show_same:true,show_empty:false})}
        else{
            const RepasswordObject = {Mobile: this.state.phone}
            axios.post('http://localhost:4000/victimuser/re-password', RepasswordObject).then(res =>{
            console.log(res.data)
            // console.log(res.data.message)
            const role = res.data.message;
    
            if(role==="victim"){
                const mobile = String(this.state.phone)
                axios.get(`http://localhost:4000/victimuser/victim-profile/${mobile}`).then(res => {
                    this.setState({
                    user: res.data
                })
                }).catch((error)=>{
                console.log(error)
                })
                console.log(this.state.user)
                    
                const updateObject = {Firstname:this.state.user.Firstname,
                                Lastname:this.state.user.Lastname,
                                Age:this.state.user.Age,
                                Gender:this.state.user.Gender,
                                Nationality:this.state.user.Nationality,
                                Race:this.state.user.Race,
                                Mobile:this.state.phone,
                                Password:this.state.Newpw,

                                Province:this.state.user.Province,
                                House_No:this.state.user.House_No,
                                Soi:this.state.user.Soi,
                                Road:this.state.user.Road,
                                District:this.state.user.District,
                                Subdistrict:this.state.user.Subdistrict,
                                ZIP_Code:this.state.user.ZIP_Code,

                                Lat:this.state.user.Lat,
                                Lng:this.state.user.Lng
                            }

                axios.put(`http://localhost:4000/victimuser/update-password`, updateObject).then(res => {
                    console.log('successfully updated')
                    console.log(res.data);
                    // Redirect to sign in page
                    const text=res.data.message;
                    if(text==="update user success!!"){this.props.history.push('/'); alert(text)}
                }).catch((error)=>{
                    console.log(error)
                });
            }
            else if (role==="helper"){
                const mobile = String(this.state.phone)
                axios.get(`http://localhost:4000/helperuser/helper-profile/${mobile}`).then(res => {
                    this.setState({
                    user: res.data
                })
                }).catch((error)=>{
                console.log(error)
                })
                console.log(this.state.user)
                    
                const updateObject = {Firstname:this.state.user.Firstname,
                                Lastname:this.state.user.Lastname,
                                Org_Name:this.state.user.Org_Name,
                                isOrg:this.state.user.isOrg,
                                Mobile:this.state.phone,
                                Password:this.state.Newpw,

                                Province:this.state.user.Province,
                                House_No:this.state.user.House_No,
                                Soi:this.state.user.Soi,
                                Road:this.state.user.Road,
                                District:this.state.user.District,
                                Subdistrict:this.state.user.Subdistrict,
                                ZIP_Code:this.state.user.ZIP_Code,

                                Lat:this.state.user.Lat,
                                Lng:this.state.user.Lng
                            }

                axios.put(`http://localhost:4000/helperuser/update-password`, updateObject).then(res => {
                    console.log(res.data);
                    // Redirect to sign in page
                    const text=res.data.message;
                    if(text==="update user success!!"){this.props.history.push('/'); alert(text)}
                }).catch((error)=>{
                    console.log(error)
                });
            }
          })
        }
    }

    render() {
        return (
            <div style={{alignItems:"center", justifyContent:"center", display:"flex",
                        margin:"0", minHeight:"100vh"}}>
                <div style={{display:(this.state.show_verify? 'block':'none')}}>
                <form style={{borderRadius:"20px", border:"2px solid #B4B6BB", 
                    width:"550px", padding:"10px 40px", position:"relative"}}>
                <h5 style={{color:"#707070", fontFamily:"Kanit", marginBottom:"20px"}}>
                    กรอกเบอร์โทรศัพท์ของท่านเพื่อตั้งรหัสผ่านใหม่</h5>
                
                <div style={{display:"flex", display:(this.state.show_mobileInput? 'block':'none')}}>
                <input style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"300px"}}
                type="text" pattern="[0-9]{10}" placeholder="   Mobile Number" 
                onChange={this.onChangeMobile}></input>
                <button style={{borderRadius:"20px", border:"2px solid #B4B6BB",
                 cursor:"pointer", color:"#707070", background:"#ffffff", marginLeft:"20px",
                marginRight:"20px", fontFamily:"Kanit"}} 
                 type="submit" onClick={this.onSubmitPhone}>ยืนยัน</button>
                 </div>

                <label style={{color:"#000000", fontFamily:"Kanit", display:(this.state.show_mobile? 'block':'none')}}> ระบบได้ทำการส่ง OTP ไปที่เบอร์ {this.state.phone} </label>
                <label style={{color:"#000000", fontFamily:"Kanit", display:(this.state.show_resend? 'block':'none')}}> ระบบได้ทำการส่ง OTP อีกคร้งแล้ว </label>
                <label style={{color:"red", display:(this.state.show_digit? 'block':'none')}}> Mobile should be 10 digits </label>
                <label style={{color:"red", display:(this.state.show_first? 'block':'none')}}> Mobile should start with 0 </label>
                <div style={{display:"flex", marginTop:"20px", display:(this.state.show_otp? 'block':'none')}}>
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
                
                <div style={{display:(this.state.show_newpw? 'block':'none')}}>
                <form style={{borderRadius:"20px", border:"2px solid #B4B6BB", 
                    width:"550px", padding:"10px 40px", position:"relative"}}>
                <h5 style={{color:"#707070", fontFamily:"Kanit", marginBottom:"20px"}}>
                    ตั้งรหัสผ่านใหม่</h5>
                
                    <label style={{color:"red", display:(this.state.show_empty? 'block':'none')}}> Password can't empty !</label>
                <label style={{color:"red", display:(this.state.show_same? 'block':'none')}}> Password must be the same !</label>
                <div>
                <input style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"300px", 
                display:"flex", marginLeft:"80px", marginBottom:"20px"}}
                type="password"  placeholder="   New Password" 
                onChange={this.onChangeNewpw}></input>
                <input style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"300px", 
                display:"flex", marginLeft:"80px", marginBottom:"20px"}}
                type="password"  placeholder="  Retype New Password" 
                onChange={this.onChangeRepw}></input>
                <button style={{borderRadius:"20px", border:"2px solid #B4B6BB",
                 cursor:"pointer", color:"#707070", background:"#ffffff", marginLeft:"20px",
                marginRight:"20px", fontFamily:"Kanit"}} 
                 type="submit" onClick={this.onSubmitUpdate}>ยืนยัน</button>
                 </div>
                </form>
                </div>

            </div>
        )
    }
}

