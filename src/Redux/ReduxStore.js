import thunkMiddleware from 'redux-thunk'
import {combineReducers, createStore, applyMiddleware, compose} from 'redux'

import busStopReducer from './busStopReducer'
import savedStopsReducer from './savedStopsReducer';
import { loadPersStateCardExpiration } from '../localStorage/localStorage'
import cardExpirationReducer from './cardExpirationReducer';
import settingsReducer from './settingsReducer';

const reducers = combineReducers ({
    busPage: busStopReducer,
    savedStops: savedStopsReducer,
    cardExpiration: cardExpirationReducer,
    settings: settingsReducer
})

const persistedState = loadPersStateCardExpiration()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(
    thunkMiddleware)))

window.store = store

export default store