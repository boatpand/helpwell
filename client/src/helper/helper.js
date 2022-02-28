import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import Header from "./header";
import axios from 'axios';
import EventTableRow from "./eventtablerow";
import "./style.css";

class Helper extends Component {
  constructor(props){
    super(props);

    this.state = {
      Mobile:this.props.location.state.Mobile,
      
      helpRequest:[],
      Otherhelp_state:[],
      
      Helpdetail:[],
      Helpcode_state:[],
      Option_state:[],
      HelpTopic:"",
      RequestID_state:[]
    }
  }

  async componentDidMount(){
    await axios.get('http://localhost:4000/request/all-request').then(res => {
        this.setState({
        helpRequest: res.data
      })
    }).catch((error)=>{
      console.log(error)
    })
    console.log(this.state.helpRequest)
    console.log(`user : ${this.props.location.state.Mobile}`)
  }
  
  async componentDidUpdate(prevProps,prevState){
    if(this.state.helpRequest!==prevState.helpRequest){
      console.log(this.state.helpRequest)
      let Helpdetail_list=[]; let Otherhelp=[];
    for(var i=0;i<this.state.helpRequest.length; i++){
      let id = await this.state.helpRequest[i].RequestID;
      console.log(id)
      await axios.get(`http://localhost:4000/request/all-request-helpcode/${id}`).then(res => {
          this.setState({
          Helpdetail: res.data
        })
      }).catch((error)=>{
        console.log(error)
      })
      Helpdetail_list.push(this.state.Helpdetail)
      
      if(this.state.helpRequest[i].Other===""){
        Otherhelp.push("ไม่มี")
      }
      else{
        Otherhelp.push(this.state.helpRequest[i].Other)
      }
      console.log(Helpdetail_list)
      console.log(Otherhelp)
    }

    let helpcode=[]; let helpcode_list=[]; let option=[]; let option_list=[]; 
    let request_id=[]; let request_id_list=[];
    for(var i=0;i<Helpdetail_list.length; i++){
      for(var j=0; j<Helpdetail_list[i].length; j++){
          helpcode.push(Helpdetail_list[i][j].Helpcode)
          option.push(Helpdetail_list[i][j].Option)
          request_id.push(Helpdetail_list[i][j].RequestID)
      }
      helpcode_list.push(helpcode);
      option_list.push(option);
      request_id_list.push(request_id);
      helpcode=[];
      option=[];
      request_id=[];
    }
    console.log(helpcode_list)
    console.log(request_id_list)

    await this.setState({
      Helpcode_state:helpcode_list, 
      Otherhelp_state:Otherhelp, 
      Option_state:option_list,
      RequestID_state:request_id_list
    })
    console.log(this.state.Helpcode_state.length)
    }
  }

  eventTable = () => {
    var topics = [];
    var t ="";
    console.log(this.state.Helpcode_state)
    for (var y = 0; y < this.state.Helpcode_state.length; y++) {
        if (this.state.Helpcode_state[y].indexOf("101") >-1) {
          t= t+"อาหาร"+" "
        }
        if (this.state.Helpcode_state[y].indexOf("102") >-1) {
          t= t+"ยา"+" "
        }
        if (this.state.Helpcode_state[y].indexOf("103") >-1) {
          t= t+"เตียง"+" "
        }
        if (this.state.Helpcode_state[y].indexOf("104") >-1) {
          t= t+"รถนำส่งโรงพยาบาล"+" "
        }
        if (this.state.Helpcode_state[y].indexOf("105") >-1) {
          t= t+"รถนำส่งภูมิลำเนา"+" "
        }
        if (this.state.Otherhelp_state[y]!=="ไม่มี") {
          t= t+this.state.Otherhelp_state[y]+" "
        }

      console.log(this.state.helpRequest[y])
      var tmp = {
        help:t,
        // Victim_Mobile: this.state.helpRequest[y].Mobile,
        RequestID: this.state.RequestID_state[y][0],
        // Status: this.state.helpRequest[y].Status,
        // Status_Text: this.state.helpRequest[y].Status_Text,
        // date: this.state.helpRequest[y].date,
      }
      t=""
      topics.push(tmp);
    }
    console.log(topics);
    // topics.reverse()
    return topics.map((res,i)=>{
      return <EventTableRow obj={res} key={i} Mobile={this.state.Mobile}/>
    });
  }

