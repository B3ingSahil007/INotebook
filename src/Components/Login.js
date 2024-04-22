import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

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
        //^ console.log(json); Un-Comment
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
            <div style={{ boxShadow: '0px 0px 50px 0px rgba(255, 255, 255)', width: '12cm', marginLeft: '12cm', borderRadius: '20px' }}>
                <div className="m-3">
                    <div style={{ paddingTop: '0.5cm' }}>
                        <h2 className="d-flex justify-content-center"><span>Welcome To <span className="fw-bold" to="/">I<span style={{ color: '#6f42c1' }}>Note</span>book.</span></span></h2>
                        <h4 className="d-flex justify-content-center"><span>Log-In To Continue To <span className="fw-bold" to="/">I<span style={{ color: '#6f42c1' }}>Note</span>book.</span></span></h4>
                        {/* <h1 className="d-flex justify-content-center">Login :</h1> */}
                    </div>
                    <div style={{ marginTop: '1cm' }} className="d-flex justify-content-center">
                        <div className='justify-content-center'>
                            <form style={{ width: '10cm' }} onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label"><i class="fa-solid fa-envelope"></i> Enter Email Address :</label>
                                    <input onChange={onChange} type="email" required className="form-control" id="email" value={credentials.email} name='email' aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label"><i class="fa-solid fa-lock"></i> Enter Password :</label>
                                    <input onChange={onChange} type="password" required className="form-control" name='password' id="password" value={credentials.password} autoComplete="on" />
                                </div>
                                <button type="submit" className="btn btn-outline-light">Log <span style={{ color: '#6f42c1' }}>In</span></button>
                            </form>
                            <hr />
                            <p>Don't Have An Account ? <Link style={{ textDecoration: 'none' }} to="/signup"><span style={{ color: '#6f42c1' }}>Sign Up</span></Link></p>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Login
