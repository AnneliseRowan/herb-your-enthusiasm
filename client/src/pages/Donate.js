import React from 'react';
// for toast notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Auth from '../utils/auth';

const Donate = () => {

    const notify = () => toast("Wow so easy!");
    return (
        <div>
            <h1> Plant a Seed make it grow!</h1>
            <div>
                <button onClick={notify}> Notify !</button>

                <ToastContainer/>
            </div>
        </div>
    )
}

export default Donate;