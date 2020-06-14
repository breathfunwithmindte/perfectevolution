const express = require('express');
const firebase = require('firebase');

var firebaseConfig = {
    apiKey: "AIzaSyCXYS6dJBMQgJy1sLND9aLMIXR5dHcN9JI",
    authDomain: "perfectevolution-50b6e.firebaseapp.com",
    databaseURL: "https://perfectevolution-50b6e.firebaseio.com",
    projectId: "perfectevolution-50b6e",
    storageBucket: "perfectevolution-50b6e.appspot.com",
    messagingSenderId: "197797179122",
    appId: "1:197797179122:web:53370de23f7f437d81ea6b"
  };
var admin = firebase.initializeApp(firebaseConfig);

module.exports = admin;