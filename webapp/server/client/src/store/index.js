import React from 'react';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import reducers from '../reducers/reducers.js';
import thunk from 'redux-thunk';



const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducers,
    composeEnhancer(applyMiddleware(thunk))
    
);