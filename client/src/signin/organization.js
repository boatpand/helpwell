import React, { Component } from 'react'
import logohelper_signup from'../logohelper_signup.png';
import axios from 'axios';
import '../helper/style.css'

export default class Organization extends Component {
    constructor(props){
        super(props);

        this.state = {
            Firstname:"",
            Lastname:"",
            Org_Name:"",
            isOrg:true,
            Mobile:"",
            Password:"",
            Retype_Password:"",

            Food:false,
            Medicine:false,
            Bed:false,
            Hospital:false,
            Home:false,
            Other:"",

            show_all:false,
            show_pw:false,
            show_mobile:false,
            show_digit:false,
            show_first:false,
            show_subdistrict:false,

            Province:"กรุงเทพมหานคร",
            House_No:"",
            Soi:"",
            Road:"",
            District:"",
            Subdistrict:"",
            SubdistrictList:[],
            ZIP_Code:"",

            District_Code:"",

            check:true,
            VictimMemberlist:[],
            HelperMemberlist:[]
        }
    }

    async componentDidMount(){
        await axios.get('http://localhost:4000/victimuser')
            .then(res => {
                this.setState({
                    VictimMemberlist: res.data
                })
            })
            .catch((error)=>{
                console.log(error)
            })
        
        await axios.get('http://localhost:4000/helperuser')
            .then(res => {
                this.setState({
                    HelperMemberlist: res.data
                })
            })
            .catch((error)=>{
                console.log(error)
            })        
    }

    onChangeFirstname = (e) => {this.setState({Firstname:e.target.value})}
    onChangeLastname = (e) => {this.setState({Lastname:e.target.value})}
    onChangeMobile = async(e) => {this.setState({Mobile:e.target.value})}
    onChangePassword = (e) => {this.setState({Password:e.target.value})}
    onChangeRetype_Password = (e) => {this.setState({Retype_Password:e.target.value})}
    
    onChangeOrg_Name = (e) => {this.setState({Org_Name:e.target.value})}
    handleFood = async(e) => {await this.setState({Food: !this.state.Food}) 
    // console.log(this.state.Food)
    }
    handleMedicine = async(e) => {await this.setState({Medicine: !this.state.Medicine})}
    handleBed = async(e) => {await this.setState({Bed: !this.state.Bed})}
    handleHospital = async(e) => {await this.setState({Hospital: !this.state.Hospital})}
    handleHome = async(e) => {await this.setState({Home: !this.state.Home})}
    handleOther = (e) => {this.setState({Other: e.target.value})}

    onChangeHouse_No = (e) => {this.setState({House_No:e.target.value})}
    onChangeSoi = (e) => {this.setState({Soi:e.target.value})}
    onChangeRoad = (e) => {this.setState({Road:e.target.value})}
    onChangeDistrict = async (e) => {
        await this.setState({District:e.target.value})
        var district = this.state.District
        if(district===""){
            this.setState({ZIP_Code:"",District_Code:"",Subdistrict:""})
        }else{
            await axios.get(`http://localhost:4000/district/${district}`).then(res => {
            this.setState({
                District_Code:res.data.District_Code,
                ZIP_Code:res.data.ZIP_Code
             })
            })
            var code = this.state.District_Code
            await axios.get(`http://localhost:4000/subdistrict/${code}`).then(res => {
            this.setState({
                SubdistrictList:res.data
            })
        })
        }
    }
    onChangeSubdistrict = (e) =>{this.setState({Subdistrict:e.target.value})}

