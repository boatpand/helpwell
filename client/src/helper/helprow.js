import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import { ThemeProvider } from '@emotion/react';

class HelpRow extends Component {
    constructor(props){
        super(props)

        this.state = {
            user:"",
            // House_No:"",
            // Soi:"",
            // Road:"",
            // Subdistrict:"",
            // District:"",
            // ZIP_Code:"",
            // Province:"",

            // show_soi:true,
            // show_road:true,

            Mobile:this.props.Mobile,

            wait:true,
            some:false,
            show_some:false,
            all:false,
            Status_Text:this.props.obj.status_text,
            Status_Text_New:"",
            Status:this.props.obj.status,
            show_button:true,

            // For Acceptupdate
            AcceptID:this.props.obj.AcceptID,
            Helpcode:this.props.obj.Helpcode,

            // updatesome trigger
            showUpdateFood:false,
            showUpdateMedicine:false,
            showUpdateBed:false,
            showUpdateHospital:false,
            showUpdateHome:false,
            showUpdateOther:false,
            updateCode:[],
        }
    }

    async componentDidMount(){
        console.log(`helper_mobile : ${this.state.Mobile}`)
        // let mobile = this.props.obj.Victim_Mobile
        // await axios.get(`http://localhost:4000/victimuser/victim-profile/${mobile}`).then(res => {
        //     this.setState({
        //     user: res.data
        //   })
        // }).catch((error)=>{
        //   console.log(error)
        // })
        // // console.log(this.state.user)
        // this.setState({House_No:this.state.user.House_No,
        //     Soi:this.state.user.Soi,
        //     Road:this.state.user.Road,
        //     Subdistrict:this.state.user.Subdistrict,
        //     District:this.state.user.District,
        //     ZIP_Code:this.state.user.ZIP_Code,
        //     Province:this.state.user.Province,
        // })
        // if(this.state.Soi==""){this.setState({show_soi:false})}
        // if(this.state.Road==""){this.setState({show_road:false})}
        if(this.state.Status!=="กำลังช่วยเหลือ"){this.setState({show_button:true})}
        if(this.state.Status==="รอการช่วยเหลือ"){this.setState({wait:false,some:true,all:false,show_button:true})}
        if(this.state.Status==="ช่วยเหลือสำเร็จ"){this.setState({wait:false,some:false,all:true,show_button:false})}
    }

    onChangeSome = (e) =>{
        this.setState({Status_Text_New:e.target.value})
    }

    onSubmitSome = (e) =>{
        e.preventDefault();
        this.setState({show_some:!this.state.show_some})

        console.log(this.state.Helpcode)
        if(this.state.Helpcode.indexOf('101')>-1){
            this.setState({showUpdateFood:true})
        }
        if(this.state.Helpcode.indexOf('102')>-1){
            this.setState({showUpdateMedicine:true})
        }
        if(this.state.Helpcode.indexOf('103')>-1){
            this.setState({showUpdateBed:true})
        }
        if(this.state.Helpcode.indexOf('104')>-1){
            this.setState({showUpdateHospital:true})
        }
        if(this.state.Helpcode.indexOf('105')>-1){
            this.setState({showUpdateHome:true})
        }
        if(this.state.Helpcode.indexOf('106')>-1){
            this.setState({showUpdateOther:true})
        }
    }

    HandleInput = (e) => {
        const updateCode = this.state.updateCode
        let index
    
        // check if the check box is checked or unchecked
        if (e.target.checked) {
          // add the numerical value of the checkbox to options array
          updateCode.push(+e.target.value)
        } else {
          // or remove the value from the unchecked checkbox from the array
          index = updateCode.indexOf(+e.target.value)
          updateCode.splice(index, 1)
        }
    
        // sort the array
        updateCode.sort() 
    
        // update the state with the new array of options
        this.setState({ updateCode: updateCode })
    }
  
