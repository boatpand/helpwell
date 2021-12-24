import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class HelpRow extends Component {
    constructor(props){
        super(props)

        this.state = {
            user:"",
            House_No:"",
            Soi:"",
            Road:"",
            Subdistrict:"",
            District:"",
            ZIP_Code:"",
            Province:"",

            show_soi:true,
            show_road:true,

            Mobile:this.props.Mobile,

            wait:true,
            some:false,
            show_some:false,
            all:false,
            Status_Text:this.props.obj.Status_Text,
            Status:this.props.obj.Status,
            show_button:true,
        }
    }

    async componentDidMount(){
        console.log(`helper_mobile : ${this.state.Mobile}`)
        let mobile = this.props.obj.Victim_Mobile
        await axios.get(`http://localhost:4000/victimuser/victim-profile/${mobile}`).then(res => {
            this.setState({
            user: res.data
          })
        }).catch((error)=>{
          console.log(error)
        })
        // console.log(this.state.user)
        this.setState({House_No:this.state.user.House_No,
            Soi:this.state.user.Soi,
            Road:this.state.user.Road,
            Subdistrict:this.state.user.Subdistrict,
            District:this.state.user.District,
            ZIP_Code:this.state.user.ZIP_Code,
            Province:this.state.user.Province,
        })
        if(this.state.Soi==""){this.setState({show_soi:false})}
        if(this.state.Road==""){this.setState({show_road:false})}
        if(this.state.Status!=="กำลังช่วยเหลือ"){this.setState({show_button:false})}
        if(this.state.Status==="รอการช่วยเหลือ"){this.setState({wait:false,some:true,all:false,show_button:true})}
        if(this.state.Status==="ช่วยเหลือสำเร็จ"){this.setState({wait:false,some:false,all:true,show_button:false})}
    }

    onChangeSome = (e) =>{
        this.setState({Status_Text:e.target.value})
    }

    onSubmitSome = (e) =>{
        e.preventDefault();
        this.setState({show_some:"true"})
    }

    onClick = (e) =>{
        e.preventDefault();
        // update status text & update status in AcceptHelp, Request
        const updateRequestObject = {
            Status:'รอการช่วยเหลือ',
            Status_Text: this.state.Status_Text
        }

        let RequestID = String(this.props.obj.RequestID)
        axios.put(`http://localhost:4000/request/update-status/${RequestID}`,updateRequestObject).then((res)=>{
            console.log('status successfully updated')
            console.log(res.data);
        }).catch((error)=>{
            console.log(error)
        });

        const updateAcceptObject = {
            Status:'รอการช่วยเหลือ',
        }

        axios.put(`http://localhost:4000/accept/update-status/${RequestID}`,updateAcceptObject).then((res)=>{
            console.log('status successfully updated')
            console.log(res.data);
        }).catch((error)=>{
            console.log(error)
        });

        // setState some:true , others:false
        this.setState({some:true,
                        show_some:false,
                        wait:false,
                        all:false,
                        Status:'รอการช่วยเหลือ'
        })
    }

    onSubmitAll=(e)=>{
        e.preventDefault();
        const updateRequestObject = {
            Status:'ช่วยเหลือสำเร็จ',
            Status_Text: 'ช่วยเหลือสำเร็จ'
        }

        let RequestID = String(this.props.obj.RequestID)
        axios.put(`http://localhost:4000/request/update-status/${RequestID}`,updateRequestObject).then((res)=>{
            console.log('status successfully updated')
            console.log(res.data);
        }).catch((error)=>{
            console.log(error)
        });

        const updateAcceptObject = {
            Status:'ช่วยเหลือสำเร็จ'
        }

        axios.put(`http://localhost:4000/accept/update-status/${RequestID}`,updateAcceptObject).then((res)=>{
            console.log('status successfully updated')
            console.log(res.data);
        }).catch((error)=>{
            console.log(error)
        });

        // setState some:true , others:false
        this.setState({some:false,
                        show_some:false,
                        wait:false,
                        all:true,
                        Status:'ช่วยเหลือสำเร็จ',
                        show_button:false
        })
    }



render() {
    return (
        <div>
        <div class="container-lg" style={{width:"100%", textAlign:"left" }}>
        <div style={{display:"flex"}}>
        <div style={{width:"80%"}}>
        <Link style={{textDecorationLine:"none"}} to={{pathname: "/accept-request/"+this.props.obj.RequestID,state:{Mobile:this.state.Mobile, Cancel:true}}}>
            <h1 style={{fontFamily:"Kanit", color:"#FFB172", fontSize:"1.8vw", fontWeight:"bold"}}> 
            ความช่วยเหลือที่ต้องการ : {this.props.obj.help}</h1>
        </Link>

        {/* <button type="submit" class="helpbutton" style={{fontFamily:"Kanit"}} onClick={this.onSubmitRequest}>แผนที่</button> */}
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw"}}>รายละเอียด : {this.props.obj.Option}</p>

        <div style={{ display:"flex"}}>
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw"}}>ที่อยู่ :</p>
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw"}}> &nbsp; {this.state.House_No}</p>
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw", display:(this.state.show_soi? 'block':'none')}}> &nbsp; ซอย {this.state.Soi}</p>  
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw", display:(this.state.show_road? 'block':'none')}}> &nbsp; ถนน {this.state.Road}</p>
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw"}}> &nbsp; แขวง {this.state.Subdistrict}</p>
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw"}}> &nbsp; เขต {this.state.District}</p>
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw"}}> &nbsp; {this.state.ZIP_Code}</p>
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw"}}> &nbsp; {this.state.Province}</p>  
        </div> 
        
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw"}}>ช่องทางติดต่อ : {this.props.obj.Victim_Mobile}</p>
        </div>

        <div style={{width:"20%"}}>
        <div style={{display:"flex"}}>
        <h1 style={{fontFamily:"Kanit", color:"#B4B6BB" , fontSize:"1.5vw"}}>สถานะ :</h1>
        <h1 style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.5vw", display:(this.state.wait ? 'block':'none')}}> &nbsp;{this.state.Status}</h1> 
        <h1 style={{fontFamily:"Kanit", color:"#F1C40F", fontSize:"1.5vw", display:(this.state.some ? 'block':'none')}}> &nbsp;{this.state.Status}</h1> 
        <h1 style={{fontFamily:"Kanit", color:"#2ECC71", fontSize:"1.5vw", display:(this.state.all ? 'block':'none')}}> &nbsp;{this.state.Status}</h1> 
        </div>

        <div style={{display:(this.state.show_button ? 'block':'none')}}>
        <button class="rounded-pill " 
                style={{border:"2px solid #FFB172", backgroundColor:"#ffffff", color:"#FFB172", 
                      width:"100%", height:"20%", fontWeight:"bold", marginBottom:"5%", fontSize:"1.2vw"}}
                onClick={this.onSubmitSome}>ช่วยเหลือแล้วบางส่วน
        </button>
        <button class="rounded-pill " 
                style={{border:"2px solid #FFB172",backgroundColor:"#ffffff", color:"#FFB172", 
                      width:"100%", height:"20%", fontWeight:"bold", fontSize:"1.2vw"}}
                onClick={this.onSubmitAll}>ช่วยเหลือแล้วทั้งหมด
        </button> 
        </div>  
        </div>
        </div>

        <div style={{display:(this.state.show_some ? 'block':'none')}}> 
        <textarea type="text" class="rounded" placeholder='อัพเดทความคืบหน้า' rows="3" onChange={this.onChangeSome}
                    style={{border:"2px solid #B4B6BB", width:"100%", 
                            fontFamily:"Kanit", fontSize:"1.2vw"}}></textarea>
        <button  class="rounded-pill" onClick={this.onClick}
            style={{marginTop:"2%", marginBottom:"2%", background:"#FFB172", color:"#ffffff",
                    border:"2px solid #B4B6BB", width:"100%", fontSize:"1.5vw"}}>Save</button>
        </div>

        <hr/>
        </div>
    </div>
    )
}
}