import React, { useState } from 'react';
import StripeContainer from '../components/StripeContainer';
import {Helmet} from 'react-helmet';
import './Style.css'; 

const Donate = () => {
    const [showItem, setShowItem] = useState(false)
    return (
      <><Helmet>
        <style>{'body { background:repeating-linear-gradient(rgba(250,400,150,200),transparent);}'}</style>
      </Helmet><div class="Donate" style={{ marginBottom: "50px", marginTop: "30px", textAlign: "center" }}>
          <h1 style={{ fontFamily: 'Oleo Script, cursive', fontSize: "64px" }}>Donate and Plant a Seed</h1>
          {showItem ? <StripeContainer /> : <> <h3 style={{ fontSize: "32px" }}>$5.00</h3> <img src="https://images.unsplash.com/photo-1459156212016-c812468e2115?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1898&q=80" alt="small plant" style={{ display: "block", marginLeft: "auto", marginRight: "auto", width: "50%" }} />
            <button onClick={() => setShowItem(true)} style={{ marginBottom: "20px" }}>Donate</button></>}
          <span style={{ fontSize: "48px", fontFamily: 'Oleo Script, cursive' }}>Visit Our <a href="https://github.com/AnneliseRowan/herb-your-enthusiam" target="blank">Github</a></span>
        </div></>
    );

}

export default Donate;