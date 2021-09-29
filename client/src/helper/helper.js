import React, { Component } from "react";
import Header from "./header";
import axios from 'axios';
import EventTableRow from "./eventtablerow";
import "./helper.css";

export default class Helper extends Component {
  constructor(props){
    super(props);

    this.state = {
      helpoptionstatuses:[]
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
  }

  eventTable = () => {
    return this.state.helpoptionstatuses.map((res,i)=>{
      return <EventTableRow obj={res} key={i}/>
    })
  }

  onChangeFilter = (e) =>{
    axios.get('http://localhost:4000/events/all-event').then(res => {
      this.setState({
        helpoptionstatuses: res.data
      })
    }).catch((error)=>{
      console.log(error)
    })
  }

  render() {
    return (
      <div className="helpertopic">
        <Header />
        <h2>รายการผู้ขอความช่วยเหลือ</h2>
        <div className="filter">
          <div className="filter_clear">
            <h4>Filter</h4>
            <button type="submit" className="clear">
              clear
            </button>
          </div>
          <div class="filter-form-check">
            <input
              class="filter-check-input"
              type="checkbox"
              help="อาหาร"
            />
            <label class="filter-check-label" for="flexCheckDefault">
              อาหาร
            </label>
          </div>
          <div class="filter-form-check">
            <input
              class="filter-check-input"
              type="checkbox"
              help="ยา"
            />
            <label class="filter-check-label" for="flexCheckChecked">
              ยา
            </label>
          </div>
          <div class="filter-form-check">
            <input
              class="filter-check-input"
              type="checkbox"
              help="นำส่งโรงพยาบาล"
            />
            <label class="filter-check-label" for="flexCheckDefault">
              นำส่งโรงพยาบาล
            </label>
          </div>
          <div class="filter-form-check">
            <input
              class="filter-check-input"
              type="checkbox"
              help="นำส่งภูมิลำเนา"
            />
            <label class="filter-check-label" for="flexCheckDefault">
              นำส่งภูมิลำเนา
            </label>
          </div>
          <div class="filter-form-check">
            <input
              class="filter-check-input"
              type="checkbox"
              help="หาเตียง"
            />
            <label class="filter-check-label" for="flexCheckDefault">
              หาเตียง
            </label>
          </div>
          <div class="filter-form-check">
            <input
              class="filter-check-input"
              type="checkbox"
              help="อื่นๆ"
            />
            <label class="filter-check-label" for="flexCheckDefault">
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
