import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { imagesFetchData, updateCity } from './actions/LocationDropdownActions';




class LocationDropdown extends Component {
    locations = ["Boulder", "Denver", "Erie", "Broomfield"]
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.updateLocationData = this.updateLocationData.bind(this);
        this.state = {
            city: this.locations[0],
        };
        this.cities = {
            "boulder": {
                latLong: [40.029380, -105.239775],
                lLRange: [0.130058, 0.123352],
                zoom: 12
            },
            "denver": {
                latLong: [39.764245, -104.854774],
                lLRange: [0.299867, 0.510386],
                zoom: 10
            },
            "erie": {
                latLong: [40.051276, -105.041599],
                lLRange: [0.102037, 0.126273],
                zoom: 12
            },
            "broomfield": {
                latLong: [39.966673, -105.063447],
                lLRange: [0.154943, 0.204725],
                zoom: 11
            }
        }
    }

    updateLocationData(element){
        var options = element.options
        var selectedOption = options[element.selectedIndex].value;
        var lat = this.cities[selectedOption].latLong[0];
        var long = this.cities[selectedOption].latLong[1];
        var latRange = this.cities[selectedOption].lLRange[0];
        var longRange = this.cities[selectedOption].lLRange[1];
        var zoom = this.cities[selectedOption].zoom;
        var minLat = lat-latRange/2
        var maxLat = lat+latRange/2
        var minLong = long-longRange/2
        var maxLong = long+longRange/2 

        this.props.updateCity(selectedOption, lat, long, latRange, longRange, zoom);
        
        var url ='/api/images?minLat='+minLat+'&maxLat='+maxLat+'&minLong='+minLong+'&maxLong='+maxLong
        console.log(lat, long, latRange, longRange, minLat, maxLat, url)
        this.props.imagesFetchData(url);
    }

    componentDidMount(){
        var element = document.getElementById("city-select");
        this.updateLocationData(element)
    }

    handleChange(event){
        var element = event.target
        this.updateLocationData(element);
    }

    buildCityOptions(){
        var options = []
        this.locations.forEach(function(city) {
            options.push(
                <option value={city.toLowerCase()}>{city}</option>
            )
        });

        return options;
    }

    render() {
        var options = this.buildCityOptions()
        return (
            <select className="selectpicker" id="city-select" onChange={this.handleChange}>
                {options}
            </select>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selected: state.selected
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ imagesFetchData, updateCity }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationDropdown)