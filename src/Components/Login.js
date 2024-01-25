import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setcredentials] = useState({ email: '', password: '' });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        // console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('auth-token', json.authToken);
            props.showAlert('Successfully Login, Add Notes.', "success");
            navigate("/");
        }
        else {
            props.showAlert('Invalid Credentials', "danger");
        }
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className='container mt-3'>
                <h2>Log-In to continue to INotebook :</h2><br />
                <form style={{ width: '10cm', marginLeft: '8cm' }} onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Enter Email Address :</label>
                        <input onChange={onChange} type="email" required className="form-control" id="email" value={credentials.email} name='email' aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Enter Password :</label>
                        <input onChange={onChange} type="password" required className="form-control" name='password' id="password" value={credentials.password} autoComplete="on" />
                    </div>
                    <button type="submit" className="btn btn-primary">Log In</button>
                </form>
            </div>
        </>
    )
}

export default Login
