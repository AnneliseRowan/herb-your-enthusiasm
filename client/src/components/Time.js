import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DateTime = () => {
    const [date, setDate] = useState(new Date());
    const waterSuccess = () => {
        toast("Hooray! Your plant is watered")
    };
    const plantWatered = () => {
        const elem = document.getElementById('water-date');
        elem.innerHTML = `Plant last watered on: ${date.toDateString()}`;
        waterSuccess();
    }

    return(
        <div>
            <button onClick={plantWatered}>Press this to water your plant </button>
            <p id='water-date'></p>
        </div>
    )
}

export default DateTime;