    // save button
    onClick = async (e) =>{
        e.preventDefault();
        // update status text & update statusTEXT to RequestSchema
        const updateRequestObject = {
            Status:'รอการช่วยเหลือ',
            Status_Text: this.state.Status_Text_New
        }
        let RequestID = String(this.props.obj.RequestID)
        await axios.put(`http://localhost:4000/request/update-help/${RequestID}`,updateRequestObject).then((res)=>{
            console.log('status RequestSchema successfully updated')
            console.log(res.data);
        }).catch((error)=>{
            console.log(error)
        });

        // update to RequestDetailSchema
        console.log(this.state.updateCode)
        if(this.state.updateCode.indexOf(101)>-1){
            console.log("have food")
            const updateDetailObject = {
                Status:'ช่วยเหลือสำเร็จ',
            }
            let RequestID = String(this.props.obj.RequestID)
            await axios.put(`http://localhost:4000/request/update-food-detail/${RequestID}`,updateDetailObject).then((res)=>{
                console.log('status RequestSchema successfully updated')
                console.log(res.data);
            }).catch((error)=>{
                console.log(error)
            });
        } else{
            console.log("dont have food")
            const updateDetailObject = {
                Status:'รอการช่วยเหลือ',
            }
            let RequestID = String(this.props.obj.RequestID)
            await axios.put(`http://localhost:4000/request/update-food-detail/${RequestID}`,updateDetailObject).then((res)=>{
                console.log('status RequestSchema successfully updated')
                console.log(res.data);
            }).catch((error)=>{
                console.log(error)
            });
        }
        if(this.state.updateCode.indexOf(102)>-1){
            const updateDetailObject = {
                Status:'ช่วยเหลือสำเร็จ',
            }
            let RequestID = String(this.props.obj.RequestID)
            await axios.put(`http://localhost:4000/request/update-medicine-detail/${RequestID}`,updateDetailObject).then((res)=>{
                console.log('status RequestSchema successfully updated')
                console.log(res.data);
            }).catch((error)=>{
                console.log(error)
            });
        } else{
            const updateDetailObject = {
                Status:'รอการช่วยเหลือ',
            }
            let RequestID = String(this.props.obj.RequestID)
            await axios.put(`http://localhost:4000/request/update-medicine-detail/${RequestID}`,updateDetailObject).then((res)=>{
                console.log('status RequestSchema successfully updated')
                console.log(res.data);
            }).catch((error)=>{
                console.log(error)
            });
        }
        if(this.state.updateCode.indexOf(103)>-1){
            const updateDetailObject = {
                Status:'ช่วยเหลือสำเร็จ',
            }
            let RequestID = String(this.props.obj.RequestID)
            await axios.put(`http://localhost:4000/request/update-bed-detail/${RequestID}`,updateDetailObject).then((res)=>{
                console.log('status RequestSchema successfully updated')
                console.log(res.data);
            }).catch((error)=>{
                console.log(error)
            });
        } else{
            const updateDetailObject = {
                Status:'รอการช่วยเหลือ',
            }
            let RequestID = String(this.props.obj.RequestID)
            await axios.put(`http://localhost:4000/request/update-bed-detail/${RequestID}`,updateDetailObject).then((res)=>{
                console.log('status RequestSchema successfully updated')
                console.log(res.data);
            }).catch((error)=>{
                console.log(error)
            });
        }
        if(this.state.updateCode.indexOf(104)>-1){
            const updateDetailObject = {
                Status:'ช่วยเหลือสำเร็จ',
            }
            let RequestID = String(this.props.obj.RequestID)
            await axios.put(`http://localhost:4000/request/update-hospital-detail/${RequestID}`,updateDetailObject).then((res)=>{
                console.log('status RequestSchema successfully updated')
                console.log(res.data);
            }).catch((error)=>{
                console.log(error)
            });
        } else{
            const updateDetailObject = {
                Status:'รอการช่วยเหลือ',
            }
            let RequestID = String(this.props.obj.RequestID)
            await axios.put(`http://localhost:4000/request/update-hospital-detail/${RequestID}`,updateDetailObject).then((res)=>{
                console.log('status RequestSchema successfully updated')
                console.log(res.data);
            }).catch((error)=>{
                console.log(error)
            });
        }
        if(this.state.updateCode.indexOf(105)>-1){
            const updateDetailObject = {
                Status:'ช่วยเหลือสำเร็จ',
            }
            let RequestID = String(this.props.obj.RequestID)
            await axios.put(`http://localhost:4000/request/update-home-detail/${RequestID}`,updateDetailObject).then((res)=>{
                console.log('status RequestSchema successfully updated')
                console.log(res.data);
            }).catch((error)=>{
                console.log(error)
            });
        } else{
            const updateDetailObject = {
                Status:'รอการช่วยเหลือ',
            }
            let RequestID = String(this.props.obj.RequestID)
            await axios.put(`http://localhost:4000/request/update-home-detail/${RequestID}`,updateDetailObject).then((res)=>{
                console.log('status RequestSchema successfully updated')
                console.log(res.data);
            }).catch((error)=>{
                console.log(error)
            });
        }
        if(this.state.updateCode.indexOf(106)>-1){
            const updateDetailObject = {
                Status:'ช่วยเหลือสำเร็จ',
            }
            let RequestID = String(this.props.obj.RequestID)
            await axios.put(`http://localhost:4000/request/update-other-detail/${RequestID}`,updateDetailObject).then((res)=>{
                console.log('status RequestSchema successfully updated')
                console.log(res.data);
            }).catch((error)=>{
                console.log(error)
            });
        } else{
            const updateDetailObject = {
                Status:'รอการช่วยเหลือ',
            }
            let RequestID = String(this.props.obj.RequestID)
            await axios.put(`http://localhost:4000/request/update-other-detail/${RequestID}`,updateDetailObject).then((res)=>{
                console.log('status RequestSchema successfully updated')
                console.log(res.data);
            }).catch((error)=>{
                console.log(error)
            });
        }
        
        // Update to AccepthelpSchema
        const updateAcceptObject = {
            // Mobile:this.state.Mobile,
            // Other:this.state.Other,
            Status:'รอการช่วยเหลือ',
            Status_Text:this.state.Status_Text_New,
            date:this.state.date,
        }
        await axios.put(`http://localhost:4000/accept/update-status/${RequestID}`,updateAcceptObject).then((res)=>{
            console.log('status AccepthelpSchema successfully updated')
            console.log(res.data);
        }).catch((error)=>{
            console.log(error)
        });

        // Post to AcceptupdateSchema
        const acceptUpdateObject = {
            AcceptID:this.state.AcceptID,
            Helpcode:this.state.updateCode
        }
        await axios.post('http://localhost:4000/accept/accept-update', acceptUpdateObject).then(res =>
        console.log(res.data));


        // setState some:true , others:false
        this.setState({some:true,
                        show_some:false,
                        wait:false,
                        all:false,
                        Status:'รอการช่วยเหลือ',
                        Status_Text_New:"",
        })

        // Redirect to landing
        this.props.history.push({pathname:`/helper`,state:{Mobile:this.state.Mobile}})
    }

