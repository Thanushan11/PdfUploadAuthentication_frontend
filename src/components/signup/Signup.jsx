import './Signup.css'
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export const Signup = () => {
    const [error, setError] = useState("");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting data:', data);
        try {
            const url = "http://localhost:8080/api/users/signup";
            const { data: res } = await axios.post(url, data);
            navigate('/login');
            console.log(res.message);
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            } else {
                console.error("An unexpected error occurred:", error);
            }
        }
    };

    return (
        <div className="signup">
            <div className="signup-container">
                <div className="signup-container-left">
                    <Link to="/login">
                        <button className="signup-container-login-button">
                            Sign in
                        </button>
                    </Link>
                </div>
                <div className="signup-container-right">
                    <form className="signup-container-form" onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={data.Name}
                            required
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={data.Email}
                            required
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={data.Password}
                            required
                            onChange={handleChange}
                        />
                        {error && <div className="signup-container-form-error">{error}</div>}
                        <button className="signup-container-button" type="submit">
                            Signup
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
