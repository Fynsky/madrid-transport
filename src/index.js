import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './Redux/ReduxStore';
import { Provider } from 'react-redux';
import { saveStateSavedStops, saveStateCardExpiration, saveStateVisitedStops, saveStateSettings } from './localStorage/localStorage'
import  throttle  from 'lodash/throttle' 

store.subscribe(throttle(() => {
  saveStateSavedStops({ savedStops: store.getState().savedStops.stops })
  saveStateVisitedStops({ visitedStops: store.getState().busPage.visitedStops })
  saveStateCardExpiration({ cardExpiration: store.getState().cardExpiration })
  saveStateSettings({ settings: store.getState().settings })
}, 
1000))

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
