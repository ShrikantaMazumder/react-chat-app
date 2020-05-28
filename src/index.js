import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Dashboard from './components/Dashboard/Dashboard';
const firebase = require('firebase');
require('firebase/firestore');

firebase.initializeApp({
  apiKey: "AIzaSyDX4Mnndr6WOIs3MRfMaPm885rrG6HJCR8",
  authDomain: "react-chat-app-c353f.firebaseapp.com",
  databaseURL: "https://react-chat-app-c353f.firebaseio.com",
  projectId: "react-chat-app-c353f",
  storageBucket: "react-chat-app-c353f.appspot.com",
  messagingSenderId: "451741787684",
  appId: "1:451741787684:web:cc08c5ab0f3808d4fe5ab1",
  measurementId: "G-B36EC51DJK"
});

const routing = (
  <Router>
    <div id="router-container">
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/dashboard" component={Dashboard} />
    </div>
  </Router>
);

ReactDOM.render(
  <React.StrictMode>
    {routing}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
