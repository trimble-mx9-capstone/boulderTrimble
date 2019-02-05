import React, { Component } from 'react'
//import Draggable from 'react-draggable'
import './Street.css'

class Street extends Component{
  constructor(props){
    super(props);
    this.state = {'zoom': 100};
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
  }

  zoomIn(){
    let newZoom = this.state.zoom*1.1;
    if (newZoom > 400) newZoom = this.state.zoom;
    this.setState({'zoom': newZoom});
  }

  zoomOut(){
    let newZoom = this.state.zoom/1.1;
    if (newZoom < 50) newZoom = this.state.zoom;
    this.setState({'zoom': newZoom});
  }

  /*
      <div className="street">
        <img src={this.props.image} alt="" width={this.state.zoom+"%"} id="image"></img>
        <div className="zoomButtons">
          <button className="zoom" onClick={this.zoomIn}><div className = "text">+</div></button>
          <p><button className="zoom" onClick={this.zoomOut}><div className = "text">-</div></button></p>
        </div>
      </div>
  */

  render(){
    return (
      <div className="street">
      <img src={this.props.image} alt="" width={this.state.zoom+"%"} id="image"></img>
        <div className="zoomButtons">
          <button className="zoom" onClick={this.zoomIn}><div className = "text">+</div></button>
          <p><button className="zoom" onClick={this.zoomOut}><div className = "text">-</div></button></p>
        </div>
      </div>
    )
  }
}

export default Street