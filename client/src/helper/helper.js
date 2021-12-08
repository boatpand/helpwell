import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./header";
import axios from 'axios';
import EventTableRow from "./eventtablerow";
import "./helper.css";

class Helper extends Component {
  constructor(props){
    super(props);

    this.state = {
      // helpoptionstatuses:[],
      // helpinneeds:[],
      helpRequest:[],
      Mobile:this.props.location.state.Mobile
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
    // console.log(this.state.helpoptionstatuses)
    // console.log(this.state.helpinneeds.length)
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
        RequestID:this.state.helpRequest[y]._id 
      }
      t=""
      topics.push(tmp);
    }
    // console.log(topics);
 
    return topics.map((res,i)=>{
      return <EventTableRow obj={res} key={i}/>
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
      <div className="helpertopic">
        <Header Mobile={this.state.Mobile}/>
        <h2 style={{fontFamily:"Kanit"}}>รายการผู้ขอความช่วยเหลือ</h2>
        <div className="filter">
          <form className="filter_clear">
            <h4>Filter</h4>
            {/* <button type="submit" className="clear">
              clear
            </button> */}
          </form>
          <div className="filter-form-check">
            <input
              class="filter-check-input"
              type="radio"
              name="helpfil"
              value="ทั้งหมด"
              onChange={this.handleAll}
              defaultChecked
            />
            <label class="filter-check-label" for="flexCheckChecked" style={{fontFamily:"Kanit"}}>
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
            <label class="filter-check-label" for="flexCheckChecked" style={{fontFamily:"Kanit"}}>
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
            <label class="filter-check-label" for="flexCheckChecked" style={{fontFamily:"Kanit"}}>
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
            <label class="filter-check-label" for="flexCheckDefault" style={{fontFamily:"Kanit"}}>
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
            <label class="filter-check-label" for="flexCheckDefault" style={{fontFamily:"Kanit"}}>
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
            <label class="filter-check-label" for="flexCheckDefault" style={{fontFamily:"Kanit"}}>
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
            <label class="filter-check-label" for="flexCheckDefault" style={{fontFamily:"Kanit"}}>
              อื่นๆ
            </label>
          </div>
        </div>
      
        <div className="helplist">
                <form>
                <table class="table table-borderless">
                    <tbody>
                      {this.eventTable()}
                    </tbody>
                    </table>
                </form>
            </div>
      </div>
    );
  }
}
export default withRouter(Helper);