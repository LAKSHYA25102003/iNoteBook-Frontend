import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/Alert/AlertContext';
import { useContext } from 'react';

function Login() {

    const context=useContext(AlertContext);
    const {handleAlert}=context;


    const navigate=useNavigate();
    const [cred,setCred]=useState({email:"",password:""});
    const onChange=(event)=>{
        setCred({...cred,[event.target.name]:event.target.value});
    }
    const handleSubmit=async (event)=>{
        event.preventDefault();
        const data={
            email:cred.email,
            password:cred.password
        }
        const url = "http://localhost:5000/api/auth/login";
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type':'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:JSON.stringify(data)
        });
        const json=await response.json();
        if(json.success){
            // save the auth token and redirect
            // to redirect we will use navigate hook
            localStorage.setItem("Token",json.authtoken);
            handleAlert("Successfully Logged in!","success")
            navigate("/");
        }
        else
        {
            setCred({email:"",password:""});
            handleAlert("Error:Login with correct credentials!","danger")
        }

    }
    return (
        <div>
            {/* we make on submit on form instead of button */}
            <div className="container"><h2>Login to continue to iNoteBook</h2></div>
            <form onSubmit={handleSubmit} className="container">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input value={cred.email} required type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input value={cred.password} required  type="password" className="form-control" name='password' id="exampleInputPassword1" onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" >Sign In</button>
            </form>
        </div>
    )
}

export default Login