    onSubmitAll=(e)=>{
        e.preventDefault();

        const updateRequestObject = {
            Status:'ช่วยเหลือสำเร็จ',
            Status_Text: 'ช่วยเหลือสำเร็จ'
        }
        let RequestID = String(this.props.obj.RequestID)
        axios.put(`http://localhost:4000/request/update-help/${RequestID}`,updateRequestObject).then((res)=>{
            console.log('status in ReqestSchema successfully updated')
            console.log(res.data);
        }).catch((error)=>{
            console.log(error)
        });

        const updateAcceptObject = {
            Status:'ช่วยเหลือสำเร็จ'
        }
        axios.put(`http://localhost:4000/request/update-help-detail/${RequestID}`,updateAcceptObject).then((res)=>{
            console.log('status in RequestDetailSchema successfully updated')
            console.log(res.data);
        }).catch((error)=>{
            console.log(error)
        });

        axios.put(`http://localhost:4000/accept/update-status/${RequestID}`,updateAcceptObject).then((res)=>{
            console.log('status in AccepthelpSchema successfully updated')
            console.log(res.data);
        }).catch((error)=>{
            console.log(error)
        });

        // post AcceptupdateSchema
        const acceptUpdateObject = {
            AcceptID:this.state.AcceptID,
            Helpcode:this.state.Helpcode,
            }
        axios.post('http://localhost:4000/accept/accept-update', acceptUpdateObject).then(res =>
        console.log(res.data));
  

        // setState some:true , others:false
        this.setState({some:false,
                        show_some:false,
                        wait:false,
                        all:true,
                        Status:'ช่วยเหลือสำเร็จ',
                        show_button:false
        })

        // Redirect to landing
        this.props.history.push({pathname:`/helper`,state:{Mobile:this.state.Mobile}})
    }

