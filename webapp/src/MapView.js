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
        this.locations = {
            "boulder": {
                latLong: [40.0150, -105.270546],
                zoom: 14
            },
            "denver": {
                latLong: [39.742043, -104.991531],
                zoom: 11
            },
            "erie": {
                latLong: [40.05026, -105.049980],
                zoom: 14
            },
            "broomfield": {
                latLong: [39.920540, -105.086647],
                zoom: 13
            }
        }
        this.state = {
            markers: [
                {
                    type: "fireHydrant",
                    location: {
                        city: "Boulder",
                        latLong: [40.016869, -105.279617]
                    },
                    visible: true,
                },
                {
                    type: "stopLight",
                    location: {
                        city: "Boulder",
                        latLong: [40.017924, -105.271966]
                    },
                    visible: true,
                },
                {
                    type: "stopLight",
                    location: {
                        city: "Boulder",
                        latLong: [40.024267, -105.270653]
                    },
                    visible: true,
                },
                {
                    type: "stopSign",
                    location: {
                        city: "Boulder",
                        latLong: [40.023007, -105.26653]
                    },
                    visible: true,
                },
                {
                    type: "stopSign",
                    location: {
                        city: "Denver",
                        latLong: [39.742043, -104.991531]
                    },
                    visible: true,
                },
                {
                    type: "stopSign",
                    location: {
                        city: "Denver",
                        latLong: [39.622043, -104.971531]
                    },
                    visible: true,
                },
                {
                    type: "stopLight",
                    location: {
                        city: "Denver",
                        latLong: [39.662043, -104.961531]
                    },
                    visible: true,
                },
                {
                    type: "fireHydrant",
                    location: {
                        city: "Denver",
                        latLong: [39.68, -104.981531]
                    },
                    visible: true,
                }          
            ],
            zoom: 14,
            img: "sample_image.jpg"
        }
    }

    buildMarkerList() {
        var markers = this.state.markers; 
        var selectedOptions = this.props.selected;
        var city = this.props.city; 
        var visibleMarkers = [];
        markers.forEach(function(marker, i){
            if(selectedOptions.includes(marker.type) && city === marker.location.city.toLowerCase()){
                visibleMarkers.push(
                    <Marker position={marker.location.latLong} key={i} title={marker.type}>
                        <Popup className="popup">
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
        var city = this.props.city; 
        const position = this.locations[city].latLong
        const zoom = this.locations[city].zoom
        var markers = this.buildMarkerList();
        return (
          <div>
            <Route exact path="/" render={()=>
                <div className="shadow p-3 mb-5 bg-white rounded">
                    <Map id='map' center={position} zoom={zoom}>
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
        selected: state.filter.selected, //selected is the prop for this component, mapped to the state.dropdown.selected prop in the redux store
        city: state.location.city, 
        markers: state.markers
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView);