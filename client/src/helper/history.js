import React, { Component } from 'react';

export default class History extends Component {
    constructor(props){
        super(props)
    
        this.state ={
            Mobile:this.props.location.state.Mobile,
            vic_mobile:this.props.location.state.vic_mobile,
        }
    }

  render() {
      console.log(`helper_mobile: ${this.state.Mobile}`)
      console.log(`victim_mobile: ${this.state.vic_mobile}`)
    return (
    <div>
        <h1>{this.state.vic_mobile}</h1>
    </div>
    );
  }
}
