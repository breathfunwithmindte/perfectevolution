import React, {useState,useRef,useEffect} from 'react';
import AuthService from '../Services/AuthService';
import { Button, Dialog } from '@material-ui/core';

const Register = props=>{
    const [user,setUser] = useState({username: "", firstName : "", email : "",  password : ""});
    const [message,setMessage] = useState(null);
    const [open, setOpen] = useState(false)
    let timerID = useRef(null);

    useEffect(()=>{
        return ()=>{
            clearTimeout(timerID);
        }
    },[]);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }


    const onSubmit = e =>{
        e.preventDefault();
        AuthService.register(user).then(data=>{
            const { message } = data;
            setMessage(message);
            if(message.msgBody === "The email address is already in use by another account."){setUser({email: ""})}
            else if(message.msgBody === "Username is already taken onether monkey use it"){setUser({username: ""})}
            else if(!message.msgError){
                setMessage("welcome, you succefully created your account, now you can login !!")
                timerID = setTimeout(()=>{
                  setOpen(false)
                },3963)
            }
        });
    }


    return(
        <div>
            <p onClick={() => setOpen(true)} className="register_button_open">Sing Up</p>
            <Dialog open={open} onClose={() => setOpen(false)}>
            <div style={{background: '#000000'}}>
            <form onSubmit={onSubmit} style={{display: "flex", flexDirection: "column"}}>
                {message !== null ? <p style={{color: "red"}}>{message.msgBody}</p> : null}
                <h3 style={{fontSize: '34px', letterSpacing: '16px', textAlign: 'center', color: 'white'}}>REGISTER</h3>
                <label htmlFor="username" className="sr-only">Username: </label>
                <input type="text" 
                       name="username" 
                       value={user.username}
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Username"/>

                <label htmlFor="firstName" className="sr-only">FirstName: </label>
                <input type="text" 
                       name="firstName"
                       value={user.firstName} 
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter firstname"/>

                <label htmlFor="email" className="sr-only">Email: </label>
                <input type="email" 
                       name="email"
                       value={user.email} 
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="example@gmail.com"/>

                <label htmlFor="password" className="sr-only">Password: </label>
                <input type="password" 
                       name="password"
                       value={user.password} 
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Password"/>
                <Button type="submit" style={{color: '#4e342e'}}><h3 style={{fontSize: '14px', letterSpacing: '20px', textAlign: 'center', color: 'white'}}>REGISTER</h3></Button>
            </form>
            </div>
             </Dialog>
        </div>
    )
}
export default Register;