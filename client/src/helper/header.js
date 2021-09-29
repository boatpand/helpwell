import React, { Component } from 'react'
import './header.css'

export default class Header extends Component {
    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-sm">
                    <img src="logo_helper_header.png" alt="logo_helper_header"/>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                        <a class="nav-link" href="/helper">ให้ความช่วยเหลือ</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#">แผนที่</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#">Profile</a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}
