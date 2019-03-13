import React, { Component } from 'react';
import MapView from './MapView';
import Filter from './Filter';
import AppNav from './AppNav';
import { exampleAction } from './actions/IndexActions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

class App extends Component {
    constructor(props){
        super(props);

        this.state = { text: "" }
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(){
        fetch('/api/fetchMarkers')
            .then(res => res.text())
            .then(newText => this.setState({ text: newText }))
    }

    render() {
        return (
            <div>
                <AppNav/>
                <div id='main_container'>
                    <Button onClick={this.handleClick} variant="primary">Fetch data (Test)</Button>
                    <div>{this.state.text}</div>
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
