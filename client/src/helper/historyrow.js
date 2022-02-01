import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import axios from 'axios';

class HistoryRow extends Component {
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
            isOrg:false,
            H_Firstname:"g",
            H_Lastname:"lk",
            Org_Name:"",
            Helper:[]
        }
    }

    async componentDidMount(){
        console.log(`helper_mobile : ${this.state.Mobile}`)
        let id = this.props.obj.RequestID
        console.log(`${id}`)
        // await axios.get(`http://localhost:4000/accept/list/${id}`).then(res=>{
        //   this.setState({
        //     H_Firstname:res.data.Firstname,
        //     H_Lastname:res.data.Lastname,
        //     isOrg:res.data.isOrg,
        //     Org_Name:res.data.Org_Name
        //   })
        //   console.log(res.data)
        // });
        await axios.get(`http://localhost:4000/accept/list/${id}`).then(res => {
            this.setState({
                H_Firstname:res.data.Firstname,
                H_Lastname:res.data.Lastname,
                isOrg:res.data.isOrg,
                Org_Name:res.data.Org_Name
          })
        }).catch((error)=>{
          console.log(error)
          this.setState({H_Firstname:"", H_Lastname:""})
        })
        console.log(this.state.Helper)
        // this.setState({
        //   H_Firstname:this.state.Helper.Firstname,
        //   H_Lastname:this.state.Helper.Lastname,
        //   isOrg:this.state.Helper.isOrg,
        //   Org_Name:this.state.Helper.Org_Name
        // })


        if(this.state.isOrg===true){this.setState({Name:this.state.Org_Name})}
        else {this.setState({Name:this.state.H_Firstname+" "+this.state.H_Lastname})}

        console.log(this.state.Name)
        
        if(this.state.Status!=="กำลังช่วยเหลือ"){this.setState({show_button:false})}
        if(this.state.Status==="รอการช่วยเหลือ"){this.setState({wait:false,some:true,all:false,show_button:true})}
        if(this.state.Status==="ช่วยเหลือสำเร็จ"){this.setState({wait:false,some:false,all:true,show_button:false})}
    }

render() {
    return (
        <div>
        <div class="container-lg" style={{width:"100%", textAlign:"left" }}>
        <div style={{display:"flex"}}>
        <div style={{width:"80%"}}>
        <Link style={{textDecorationLine:"none"}} to={{pathname: "/accept-request/"+this.props.obj.RequestID,state:{Mobile:this.state.Mobile, Cancel:false}}}>
            <h1 style={{fontFamily:"Kanit", color:"#2F4A8A", fontSize:"1.8vw", fontWeight:"bold"}}> 
            {this.props.obj.help}</h1>
        </Link>

        {/* <button type="submit" class="helpbutton" style={{fontFamily:"Kanit"}} onClick={this.onSubmitRequest}>แผนที่</button> */}
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw"}}>รายละเอียด : {this.props.obj.Option}</p>

        <div style={{ display:"flex"}}>
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw"}}>ผู้ให้ความช่วยเหลือ : {this.state.Name}</p>
        </div> 
        
        </div>

        <div style={{width:"20%"}}>
        <div style={{display:"flex"}}>
        <h1 style={{fontFamily:"Kanit", color:"#B4B6BB" , fontSize:"1.5vw"}}>สถานะ :</h1>
        <h1 style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.5vw", display:(this.state.wait ? 'block':'none')}}> &nbsp;{this.state.Status}</h1> 
        <h1 style={{fontFamily:"Kanit", color:"#F1C40F", fontSize:"1.5vw", display:(this.state.some ? 'block':'none')}}> &nbsp;{this.state.Status}</h1> 
        <h1 style={{fontFamily:"Kanit", color:"#2ECC71", fontSize:"1.5vw", display:(this.state.all ? 'block':'none')}}> &nbsp;{this.state.Status}</h1> 
        </div>        
        </div>
        </div>

        <hr/>
        </div>
    </div>
    )
}
}
export default withRouter(HistoryRow);