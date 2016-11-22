import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {browserHistory} from 'react-router';

import * as actions from 'actions';
import {configure} from 'configureStore';
var store = configure();
import firebase from 'app/firebase/';
import router from 'app/router/';

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(actions.login(user.uid));
    // Moved startAdd so that it only happens after we already have the user uid
    store.dispatch(actions.startAddTodos());
    browserHistory.push('/todos');
  } else {
    store.dispatch(actions.logout());
    browserHistory.push('/');
  }
});

// store.subscribe(() => {
//   var state = store.getState();
//   console.log('New state', state);
//
//   TodoAPI.setTodos(state.todos);
// });

// var initialTodos = TodoAPI.getTodos();
// store.dispatch(actions.addTodos(initialTodos));



// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles');



ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById("app")
);
