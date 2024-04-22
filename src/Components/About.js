// import React from "react"

// const About = () => {

//   return (
//     <div>
//       <h4>This is About Page.</h4>
//     </div>
//   )
// }

// export default About

import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'

const About = () => {
  return (
    <>
      <div style={{marginTop:'-1cm'}}>
        <style jsx="true">
          {`  
                    .signup:hover{
                        background-color: #61428f !important;
                    }

                    .icon{
                        margin: 20px auto 0 auto;
                        padding-top: 17px;
                        display: inline-block;
                        text-align: center;
                        border-radius: 50%;
                        width: 72px;
                        height: 72px;
                        background: #6f42c1;
                    }

                    .icon i{
                        font-size: 36px;
                        line-height: 1;
                        color: #ededed;
                    }

                    .credits{
                        background-color: #ededed;
                        right: 0;
                        left: 0;
                        bottom: 0;
                        padding: 15px;
                        text-align: right;
                        font-size: 18px;
                        color: #000;
                        z-index: 999999;
                    }
                    
                    .credits span{
                        color: #6f42c1;
                    }
                `}
        </style>

        <div className='container col-md-8 center'>
          <h1 className="text-center fw-bold">The Simple Way To <br /> Keep Notes.</h1>
          <h4 className="text-center para">All your notes, synced on all your devices. <span className="fw-bold" to="/">I<span style={{ color: '#6f42c1' }}>Note</span>book</span> now for IOS, Android, Mac, Windows, Linux, or in your browser.</h4>
          <div className='d-flex justify-content-center'>
            <Link className="btn m-3 signup" to='/signup' style={{ backgroundColor: '#6f42c1', color: '#ffffff', textDecoration: 'none', outline: '0', boxShadow: 'none', width: '5cm' }}>Sign Up Now</Link>
          </div>
        </div>

        <div className='container'>
          <h2 className="text-center fw-bold my-3">Comprehensive Underneath, Simple On The Surface.</h2>

          <div className="row text-center row-cols-1 row-cols-md-3 g-4">
            <div className="col">
              <div className="card bg-light h-100">
                <div className="icon">
                  <i class="fa-sharp fa-solid fa-rotate fa-spin"></i>
                </div>
                <div className="card-body">
                  <h5 className="card-title fw-bold">Use It Everywhere</h5>
                  <p className="card-text">Notes stay updated across all your devices, automatically and in real time. There’s no “sync” button: It just works.</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card bg-light h-100">
                <div className="icon">
                  <i class="fa-solid fa-magnifying-glass fa-beat"></i>
                </div>
                <div className="card-body">
                  <h5 className="card-title fw-bold">Stay Organized</h5>
                  <p className="card-text">Add tags to find notes quickly.</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card bg-light h-100">
                <div className="icon">
                  <i class="fa-solid fa-tags fa-fade"></i>
                </div>
                <div className="card-body">
                  <h5 className="card-title fw-bold">Always Within Reach</h5>
                  <p className="card-text">Keep works on your phone, tablet and computer. Everything you add to Keep syncs across your devices so your important stuff is always with you.</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card bg-light h-100">
                <div className="icon">
                  <i class="fa-regular fa-circle-check fa-beat-fade"></i>
                </div>
                <div className="card-body">
                  <h5 className="card-title fw-bold">It’s Free</h5>
                  <p className="card-text">Backups, syncing - it's all completely free.</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card bg-light h-100">
                <div className="icon">
                  <i class="fa-solid fa-cloud fa-bounce"></i>
                </div>
                <div className="card-body">
                  <h5 className="card-title fw-bold">Try <span className="fw-bold" to="/">I<span style={{ color: '#6f42c1' }}>Note</span>book</span></h5>
                  <p className="card-text">Save your thoughts, wherever you are.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '1cm' }}>
        <Footer />
      </div>
      {/* <div style={{ marginTop: '1cm' }} className="col-md-12 credits">
        Created by <span>Sahil Miyawala</span>
      </div> */}
    </>
  )
}

export default About