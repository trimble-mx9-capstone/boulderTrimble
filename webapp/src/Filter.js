import React, { Component } from 'react'
import FilterDropdown from './FilterDropdown'

export default class Filter extends Component {
    render() {
        return (
            <div id="filter-div">
                <FilterDropdown/>
                <p id="filter-label" className="float-right h6">Object Filter</p>
            </div>
        )
    }
}