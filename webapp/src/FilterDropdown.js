import React, { Component } from 'react'
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';

export default class FilterDropdown extends Component {
    render() {
        return (
            <select className="selectpicker float-right" multiple>
                <option>Fire hydrants</option>
                <option>Stop lights</option>
                <option>Stop signs</option>
            </select>
        )
    }
}
