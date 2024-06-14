import "./Login.css"

import React from 'react'
import { Link } from "react-router-dom";
import { useState } from "react"
import axios from 'axios'


export const Login = () => {
    const[error,setError]=useState()

    const[data,setData] =useState({
        email:"",
        password:""
    })
   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
    const handleSubmit =async (e)=>{
            e.preventDefault();
            try {
                const url ="http://localhost:8080/api/auth/login"
                const {data:res} =await axios.post(url,data)
                localStorage.setItem("token",res.data)
                window.location="/"
                console.log(res.message);
            } catch (error) {
                if (error.response && error.response.status>=400 && error.response.status <= 500){
                    setError(error.response.data.message)
                }
                
            }
            
    }
  return (
    <div className="login">
        <div className="login-container">
            <div className="login-container-left">
            <form action="" className="login-container-form" onSubmit={handleSubmit}>
                <h1>Log into  Your Account</h1>
                <input type="text"  placeholder="Email" name="email" value={data.Email} required onChange={handleChange}/>
                <input type="Password"  placeholder="Password" name="password" value={data.Password} required onChange={handleChange}/>
                {error&& <div className="login-container-error"> {error}</div>}
                <button className="login-container-Button" type="submit">Sign in</button>
               </form>
            </div>
            <div className="login-container-right">
                <h1>New Here?</h1>
                    <Link to="/signup">
                        <button className="login-container-signup-Button">
                            Sign Up
                        </button>
                    </Link>
            </div>

        </div>
    </div>
  )
}
