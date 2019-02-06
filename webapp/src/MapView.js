import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Street from './Street'
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

type State = {
  lat: number,
  lng: number,
  zoom: number,
  img: string
}

class MapView extends Component {
    constructor(){
        super();
        this.state = {
            markers: [
                {
                    type: "fireHydrant",
                    location: {
                        city: "Boulder",
                        position: [40.016869, -105.279617]
                    },
                    visible: true,
                },
                {
                    type: "stopLight",
                    location: {
                        city: "Boulder",
                        position: [40.017924, -105.271966]
                    },
                    visible: true,
                },
                {
                    type: "stopLight",
                    location: {
                        city: "Boulder",
                        position: [40.024267, -105.270653]
                    },
                    visible: true,
                }          
            ],
            lat: 40.016869,
            lng: -105.279617,
            zoom: 13,
            img: "sample_image.jpg"
        }
    }

    buildMarkerList() {
        var markers = this.state.markers; 
        var selectedOptions = this.props.selected;
        var visibleMarkers = [];
        markers.forEach(function(marker, i){
            if(selectedOptions.includes(marker.type)){
                visibleMarkers.push(
                    <Marker position={marker.location.position} key={i} title={marker.type}>
                        <Popup>
                            <Link to="/street">Gotta go FHAST</Link>
                            <p className="centered">This is a {marker.type} object</p>
                        </Popup>
                    </Marker>
                );
            }
        });
        return visibleMarkers;
    }

    render() {
        const position = [this.state.lat, this.state.lng]
        var markers = this.buildMarkerList();
        return (
          <div>
            <Route exact path="/" render={()=>
                <div className="shadow p-3 mb-5 bg-white rounded">
                    <Map id='map' center={position} zoom={this.state.zoom}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {markers}
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

const mapStateToProps = (state) => {
    return {
        selected: state.dropdown.selected, //selected is the prop for this component, mapped to the state.dropdown.selected prop in the redux store
        markers: state.markers
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView);