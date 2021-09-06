import React, { useState, useEffect, Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class DateTime extends Component {
    constructor() {
        const today = new Date();
        super()
        this.state = {
            message: 'Plant needs to be watered',
            date: `Today's Date is: ${today.toDateString()}`,
        }
    }
    changeMessage() {
        this.setState({
            message: 'Plant is watered on: '
        })
    }
    render() {
        return (
            <div>
                <h1>{this.state.message}</h1>
                <h2>{this.state.date}</h2>
                <button onClick={()=> this.changeMessage()}>Water Plant</button>
            </div>
            )
    }

    // const [date, setDate] = useState(new Date());
    // const waterSuccess = () => {
    //     toast("Hooray! Your plant is watered")
    // };
    // const plantWatered = () => {
    //     const today = new Date();
    //     const futureDate = new Date();

    //     futureDate.setDate(today.getDate() + 7);
    //     const elem1 = document.getElementById('water-date');
    //     const elem2 = document.getElementById('future-date');
    //     elem1.innerHTML = `Plant last watered on: ${today.toDateString()}`;
    //     elem2.innerHTML = `Your plant needst to be watered next on: ${futureDate.toDateString()}`
    //     waterSuccess();
    // };


    // return (
    //     <div>
    //         <button onClick={plantWatered}>Press this to water your plant </button>
    //         <p id='water-date'></p>
    //         <p id='future-date'></p>
    //     </div>
    // )
};

export default DateTime;

// if time is greater than 7 days since last water (week example) then render notification, take to plant page. 

// this.state.time ? **toast notification** : nothing

// if time is less than 7 days.... do nothing???

// if all plants are watered.. new notification 'all plants are happy and hydrated!'

// need to check time for all saved plants