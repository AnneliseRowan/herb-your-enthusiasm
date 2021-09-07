import React from 'react';
// for toast notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DateTime from '../components/Time';


import Auth from '../utils/auth';
toast.configure()
const Donate = () => {
    // notification for when it's time to water your plant
    const waterNotify = () => {
        toast.info("Your plant is thirsty, time to water!")
    };

    // notification for when a new plant is added to users collection
    const newPlant = () => {
        toast.success("Success! You added a new plant to your garden")
    }
    return (
        <div>
            <h1> Plant a Seed make it grow!</h1>
            <div>
                <button onClick={waterNotify}> Need to water my plant !</button>
                <button onClick={newPlant}> Add a new plant !</button>
                <p id='testing'></p>
                <ToastContainer/>
                <DateTime/>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Donate;