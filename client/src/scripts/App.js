/* eslint-disable */
import React, { Component } from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';


// Redux Store
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { logger, crashReporter, devTools} from './helpers/logger';
import reducers from './reducers/main';
window.store = createStore(reducers, {},
    applyMiddleware(devTools, logger, crashReporter)
);

const Routes = require('./helpers/routes');

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LocaleProvider locale={enUS}>
          <Router history={browserHistory}>
            <Route path="/" component={Routes.Dashboard.Index} />
          </Router>
        </LocaleProvider>
      </Provider>
    );
  }
}

export default App;
