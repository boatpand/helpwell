import React, { Component } from 'react'
import logo_signin from '../logo_signin.png';
import axios from 'axios';

export default class SignupVictim extends Component {
    constructor(props){
        super(props);

        this.state = {
            Firstname:"",
            Lastname:"",
            Age:0,
            Gender:"",
            Nationality:"",
            Race:"",
            // Congenital_Disease:"",
            Congenital_Disease:"ไม่มี",
            Other_Disease:"",
            Mobile:"",
            Password:"",
            Retype_Password:"",

            show_all:false,
            show_pw:false,
            show_input:false,
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
    onChangeAge = (e) => {this.setState({Age:e.target.value})}
    onChangeGender = (e) => {this.setState({Gender:e.target.value})}
    onChangeNationality = (e) => {this.setState({Nationality:e.target.value})}
    onChangeRace = (e) => {this.setState({Race:e.target.value})}
    onChangeCongenital_Disease = async(e) => {
        await this.setState({Congenital_Disease:e.target.value})
        // console.log(this.state.Congenital_Disease)
        if(this.state.Congenital_Disease==="อื่นๆ"){
            this.setState({show_input:true})
        }else{
            this.setState({show_input:false,Other_Disease:""})
        }
    }
    onChangeOther_Disease = (e) => {this.setState({Other_Disease:e.target.value})}

    onChangeMobile = async(e) => {this.setState({Mobile:e.target.value})}
    onChangePassword = (e) => {this.setState({Password:e.target.value})}
    onChangeRetype_Password = (e) => {this.setState({Retype_Password:e.target.value})}

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

        if(!(this.state.Firstname && this.state.Lastname && this.state.Age && this.state.Gender &&
            this.state.Nationality && this.state.Race && this.state.Mobile && this.state.Password &&
            this.state.House_No && this.state.District)){
                await this.setState({check:false,
                                    show_all:true,
                                    show_pw:false,
                                    show_input:false,
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
                pathname: '/signup-victim2',
                  search: '',
                  state: {Firstname:this.state.Firstname,
                            Lastname:this.state.Lastname,
                            Age:this.state.Age,
                            Gender:this.state.Gender,
                            Nationality:this.state.Nationality,
                            Race:this.state.Race,
                            Congenital_Disease:this.state.Congenital_Disease,
                            Other_Disease:this.state.Other_Disease,
                            Mobile:this.state.Mobile,
                            Password:this.state.Password,

                            Province:"กรุงเทพมหานคร",
                            House_No:this.state.House_No,
                            Soi:this.state.Soi,
                            Road:this.state.Road,
                            District:this.state.District,
                            Subdistrict:this.state.Subdistrict,
                            ZIP_Code:this.state.ZIP_Code,
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
            <body className="signinbody">
            <div className="signupcontainer">
                <form className="signupform">
                <img src={logo_signin} alt="logohelper_signup"/>
                <label style={{color:"red", display:(this.state.show_all? 'block':'none')}}>All input is required! </label>
                    <div style={{marginTop:"20px", display:"flex", marginBottom:"20px"}}>
                        <label style={{marginRight:"10px", color:"#707070"}}>Firstname</label>
                        <input style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"300px", 
                        marginRight:"30px", fontFamily:"Kanit"}} 
                        type="text" 
                        placeholder="   Firstname" 
                        onChange={this.onChangeFirstname}/>

                        <label style={{marginRight:"10px", color:"#707070"}}>Lastname</label>
                        <input style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"300px", 
                        marginRight:"30px", fontFamily:"Kanit"}} type="text"
                        placeholder="   Lastname" 
                        onChange={this.onChangeLastname}/>
                    </div>

                    <div style={{marginTop:"20px", display:"flex", marginBottom:"20px"}}>
                    <label style={{marginRight:"10px", color:"#707070"}}>Age</label>
                    <input style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"80px", marginRight:"30px"}} 
                    type="number"
                    onChange={this.onChangeAge}/>

