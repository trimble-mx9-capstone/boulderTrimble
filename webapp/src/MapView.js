import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Street from './Street'
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';

type State = {
  lat: number,
  lng: number,
  zoom: number,
  img: string
}

var obj1 = {
    type: "fireHydrant",
    location: {
        city: "Boulder",
        lat: 40.016869,
        lng: -105.279617,
    }
} 

var obj2 = {
    type: "stopLight",
    location: {
        city: "Boulder",
        lat: 40.017924, 
        lng: -105.271966,
    }
} 

var obj3 = {
    type: "stopLight",
    location: {
        city: "Boulder",
        lat: 40.024267, 
        lng: -105.270653,
    }
} 

export default class MapView extends Component {
  state = {
    lat: 40.016869,
    lng: -105.279617,
    zoom: 13,
    img: "sample_image.jpg"
  }

  //<button onClick=""></button>

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <div>
        <Route exact path="/" render={()=>
            <div class="shadow p-3 mb-5 bg-white rounded">
                <Map id='map' center={position} zoom={this.state.zoom}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                        <Link to="/street">Gotta go FHAST</Link>
                            <p class="centered">
                            <img width="64" height="64" src={this.state.img} alt=""/>
                        </p>
                        </Popup>
                    </Marker>
                </Map>
            </div>
        }/>
        <Route path="/street" render={()=>
          <Street image={this.state.img}/>
        } />
      </div>
    )
  }
}

