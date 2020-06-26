import React, {createContext,useState,useEffect} from 'react';
import AuthService from '../Services/AuthService';
import socket from '../socket';

export const AuthContext = createContext();

export default ({ children })=>{
    const [user, setUser] = useState(null);
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [socketID, setSocketID] = useState("");
    const [isLoaded,setIsLoaded] = useState(false);
    const [update, setUpdate] = useState(false)

    useEffect(()=>{
        AuthService.isAuthenticated().then(data =>{
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
            socket.on(`update_AUTH_Context_${data.user._id}`, ({smth}) => {
                setUpdate(smth);
                setTimeout(() => {
                   setUpdate(false) 
                }, 936);
            })
        });
        socket.on("initialization", ({socketID}) => setSocketID(socketID))
    },[update]);

    return (
        <div>
            {!isLoaded ? <h1>Loading</h1> : 
            <AuthContext.Provider value={{user,setUser,socketID,isAuthenticated,setIsAuthenticated}}>
                { children }
            </AuthContext.Provider>}
        </div>
    )
}