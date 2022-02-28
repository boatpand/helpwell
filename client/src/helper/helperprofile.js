import React, { Component } from 'react'
import { withRouter } from "react-router";
import axios from 'axios';
import Header from './header'
import HelpRow from './helprow';

class HelperProfile extends Component {
    constructor(props){
        super(props)
    
        this.state ={
          
            // profile data
            userMobile:this.props.location.state.Mobile,
            user:"",

            // request accept check
            Helpdetail:[],
            helpRequest:[],
            AcceptID_state:[],

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
            show_name:true,

            request:[],
            flag:false,
            request_state:[]
        }
    }
    async componentDidMount(){
        // get user data
        const mobile = String(this.state.userMobile)
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

        await axios.get(`http://localhost:4000/accept/status/${mobile}`).then(res => {
            this.setState({request:res.data})
        }).catch((error)=>{
          console.log(error)
        })
        console.log(this.state.request)

        this.setState({flag:true})
    }

    async componentDidUpdate(prevProps,prevState){
      var requestID_list = [];
      var requset_list = [];
      if(this.state.flag!==prevState.flag){
        console.log(this.state.request.length)
        for (var i=0;i<this.state.request.length;i++){
          let Helpdetail_list=[]; let Otherhelp=[];
          let id = this.state.request[i].RequestID;
          let Mobile = this.state.userMobile;
          await console.log(id)

          await axios.get(`http://localhost:4000/accept/acceptID/${id}/${Mobile}`).then(res=>{
            this.setState({
              AcceptID_state: res.data
            })
          }).catch((error)=>{
            console.log(error)
          })
          console.log(this.state.AcceptID_state)

          await axios.get(`http://localhost:4000/request/accept/${id}`).then(res=>{
            this.setState({
              helpRequest: res.data
            })
          }).catch((error)=>{
            console.log(error)
          })
          console.log(this.state.helpRequest)
          console.log(this.state.helpRequest.Other)
          console.log(this.state.helpRequest.Status_Text)
     
          await axios.get(`http://localhost:4000/request/all-accept-helpcode/${id}`).then(res=>{
            this.setState({
              Helpdetail: res.data
            })
          }).catch((error)=>{
            console.log(error)
          })
          console.log(this.state.Helpdetail)

          for(var j=0;j<this.state.Helpdetail.length;j++){
            Helpdetail_list.push(this.state.Helpdetail[j].Helpcode)
          }

          console.log(Helpdetail_list)
          this.setState({Helpdetail:Helpdetail_list})
          console.log(this.state.Helpdetail)

          var t ="";
          if (this.state.Helpdetail.indexOf("101") >-1) {
            t= t+"อาหาร"+" "
          }
          if (this.state.Helpdetail.indexOf("102") >-1) {
            t= t+"ยา"+" "
          }
          if (this.state.Helpdetail.indexOf("103") >-1) {
            t= t+"เตียง"+" "
          }
          if (this.state.Helpdetail.indexOf("104") >-1) {
            t= t+"รถนำส่งโรงพยาบาล"+" "
          }
          if (this.state.Helpdetail.indexOf("105") >-1) {
            t= t+"รถนำส่งภูมิลำเนา"+" "
          }
          if (this.state.helpRequest.Other!=="") {
            t= t+this.state.helpRequest.Other+" "
          }

          console.log(t)
          console.log(this.state.Helpdetail)
          var tmp = {
            help:t ,
            // Option: this.state.Option,
            status: this.state.helpRequest.Status,
            // Victim_Mobile: this.state.Mobile,
            // date: this.state.date,
            RequestID: id,
            AcceptID:this.state.AcceptID_state[0]._id,
            Helpcode:this.state.Helpdetail,
            status_text:this.state.helpRequest.Status_Text
          }
          var t ="";
          requset_list.push(tmp)
          requset_list.reverse()
          console.log(requset_list)
        }
        this.setState({request_state:requset_list})
      }
    }

    requestTable = () => {
      var topics = [];
      for (var z = 0; z < this.state.request_state.length; z++) {
        var temp = {
          help: this.state.request_state[z].help,
          // Option: this.state.request_state[z].Option,
          status: this.state.request_state[z].status,
          // Victim_Mobile: this.state.request_state[z].Victim_Mobile,
          // date: this.state.request_state[z].date,
          RequestID: this.state.request_state[z].RequestID,
          AcceptID:this.state.AcceptID_state[0]._id,
          Helpcode:this.state.request_state[z].Helpcode,
          status_text:this.state.request_state[z].status_text
        }
        topics.push(temp);
      }
      console.log(topics);
      // topics.reverse()
      return topics.map((res,i)=>{
        return <HelpRow obj={res} key={i} Mobile={this.state.userMobile}/>
      });
    }

      // sign out
      onSubmit=(e)=>{
        e.preventDefault()

        this.props.history.push({pathname:"/"})
      }

      // edit profile
      onSubmitEdit=(e)=>{
        e.preventDefault()

        const Mobile = this.state.userMobile
        this.props.history.push({pathname:`/helperprofile/edit-profile/${Mobile}`,state:{Mobile:this.state.userMobile}})
      }