    onSubmit = async(e) => {
        e.preventDefault()
        await this.setState({show_mobile:false,show_pw:false,check:true})
        // console.log(this.state.Congenital_Disease)

        if(!(this.state.Firstname && this.state.Lastname && this.state.Mobile && this.state.Password &&
            this.state.House_No && this.state.District)){
                await this.setState({check:false,
                                    show_all:true,
                                    show_pw:false,
                                    show_mobile:false,
                                    show_digit:false,
                                    show_first:false,
                                    show_subdistrict:false,
                                })
                // alert("All input is required")
            }
        else{
        var mo = String(this.state.Mobile)
        if(this.state.Mobile.length!==10){
            await this.setState({check:false,show_digit:true})
                // alert("Mobile should be 10 digits")
        }

        if(mo.substring(0,1)!=="0"){
            await this.setState({check:false,show_first:true})
                // alert("Mobile should start with 0")
        }

        if(this.state.Password!==this.state.Retype_Password){
            await this.setState({check:false,show_pw:true})
        }

        if(this.state.Subdistrict===""){
            await this.setState({check:false,show_subdistrict:true})
        }

        var VictimMemberObject = this.state.VictimMemberlist
        var HelperMemberObject = this.state.HelperMemberlist
        var mobile_list = []
        for (var i = 0;i< VictimMemberObject.length;i++){
            mobile_list.push(VictimMemberObject[i].Mobile)
        }
        for (var i = 0;i< HelperMemberObject.length;i++){
            mobile_list.push(HelperMemberObject[i].Mobile)
        }
        console.log(mobile_list)
        if(mobile_list.includes(this.state.Mobile)){
            console.log('done')
            this.setState({check:false,show_mobile:true})
        }

        // console.log(this.state.check)
        if(this.state.check===true){
            this.props.history.push({
                pathname: '/signup-helper2',
                  search: '',
                  state: {Firstname:this.state.Firstname,
                            Lastname:this.state.Lastname,
                            Org_Name:this.state.Org_Name,
                            isOrg:true,
                            Mobile:this.state.Mobile,
                            Password:this.state.Password,

                            Province:"กรุงเทพมหานคร",
                            House_No:this.state.House_No,
                            Soi:this.state.Soi,
                            Road:this.state.Road,
                            District:this.state.District,
                            Subdistrict:this.state.Subdistrict,
                            ZIP_Code:this.state.ZIP_Code,

                            Food:this.state.Food,
                            Medicine:this.state.Medicine,
                            Bed:this.state.Bed,
                            Hospital:this.state.Hospital,
                            Home:this.state.Home,
                            Other:this.state.Other,
                        } 
            })
        }
    }
    }