  // handle radio box filter
  handleAll = (e) =>{
    axios.get('http://localhost:4000/request/all-request').then(res => {
      this.setState({helpRequest: res.data})}).catch((error)=>{console.log(error)})
    }

  handleFood = async(e) => {
    await axios.get('http://localhost:4000/request/food-request').then(res => {
      this.setState({Helpdetail: res.data})}).catch((error)=>{console.log(error)})

    let request_list=[];
    for(var i=0;i<this.state.Helpdetail.length;i++){
      let id = this.state.Helpdetail[i].RequestID
      await axios.get(`http://localhost:4000/request/request-detail/${id}`).then(res => {
       request_list.push(res.data)}).catch((error)=>{console.log(error)})
    }
    console.log(request_list)
    await this.setState({helpRequest:request_list})
  }
      
  handleMedicine = async(e) => {
    await axios.get('http://localhost:4000/request/medicine-request').then(res => {
    this.setState({Helpdetail: res.data})}).catch((error)=>{console.log(error)})
  
    let request_list=[];
    for(var i=0;i<this.state.Helpdetail.length;i++){
      let id = this.state.Helpdetail[i].RequestID
      await axios.get(`http://localhost:4000/request/request-detail/${id}`).then(res => {
       request_list.push(res.data)}).catch((error)=>{console.log(error)})
    }
    await this.setState({helpRequest:request_list})
  }
    
  handleHospital = async(e) => {
    await axios.get('http://localhost:4000/request/hospital-request').then(res => {
    this.setState({Helpdetail: res.data})}).catch((error)=>{console.log(error)})
  
    let request_list=[];
    for(var i=0;i<this.state.Helpdetail.length;i++){
      let id = this.state.Helpdetail[i].RequestID
      await axios.get(`http://localhost:4000/request/request-detail/${id}`).then(res => {
       request_list.push(res.data)}).catch((error)=>{console.log(error)})
    }
    await this.setState({helpRequest:request_list})
  }
  
  handleHome = async(e) => {
    await axios.get('http://localhost:4000/request/home-request').then(res => {
    this.setState({Helpdetail: res.data})}).catch((error)=>{console.log(error)})
  
    let request_list=[];
    for(var i=0;i<this.state.Helpdetail.length;i++){
      let id = this.state.Helpdetail[i].RequestID
      await axios.get(`http://localhost:4000/request/request-detail/${id}`).then(res => {
       request_list.push(res.data)}).catch((error)=>{console.log(error)})
    }
    await this.setState({helpRequest:request_list})
  }
  
  handleBed = async(e) => {
    await axios.get('http://localhost:4000/request/bed-request').then(res => {
    this.setState({Helpdetail: res.data})}).catch((error)=>{console.log(error)})
    
    let request_list=[];
    for(var i=0;i<this.state.Helpdetail.length;i++){
      let id = this.state.Helpdetail[i].RequestID
      await axios.get(`http://localhost:4000/request/request-detail/${id}`).then(res => {
       request_list.push(res.data)}).catch((error)=>{console.log(error)})
    }
    await this.setState({helpRequest:request_list})
  }
  
