import React, { Component } from 'react'
import axios from 'axios';
import Header from './header';
import { withRouter } from "react-router-dom";
import './eventdetail.css'

class EventDetail extends Component {
    constructor(props){
        super(props);

        this.state = {
            // help:'',
            // lat:'',
            // long:'',
            // contact:'',
            // status:'',
            // helperID:''
            Food:false,
            count_Food:0,
            Medicine:false,
            count_Medicine:0,
            Hospital:false,
            count_Hospital:0,
            Home:false,
            count_Home:0,
            Bed:false,
            count_Bed:0,
            Other:"",
            count_Other:0,
            Option:'',
            date:'',
            // Additional
            Address:'',
            Contract:'',
            Status:'',
            count:0
        }
    }

    componentDidMount(){
        // console.log(this.props.match.params.id)
        axios.get("http://localhost:4000/request/accept-request/"+ this.props.match.params.id).then(res=>{
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
                date:res.data.date,
                // Additional
                Address:'',
                Contract:'',
                Status:'รอการช่วยเหลือ',
                count:0
            })
        });
    }

    componentDidUpdate(prevProps,prevState){
        if(this.state.Status!==prevState.Status){
            // console.log('didUpdate')
            var t = "";
            // var count = 0;
            if (this.state.Food === true) {
              t= t+"อาหาร"+" ";
            //   count++;
            }
            if (this.state.Medicine === true) {
              t= t+"ยา"+" ";
              // count++;
            }
            if (this.state.Hospital === true) {
              t= t+"นำส่งโรงพยาบาล"+" ";
              // count++;
            }
            if (this.state.Home === true) {
              t= t+"นำส่งภูมิลำเนา"+" ";
              // count++;
            }
            if (this.state.Bed === true) {
              t= t+"หาเตียง"+" ";
              // count++;
            }
            if (this.state.Other !== "") {
                t= t+this.state.Other;
              // count++;
            }
            t=t+" "
            this.setState({help:t})
            // var sub = t.split(" ")
            // this.setState({count:sub.length})
            // console.log(sub)
            // return sub
        }
    }

    // wait for update
    // onSubmit = (e) =>{
    //     e.preventDefault();

    //     const eventObject = {
    //         help:this.state.help,
    //         lat:this.state.lat,
    //         long:this.state.long,
    //         contact:this.state.contact,
    //         status:"กำลังช่วยเหลือ",
    //         helperID:this.state.helperID
    //     }

    //     axios.put('http://localhost:4000/events/update-event/'+this.props.match.params.id,eventObject).then((res)=>{
    //         console.log('event status successfully updated')
    //         console.log(res.data);
    //     }).catch((error)=>{
    //         console.log(error)
    //     });

    //     // Redirect to helplist
    //     this.props.history.push('/helper')
    //}

    render() {

        var t = [];
        if (this.state.Food === true) {t.push("อาหาร");}
        if (this.state.Medicine === true) {t.push("ยา");}
        if (this.state.Hospital === true) {t.push("นำส่งโรงพยาบาล");}
        if (this.state.Home === true) {t.push("นำส่งภูมิลำเนา");}
        if (this.state.Bed === true) {t.push("หาเตียง")}
        if (this.state.Other !== "") {t.push(this.state.Other);}

        var n = [];
        if (this.state.count_Food !== 0) {n.push(this.state.count_Food);}
        if (this.state.count_Medicine !== 0) {n.push(this.state.count_Medicine);}
        if (this.state.count_Hospital !== 0) {n.push(this.state.count_Hospital);}
        if (this.state.count_Home !== 0) {n.push(this.state.count_Home);}
        if (this.state.count_Bed !== 0) {n.push(this.state.count_Bed);}
        if (this.state.count_Other !== 0) {n.push(this.state.count_Other);}
        // console.log(n)

        const inputs = [];
        for (let i = 0; i < t.length; i++) {
        inputs.push(
        <label style={{fontFamily:"Kanit"}}>ความต้องการ
        <input  style={{marginRight:"50px" ,marginLeft:"50px", fontFamily:"Kanit"}} 
                name={`input-${i}`} value ={t[i]}/>จำนวน
        <input  style={{marginRight:"50px" ,marginLeft:"50px" , width:"80px", fontFamily:"Kanit"}}
                name={`input-${i}`} value={n[i]}/></label>)}

        return (
            <div>
                 <div className="helpertopic">
                <Header/>
                <h2 style={{fontFamily:"Kanit"}}>รายละเอียดผู้ขอความช่วยเหลือ</h2>
                </div>
                <form className="helpdetail" onSubmit={this.onSubmit}>
                <div class="mb-3 row">
                    <label style={{fontFamily:"Kanit"}} class="col-sm-2 col-form-label">ความช่วยเหลือ : </label>
                    <div class="col-sm-10" style={{display:"inline-flex"}}>
                    <input style={{fontFamily:"Kanit"}} type="text" class="form-control" value={this.state.help}></input>
                    <label style={{color:"#707070" , marginLeft:"200px", fontFamily:"Kanit"}}>เวลาที่ขอความช่วยเหลือ : {this.state.date}</label>
                    </div>
                </div>
                <div style={{textAlign:"left", marginLeft:"40px", display:'flex', marginBottom:"20px"}}>
                <h5 style={{fontFamily:"Kanit"}}>รายละเอียด :</h5>
                <label style={{marginLeft:"100px", color:"#707070", fontFamily:"Kanit"}}>{this.state.Option}</label>
                </div>
                <div style={{textAlign:"left", marginLeft:"40px", display:'flex', marginBottom:"20px"}}>
                <h5 style={{fontFamily:"Kanit"}}>ความคืบหน้า :</h5>
                <label style={{marginLeft:"100px", color:"#707070", fontFamily:"Kanit"}}></label>
                </div>
                <div style={{textAlign:"left", marginLeft:"40px", display:'flex', marginBottom:"20px"}}>
                <h5 style={{fontFamily:"Kanit"}}>ที่อยู่ : </h5>
                <label style={{marginLeft:"100px", color:"#707070", fontFamily:"Kanit"}}></label>
                </div>
                <div style={{textAlign:"left", marginLeft:"40px", display:'flex', marginBottom:"20px"}}>
                <h5 style={{fontFamily:"Kanit"}}>ช่องทางติดต่อ :</h5>
                <label style={{marginLeft:"100px", color:"#707070", fontFamily:"Kanit"}}>{this.state.Contact}</label>
                </div>
                <div>
                <hr style={{marginBottom:"40px"}}/>
                {inputs}  
                </div>
                {/* <div class="mb-3 row">
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
                </div> */}
                <div class="col-12">
                    <button type="submit" class="confirmbutton">Confirm</button>
                </div>
                </form>
            </div>
        )
    }
}
export default withRouter(EventDetail);