import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './global_style.css';
import AuthProvider from './Context/AuthContext';
ReactDOM.render(<React.StrictMode><AuthProvider><App /></AuthProvider></React.StrictMode>, document.getElementById('root'));