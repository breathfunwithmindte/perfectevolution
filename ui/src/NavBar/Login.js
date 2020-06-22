import React, {useState,useContext} from 'react';
import AuthService from '../Services/AuthService';
import {AuthContext} from '../Context/AuthContext';
import { Button, Dialog } from '@material-ui/core';

const Login = props=>{
    const [user,setUser] = useState({});
    const authContext = useContext(AuthContext);
    const [message,setMessage] = useState(null);
    const [open, setOpen] = useState(false)


    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.login(user).then(data=>{
            console.log(data);
            const { isAuthenticated,user,message} = data;
            if(isAuthenticated){
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                window.location.reload(false)
            }
            else
                setMessage(message);
        });
    }

   return(
        <div>
            <p onClick={() => setOpen(true)} className="login_button_open">Sing In</p>
            <Dialog open={open} onClose={() => setOpen(false)}>
                {message}
                <div style={{background: '#000000'}}>
            <form onSubmit={onSubmit} className='loginform'>
                <h3 style={{fontSize: '34px', letterSpacing: '21px', textAlign: 'center', color: 'white', marginTop: '4px'}}>LOGIN</h3>
                <label htmlFor="username" className="sr-only">Username: </label>
                <input type="text" 
                       name="username" 
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Username"/>
                <label htmlFor="password" className="sr-only">Password: </label>
                <input type="password" 
                       name="password" 
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Password"/>
                <Button type="submit" style={{color: '#4e342e'}}><h3 style={{fontSize: '14px', letterSpacing: '28px', textAlign: 'center', color: 'white', marginTop: '4px'}}>LOGIN</h3></Button>
            </form>
            </div>
            </Dialog>
        </div>)
}

export default Login;