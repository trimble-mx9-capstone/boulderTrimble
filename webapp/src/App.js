import React, { Component } from 'react';
import MapView from './MapView';
import Filter from './Filter'
import AppNav from './AppNav'

export default class App extends Component {
  render() {
    return (
      <div>
        <AppNav/>
        <div id='main_container'>
            <Filter/>
            <MapView/>
        </div>
      </div>
    )
  }
}

