import React from 'react';
import socket from '../socket';
import { AuthContext } from './AuthContext'

export const themeContext = React.createContext();

export default ({ children })=>{
    const [theme, setTheme] = React.useState("dark");
    const { user } = React.useContext( AuthContext );

    React.useEffect(()=>{
        const InitializationTheme = async () => {
            let sendIDserver = await socket.emit("theme", {authID: user._id})
            socket.on("theme_response", ({userTheme}) => setTheme(userTheme))
        }
        InitializationTheme();
    },[user]);

    return (
        <div>
            <themeContext.Provider value={{theme, setTheme}}>
                { children }
            </themeContext.Provider>
        </div>
    )
}