import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { updateCity } from './actions/LocationDropdownActions';




class LocationDropdown extends Component {
    locations = ["Boulder", "Denver", "Erie", "Broomfield"]
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            city: this.locations[0],
        };
        this.cities = {
            "boulder": {
                latLong: [-105.239775, 40.029380],
                lLRange: [0.123352, 0.130058],
                zoom: 12
            },
            "denver": {
                latLong: [-104.854774, 39.764245],
                lLRange: [0.510386, 0.299867],
                zoom: 11
            },
            "erie": {
                latLong: [-105.041599, 40.051276],
                lLRange: [0.126273, 0.102037],
                zoom: 12
            },
            "broomfield": {
                latLong: [-105.063447, 39.966673],
                lLRange: [0.204725, 0.154943],
                zoom: 12
            }
        }
    }

    handleChange(event){
        var element = event.target
        var options = element.options
        var selectedOption = options[element.selectedIndex].value;
        var latLong = this.cities[selectedOption].latLong;
        var lLRange = this.cities[selectedOption].lLRange;
        var zoom = this.cities[selectedOption].zoom;
        this.props.updateCity(selectedOption, latLong[0], latLong[1], lLRange[0], lLRange[1], zoom);
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
    return bindActionCreators({ updateCity }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationDropdown)