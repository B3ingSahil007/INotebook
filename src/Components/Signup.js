import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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
            <h2 className='mt-3'>Create an Account to use INotebook :</h2><br />
            <div className='container' style={{ width: '10cm' }}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" name="name" className="form-label">Enter Full Name :</label>
                        <input type="text" value={credentials.name} name='name' className="form-control" id="name" aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" name="email" className="form-label">Enter Email Address :</label>
                        <input type="email" value={credentials.email} className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} required name='email' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" name="password" className="form-label">Enter Password :</label>
                        <input required type="password" name='password' value={credentials.password} className="form-control" id="password" autoComplete='on' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" name="cpassword" className="form-label">Confirm Password :</label>
                        <input required type="password" className="form-control" id="cpassword" autoComplete='on' name='cpassword' onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        </>
    )
}

export default Signup
