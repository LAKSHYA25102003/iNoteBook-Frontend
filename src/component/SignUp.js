import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/Alert/AlertContext';
import { useContext } from 'react';

function SignUp() {

  // to handle alert for signup
  const context=useContext(AlertContext);
  const {handleAlert}=context;


  let navigate=useNavigate();
  const [cred,setCred]=useState({name:"",email:"",password:"",cpassword:""});
  const handleSubmit=async(event)=>{
    event.preventDefault();
    const url="http://localhost:5000/api/auth/create-user";
    const data={
      name:cred.name,
      email:cred.email,
      password:cred.password
    }
    const response=await fetch(url,{
      method:'POST',
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify(data)

    })

    const json=await response.json();
    if(json.success)
    {
      localStorage.setItem("Token",json.authtoken);
        handleAlert("Account is created successfully!","success");
        navigate("/");
    }
    else
    {
      setCred({name:"",email:"",password:""});
      handleAlert("Error:User already exist!","danger");

    }
  }
  const onChange= async (event)=>{
     setCred({...cred,[event.target.name]:event.target.value})
  }

  return (
    <div>
      <div className="container"><h2>Create account to use iNoteBook</h2></div>
      <form onSubmit={handleSubmit} className="container">
        <div className="mb-3">
          <label htmlFor="sname" className="form-label">Name</label>
          <input required minLength={3} value={cred.name} type="text" className="form-control" id="sname" name='name' aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="semail" className="form-label">Email address</label>
          <input required minLength={5}  value={cred.email} type="email" className="form-control" id="semail" name='email' aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="spassword" className="form-label">Password</label>
          <input required minLength={5} value={cred.password} type="password" className="form-control" name='password' id="spassword" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input required minLength={5} value={cred.cpassword} type="text" className="form-control" name='cpassword' id="cpassword" onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp
