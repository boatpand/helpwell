import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./header";
import axios from 'axios';
import EventTableRow from "./eventtablerow";
import "./style.css";

class Helper extends Component {
  constructor(props){
    super(props);

    this.state = {
      // helpoptionstatuses:[],
      // helpinneeds:[],
      helpRequest:[],
      Mobile:this.props.location.state.Mobile,
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
  
  eventTable = () => {
    var topics = [];
    var t ="";
    for (var y = 0; y < this.state.helpRequest.length; y++) {
      if (this.state.helpRequest[y].Food === true) {
        t= t+"อาหาร"+" "
      }
      if (this.state.helpRequest[y].Medicine === true) {
        t= t+"ยา"+" "
      }
      if (this.state.helpRequest[y].Hospital === true) {
        t= t+"นำส่งโรงพยาบาล"+" "
      }
      if (this.state.helpRequest[y].Home === true) {
        t= t+"นำส่งภูมิลำเนา"+" "
      }
      if (this.state.helpRequest[y].Bed === true) {
        t= t+"หาเตียง"+" "
      }
      t=t+this.state.helpRequest[y].Other + " "

      var tmp = {
        help:t ,
        Option: this.state.helpRequest[y].Option,
        Status_Text: this.state.helpRequest[y].Status_Text,
        Victim_Mobile: this.state.helpRequest[y].Mobile,
        date: this.state.helpRequest[y].date,
        RequestID: this.state.helpRequest[y]._id
      }
      t=""
      topics.push(tmp);
    }
    // // console.log(topics);
    // topics.reverse()
    return topics.map((res,i)=>{
      return <EventTableRow obj={res} key={i} Mobile={this.state.Mobile}/>
    });
  }

  // handle radio box filter
  handleAll = (e) =>{
    axios.get('http://localhost:4000/request/all-request').then(res => {
      this.setState({helpRequest: res.data})}).catch((error)=>{console.log(error)})}

  handleFood = (e) => {
    //console.log("done")
    axios.get('http://localhost:4000/request/food-request').then(res => {
      this.setState({helpRequest: res.data})}).catch((error)=>{console.log(error)})}

  handleMedicine = (e) => {
    //console.log("done")
    axios.get('http://localhost:4000/request/medicine-request').then(res => {
    this.setState({helpRequest: res.data})}).catch((error)=>{console.log(error)})}
  
  handleHospital = (e) => {
    //console.log("done")
    axios.get('http://localhost:4000/request/hospital-request').then(res => {
    this.setState({helpRequest: res.data})}).catch((error)=>{console.log(error)})}
  
  handleHome = (e) => {
    //console.log("done")
    axios.get('http://localhost:4000/request/home-request').then(res => {
    this.setState({helpRequest: res.data})}).catch((error)=>{console.log(error)})}
  
  handleBed = (e) => {
    //console.log("done")
    axios.get('http://localhost:4000/request/bed-request').then(res => {
    this.setState({helpRequest: res.data})}).catch((error)=>{console.log(error)})}
  
  handleOther = (e) => {
    //console.log("done")
    axios.get('http://localhost:4000/request/other-request').then(res => {
    this.setState({helpRequest: res.data})}).catch((error)=>{console.log(error)})}

render() {
  return (
    <div>
      <Header Mobile={this.state.Mobile}/>
      <div class="container-lg" style={{width:"100%"}}>
      <h1 style={{fontFamily:"Kanit", color:"#FFB172", textAlign:"left", margin:"4rem 0 0 2%", fontSize:"2.5vw"}}>รายการขอความช่วยเหลือที่ยังไม่ได้รับการช่วยเหลือ</h1>
      
      <div style={{display:"inline-flex", margin:"5% 0 0 5%", width:"100%"}}>
      <h1 style={{fontFamily:"Kanit", color:"#FFB172", textAlign:"left", fontSize:"1.8vw"}}>ให้ความช่วยเหลือโดยค้นหาจากเขต</h1>
      <select class="rounded-pill" style={{border:"2px solid #B4B6BB", width:"50%", 
                        marginLeft:"3%",fontFamily:"Kanit", fontSize:"1.5vw", color:"#707070"}} 
                    onChange={this.onChangeDistrict}>
                    <option style={{fontFamily:"Kanit"}}></option>
                    <option style={{fontFamily:"Kanit"}}>พระนคร</option>
                    <option style={{fontFamily:"Kanit"}}>ดุสิต</option>
                    <option style={{fontFamily:"Kanit"}}>หนองจอก</option>
                    <option style={{fontFamily:"Kanit"}}>บางรัก</option>
                    <option style={{fontFamily:"Kanit"}}>บางเขน</option>
                    <option style={{fontFamily:"Kanit"}}>บางกะปิ</option>
                    <option style={{fontFamily:"Kanit"}}>ปทุมวัน</option>
                    <option style={{fontFamily:"Kanit"}}>ป้อมปราบศัตรูพ่าย</option>
                    <option style={{fontFamily:"Kanit"}}>พระโขนง</option>
                    <option style={{fontFamily:"Kanit"}}>มีนบุรี</option>
                    <option style={{fontFamily:"Kanit"}}>ลาดกระบัง</option>
                    <option style={{fontFamily:"Kanit"}}>ยานนาวา</option>
                    <option style={{fontFamily:"Kanit"}}>สัมพันธวงศ์</option>
                    <option style={{fontFamily:"Kanit"}}>พญาไท</option>
                    <option style={{fontFamily:"Kanit"}}>ธนบุรี</option>
                    <option style={{fontFamily:"Kanit"}}>บางกอกใหญ่</option>
                    <option style={{fontFamily:"Kanit"}}>ห้วยขวาง</option>
                    <option style={{fontFamily:"Kanit"}}>คลองสาน</option>
                    <option style={{fontFamily:"Kanit"}}>ตลิ่งชัน</option>
                    <option style={{fontFamily:"Kanit"}}>บางกอกน้อย</option>
                    <option style={{fontFamily:"Kanit"}}>บางขุนเทียน</option>
                    <option style={{fontFamily:"Kanit"}}>ภาษีเจริญ</option>
                    <option style={{fontFamily:"Kanit"}}>หนองแขม</option>
                    <option style={{fontFamily:"Kanit"}}>ราษฎร์บูรณะ</option>
                    <option style={{fontFamily:"Kanit"}}>บางพลัด</option>
                    <option style={{fontFamily:"Kanit"}}>ดินแดง</option>
                    <option style={{fontFamily:"Kanit"}}>บึงกุ่ม</option>
                    <option style={{fontFamily:"Kanit"}}>สาทร</option>
                    <option style={{fontFamily:"Kanit"}}>บางซื่อ</option>
                    <option style={{fontFamily:"Kanit"}}>จตุจักร</option>
                    <option style={{fontFamily:"Kanit"}}>บางคอแหลม</option>
                    <option style={{fontFamily:"Kanit"}}>ประเวศ</option>
                    <option style={{fontFamily:"Kanit"}}>คลองเตย</option>
                    <option style={{fontFamily:"Kanit"}}>สวนหลวง</option>
                    <option style={{fontFamily:"Kanit"}}>จอมทอง</option>
                    <option style={{fontFamily:"Kanit"}}>ดอนเมือง</option>
                    <option style={{fontFamily:"Kanit"}}>ราชเทวี</option>
                    <option style={{fontFamily:"Kanit"}}>ลาดพร้าว</option>
                    <option style={{fontFamily:"Kanit"}}>วัฒนา</option>
                    <option style={{fontFamily:"Kanit"}}>บางแค</option>
                    <option style={{fontFamily:"Kanit"}}>หลักสี่</option>
                    <option style={{fontFamily:"Kanit"}}>สายไหม</option>
                    <option style={{fontFamily:"Kanit"}}>คันนายาว</option>
                    <option style={{fontFamily:"Kanit"}}>สะพานสูง</option>
                    <option style={{fontFamily:"Kanit"}}>วังทองหลาง</option>
                    <option style={{fontFamily:"Kanit"}}>คลองสามวา</option>
                    <option style={{fontFamily:"Kanit"}}>บางนา</option>
                    <option style={{fontFamily:"Kanit"}}>ทวีวัฒนา</option>
                    <option style={{fontFamily:"Kanit"}}>ทุ่งครุ</option>
                    <option style={{fontFamily:"Kanit"}}>บางบอน</option>
      </select>
      </div>
      
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