    render() {
      return (
          <div>
              <Header Mobile={this.state.userMobile}/>
              <div class="container-lg" style={{width:"100%"}}>
              <div style={{display:"flex", margin:"5rem 0 0 2%"}}>
              <h1 style={{fontWeight:"bold", color:"#FFB172", textAlign:"left"}}>Profile</h1>
              <button class="rounded-pill " 
                      style={{border:"2px solid #FFB172", backgroundColor:"#ffffff", color:"#FFB172", 
                      width:"10%", height:"30%", fontWeight:"bold", margin:"1% 0 0 50vw", fontSize:"1.2vw"}}
                      onClick={this.onSubmitEdit}>Edit Profile
              </button>
              <button class="rounded-pill " 
                      style={{border:"2px solid #FFB172",backgroundColor:"#ffffff", color:"#FFB172", 
                      width:"10%", height:"30%", fontWeight:"bold", margin:"1% 0 0 2vw", fontSize:"1.2vw"}}
                      onClick={this.onSubmit}>Sign out
              </button>
              </div>
                  
              <div style={{ display:"flex"}}>
              <label style={{marginTop:"2%", marginLeft:"5%", color:"#FFB172", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit", display:(this.state.show_name? 'block':'none')}}>ชื่อ - สกุล : </label>
              <label style={{marginTop:"2%", marginLeft:"2%", color:"#FFB172", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit", display:(this.state.show_name? 'block':'none')}}>{this.state.Firstname}</label>
                      
              <label style={{marginTop:"2%", marginLeft:"5%", color:"#FFB172", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit", display:(this.state.show_org? 'block':'none')}}>ชื่อหน่วยงาน : </label>
              <label style={{marginTop:"2%", marginLeft:"2%", color:"#FFB172", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit", display:(this.state.show_org? 'block':'none')}}>{this.state.Org_Name}</label>
                          
              <label style={{marginTop:"2%", marginLeft:"2%", color:"#FFB172", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit", display:(this.state.show_name? 'block':'none')}}>{this.state.Lastname}</label>
              
              <label style={{marginTop:"2%", marginLeft:"40%", color:"#FFB172", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit"}}>เบอร์โทรศัพท์ : </label>
              <label style={{marginTop:"2%", marginLeft:"2%", color:"#FFB172", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit"}}>{this.state.userMobile}</label>
              </div>

              <div style={{ display:"flex"}}>
              <label style={{marginTop:"2%", marginLeft:"5%", color:"#FFB172", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit"}}>ที่อยู่ :</label>
              <label style={{marginTop:"2%", marginLeft:"2%", color:"#FFB172", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit"}}>{this.state.House_No}</label>
              <label style={{marginTop:"2%", marginLeft:"1%", color:"#FFB172", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit", display:(this.state.show_soi? 'block':'none')}}>ซอย {this.state.Soi}</label>  
              <label style={{marginTop:"2%", marginLeft:"1%", color:"#FFB172", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit", display:(this.state.show_road? 'block':'none')}}>ถนน {this.state.Road}</label>
              <label style={{marginTop:"2%", marginLeft:"1%", color:"#FFB172", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit"}}>แขวง {this.state.Subdistrict}</label>
              <label style={{marginTop:"2%", marginLeft:"1%", color:"#FFB172", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit"}}>เขต {this.state.District}</label>
              <label style={{marginTop:"2%", marginLeft:"1%", color:"#FFB172", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit"}}>{this.state.ZIP_Code}</label>
              <label style={{marginTop:"2%", marginLeft:"1%", color:"#FFB172", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit"}}>{this.state.Province}</label>   
              </div>
              <hr class="rounded-pill" style={{border:"2px solid #B4B6BB"}}/>
              
              <div>
              <h1 style={{margin:"3% 0 3% 2%", color:"#FFB172", fontWeight:"bold",
                  fontSize:"2vw", fontFamily:"Kanit", textAlign:"left"}}>รายการผู้ขอความช่วยเหลือที่เข้าช่วยเหลือ</h1>
              </div>  

              {/* <div style={{display:"inline-flex", margin:"5% 0 5% 5%", width:"100%"}}>
              <h1 style={{fontFamily:"Kanit", color:"#FFB172", textAlign:"left", fontSize:"1.8vw"}}>เลือกสถานะของรายการความช่วยเหลือ</h1>
              
              <select class="rounded-pill" style={{border:"2px solid #B4B6BB", width:"50%", 
                                marginLeft:"3%",fontFamily:"Kanit", fontSize:"1.5vw", color:"#707070"}} 
                            onChange={this.onChangeDistrict}>
                            <option style={{fontFamily:"Kanit"}}></option>
                            <option style={{fontFamily:"Kanit"}}>กำลังช่วยเหลือ</option>
                            <option style={{fontFamily:"Kanit"}}>รอการช่วยเหลือ</option>
                            <option style={{fontFamily:"Kanit"}}>ช่วยเหลือสำเร็จ</option>
                            
              </select>
              
              </div> */}
              <form>
              <table class="table table-borderless">
              <tbody>{this.requestTable()}</tbody>
              </table>
              </form>
              </div>
          </div>
      )
    }
  }

export default withRouter(HelperProfile);