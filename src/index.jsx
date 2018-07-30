import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import 'typeface-roboto';
import { applyMiddleware, createStore } from 'redux';
import { hot } from 'react-hot-loader';
import App from './App';
import socialReducer from './reducers';
import { initialToken } from './actions/login';

const store = createStore(socialReducer, applyMiddleware(thunk, logger));
store.dispatch(initialToken()).then(() => {
  const Root = hot(module)(App);

  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Root />
      </Router>
    </Provider>,
    document.getElementById('root'),
  );
});
