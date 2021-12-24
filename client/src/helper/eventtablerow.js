import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class EventTableRow extends Component {
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

            Mobile:this.props.Mobile
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
    }

render() {
    return (
        <div>
        <div class="container-lg" style={{width:"100%"}}>
        <Link style={{textDecorationLine:"none"}} to={{pathname: "/accept-request/"+this.props.obj.RequestID,state:{Mobile:this.state.Mobile, Cancel:false}}}>
            <h1 style={{fontFamily:"Kanit", color:"#FFB172", fontSize:"1.8vw"}}> 
            ความช่วยเหลือที่ต้องการ : {this.props.obj.help}</h1>
        </Link>
        {/* <button type="submit" class="helpbutton" style={{fontFamily:"Kanit"}} onClick={this.onSubmitRequest}>แผนที่</button> */}
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw", margin:"2% 0 0 0"}}>ขอความช่วยเหลือเมื่อ : {this.props.obj.date}</p>
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw", margin:"2% 0 0 0"}}>รายละเอียด : {this.props.obj.Option}</p>
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw", margin:"2% 0 0 0"}}>ความคืบหน้า : {this.props.obj.Status_Text}</p>

        <div style={{ display:"flex",margin:"2% 0 0 0"}}>
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw"}}>ที่อยู่ :</p>
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw"}}> &nbsp; {this.state.House_No}</p>
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw", display:(this.state.show_soi? 'block':'none')}}> &nbsp; ซอย {this.state.Soi}</p>  
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw", display:(this.state.show_road? 'block':'none')}}> &nbsp; ถนน {this.state.Road}</p>
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw"}}> &nbsp; แขวง {this.state.Subdistrict}</p>
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw"}}> &nbsp; เขต {this.state.District}</p>
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw"}}> &nbsp; {this.state.ZIP_Code}</p>
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw"}}> &nbsp; {this.state.Province}</p>  
        </div> 
        
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw", margin:"0 0 0 0"}}>ช่องทางติดต่อ : {this.props.obj.Victim_Mobile}</p>
        <hr/>
        </div>
    </div>
    )
}
}
