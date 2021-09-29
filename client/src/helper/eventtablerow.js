import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './eventtablerow.css'

export default class EventTableRow extends Component {
    render() {
        return (
            // <tr>
            //     <th scope="row">ควมาช่วยเหลือที่ต้องการ : </th>
            //     <td>{this.props.obj.help}</td>
            //     <td>{this.props.obj.lat}</td>
            //     <td>{this.props.obj.long}</td>
            //     <td>{this.props.obj.contact}</td>
            //     <td>{this.props.obj.status}</td>
            //     <td>
            //         <button type="button" class="helpbutton">
            //             ช่วยเหลือ
            //             {/* <Link to={"/"+this.props.obj._id}>ช่วยเหลือ</Link> */}
            //         </button>
            //     </td>
            // </tr>
            // <tbody>
            //     <tr>
            //     <th scope="row" class="helpheader">ความช่วยเหลือที่ต้องการ : </th>
            //     <td class="helpheader" >{this.props.obj.help}</td>
            //     <button type="button" class="helpbutton">ช่วยเหลือ</button>
            //     </tr>
            //     <tr>
            //     <th scope="row">lat : </th>
            //     <td>{this.props.obj.lat}</td>
            //     </tr>
            //     <tr>
            //     <th scope="row">long : </th>
            //     <td>{this.props.obj.long}</td>
            //     </tr>
            //     <tr>
            //     <th scope="row">contact : </th>
            //     <td>{this.props.obj.contact}</td>
            //     </tr>
            // </tbody>
            <div>
                <div className="helpinfo">
                <h1 class="helpheader">ความช่วยเหลือที่ต้องการ : {this.props.obj.help}
                <button type="button" class="helpbutton">ช่วยเหลือ</button></h1>
                <p>lat : {this.props.obj.lat}</p>
                <p>long : {this.props.obj.long}</p>
                <p>contact: {this.props.obj.contact}</p>
                <hr/>
                </div>
            </div>
        )
    }
}
