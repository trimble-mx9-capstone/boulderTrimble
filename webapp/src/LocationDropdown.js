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
            city: this.locations[0]
        };
    }

    handleChange(event){
        var element = event.target
        var options = element.options
        var selectedOption = options[element.selectedIndex].value;
        this.props.updateCity(selectedOption);
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
            <select className="selectpicker" id="citySelect" onChange={this.handleChange}>
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