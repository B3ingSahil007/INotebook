import React from 'react'
import Notes from './Notes'
import Footer from './Footer';


const Home = (props) => {
    const { showAlert } = props
    return (
        <div>
            <div className="container">
                <Notes showAlert={showAlert} />
            </div>
            <div style={{ marginTop: '1cm' }}>
                <Footer />
            </div>
        </div>
    )
}

export default Home