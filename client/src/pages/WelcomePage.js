import React from 'react';
import './style.css'
import Auth from '../utils/auth';


const WelcomePage = () => {
    return (
        <div style={{backgroundColor: "#EEE2DC"}}>
            <div className="bg-image" style={{"backgroundImage": "url('https://images.unsplash.com/photo-1496309732348-3627f3f040ee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')", height: "100vh"}}>
                <div style={{fontFamily: 'Oleo Script, cursive', fontSize: "96px", color: "#2E151B", marginLeft: "20vw", paddingTop: "10vw"}} >
                    Herb-Your-Enthusiasm
                    <p style={{fontSize:"32px", color: "#2E151B", marginLeft: "20vw"}}>The Helpful Plant App</p>
                </div>
                {/* <div className="social-icons maintxt position-absolute top-100 start-50 translate-middle"> 
                    <a className="social-icon" href="https://github.com/AnneliseRowan/herb-your-enthusiam" target="_blank" rel="noreferrer"><i class="fab fa-github"></i></a>
                </div> */}

                
            </div>
        </div>

    )
}

export default WelcomePage; 