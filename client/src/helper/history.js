import React, { Component } from 'react';
import axios from 'axios';
import Header from './header';
import HistoryRow from './historyrow';

export default class History extends Component {
    constructor(props){
        super(props)
    
        this.state ={
            Mobile:this.props.location.state.Mobile,
            vic_mobile:this.props.location.state.vic_mobile,
            user:[],

            Firstname: "",
            Lastname: "",
            Age:"",
            Gender:"",
            Nationality:"",
            Race:"",

            House_No:"",
            Soi:"",
            Road:"",
            Subdistrict:"",
            District:"",
            ZIP_Code:"",
            Province:"",

            show_soi:true,
            show_road:true,
            show_name:true,

            disease:[],
            congenital:"",
            request:[],
            flag:false,
            request_state:[],

            Helper:[],
            Name:"",
            H_Firstname:"",
            H_Lastname:"",
            isOrg:"",
            Org_Name:""
        }
    }

    async componentDidMount(){
      const mobile = String(this.state.vic_mobile)
      await axios.get(`http://localhost:4000/victimuser/victim-profile/${mobile}`).then(res => {
            this.setState({
            user: res.data
          })
        }).catch((error)=>{
          console.log(error)
        })
        console.log(this.state.user)
        this.setState({Firstname:this.state.user.Firstname,
          Lastname:this.state.user.Lastname,
          Age:this.state.user.Age,
          Gender:this.state.user.Gender,
          Nationality:this.state.Nationality,
          Race:this.state.Race,
          // vic_mobile

          House_No:this.state.user.House_No,
          Soi:this.state.user.Soi,
          Road:this.state.user.Road,
          Subdistrict:this.state.user.Subdistrict,
          District:this.state.user.District,
          ZIP_Code:this.state.user.ZIP_Code,
          Province:this.state.user.Province,
          })
          if(this.state.Soi==""){this.setState({show_soi:false})}
          if(this.state.Road==""){this.setState({show_road:false})}

      await axios.get(`http://localhost:4000/victimuser/victim-disease/${mobile}`).then(res => {
          this.setState({
          disease: res.data
        })
      }).catch((error)=>{
        console.log(error)
      })
      this.setState({congenital:this.state.disease.Disease})
      console.log(this.state.disease.Disease)
      console.log(this.state.disease)

      await axios.get(`http://localhost:4000/request/request/${mobile}`).then(res => {
          this.setState({
          request: res.data
        })
      }).catch((error)=>{
        console.log(error)
      })
      console.log(this.state.request)
      this.setState({flag:true})

      // console.log(`helper_mobile: ${this.state.Mobile}`)
      // console.log(`victim_mobile: ${this.state.vic_mobile}`)
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

          await axios.get(`http://localhost:4000/request/accept/${id}`).then(res=>{
            this.setState({
              helpRequest: res.data
            })
          }).catch((error)=>{
            console.log(error)
          })
          console.log(this.state.helpRequest.Other)
     
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
            // AcceptID:this.state.AcceptID_state[0]._id,
            Helpcode:this.state.Helpdetail
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
          // AcceptID:this.state.AcceptID_state[0]._id,
          Helpcode:this.state.request_state[z].Helpcode
        }
        topics.push(temp);
      }
      console.log(topics);
      // topics.reverse()
      return topics.map((res,i)=>{
        return <HistoryRow obj={res} key={i} Mobile={this.state.Mobile}/>
      });
    }
  
  render() {
    return (
    <div>
        {/* <h1>{this.state.vic_mobile}</h1> */}
        <Header Mobile={this.state.Mobile}/>
        <div class="container-lg" style={{width:"100%"}}>
              <div style={{display:"flex", margin:"5rem 0 0 2%"}}>
              <h1 style={{fontWeight:"bold", color:"#2F4A8A", textAlign:"left"}}>Profile</h1>
              </div>
                  
              <div style={{ display:"flex"}}>
              <label style={{marginTop:"2%", marginLeft:"5%", color:"#2F4A8A", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit"}}>ชื่อ - สกุล : </label>
              <label style={{marginTop:"2%", marginLeft:"2%", color:"#2F4A8A", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit"}}>{this.state.Firstname}</label>
              <label style={{marginTop:"2%", marginLeft:"2%", color:"#2F4A8A", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit"}}>{this.state.Lastname}</label>
              <label style={{marginTop:"2%", marginLeft:"40%", color:"#2F4A8A", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit"}}>เบอร์โทรศัพท์ : </label>
              <label style={{marginTop:"2%", marginLeft:"2%", color:"#2F4A8A", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit"}}>{this.state.vic_mobile}</label>
              </div>

              <div style={{ display:"flex"}}>
              <label style={{marginTop:"2%", marginLeft:"5%", color:"#2F4A8A", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit"}}>อายุ : </label>
              <label style={{marginTop:"2%", marginLeft:"2%", color:"#2F4A8A", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit"}}>{this.state.Age}</label>
              <label style={{marginTop:"2%", marginLeft:"25%", color:"#2F4A8A", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit"}}>เพศ : </label>
              <label style={{marginTop:"2%", marginLeft:"2%", color:"#2F4A8A", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit"}}>{this.state.Gender}</label>
              <label style={{marginTop:"2%", marginLeft:"20%", color:"#2F4A8A", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit"}}>โรคประจำตัว : </label>
              <label style={{marginTop:"2%", marginLeft:"2%", color:"#2F4A8A", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit"}}>{this.state.congenital}</label>
              </div>

              <div style={{ display:"flex"}}>
              <label style={{marginTop:"2%", marginLeft:"5%", color:"#2F4A8A", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit"}}>ที่อยู่ :</label>
              <label style={{marginTop:"2%", marginLeft:"2%", color:"#2F4A8A", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit"}}>{this.state.House_No}</label>
              <label style={{marginTop:"2%", marginLeft:"1%", color:"#2F4A8A", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit", display:(this.state.show_soi? 'block':'none')}}>ซอย {this.state.Soi}</label>  
              <label style={{marginTop:"2%", marginLeft:"1%", color:"#2F4A8A", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit", display:(this.state.show_road? 'block':'none')}}>ถนน {this.state.Road}</label>
              <label style={{marginTop:"2%", marginLeft:"1%", color:"#2F4A8A", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit"}}>แขวง {this.state.Subdistrict}</label>
              <label style={{marginTop:"2%", marginLeft:"1%", color:"#2F4A8A", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit"}}>เขต {this.state.District}</label>
              <label style={{marginTop:"2%", marginLeft:"1%", color:"#2F4A8A", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit"}}>{this.state.ZIP_Code}</label>
              <label style={{marginTop:"2%", marginLeft:"1%", color:"#2F4A8A", fontWeight:"bold",
                          fontSize:"1.5vw", fontFamily:"Kanit"}}>{this.state.Province}</label>   
              </div>
              <hr class="rounded-pill" style={{border:"2px solid #B4B6BB"}}/>
              
              <div>
              <h1 style={{margin:"2% 0 2% 2%", color:"#2F4A8A", fontWeight:"bold",
                  fontSize:"2vw", fontFamily:"Kanit", textAlign:"left"}}>ประวัติการขอความช่วยเหลือ</h1>
              </div>  
              <form>
              <table class="table table-borderless">
              <tbody>{this.requestTable()}</tbody>
              </table>
              </form>
              </div>
    </div>
    );
  }
}
