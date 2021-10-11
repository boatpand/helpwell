import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './eventtablerow.css'

export default class EventTableRow extends Component {
    constructor(props){
        super(props)

        this.state = {
            Status:"รอการช่วยเหลือ"
        }
    }
    
    // onSubmitRequest = (e) => {
    //     e.preventDefault();
    //     this.setState({Status:"กำลังช่วยเหลือ"})
    //     console.log(this.props.obj.RequestID)
    //     console.log(this.state.Status)
    // }

    render() {
        return (
            <div>
            <form >
            <div className="helpinfo">
            {/* <h1 class="helpheader">ความช่วยเหลือที่ต้องการ : {this.props.obj.help_new}</h1> */}
            <Link style={{textDecorationLine:"none"}} to={"/accept-request/"+this.props.obj.RequestID}>
                <h1 class="helpheader" style={{fontFamily:"Kanit"}}> ความช่วยเหลือที่ต้องการ : {this.props.obj.help}</h1>
            </Link>
            {/* ความช่วยเหลือที่ต้องการ : {this.props.obj.help} */}
            <button type="submit" class="helpbutton" style={{fontFamily:"Kanit"}} onClick={this.onSubmitRequest}>แผนที่</button>
            {/* <p>lat : {this.props.obj.lat}</p>
            <p>long : {this.props.obj.long}</p> */}
            <p style={{fontFamily:"Kanit"}}>รายละเอียด : {this.props.obj.Option}</p>
            <p style={{fontFamily:"Kanit"}}>ความคืบหน้า : </p>
            <p style={{fontFamily:"Kanit"}}>ที่อยู่ : </p>
            <p style={{fontFamily:"Kanit"}}>ช่องทางติดต่อ : {this.props.obj.Contact}</p>
            <hr/>
            </div>
            </form>
        </div>
        )
    }
}
