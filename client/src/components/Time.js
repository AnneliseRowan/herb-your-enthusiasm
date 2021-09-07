import React, { ReactDom, useState, useEffect, Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactDOM } from 'react';

export default function DateTime() {
    const today1 = new Date();

    const [date, setDate] = useState(new Date());
    const waterSuccess = () => {
        toast("Hooray! Your plant is watered")
    };
    const plantWatered = () => {
        // useEffect(() => {
        //     setDate(JSON.parse(window.localStorage.getItem('date')));
        // }, []);
    
        // useEffect(() => {
        //     window.localStorage.setItem('date', date);
        // }, [date]);

        const today = new Date();
        const futureDate = new Date();

        futureDate.setDate(today.getDate() + 7);
        const elem1 = document.getElementById('water-date');
        const elem2 = document.getElementById('future-date');
        elem1.innerHTML = `Plant last watered on: ${today.toDateString()}`;
        elem2.innerHTML = `Your plant needs to be watered next on: ${futureDate.toDateString()}`
        waterSuccess();
    };

    // spider plant: 7 days
    // aloe : 14-21 days
    // snake plant: 2-3 days
    // pothos: 7 days - 14 days
    // succulents: 21-30
    // peace lilies: 7-14 days
    // african violet: 30 days
    // ponytail: 7-14 days
    // monstera: 10-14
    // english ivy: 5-7
    // basil: 3 days
    // chives: 3
    // mint: 3 
    // oregano: 3
    // parsley: 3
    // rosemary: 7-14
    // thyme: 7-14 days
    // chinese evergreen: 7 days



    return (
        <div>
            <button onClick={plantWatered}>Press this to water your plant </button>
            <p>Today's date is:{today1.toDateString()}</p>
            <p id='water-date'></p>
            <p id='future-date'></p>
        </div>
    )
}
// let [date, setDate] = useState(new Date());
// console.log(date)

// useEffect(() => {
//     setDate(JSON.parse(window.localStorage.getItem('date')));
// }, []);

// useEffect(() => {
//     window.localStorage.setItem('date', date);
// }, [date]);

// const waterPlant = () => {
//     return setDate(date + 7);
// }

// return (
//     <div>
//        <h2>Today's Date: {date}</h2>
//        <button onClick={waterPlant}>Water Plant</button>
//     </div>
// )

//===========================

// class DateTime extends Component {
//     constructor() {
//         const today = new Date();
//         super()
//         this.state = {
//             message: 'Plant needs to be watered',
//             date: `Today's Date is: ${today.toDateString()}`,
//         }
//     }
//     changeMessage() {
//         this.setState({
//             message: 'Plant is watered on: '
//         })
//     }
//   waterSuccess () {
//             toast("Hooray! Your plant is watered")
//         };
//     render() {
//         return (
//             <div>
//                 <h1>{this.state.message}</h1>
//                 <h2>{this.state.date}</h2>
//                 <button onClick={()=> this.changeMessage(), this.waterSuccess()}>Water Plant</button>
//             </div>
//             )
//     }


// };


// if time is greater than 7 days since last water (week example) then render notification, take to plant page. 

// this.state.time ? **toast notification** : nothing

// if time is less than 7 days.... do nothing???

// if all plants are watered.. new notification 'all plants are happy and hydrated!'

// need to check time for all saved plants