import TicketsList from './TicketsList.js';
import { rerender, TicketList } from './rerender.js';

if (!TicketList) {
  let TicketList = new TicketsList();
}

const addTicket = document.querySelector("#addTask");

let ticketForm = document.querySelector('.ticket-form');
const submitButton = ticketForm.querySelector('[type="submit"]');
const cancelTask = document.querySelector("#cancle");


let taskAdder = document.querySelector("#taskAdder");
let ticket = document.querySelector("textarea");
let ticketTitle = document.querySelector("#title");

ticketTitle.addEventListener("input", () => {
  if (ticketTitle.value.trim() !== "") {
    submitButton.disabled = false;
    submitButton.classList.add("primary");
  } else {
    submitButton.disabled = true;
    submitButton.classList.remove("primary");
  }
}, false)

addTicket.addEventListener("click", () => taskAdder.style.display = "flex", false);

submitButton.addEventListener("click", (e) => {
  TicketList.submitTicket(e, submitButton, ticket, ticketTitle, ticketForm);

  rerender();
}, false);

cancelTask.addEventListener("click", () => {
  event.preventDefault();
  
  TicketList.resetForm(ticketForm, submitButton);
}, false);
