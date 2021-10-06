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
      helpoptionstatuses:[],
      helpinneeds:[],
      search:""
    }
  }

  componentDidMount(){
    axios.get('http://localhost:4000/events/all-event').then(res => {
      this.setState({
        helpoptionstatuses: res.data
      })
    }).catch((error)=>{
      console.log(error)
    })
    axios.get('http://localhost:4000/helpinneeds/helpinneed').then(res => {
      this.setState({
        helpinneeds: res.data
      })
    }).catch((error)=>{
      console.log(error)
    })
    
  }
  
  eventTable = () => {
    // console.log(this.state.helpoptionstatuses)
    // console.log(this.state.helpinneeds.length)
    var topics = [];
    var t ="";
    for (var y = 0; y < this.state.helpinneeds.length; y++) {
      if (this.state.helpinneeds[y].food === true) {
        t= t+"อาหาร"+" "
      }
      if (this.state.helpinneeds[y].ยา === true) {
        t= t+"ยา"+" "
      }
      if (this.state.helpinneeds[y].นำส่งโรงพยาบาล === true) {
        t= t+"นำส่งโรงพยาบาล"+" "
      }
      if (this.state.helpinneeds[y].นำส่งภูมิลำเนา === true) {
        t= t+"นำส่งภูมิลำเนา"+" "
      }
      if (this.state.helpinneeds[y].หาเตียง === true) {
        t= t+"หาเตียง"+" "
      }
      t=t+this.state.helpinneeds[y].อื่นๆ+" "
      var tmp = {help:t ,RequestID: this.state.helpinneeds[y].RequestID }
      t=""
      topics.push(tmp);
    }
    // console.log(topics);

    var results = [];
    for (var i = 0; i < this.state.helpoptionstatuses.length; i++) {
        for (var j = 0; j < topics.length; j++) {
            if (this.state.helpinneeds[j].RequestID === this.state.helpoptionstatuses[i]._id) {
                var tmp = { 
                  help_new: topics[j].help,
                  RequestID: topics[j].RequestID,
                  help: this.state.helpoptionstatuses[i].help, 
                  lat: this.state.helpoptionstatuses[i].lat, 
                  long: this.state.helpoptionstatuses[i].long, 
                  contact: this.state.helpoptionstatuses[i].contact,
                  staus: this.state.helpoptionstatuses[i].status,  
                  helperID: this.state.helpoptionstatuses[i].helperID,
                }
                results.push(tmp);
            }
        }
    }
    // console.log(results);
 
    return results.map((res,i)=>{
      return <EventTableRow obj={res} key={i}/>
    });
  }

  handleChange(e) {
    var checkedValue = ""; 
    var inputElements = document.getElementsByClassName('filter-check-input');
    for(var i=0; inputElements[i]; ++i){
      if(inputElements[i].checked){
          checkedValue = checkedValue + inputElements[i].value + " ";
      }
    }
    if (checkedValue===""){
      axios.get('http://localhost:4000/events/all-event').then(res => {
      this.setState({
        helpoptionstatuses: res.data
      })
    }).catch((error)=>{
      console.log(error)
    })
    } 
    else{
      // console.log(checkedValue)
      // axios match
      const help = String(checkedValue);
      // console.log(`help:${help}`)
      axios.get(`http://localhost:4000/events/match-event/${help}`).then(res => {
      this.setState({
        helpoptionstatuses: res.data
      })
      }).catch((error)=>{
      console.log(error)
    })
    }
  }

  onSubmit=(e) => {
    e.preventDefault();
    var inputElements = document.getElementsByClassName('filter-check-input');
    for(var i=0; inputElements[i]; ++i){
      if(inputElements[i].checked){
          inputElements[i].checked=!inputElements[i].checked;
      }
    }
    this.setState({
      search:""
    })
    // var otherElement = document.getElementsByClassName('other-check-input');
    // otherElement.value= " ";
    
    axios.get('http://localhost:4000/events/all-event').then(res => {
      this.setState({
        helpoptionstatuses: res.data
      })
    }).catch((error)=>{
      console.log(error)
    })
  }

  handleChangeSearch = (e) =>{
    this.setState({search:e.target.value})
  }

  onSubmitSearch=(e) => {
    e.preventDefault();
    var inputElements = document.getElementsByClassName('filter-check-input');
    for(var i=0; inputElements[i]; ++i){
      if(inputElements[i].checked){
          inputElements[i].checked=!inputElements[i].checked;
      }
    }
    const help = String(this.state.search);
      // console.log(`help:${help}`)
      axios.get(`http://localhost:4000/events/match-event/${help}`).then(res => {
      this.setState({
        helpoptionstatuses: res.data
      })
      }).catch((error)=>{
      console.log(error)
    })
    // this.setState({
    //   search:""
    // })
  }

  render() {
    return (
      <div className="helpertopic" onChange={e => this.handleChange(e)}>
        <Header />
        <h2>รายการผู้ขอความช่วยเหลือ</h2>
        <div className="filter">
          <form className="filter_clear" onSubmit={this.onSubmit}>
            <h4>Filter</h4>
            <button type="submit" className="clear">
              clear
            </button>
          </form>
          <form className="filter-form-fil" onSubmit={this.onSubmitSearch}>
            <input
              class="other-check-input"
              type="text"
              name="helpfil"
              placeholder="   ระบุ"
              value={this.state.search}
              onChange={this.handleChangeSearch}
            />
            <button type="submit" className="searchbutton">search</button>
          </form>
          <div className="filter-form-check">
            <input
              class="filter-check-input"
              type="checkbox"
              name="helpfil"
              value="อาหาร"
            />
            <label class="filter-check-label" for="flexCheckChecked">
              อาหาร
            </label>
          </div>
          <div className="filter-form-check">
            <input
              class="filter-check-input"
              type="checkbox"
              name="helpfil"
              value="ยา"
            />
            <label class="filter-check-label" for="flexCheckChecked">
              ยา
            </label>
          </div>
          <div className="filter-form-check">
            <input
              class="filter-check-input"
              type="checkbox"
              name="helpfil"
              value="นำส่งโรงพยาบาล"
            />
            <label class="filter-check-label" for="flexCheckDefault">
              นำส่งโรงพยาบาล
            </label>
          </div>
          <div className="filter-form-check">
            <input
              class="filter-check-input"
              type="checkbox"
              name="helpfil"
              value="นำส่งภูมิลำเนา"
            />
            <label class="filter-check-label" for="flexCheckDefault">
              นำส่งภูมิลำเนา
            </label>
          </div>
          <div className="filter-form-check">
            <input
              class="filter-check-input"
              type="checkbox"
              name="helpfil"
              value="หาเตียง"
            />
            <label class="filter-check-label" for="flexCheckDefault">
              หาเตียง
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