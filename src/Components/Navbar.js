import React from 'react'
// import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  // useEffect(() => {
  //   // console.log(location.pathname);
  // }, [location]);
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    navigate('/Login');
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><span className="fw-bold" to="/">I<span style={{ color: '#6f42c1' }}>Note</span>book</span></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
              </li>
            </ul>
            {!localStorage.getItem('auth-token') ? <form className="d-flex" role="search">
              <Link className="btn btn-outline-light" to="/login" role="button">Log <span style={{ color: '#6f42c1' }}>In</span></Link>
              <Link className="btn btn-outline-light mx-3" to="/signup" role="button">Sign <span style={{ color: '#6f42c1' }}>Up</span></Link>
            </form> : <button onClick={handleLogout} className="btn btn-outline-light mx-3">Log <span style={{ color: '#6f42c1' }}>Out</span></button>}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
