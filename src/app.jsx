import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Router, IndexRoute, browserHistory} from 'react-router';
import TodoApp from 'TodoApp';
import Login from 'Login';

import * as actions from 'actions';
import TodoAPI from 'TodoAPI';
import {configure} from 'configureStore';
var store = configure();

// store.subscribe(() => {
//   var state = store.getState();
//   console.log('New state', state);
//
//   TodoAPI.setTodos(state.todos);
// });

// var initialTodos = TodoAPI.getTodos();
// store.dispatch(actions.addTodos(initialTodos));

store.dispatch(actions.startAddTodos());

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/">
        <Route path="todos" component={TodoApp}/>
        <IndexRoute component={Login}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById("app")
);
