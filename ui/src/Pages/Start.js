import React from 'react';
import NavBarStart from '../NavBar/NavBarStart';
import {useHistory} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { themeContext } from '../Context/ThemeContext';
import './start.css';
import '../global_style.css';

function Start(props) {
    const { user } = React.useContext( AuthContext );
    const { theme } = React.useContext( themeContext );
    const {socketID} = React.useContext( AuthContext );

    const History = useHistory();
    return (

        <div>
            <header>
                <NavBarStart />
            </header>
            <div className="start_container" style={{padding: "200px"}}>
                <button onClick={() => {
                    History.push(`/${user.firstName}'s_App/Posts`)
                }}>
                    nana
                </button>
            </div>
        </div>
    );
}

export default Start;