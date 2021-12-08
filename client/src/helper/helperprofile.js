import React, { Component } from 'react'
import { withRouter } from "react-router";
import axios from 'axios';
import Header from './header'

class HelperProfile extends Component {
    constructor(props){
        super(props)
    
        this.state ={
            Mobile:this.props.location.state.Mobile,
            user:"",

            Firstname: "",
            Lastname: "",
            Org_Name: "",
            isOrg: false,
            // Mobile:"",
            // Password:"",
            // Lat:"",
            // Lng:"",
            House_No:"",
            Soi:"",
            Road:"",
            Subdistrict:"",
            District:"",
            ZIP_Code:"",
            Province:"",

            show_soi:true,
            show_road:true,
            show_org:false,
            show_name:true
        }
    }
    async componentDidMount(){
        const mobile = String(this.state.Mobile)
        await axios.get(`http://localhost:4000/helperuser/helper-profile/${mobile}`).then(res => {
            this.setState({
            user: res.data
          })
        }).catch((error)=>{
          console.log(error)
        })
        console.log(this.state.user)
        this.setState({Firstname:this.state.user.Firstname,
                        Lastname:this.state.user.Lastname,
                        Org_Name:this.state.user.Org_Name,
                        isOrg:this.state.user.isOrg,

                        House_No:this.state.user.House_No,
                        Soi:this.state.user.Soi,
                        Road:this.state.user.Road,
                        Subdistrict:this.state.user.Subdistrict,
                        District:this.state.user.District,
                        ZIP_Code:this.state.user.ZIP_Code,
                        Province:this.state.user.Province,
            })

        if(this.state.isOrg==true){this.setState({show_org:true,show_name:false})}
        if(this.state.Soi==""){this.setState({show_soi:false})}
        if(this.state.Road==""){this.setState({show_road:false})}
      }

      onSubmit=(e)=>{
        e.preventDefault()

        this.props.history.push({pathname:"/"})
      }

      onSubmitEdit=(e)=>{
        e.preventDefault()

        const Mobile = this.state.Mobile
        this.props.history.push({pathname:`/helperprofile/edit-profile/${Mobile}`,state:{Mobile:this.state.Mobile}})
      }

