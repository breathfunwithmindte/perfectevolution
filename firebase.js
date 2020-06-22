const express = require('express');
const firebase = require('firebase');

var firebaseConfig = {
  apiKey: "AIzaSyDNc6sBGqW6DfFaC2PsthELOC8-_DAIJH8",
  authDomain: "perfectevolution-751a7.firebaseapp.com",
  databaseURL: "https://perfectevolution-751a7.firebaseio.com",
  projectId: "perfectevolution-751a7",
  storageBucket: "perfectevolution-751a7.appspot.com",
  messagingSenderId: "105888038235",
  appId: "1:105888038235:web:0dfb1f255169fcacad2e7e"
  };
var admin = firebase.initializeApp(firebaseConfig);

module.exports = admin;