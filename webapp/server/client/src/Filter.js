import React, { Component } from 'react'
import FilterDropdown from './FilterDropdown'
import LocationDropdown from './LocationDropdown';
import './Filter.css'

export default class Filter extends Component {
    render() {
        return (
            <div id="filter-div">
                <LocationDropdown/>
                <FilterDropdown/>
                <p id="filter-label" className="float-right h6">Object Filter</p>
            </div>
        )
    }
}