    // Navigation=(e)=>{
    //     e.preventDefault();
        
    //     let RequestID = String(this.props.obj.RequestID)
    //     console.log(RequestID)
    //     this.props.history.push({
    //         pathname: `/${RequestID}/navigation`,
    //         search: '',
    //         state: {Helper_Mobile:this.state.Mobile, 
    //                 RequestID:this.props.obj.RequestID,
    //                 Mobile:this.props.obj.Victim_Mobile
    //             } 
    //       })
    // }

render() {
    return (
        <div>
        <div class="container-lg" style={{width:"100%", textAlign:"left" }}>
        <div style={{display:"flex"}}>
        <div style={{width:"80%"}}>
        <Link style={{textDecorationLine:"none"}} to={{pathname: "/accept-request/"+this.props.obj.RequestID,state:{Mobile:this.state.Mobile, Cancel:true, HelpTopic:this.props.obj.help}}}>
            <h1 style={{fontFamily:"Kanit", color:"#FFB172", fontSize:"1.8vw"}}> 
            ความช่วยเหลือที่ต้องการ : {this.props.obj.help}</h1>
        </Link>

        {/* <button type="submit" class="helpbutton" style={{fontFamily:"Kanit"}} onClick={this.onSubmitRequest}>แผนที่</button> */}
        {/* <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw"}}>รายละเอียด : {this.props.obj.Option}</p> */}

        {/* <div style={{ display:"flex"}}>
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw"}}>ที่อยู่ :</p>
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw"}}> &nbsp; {this.state.House_No}</p>
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw", display:(this.state.show_soi? 'block':'none')}}> &nbsp; ซอย {this.state.Soi}</p>  
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw", display:(this.state.show_road? 'block':'none')}}> &nbsp; ถนน {this.state.Road}</p>
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw"}}> &nbsp; แขวง {this.state.Subdistrict}</p>
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw"}}> &nbsp; เขต {this.state.District}</p>
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw"}}> &nbsp; {this.state.ZIP_Code}</p>
        <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw"}}> &nbsp; {this.state.Province}</p>  
        </div>  */}
        
        {/* <p style={{fontFamily:"Kanit", color:"#B4B6BB", fontSize:"1.2vw"}}>ช่องทางติดต่อ : {this.props.obj.Victim_Mobile}</p> */}
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

        <div style={{display:(this.state.show_button ? 'flex':'none'), width:"80%", margin:"0 25% 0 25%"}}>
        <button class="rounded-pill " 
                style={{border:"2px solid #FFB172", backgroundColor:"#ffffff", color:"#FFB172", 
                      width:"30%", margin:"0 2% 0 0",height:"20%", fontWeight:"bold", fontSize:"1.2vw"}}
                onClick={this.onSubmitSome}>ช่วยเหลือแล้วบางส่วน
        </button>
        <button class="rounded-pill " 
                style={{border:"2px solid #FFB172",backgroundColor:"#ffffff", color:"#FFB172", 
                      width:"30%",margin:"0 2% 0 0", height:"20%", fontWeight:"bold", fontSize:"1.2vw"}}
                onClick={this.onSubmitAll}>ช่วยเหลือแล้วทั้งหมด
        </button> 
        {/* <button class="rounded-pill " 
                style={{border:"2px solid #FFB172",backgroundColor:"#ffffff", color:"#FFB172", 
                      width:"30%", height:"20%", fontWeight:"bold", fontSize:"1.2vw"}}
                onClick={this.Navigation}>นำทาง
        </button>  */}
        </div> 

        <div style={{display:(this.state.show_some ? 'block':'none')}}> 

        <div style={{margin:"2% 15% 0 15%", display:"flex"}}>
        <div class="form-check form-check-inline" style={{display:(this.state.showUpdateFood ? 'flex':'none')}}>
        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="101" onChange={this.HandleInput}/>
        <label class="form-check-label" for="inlineCheckbox1" 
            style={{color:"#FFB172", fontSize:"1.5vw", fontFamily:"Kanit", margin:"0 0 0 10%"}}>อาหาร</label>
        </div>
        <div class="form-check form-check-inline" style={{display:(this.state.showUpdateMedicine ? 'flex':'none')}}>
        <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="102" onChange={this.HandleInput} />
        <label class="form-check-label" for="inlineCheckbox2"
            style={{color:"#FFB172", fontSize:"1.5vw", fontFamily:"Kanit", margin:"0 0 0 10%"}}>ยา</label>
        </div>
        <div class="form-check form-check-inline" style={{display:(this.state.showUpdateBed ? 'flex':'none')}}>
        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="103" onChange={this.HandleInput}/>
        <label class="form-check-label" for="inlineCheckbox3"
            style={{color:"#FFB172", fontSize:"1.5vw", fontFamily:"Kanit", margin:"0 0 0 10%"}}>เตียง</label>
        </div>
        <div class="form-check form-check-inline" style={{display:(this.state.showUpdateHospital ? 'flex':'none')}}>
        <input class="form-check-input" type="checkbox" id="inlineCheckbox4" value="104" onChange={this.HandleInput}/>
        <label class="form-check-label" for="inlineCheckbox3"
            style={{color:"#FFB172", fontSize:"1.5vw", fontFamily:"Kanit", margin:"0 0 0 10%"}}>รถนำส่งโรงพยาบาล</label>
        </div>
        <div class="form-check form-check-inline" style={{display:(this.state.showUpdateHome? 'flex':'none')}}>
        <input class="form-check-input" type="checkbox" id="inlineCheckbox5" value="105" onChange={this.HandleInput}/>
        <label class="form-check-label" for="inlineCheckbox3"
            style={{color:"#FFB172", fontSize:"1.5vw", fontFamily:"Kanit", margin:"0 0 0 10%"}}>รถนำส่งภูมิลำเนา</label>
        </div>
        <div class="form-check form-check-inline" style={{display:(this.state.showUpdateOther ? 'flex':'none')}}>
        <input class="form-check-input" type="checkbox" id="inlineCheckbox6" value="106" onChange={this.HandleInput}/>
        <label class="form-check-label" for="inlineCheckbox3"
            style={{color:"#FFB172", fontSize:"1.5vw", fontFamily:"Kanit", margin:"0 0 0 10%"}}>อื่นๆ</label>
        </div>
        </div>

        <h1 style={{fontFamily:"Kanit", color:"#FFB172", fontSize:"1.5vw", margin:"2% 0 0 0"}}> 
            ความคืบหน้าล่าสุด : {this.props.obj.status_text}</h1>
        
        <textarea type="text" class="rounded" placeholder='อัพเดทความคืบหน้า' rows="3" onChange={this.onChangeSome} value={this.state.Status_Text_New}
                    style={{border:"2px solid #B4B6BB", width:"100%", 
                            fontFamily:"Kanit", fontSize:"1.2vw", margin:"2% 0 0 0"}}></textarea>
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
export default withRouter(HelpRow);