  handleOther = async(e) => {
    await axios.get('http://localhost:4000/request/other-request').then(res => {
    this.setState({Helpdetail: res.data})}).catch((error)=>{console.log(error)})
  
    let request_list=[];
    for(var i=0;i<this.state.Helpdetail.length;i++){
      let id = this.state.Helpdetail[i].RequestID
      await axios.get(`http://localhost:4000/request/request-detail/${id}`).then(res => {
       request_list.push(res.data)}).catch((error)=>{console.log(error)})
    }
    await this.setState({helpRequest:request_list})
  }

render() {
  return (
    <div>
      <Header/>
      <div class="container-lg" style={{width:"100%"}}>
      <h1 style={{fontFamily:"Kanit", color:"#FFB172", textAlign:"left", margin:"4rem 0 0 2%", fontSize:"2.5vw"}}>รายการขอความช่วยเหลือที่ยังไม่ได้รับการช่วยเหลือ</h1>
      
      <div style={{display:"flex"}}>
      <div style={{fontFamily:"Kanit", color:"#FFB172", textAlign:"left", margin:"5% 0 0 2%", position:"fixed", width:"20%"}}>
        <h4 style={{fontSize:"2vw", color:"#FFB172", textAlign:"left"}}>Filter</h4>
        <div className="filter-form-check">
          <input
            class="filter-check-input"
            type="radio"
            name="helpfil"
            value="ทั้งหมด"
            onChange={this.handleAll}
            defaultChecked
          />
          <label class="filter-check-label" for="flexCheckChecked" 
                  style={{fontFamily:"Kanit", fontSize:"1.5vw", margin:"0 0 2% 10%"}}>
            ทั้งหมด
          </label>
        </div>
        <div className="filter-form-check">
          <input
            class="filter-check-input"
            type="radio"
            name="helpfil"
            value="อาหาร"
            onChange={this.handleFood}
          />
          <label class="filter-check-label" for="flexCheckChecked" 
                  style={{fontFamily:"Kanit", fontSize:"1.5vw", margin:"0 0 2% 10%"}}>
            อาหาร
          </label>
        </div>
        <div className="filter-form-check">
          <input
            class="filter-check-input"
            type="radio"
            name="helpfil"
            value="ยา"
            onChange={this.handleMedicine}
          />
          <label class="filter-check-label" for="flexCheckChecked" 
                  style={{fontFamily:"Kanit", fontSize:"1.5vw", margin:"0 0 2% 10%"}}>
            ยา
          </label>
        </div>
        <div className="filter-form-check">
          <input
            class="filter-check-input"
            type="radio"
            name="helpfil"
            value="นำส่งโรงพยาบาล"
            onChange={this.handleHospital}
          />
          <label class="filter-check-label" for="flexCheckDefault" 
                  style={{fontFamily:"Kanit", fontSize:"1.5vw", margin:"0 0 2% 10%"}}>
            นำส่งโรงพยาบาล
          </label>
        </div>
        <div className="filter-form-check">
          <input
            class="filter-check-input"
            type="radio"
            name="helpfil"
            value="นำส่งภูมิลำเนา"
            onChange={this.handleHome}
          />
          <label class="filter-check-label" for="flexCheckDefault" 
                  style={{fontFamily:"Kanit", fontSize:"1.5vw", margin:"0 0 2% 10%"}}>
            นำส่งภูมิลำเนา
          </label>
        </div>
        <div className="filter-form-check">
          <input
            class="filter-check-input"
            type="radio"
            name="helpfil"
            value="หาเตียง"
            onChange={this.handleBed}
          />
          <label class="filter-check-label" for="flexCheckDefault" 
                  style={{fontFamily:"Kanit", fontSize:"1.5vw", margin:"0 0 2% 10%"}}>
            หาเตียง
          </label>
        </div>
        <div className="filter-form-check">
          <input
            class="filter-check-input"
            type="radio"
            name="helpfil"
            value="อื่นๆ"
            onChange={this.handleOther}
          />
          <label class="filter-check-label" for="flexCheckDefault" 
                  style={{fontFamily:"Kanit", fontSize:"1.5vw", margin:"0 0 2% 10%"}}>
            อื่นๆ
          </label>
        </div>
      </div>
      <div style={{margin:"5% 0 0 22%", textAlign:"left", width:"80%"}}>
      <form>
      <table class="table table-borderless">
      <tbody>{this.eventTable()}</tbody>
      </table>
      </form>
      </div>
      </div>
      </div>
      </div>
  );
}
}
export default withRouter(Helper);