    render() {
        
        return (
            <div>
                <Header Mobile={this.state.Mobile}/>
                <form style={{
                    // borderRadius:"20px", 
                    // border:"2px solid #B4B6BB",
                    position:"fixed",
                    margin:"100px 100px 0 100px",
                    height:"200px"}}
                >

                    <div style={{ display:"flex"}}>
                        <label style={{marginTop:"20px", marginLeft:"20px", color:"#FFB172", fontWeight:"bold",
                                fontSize:"24px", textAlign:"left"}}>Profile</label>
                    
                        <button style={{border:"2px solid #FFB172", borderRadius:"20px",
                        backgroundColor:"#ffffff", color:"#FFB172", width:"150px", height:"30px", 
                        fontWeight:"bold", marginTop:"25px", marginLeft:"800px"}}
                        onClick={this.onSubmitEdit}>
                            Edit Profile</button>

                        <button style={{border:"2px solid #FFB172", borderRadius:"20px",
                        backgroundColor:"#ffffff", color:"#FFB172", width:"100px", height:"30px", 
                        fontWeight:"bold", marginTop:"25px", marginLeft:"20px", marginRight:"50px"}}
                        onClick={this.onSubmit}>
                        Sign out</button>
                    </div>

                    <div style={{ display:"flex"}}>
                        <label style={{marginTop:"20px", marginLeft:"50px", color:"#FFB172", fontWeight:"bold",
                            fontSize:"20px", fontFamily:"Kanit", display:(this.state.show_name? 'block':'none')}}>ชื่อ - สกุล : </label>
                        <label style={{marginTop:"20px", marginLeft:"20px", color:"#FFB172", fontWeight:"bold",
                            fontSize:"20px", fontFamily:"Kanit", display:(this.state.show_name? 'block':'none')}}>{this.state.Firstname}</label>
                        
                        <label style={{marginTop:"20px", marginLeft:"50px", color:"#FFB172", fontWeight:"bold",
                            fontSize:"20px", fontFamily:"Kanit", display:(this.state.show_org? 'block':'none')}}>ชื่อหน่วยงาน : </label>
                        <label style={{marginTop:"20px", marginLeft:"20px", color:"#FFB172", fontWeight:"bold",
                            fontSize:"20px", fontFamily:"Kanit", display:(this.state.show_org? 'block':'none')}}>{this.state.Org_Name}</label>
                            
                        <label style={{marginTop:"20px", marginLeft:"20px", color:"#FFB172", fontWeight:"bold",
                            fontSize:"20px", fontFamily:"Kanit", display:(this.state.show_name? 'block':'none')}}>{this.state.Lastname}</label>
                        <label style={{marginTop:"20px", marginLeft:"500px", color:"#FFB172", fontWeight:"bold",
                            fontSize:"20px", fontFamily:"Kanit"}}>เบอร์โทรศัพท์ : </label>
                        <label style={{marginTop:"20px", marginLeft:"20px", color:"#FFB172", fontWeight:"bold",
                            fontSize:"20px", fontFamily:"Kanit"}}>{this.state.Mobile}</label>
                    </div>

                    <div style={{ display:"flex"}}>
                        <label style={{marginTop:"20px", marginLeft:"50px", color:"#FFB172", fontWeight:"bold",
                            fontSize:"20px", fontFamily:"Kanit"}}>ที่อยู่ :</label>
                        <label style={{marginTop:"20px", marginLeft:"20px", color:"#FFB172", fontWeight:"bold",
                            fontSize:"20px", fontFamily:"Kanit"}}>{this.state.House_No}</label>
                        <label style={{marginTop:"20px", marginLeft:"10px", color:"#FFB172", fontWeight:"bold",
                            fontSize:"20px", fontFamily:"Kanit", display:(this.state.show_soi? 'block':'none')}}>ซอย {this.state.Soi}</label>  
                        <label style={{marginTop:"20px", marginLeft:"10px", color:"#FFB172", fontWeight:"bold",
                            fontSize:"20px", fontFamily:"Kanit", display:(this.state.show_road? 'block':'none')}}>ถนน {this.state.Road}</label>
                        <label style={{marginTop:"20px", marginLeft:"10px", color:"#FFB172", fontWeight:"bold",
                            fontSize:"20px", fontFamily:"Kanit"}}>แขวง {this.state.Subdistrict}</label>
                        <label style={{marginTop:"20px", marginLeft:"10px", color:"#FFB172", fontWeight:"bold",
                            fontSize:"20px", fontFamily:"Kanit"}}>เขต {this.state.District}</label>
                        <label style={{marginTop:"20px", marginLeft:"10px", color:"#FFB172", fontWeight:"bold",
                            fontSize:"20px", fontFamily:"Kanit"}}>{this.state.ZIP_Code}</label>
                        <label style={{marginTop:"20px", marginLeft:"10px", color:"#FFB172", fontWeight:"bold",
                            fontSize:"20px", fontFamily:"Kanit"}}>{this.state.Province}</label>   
                    </div>
                    <hr style={{border:"2px solid #B4B6BB", borderRadius:"20px"}}/>
                </form>
                
                <form 
                style={{
                    // borderRadius:"20px", 
                    // border:"2px solid #B4B6BB", 
                    position:"fixed",
                    margin:"300px 100px 100px 100px", 
                    height:"400px"}}
                >
                <div style={{ display:"flex"}}>
                <label style={{marginLeft:"20px", color:"#FFB172", fontWeight:"bold",
                    fontSize:"24px", fontFamily:"Kanit"}}>รายการผู้ขอความช่วยเหลือที่เข้าช่วยเหลือ</label>
                </div>           
                </form>
            </div>
        )
    }
}
export default withRouter(HelperProfile);