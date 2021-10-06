import React, { Component } from 'react'
import axios from 'axios';
import Header from './header';
import { withRouter } from "react-router-dom";
import './eventdetail.css'

class EventDetail extends Component {
    constructor(props){
        super(props);

        this.state = {
            help:'',
            lat:'',
            long:'',
            contact:'',
            status:'',
            helperID:''
        }
    }

    componentDidMount(){
        axios.get("http://localhost:4000/events/edit-event/" + this.props.match.params.id).then(res=>{
            this.setState({
                help:res.data.help,
                lat:res.data.lat,
                long:res.data.long,
                contact:res.data.contact,
                status:res.data.status,
                helperID:res.data.helperID
            })
        });
    }

    onSubmit = (e) =>{
        e.preventDefault();

        const eventObject = {
            help:this.state.help,
            lat:this.state.lat,
            long:this.state.long,
            contact:this.state.contact,
            status:"กำลังช่วยเหลือ",
            helperID:this.state.helperID
        }

        axios.put('http://localhost:4000/events/update-event/'+this.props.match.params.id,eventObject).then((res)=>{
            console.log('event status successfully updated')
            console.log(res.data);
        }).catch((error)=>{
            console.log(error)
        });

        // Redirect to helplist
        this.props.history.push('/helper')
    }
    render() {
        return (
            <div>
                 <div className="helpertopic">
                <Header/>
                <h2>รายละเอียดผู้ขอความช่วยเหลือ</h2>
                </div>
                <form className="helpdetail" onSubmit={this.onSubmit}>
                <div class="mb-3 row">
                    <label class="col-sm-2 col-form-label">ความช่วยเหลือ : </label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" value={this.state.help}></input>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label class="col-sm-2 col-form-label">lat : </label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" value={this.state.lat}></input>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label class="col-sm-2 col-form-label">long : </label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" value={this.state.long}></input>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label class="col-sm-2 col-form-label">เบอร์ติดต่อ : </label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" value={this.state.contact}></input>
                    </div>
                </div>
                <div class="col-12">
                    <button type="submit" class="confirmbutton">Confirm</button>
                </div>
                </form>
            </div>
        )
    }
}
export default withRouter(EventDetail);