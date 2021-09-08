import React from 'react';
import './Style.css'
import Auth from '../utils/auth';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 

const WelcomePage = () => {
    
    return (
        <div style={{backgroundColor: "#EEE2DC"}}>
            <div className="bg-image" style={{"backgroundImage": "url('https://images.unsplash.com/photo-1496309732348-3627f3f040ee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')", height: "100vh", width: "100vw"}}>
                <div style={{fontFamily: 'Oleo Script, cursive', fontSize: "96px", color: "#F4E4C1", textAlign: "center", paddingTop: "20vh"}} >
                    Herb-Your-Enthusiasm
                    <p style={{fontSize:"32px", color: "#F4E4C1", textAlign: "center"}}>The Helpful Plant App</p>
                </div>
                {/* <div className="social-icons" style={{marginLeft: "47vw", marginTop: "15vw"}}> 
                    <a className="social-icon" href="https://github.com/AnneliseRowan/herb-your-enthusiam" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={['fab', 'fa-github']}/></a>
                </div> */}
            </div>
        </div>
    )
}

export default WelcomePage; 