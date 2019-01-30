import React, { Component } from 'react'

class Street extends Component{
  constructor(){
    super()
    this.zoom = 1;
  }

  render(){
    return (
      <div>
        <button></button>
        <img src={this.props.image} alt=""></img>
      </div>
    )
  }
}

export default Street