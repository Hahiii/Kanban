import { updateTickets, tickets } from './tickets.js';

function removeDoneTickets() {
    let tempArr = JSON.parse(localStorage.getItem("tickets")).filter(element => element.isDone === false);
    updateTickets(tempArr);
}

export default removeDoneTickets