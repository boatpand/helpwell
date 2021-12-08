import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './header.css'
import logo_helper_header from '../logo_helper_header.png'
import { withRouter } from "react-router";

class Header extends Component {
    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-sm">
                    <Link class="navbar-brand"  to={{pathname:`/helper`,state:{Mobile:this.props.Mobile}}}>
                    <img class="img-responsive" src={logo_helper_header} alt="logo_helper_header"/>
                    </Link>
                    {/* <img src={logo_helper_header} alt="logo_helper_header"/> */}
                    <ul class="navbar-nav">
                        <li class="nav-item">
                        <Link class="nav-link" style={{fontFamily:"Kanit", color:"#ffffff"}}
                        to={{pathname:`/helper`,state:{Mobile:this.props.Mobile}
                        }}>ให้ความช่วยเหลือ</Link>
                        </li>
                        <li class="nav-item">
                        <Link class="nav-link" style={{fontFamily:"Kanit", color:"#ffffff"}}
                        to={{pathname:"/helpermap",state:{Mobile:this.props.Mobile}}}>
                        แผนที่</Link>
                        </li>
                        <li class="nav-item">
                        <Link class="nav-link" style={{fontFamily:"Kanit", color:"#ffffff"}}
                        to={{pathname:`/helperprofile/${this.props.Mobile}`,state:{Mobile:this.props.Mobile}}}>
                        Profile</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}
export default withRouter(Header);