import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { updateFilter } from './actions/FilterDropdownActions';


const allOptions = ["fireHydrant", "stopLight", "stopSign"];

class FilterDropdown extends Component {
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            selected: allOptions,
        };
    }

    handleChange(event){
        var options = event.target.options;
        var selectedOptions = []
        for(var i = 0; i < options.length; i++){
            if(options[i].selected){
                selectedOptions.push(options[i].value);
            }
        }
        this.state = {
            selected: selectedOptions,
        };
    }
    render() {
        return (
            <select className="selectpicker float-right" id="filterSelect" onChange={this.handleChange} multiple>
                <option value="fireHydrant">Fire hydrants</option>
                <option value="stopLight">Stop lights</option>
                <option value="stopSign">Stop signs</option>
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
    return bindActionCreators({ updateFilter }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterDropdown)