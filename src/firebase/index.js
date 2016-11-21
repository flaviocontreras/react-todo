import firebase from 'firebase';

try {
  var config = {
      apiKey: "AIzaSyBJtZhmPMy8Ln8DTaVtd82Sqtqc4za5Ck8",
      authDomain: "react-todo-app-931d4.firebaseapp.com",
      databaseURL: "https://react-todo-app-931d4.firebaseio.com",
      storageBucket: "react-todo-app-931d4.appspot.com",
      messagingSenderId: "548345790582"
    };
    firebase.initializeApp(config);
} catch(e) {

}

export var firebaseRef = firebase.database().ref();
export default firebase;
