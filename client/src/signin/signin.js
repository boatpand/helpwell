import React, { Component } from 'react'
import logo_signin from '../logo_signin.png';
import axios from 'axios';
import './signin.css'

export default class Signin extends Component {
    constructor(props){
        super(props)
    
        this.state ={
            Mobile:'',
            Password:'',
            role:'',

            mes:"",
            show_mes:false
        }
    }

    onChangeMobile = (e) =>{
        this.setState({Mobile:e.target.value})
    }
    onChangePassword = (e) =>{
        this.setState({Password:e.target.value})
    }

    onSubmitLogin=(e)=>{
        e.preventDefault()
    
        const loginObject = {
          Mobile: this.state.Mobile,
          Password: this.state.Password,
        }
        
        if(this.state.Mobile !=="" && this.state.Password !== ""){

          if(this.state.Mobile==="0123456789"){
            console.log("admin")
            axios.post('http://localhost:4000/admin/login', loginObject).then(res =>{
            console.log(res.data)
            // console.log(res.data.message)
            const role = res.data.message;
            if(role==="Incorrect Mobile or Password"){
                //alert(role)
                this.setState({mes:role, show_mes:true})
            }else(this.setState({show_mes:false}))
            // alert(res.data.message);
            if(role==="admin"){
                this.setState({show_mes:false})
                // for protected route
                //victimAuth.login(()=>{
                // console.log(victimAuth.login)
                // this.props.history.push('/victimland')
                this.props.history.push({
                  pathname: '/admin',
                  search: '',
                  state: {Mobile:this.state.Mobile} 
                })
              //});
            }
          })
          }
          else{
          axios.post('http://localhost:4000/victimuser/login', loginObject).then(res =>{
            console.log(res.data)
            // console.log(res.data.message)
            const role = res.data.message;
            if(role==="Incorrect Mobile or Password"){
                //alert(role)
                this.setState({mes:role, show_mes:true})
            }else(this.setState({show_mes:false}))
            // alert(res.data.message);
            if(role==="victim"){
                this.setState({show_mes:false})
                // for protected route
                //victimAuth.login(()=>{
                // console.log(victimAuth.login)
                // this.props.history.push('/victimland')
                this.props.history.push({
                  pathname: '/victims',
                  search: '',
                  state: {Mobile:this.state.Mobile} 
                })
              //});
            }
            else if (role==="helper"){
                this.setState({show_mes:false})
                // for protected route
                // helperAuth.login(()=>{
                // console.log(victimAuth.login)
                this.props.history.push({
                    pathname: `/helper`,
                    search: '',
                    state: {Mobile:this.state.Mobile} 
                  })
              //});
            }
          })
        }
        } 
        // else{alert("All input is required")}
        else{this.setState({mes:"All input is required", show_mes:true})}
      }

    render() {
        return (
        <body className="signinbody">
        <div className="signincontainer">
            <form className="signinform" onSubmit={this.onSubmitLogin}>
                <img src={logo_signin} alt="logo of sign in form"/>
                <label style={{color:"red", display:(this.state.show_mes? 'block':'none')}}>{this.state.mes}</label>
                <div className="form-controll">
                    <label>Mobile Number</label>
                    <input type="text" pattern="[0-9]{10}" placeholder="   Mobile Number" onChange={this.onChangeMobile}/>
                </div>
                <div className="form-controll">
                    <label>Password</label>
                    <input type="password" placeholder="   Password" onChange={this.onChangePassword}/>
                    <label><a href="/forget-pass">forget password</a></label>
                </div>
                <div className="signinup">
                <button className="signinbutton" type="submit">sign in</button>
                <label><a href="/signup">sign up</a></label>
                </div>
            </form>
        </div>    
        </body>
        )
    }
}