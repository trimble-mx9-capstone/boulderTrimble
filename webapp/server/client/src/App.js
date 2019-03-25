import React, { Component } from 'react';
import MapView from './MapView';
import Filter from './Filter';
import AppNav from './AppNav';
import { exampleAction } from './actions/IndexActions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import './App.css'
class App extends Component {
    constructor(props){
        super(props);
    }

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

const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ exampleAction})
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