    render() {

        var subObject = this.state.SubdistrictList
        var sub_name = [""]
        for (var i = 0;i< subObject.length;i++){
            sub_name.push(subObject[i].Subdistrict_Name)
        }

        const scroll =[];
        for (let i = 0; i < sub_name.length; i++) {
            scroll.push(<option>{sub_name[i]}</option>)
        }

        return (
            <div>
            <div class="container-lg" style={{display:"flex", alignItems:"center", justifyContent:"center", position:"relative", minHeight:"100vh"}}>
                <form class="rounded" 
                        style={{border:"2px solid #B4B6BB", width:"100%"}}>
                <img src={logohelper_signup} class="img-fluid" style={{width:"20%", marginTop:"5%"}}/>
                
                <label style={{color:"red", display:(this.state.show_all? 'block':'none')}}>All input is required! </label>
                <div style={{marginTop:"10%", display:"flex", marginBottom:"2%"}}>
                <label style={{marginLeft:"8%", color:"#707070", fontSize:"1.5vw"}}>Firstname</label>
                <input class="rounded-pill" style={{border:"2px solid #B4B6BB", width:"30%", 
                        marginLeft:"3%", fontFamily:"Kanit", fontSize:"1.5vw"}} 
                        type="text" 
                        placeholder="   Firstname" 
                        onChange={this.onChangeFirstname}/>

                <label style={{marginLeft:"2%", color:"#707070", fontSize:"1.5vw"}}>Lastname</label>
                <input class="rounded-pill" style={{border:"2px solid #B4B6BB", width:"30%", 
                        marginLeft:"3%", fontFamily:"Kanit", fontSize:"1.5vw"}} type="text"
                        placeholder="   Lastname" 
                        onChange={this.onChangeLastname}/>
                </div>

                <label style={{color:"red", display:(this.state.show_pw? 'block':'none')}}>Password must same Retype Password !</label>
                <label style={{color:"red", display:(this.state.show_mobile? 'block':'none')}}>User already exist !</label>
                <label style={{color:"red", display:(this.state.show_digit? 'block':'none')}}>Mobile should be 10 digits !</label>
                <label style={{color:"red", display:(this.state.show_first? 'block':'none')}}>Mobile should start with 0 !</label>
                <div style={{marginTop:"5%", display:"flex", marginBottom:"2%"}}>
                <label style={{marginLeft:"6%", color:"#707070", fontSize:"1.5vw"}}>Mobile</label>
                <input class="rounded-pill" style={{border:"2px solid #B4B6BB", width:"20%", 
                        marginLeft:"3%", fontFamily:"Kanit", fontSize:"1.5vw"}}
                        type="text"
                        placeholder="   Mobile" 
                        onChange={this.onChangeMobile}/>
    
                <label style={{marginLeft:"2%", color:"#707070", fontSize:"1.5vw"}}>Password</label>
                <input class="rounded-pill" style={{border:"2px solid #B4B6BB", width:"15%", 
                        marginLeft:"3%", fontFamily:"Kanit", fontSize:"1.5vw"}}
                        type="password" 
                        placeholder="   Password" 
                        onChange={this.onChangePassword}/>
                  
                <label style={{marginLeft:"2%", color:"#707070", fontSize:"1.5vw"}}>Re-Password</label>
                <input class="rounded-pill" style={{border:"2px solid #B4B6BB", width:"15%", 
                        marginLeft:"3%", fontFamily:"Kanit", fontSize:"1.5vw"}}
                        type="password" 
                        placeholder="   Retype Password" 
                        onChange={this.onChangeRetype_Password}/>
                </div>

                <div style={{marginTop:"5%", display:"flex", marginBottom:"2%"}}>
                <label style={{marginLeft:"6%", color:"#707070", fontSize:"1.5vw"}}>Organization Name</label>
                <input class="rounded-pill" type="text" placeholder="   Organization Name" 
                        style={{marginLeft:"2%", border:"2px solid #B4B6BB", width:"50%", fontSize:"1.5vw", fontFamily:"Kanit"}}
                        onChange={this.onChangeOrg_Name}></input>
                </div>

                <div style={{display:'flex', marginTop:"5%", marginBottom:"2%"}}>
                <label style={{marginLeft:"6%", marginRight:"2%", fontFamily:"Kanit", color:"#707070",
                            fontSize:"1.5vw"}}>Help :</label>

                <input type="checkbox" style={{margin:"1% 1% 0 0"}} 
                        defaultChecked={this.state.Food}
                        onChange={this.handleFood}></input>
                <label style={{margin:"0 2% 0 0", color:"#707070", fontSize:"1.5vw"}}>Food</label>

                <input type="checkbox" style={{margin:"1% 1% 0 0"}} 
                        defaultChecked={this.state.Medicine}
                        onChange={this.handleMedicine}></input>
                <label style={{margin:"0 2% 0 0", color:"#707070", fontSize:"1.5vw"}}>Medicine</label>

                <input type="checkbox" style={{margin:"1% 1% 0 0"}} 
                        defaultChecked={this.state.Bed}
                        onChange={this.handleBed}></input>
                <label style={{margin:"0 2% 0 0", color:"#707070", fontSize:"1.5vw"}}>Bed</label>

                <input type="checkbox" style={{margin:"1% 1% 0 0"}} 
                        defaultChecked={this.state.Hospital}
                        onChange={this.handleHospital}></input>
                <label style={{margin:"0 2% 0 0", color:"#707070", fontSize:"1.5vw"}}>Hospital</label>

                <input type="checkbox" style={{margin:"1% 1% 0 0"}} 
                        defaultChecked={this.state.Home}
                        onChange={this.handleHome}></input>
                <label style={{margin:"0 2% 0 0", color:"#707070", fontSize:"1.5vw"}}>Home</label>

                <label style={{margin:"0 2% 0 0", color:"#707070", fontSize:"1.5vw"}}>Other</label>
                <input type="text" placeholder="   ระบุ" class="rounded-pill"
                        style={{border:"2px solid #B4B6BB", fontSize:"1.5vw", width:"10%"}}
                        onChange={this.handleOther}></input>
                </div>

                <div className="form-controll" style={{display:"flex", marginTop:"5%", marginBottom:"2%"}}>
                <label style={{marginLeft:"20%", color:"#707070", fontSize:"1.5vw"}}>Province</label>
                <input value="กรุงเทพมหานคร" class="rounded-pill"
                        style={{border:"2px solid #B4B6BB", marginLeft:"3%", fontFamily:"Kanit", 
                                textAlign:"center", fontSize:"1.5vw", width:"50%"}}/>
                </div>

                <div style={{marginTop:"5%", display:"flex", marginBottom:"2%"}}>
                <label style={{marginLeft:"10%", color:"#707070", fontSize:"1.5vw"}}>House No.</label>
                <input class="rounded-pill" style={{border:"2px solid #B4B6BB", width:"12%", 
                    marginLeft:"3%", fontSize:"1.5vw"}} 
                    type="text"
                    onChange={this.onChangeHouse_No}/>
                
                <label style={{marginLeft:"2%", color:"#707070", fontSize:"1.5vw"}}>Soi</label>
                <input class="rounded-pill" style={{border:"2px solid #B4B6BB", width:"20%", 
                    marginLeft:"3%", fontFamily:"Kanit", fontSize:"1.5vw"}} 
                    type="text"
                    onChange={this.onChangeSoi}/>
                    
                <label style={{marginLeft:"2%", color:"#707070", fontSize:"1.5vw"}}>Road</label>
                <input class="rounded-pill" style={{border:"2px solid #B4B6BB", width:"20%", 
                    marginLeft:"3%", fontFamily:"Kanit", fontSize:"1.5vw"}} 
                    type="text"
                    type="text"
                    onChange={this.onChangeRoad}/>                    
                </div>

                <label style={{color:"red", display:(this.state.show_subdistrict? 'block':'none')}}>Please Select Subdistrict </label>
                <div style={{marginTop:"5%", display:"flex", marginBottom:"2%"}}>
                <label style={{marginLeft:"10%", color:"#707070", fontSize:"1.5vw"}}>District</label>
                <select class="rounded-pill" style={{border:"2px solid #B4B6BB", width:"15%", 
                        marginLeft:"3%",fontFamily:"Kanit", fontSize:"1.5vw"}} 
                    onChange={this.onChangeDistrict}>
                    <option style={{fontFamily:"Kanit"}}></option>
                    <option style={{fontFamily:"Kanit"}}>พระนคร</option>
                    <option style={{fontFamily:"Kanit"}}>ดุสิต</option>
                    <option style={{fontFamily:"Kanit"}}>หนองจอก</option>
                    <option style={{fontFamily:"Kanit"}}>บางรัก</option>
                    <option style={{fontFamily:"Kanit"}}>บางเขน</option>
                    <option style={{fontFamily:"Kanit"}}>บางกะปิ</option>
                    <option style={{fontFamily:"Kanit"}}>ปทุมวัน</option>
                    <option style={{fontFamily:"Kanit"}}>ป้อมปราบศัตรูพ่าย</option>
                    <option style={{fontFamily:"Kanit"}}>พระโขนง</option>
                    <option style={{fontFamily:"Kanit"}}>มีนบุรี</option>
                    <option style={{fontFamily:"Kanit"}}>ลาดกระบัง</option>
                    <option style={{fontFamily:"Kanit"}}>ยานนาวา</option>
                    <option style={{fontFamily:"Kanit"}}>สัมพันธวงศ์</option>
                    <option style={{fontFamily:"Kanit"}}>พญาไท</option>
                    <option style={{fontFamily:"Kanit"}}>ธนบุรี</option>
                    <option style={{fontFamily:"Kanit"}}>บางกอกใหญ่</option>
                    <option style={{fontFamily:"Kanit"}}>ห้วยขวาง</option>
                    <option style={{fontFamily:"Kanit"}}>คลองสาน</option>
                    <option style={{fontFamily:"Kanit"}}>ตลิ่งชัน</option>
                    <option style={{fontFamily:"Kanit"}}>บางกอกน้อย</option>
                    <option style={{fontFamily:"Kanit"}}>บางขุนเทียน</option>
                    <option style={{fontFamily:"Kanit"}}>ภาษีเจริญ</option>
                    <option style={{fontFamily:"Kanit"}}>หนองแขม</option>
                    <option style={{fontFamily:"Kanit"}}>ราษฎร์บูรณะ</option>
                    <option style={{fontFamily:"Kanit"}}>บางพลัด</option>
                    <option style={{fontFamily:"Kanit"}}>ดินแดง</option>
                    <option style={{fontFamily:"Kanit"}}>บึงกุ่ม</option>
                    <option style={{fontFamily:"Kanit"}}>สาทร</option>
                    <option style={{fontFamily:"Kanit"}}>บางซื่อ</option>
                    <option style={{fontFamily:"Kanit"}}>จตุจักร</option>
                    <option style={{fontFamily:"Kanit"}}>บางคอแหลม</option>
                    <option style={{fontFamily:"Kanit"}}>ประเวศ</option>
                    <option style={{fontFamily:"Kanit"}}>คลองเตย</option>
                    <option style={{fontFamily:"Kanit"}}>สวนหลวง</option>
                    <option style={{fontFamily:"Kanit"}}>จอมทอง</option>
                    <option style={{fontFamily:"Kanit"}}>ดอนเมือง</option>
                    <option style={{fontFamily:"Kanit"}}>ราชเทวี</option>
                    <option style={{fontFamily:"Kanit"}}>ลาดพร้าว</option>
                    <option style={{fontFamily:"Kanit"}}>วัฒนา</option>
                    <option style={{fontFamily:"Kanit"}}>บางแค</option>
                    <option style={{fontFamily:"Kanit"}}>หลักสี่</option>
                    <option style={{fontFamily:"Kanit"}}>สายไหม</option>
                    <option style={{fontFamily:"Kanit"}}>คันนายาว</option>
                    <option style={{fontFamily:"Kanit"}}>สะพานสูง</option>
                    <option style={{fontFamily:"Kanit"}}>วังทองหลาง</option>
                    <option style={{fontFamily:"Kanit"}}>คลองสามวา</option>
                    <option style={{fontFamily:"Kanit"}}>บางนา</option>
                    <option style={{fontFamily:"Kanit"}}>ทวีวัฒนา</option>
                    <option style={{fontFamily:"Kanit"}}>ทุ่งครุ</option>
                    <option style={{fontFamily:"Kanit"}}>บางบอน</option>
                    </select>

                    <label style={{marginLeft:"2%", color:"#707070", fontSize:"1.5vw"}}>Subdistrict</label>
                    <select class="rounded-pill" style={{border:"2px solid #B4B6BB", width:"15%", 
                            marginLeft:"3%",fontFamily:"Kanit", fontSize:"1.5vw"}} 
                    onChange={this.onChangeSubdistrict}>
                    {scroll}
                    </select>

                    <label style={{marginLeft:"2%", color:"#707070", fontSize:"1.5vw"}}>ZIP Code</label>
                    <input class="rounded-pill" style={{border:"2px solid #B4B6BB", width:"12%", 
                    marginLeft:"3%", fontFamily:"Kanit", textAlign:"center", fontSize:"1.5vw"}}
                    type="text" value={this.state.ZIP_Code}/>
                    </div>

                    <div>
                    <button class="rounded-pill"
                    style={{margin:"5% 0 5% 0", backgroundColor:"#FFB172", color:"#ffffff",
                            border:"2px solid #B4B6BB", width:"50%", fontSize:"1.5vw"}} 
                    type="submit"
                    onClick={this.onSubmit}>next</button>
                    </div>
                </form>
            </div>    
            </div>
        )
    }
}
