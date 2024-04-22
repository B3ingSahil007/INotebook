import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    // let navigate = useNavigate()
    return (
        <>
            <div className="bg-light">
                <footer className="py-3 mt-auto">
                    <ul className="nav justify-content-center border-bottom pb-2">
                        <li className="nav-item"><Link to="/" className="nav-link mx-3 text-muted">Home</Link></li>
                        <li className="nav-item"><Link to="/" className="nav-link mx-3 text-muted">Features</Link></li>
                        <li className="nav-item"><Link to="/" className="nav-link mx-3 text-muted">Pricing</Link></li>
                        <li className="nav-item"><Link to="/" className="nav-link mx-3 text-muted">FAQs</Link></li>
                        <li className="nav-item"><Link to="/about" className="nav-link mx-3 text-muted">About</Link></li>
                    </ul>
                    <div>
                        <p className="text-center text-muted m-0">Copyright &copy; 2023 - <span to="/">I<span className="fw-bold" style={{ color: '#6f42c1' }}>Note</span>book</span>, Inc. All Rights Reserved.</p>
                        <p className='text-center text-muted m-0'>Created By <span style={{ color: '#6f42c1' }}>Sahil Miyawala</span>, B3ing_Sahil_007.</p>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Footer