                    <label style={{marginRight:"10px", color:"#707070"}}>Gender</label>
                    <select style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"80px", marginRight:"30px"}} 
                    class="form-control form-control-sm"
                    onChange={this.onChangeGender}>
                    <option></option>
                    <option>male</option>
                    <option>female</option>
                    </select>

                    <label style={{marginRight:"10px", color:"#707070"}}>Nationality</label>
                    <input style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"120px", marginRight:"30px", fontFamily:"Kanit"}} 
                    type="text"
                    onChange={this.onChangeNationality}/>

                    <label style={{marginRight:"10px", color:"#707070"}}>Race</label>
                    <input style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"120px", marginRight:"30px", fontFamily:"Kanit"}} 
                    type="text"
                    onChange={this.onChangeRace}/>                    
                    </div>

                    <div style={{marginTop:"30px", display:"flex", marginBottom:"20px"}}>
                    <label style={{marginRight:"10px", color:"#707070"}}>Congenital Disease</label>
                    <select style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"250px", marginRight:"30px"}} 
                    class="form-control form-control-sm"
                    onChange={this.onChangeCongenital_Disease}>
                    {/* <option style={{fontFamily:"Kanit"}}></option> */}
                    <option style={{fontFamily:"Kanit"}}>ไม่มี</option>
                    <option style={{fontFamily:"Kanit"}}>ผู้ป่วยโรคหัวใจ</option>
                    <option style={{fontFamily:"Kanit"}}>ผู้ป่วยโรคเบาหวาน</option>
                    <option style={{fontFamily:"Kanit"}}>ผู้ป่วยโรคไตเรื้อรัง</option>
                    <option style={{fontFamily:"Kanit"}}>ผู้ป่วยโรคปอดและระบบทางเดินหายใจ</option>
                    <option style={{fontFamily:"Kanit"}}>ผู้ป่วยโรคอ้วน</option>
                    <option style={{fontFamily:"Kanit"}}>ผู้ป่วยโรคตับ</option>
                    <option style={{fontFamily:"Kanit"}}>ผู้ที่มีภาวะภูมิคุ้มกันบกพร่อง</option>
                    <option style={{fontFamily:"Kanit"}}>ผู้ป่วยที่ใช้ยากดภูมิคุ้มกัน</option>
                    <option style={{fontFamily:"Kanit"}}>อื่นๆ</option>
                    </select>
                    <input style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"250px", 
                    marginRight:"30px", fontFamily:"Kanit", display:(this.state.show_input? 'block':'none')}}
                    type="text"
                    placeholder="   ระบุ"
                    onChange={this.onChangeOther_Disease}>
                    </input>
                    </div>

                    <label style={{color:"red", display:(this.state.show_pw? 'block':'none')}}>Password must same Retype Password !</label>
                    <label style={{color:"red", display:(this.state.show_mobile? 'block':'none')}}>User already exist !</label>
                    <label style={{color:"red", display:(this.state.show_digit? 'block':'none')}}>Mobile should be 10 digits !</label>
                    <label style={{color:"red", display:(this.state.show_first? 'block':'none')}}>Mobile should start with 0 !</label>
                    <div style={{marginTop:"20px", display:"flex", marginBottom:"20px"}}>
                        <label style={{marginRight:"10px", color:"#707070"}}>Mobile</label>
                        <input style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"150px", 
                        marginRight:"30px", fontFamily:"Kanit"}}
                        type="text" 
                        placeholder="   Mobile" 
                        onChange={this.onChangeMobile}/>
    
                        <label style={{marginRight:"10px", color:"#707070"}}>Password</label>
                        <input style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"150px", 
                        marginRight:"30px", fontFamily:"Kanit"}}
                        type="password" 
                        placeholder="   Password" 
                        onChange={this.onChangePassword}/>
                  
                        <label style={{marginRight:"10px", color:"#707070"}}>Re-Password</label>
                        <input style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"150px", 
                        marginRight:"30px", fontFamily:"Kanit"}}
                        type="password" 
                        placeholder="   Retype Password" 
                        onChange={this.onChangeRetype_Password}/>
                    </div>

                    <div className="form-controll" style={{display:"flex", marginTop:"20px"}}>
                        <label style={{marginRight:"20px"}}>Province</label>
                        <input value="กรุงเทพมหานคร" 
                        style={{fontFamily:"Kanit", textAlign:"center"}}/>
                </div>
                <div style={{marginTop:"20px", display:"flex", marginBottom:"20px"}}>
                    <label style={{marginRight:"10px", color:"#707070"}}>House No.</label>
                    <input style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"120px", 
                    marginRight:"30px"}} 
                    type="text"
                    onChange={this.onChangeHouse_No}/>
                    <label style={{marginRight:"10px", color:"#707070"}}>Soi</label>
                    <input style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"195px", 
                    marginRight:"30px", fontFamily:"Kanit"}} 
                    type="text"
                    onChange={this.onChangeSoi}/>
                    <label style={{marginRight:"10px", color:"#707070"}}>Road</label>
                    <input style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"195px", 
                    marginRight:"30px", fontFamily:"Kanit"}} 
                    type="text"
                    onChange={this.onChangeRoad}/>                    
                </div>
                <label style={{color:"red", display:(this.state.show_subdistrict? 'block':'none')}}>Please Select Subdistrict </label>
                    <div style={{marginTop:"30px", display:"flex", marginBottom:"20px"}}>
                    <label style={{marginRight:"10px", color:"#707070"}}>District</label>
                    <select style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"150px", marginRight:"30px"}} 
                    class="form-control form-control-sm"
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

                    <label style={{marginRight:"10px", color:"#707070"}}>Subdistrict</label>
                    <select style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"150px", marginRight:"30px"}} 
                    class="form-control form-control-sm"
                    onChange={this.onChangeSubdistrict}>
                    {scroll}
                    </select>

                    <label style={{marginRight:"10px", color:"#707070"}}>ZIP Code</label>
                    <input style={{borderRadius:"20px", border:"2px solid #B4B6BB", width:"120px", 
                    marginRight:"30px", fontFamily:"Kanit", textAlign:"center"}} 
                    type="text" value={this.state.ZIP_Code}/>
                    </div>

                    <div>
                    <button style={{backgroundColor:"#2F4A8A"}} 
                    className="signupbutton" 
                    type="submit"
                    onClick={this.onSubmit}>next</button>
                    </div>
                </form>
            </div>    
            </body>
        )
    }
}
