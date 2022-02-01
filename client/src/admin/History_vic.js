import React, { Component } from 'react';
import axios from 'axios';
import Header_admin from './Header_admin';
import HistoryRowVic from './HistoryRow_vic';

export default class HistoryVic extends Component {
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
        for(var x=0; x<this.state.request.length;x++){
          requestID_list.push(this.state.request[x]._id)
        }
        console.log(requestID_list)

        for(var y=0;y<requestID_list.length;y++){
          var t="";
          var id = requestID_list[y];
          await axios.get(`http://localhost:4000/request/request-detail/${id}`).then(res=>{
            this.setState({
                Food:res.data.Food,
                count_Food:res.data.count_Food,
                Medicine:res.data.Medicine,
                count_Medicine:res.data.count_Medicine,
                Hospital:res.data.Hospital,
                count_Hospital:res.data.count_Hospital,
                Home:res.data.Home,
                count_Home:res.data.count_Home,
                Bed:res.data.Bed,
                count_Bed:res.data.count_Bed,
                Other:res.data.Other,
                count_Other:res.data.count_Other,
                Option:res.data.Option,
                Status:res.data.Status,
                Status_Text:res.data.Status_Text,
                date:res.data.date,

                RequestID:res.data._id
            })
        });

        if (this.state.Food === true) {
          t= t+"อาหาร"+" "
        }
        if (this.state.Medicine === true) {
          t= t+"ยา"+" "
        }
        if (this.state.Hospital === true) {
          t= t+"นำส่งโรงพยาบาล"+" "
        }
        if (this.state.Home === true) {
          t= t+"นำส่งภูมิลำเนา"+" "
        }
        if (this.state.Bed === true) {
          t= t+"หาเตียง"+" "
        }
        t=t+this.state.Other + " "
        // console.log(t)

        var tmp = {
          help:t ,
          Option: this.state.Option,
          Status: this.state.Status,
          Victim_Mobile: this.state.vic_mobile,
          date: this.state.date,
          RequestID: this.state.RequestID
        }
        requset_list.push(tmp)
        requset_list.reverse()
        // console.log(requset_list)
        }
        this.setState({request_state:requset_list})
        console.log(this.state.request_state)


      }
    }

    requestTable = () => {
      var topics = [];
      for(var z=0; z<this.state.request_state.length;z++){
        var temp = {
          help: this.state.request_state[z].help,
          Option: this.state.request_state[z].Option,
          Status: this.state.request_state[z].Status,
          Victim_Mobile: this.state.request_state[z].Victim_Mobile,
          date: this.state.request_state[z].date,
          RequestID: this.state.request_state[z].RequestID
        }
        topics.push(temp);
      }
      // console.log(topics);
      topics.reverse()
      return topics.map((res,i)=>{
        return <HistoryRowVic obj={res} key={i} Mobile={this.state.Mobile}/>
      });
    }
  
  render() {
    return (
    <div>
        {/* <h1>{this.state.vic_mobile}</h1> */}
        <Header_admin Mobile={this.state.Mobile}/>
        <div class="container-lg" style={{width:"100%"}}>
              <div style={{display:"flex", margin:"2rem 0 0 2%"}}>
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
