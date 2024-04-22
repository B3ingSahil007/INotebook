import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const [credentials, setcredentials] = useState({ name: '', email: '', password: '' });

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('auth-token', json.authToken);
            props.showAlert('Successfully Account Created, Login To Add Notes.', "success");
            navigate("/login");
        }
        else {
            props.showAlert('Invalid Details', "danger");
        }
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className='container d-flex justify-content-center'>
                <div style={{ marginTop: '2cm' }}>
                    <h3><span className="fw-bold" to="/">I<span style={{ color: '#6f42c1' }}>Note</span>book.</span></h3>
                    <h4 className='mt-3'>Get Started With Your Free Account :</h4>
                    <h2 className='mt-3'>Create An Account To Use <span className="fw-bold" to="/">I<span style={{ color: '#6f42c1' }}>Note</span>book</span> :</h2>
                </div>
                <div className='container' style={{ width: '10cm', boxShadow: '0px 0px 30px 0px rgba(255, 255, 255)', borderRadius: '20px', marginRight: '1cm' }}>
                    <div style={{ padding: '0.5cm' }}>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" name="name" className="form-label"><i class="fa-solid fa-user"></i> Enter Full Name :</label>
                                <input type="text" value={credentials.name} name='name' className="form-control" id="name" aria-describedby="emailHelp" onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" name="email" className="form-label"><i class="fa-solid fa-envelope"></i> Enter Email Address :</label>
                                <input type="email" value={credentials.email} className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} required name='email' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" name="password" className="form-label"><i class="fa-solid fa-lock"></i> Enter Password :</label>
                                <input required type="password" name='password' value={credentials.password} className="form-control" id="password" autoComplete='on' onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cpassword" name="cpassword" className="form-label"><i class="fa-solid fa-lock"></i> Confirm Password :</label>
                                <input required type="password" className="form-control" id="cpassword" autoComplete='on' name='cpassword' onChange={onChange} />
                            </div>
                            <button type="submit" className="btn btn-outline-light">Sign <span style={{ color: '#6f42c1' }}>Up</span></button>
                        </form>
                    </div>
                    <hr />
                    <div className='mx-2'>
                        <p>Already Registered ? <Link style={{ textDecoration: 'none' }} to="/login"><span style={{ color: '#6f42c1' }}>Log In</span></Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
