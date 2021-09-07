import React, { useState } from 'react';
// for toast notifications
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import StripeContainer from '../components/StripeContainer';
//import DateTime from '../components/Time';
import './Style.css'; 


//import Auth from '../utils/auth';
//toast.configure()
const Donate = () => {
    const [showItem, setShowItem] = useState(false)
    return (

      <div className="Donate">
        <h1>Donate a Plant</h1>
        {showItem ? <StripeContainer/> : <> <h3>$10.00</h3> <img src="https://images.unsplash.com/photo-1459156212016-c812468e2115?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=349&q=80" alt="small plant" style={{justifyContent:"center"}} />
        <button onClick={() => setShowItem(true)}>Donate</button></>}
      </div>
    );

}

export default Donate;

    // // notification for when it's time to water your plant
    // const waterNotify = () => {
    //     toast.info("Your plant is thirsty, time to water!")
    // };

    // // notification for when a new plant is added to users collection
    // const newPlant = () => {
    //     toast.success("Success! You added a new plant to your garden")
    // }
    // return (
    //     <div>
    //         <h1> Plant a Seed make it grow!</h1>
    //         <div>
    //             <button onClick={waterNotify}> Need to water my plant !</button>
    //             <button onClick={newPlant}> Add a new plant !</button>

    //             <ToastContainer/>
    //             <DateTime/>
    //         </div>
    //         <div>
    //         </div>
    //     </div>