import { updateTickets, tickets } from './tickets.js';

function removeDoneTickets() {
    let tempArrTickets = JSON.parse(localStorage.getItem("tickets")).filter(element => element.isDone === false);
    updateTickets(tempArrTickets);
}

export default removeDoneTickets