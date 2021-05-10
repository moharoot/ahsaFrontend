import React, { useState } from 'react';  
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { login, userLoading } from '../../store/actions/authActions' 
import logo from '../../images/logo.png'

const Login = (props) => { 
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.authR.isAuthenticated);  
    const [state, updateState] = useState({ 
        username:null,
        password:null,   
    });  
     
    //console.log(isAuthenticated)
    // Login
    const handleSubmit = (e) =>{ 
        e.preventDefault();   
        const {username, password} = state;
        const user = {username, password}; 
        dispatch(login(user));  
        dispatch(userLoading());  

     }

       // onChange
     const handleChange = e => updateState({
           ...state, [e.target.name]:e.target.value 
        });
 
        if(isAuthenticated){
           return <Redirect to="/" /> 
        } 
        return (
            <div className="login__container">  
                <div className="text">
                    <div className="logo"><img src={logo} className="user-icon" /></div>
                </div>  
                <form onSubmit={handleSubmit}>
                    <div>
                        <h3>LOGIN HERE!</h3>
                        <div>
                            <label>Username</label>
                            <input type="text" required name="username" onChange={handleChange}/>
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" required name="password" onChange={handleChange}/>
                        </div>    
                        <input type="submit" value="Login"/>
                        {/* <p className="forgot"><a href="#">Forgot Password?</a></p> */}
                    </div>
                </form> 
            </div>
        )
}

export default Login; 
             
           