import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './eventtablerow.css'

export default class EventTableRow extends Component {
    render() {
        return (
            // <div>
            //     <div className="helpinfo">
            //     <h1 class="helpheader">ความช่วยเหลือที่ต้องการ : {this.props.obj.help}
            //     <Link to={"/event-detail/"+this.props.obj._id}>
            //     <button type="submit" class="helpbutton">ช่วยเหลือ</button></Link></h1>
            //     <p>lat : {this.props.obj.lat}</p>
            //     <p>long : {this.props.obj.long}</p>
            //     <p>contact: {this.props.obj.contact}</p>
            //     <hr/>
            //     </div>
            // </div>
            <div>
            <div className="helpinfo">
            <h1 class="helpheader">ความช่วยเหลือที่ต้องการ : {this.props.obj.help_new}</h1>
            <h1 class="helpheader">
                ความช่วยเหลือที่ต้องการ : {this.props.obj.help}
            <Link to={"/event-detail/"+this.props.obj.RequestID}>
            <button type="submit" class="helpbutton">ช่วยเหลือ</button></Link>
            </h1>
            <p>lat : {this.props.obj.lat}</p>
            <p>long : {this.props.obj.long}</p>
            <p>contact: {this.props.obj.contact}</p>
            <hr/>
            </div>
        </div>
        )
    }
}
