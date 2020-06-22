import React from 'react';
import './navbarStart.css';
import Login from './Login'
import Register from './Register'

function NavBarStart(props) {

    return (
        <div className="navbarStart_container">
            <div style={{paddingLeft: "5vw", letterSpacing: "1vw"}}>
                PERFECTEVOLUTION
            </div>
            <div style={{display: "flex", justifyContent: "space-evenly", width: "16vw"}}>
                <Login />
                <Register />
            </div>
        </div>
    );
}

export default NavBarStart;