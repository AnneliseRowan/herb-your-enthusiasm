import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DateTime = () => {
    const [date, setDate] = useState(new Date());
    const waterSuccess = () => {
        toast("Hooray! Your plant is watered")
    };
    const plantWatered = () => {
        const today = new Date();
        const futureDate = new Date();

        futureDate.setDate(today.getDate() + 7);
        const elem1 = document.getElementById('water-date');
        const elem2 = document.getElementById('future-date');
        elem1.innerHTML = `Plant last watered on: ${today.toDateString()}`;
        elem2.innerHTML = `Your plant needst to be watered next on: ${futureDate.toDateString()}`
        waterSuccess();
    };



    return (
        <div>
            <button onClick={plantWatered}>Press this to water your plant </button>
            <p id='water-date'></p>
            <p id='future-date'></p>
        </div>
    )
};

export default DateTime;