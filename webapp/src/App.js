import React, { Component } from 'react';
import MapView from './MapView';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import AppNav from './AppNav'

export default class App extends Component {
  render() {
    return (
      <div>
        <AppNav/>
        <div id='main_container' class="shadow p-3 mb-5 bg-white rounded">
            <MapView/>
        </div>
      </div>
    )
  }
}

