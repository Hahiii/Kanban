import Ticket from './Ticket.js';
import rerender from './rerender.js';

let tickets;
let ticket = document.querySelector("textarea");

if (localStorage.getItem("tickets")) {
  tickets = JSON.parse(localStorage.getItem("tickets"))
} else {
  tickets = []
}

const addTicket = document.querySelector("#addTask");
addTicket.addEventListener("click", openTaskAdder, false);
const submitTask = document.querySelector("#submit");
submitTask.addEventListener("click", submitTicket, false);
const cancelTask = document.querySelector("#cancle");
cancelTask.addEventListener("click", (e) => {
  e.preventDefault();
  ticket.value = "";
  taskAdder.style.display = "none";
}, false);

let taskAdder = document.querySelector("#taskAdder");

function openTaskAdder() {
  taskAdder.style.display = "flex";
}

function submitTicket(event) {
  event.preventDefault();
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