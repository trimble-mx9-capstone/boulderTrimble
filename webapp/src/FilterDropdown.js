import React, { Component } from 'react'
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';

export default class FilterDropdown extends Component {
    render() {
        return (
            <select className="selectpicker float-right" id="filterSelect" multiple>
                <option value="fireHydrant">Fire hydrants</option>
                <option value="stopLight">Stop lights</option>
                <option value="stopSign">Stop signs</option>
            </select>
        )
    }
}
