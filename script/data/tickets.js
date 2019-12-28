import Ticket from './constructor.js';
import rerender from './rerender.js';

let tickets;

if (localStorage.getItem("tickets")) {
  tickets = JSON.parse(localStorage.getItem("tickets"))
} else {
  tickets = []
}

const addTicket = document.querySelector("#addTask");
addTicket.addEventListener("click", openTaskAdder, false);
const submitTask = document.querySelector("#submit");
submitTask.addEventListener("click", submitTicket, false);
let taskAdder = document.querySelector("#taskAdder");

function openTaskAdder() {
  taskAdder.style.display = "flex";
}

function submitTicket(event) {
  event.preventDefault();
  let ticket = document.querySelector("textarea");
  if (ticket.value !== "") {
    tickets.push(new Ticket(`${ticket.value}`, false, "to-do"))
    localStorage.setItem("tickets", JSON.stringify(tickets))
  }
  
  ticket.value = "";
  taskAdder.style.display = "none";
  rerender();
}

function updateTickets(data) {
  tickets = data;
  localStorage.setItem("tickets", JSON.stringify(tickets))
  rerender();
  
}

export {
  updateTickets,
  tickets
}