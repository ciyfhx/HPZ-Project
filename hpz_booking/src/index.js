import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import setAuthorizationToken from './utils/setAuthorizationToken';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import appReducer from './reducers/appReducer'

const store = createStore(appReducer, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension(): f => f));

setAuthorizationToken(localStorage.token)

ReactDOM.render(<Provider store={store}>
<Main></Main>
</Provider>, document.getElementById("app"));
