import TicketsList from './TicketsList.js';
import { rerender, TicketList } from './rerender.js';


if (!TicketList) {
  let TicketList = new TicketsList;
}

const addTicket = document.querySelector("#addTask");
const button = document.querySelector("#submit");
const cancelTask = document.querySelector("#cancle");

let taskAdder = document.querySelector("#taskAdder");
let ticket = document.querySelector("textarea");
let ticketTitle = document.querySelector("#title");

ticketTitle.addEventListener("input", () => {
  if (ticketTitle.value.trim() !== "") {
    button.disabled = false;
    button.classList.add("primary");
  } else {
    button.disabled = true;
    button.classList.remove("primary");
  }
}, false)

addTicket.addEventListener("click", () => taskAdder.style.display = "flex", false);

button.addEventListener("click", () => {
  TicketList.submitTicket(event, button, ticket, ticketTitle);
  rerender();
}, false);


cancelTask.addEventListener("click", (event) => {
  event.preventDefault();
  ticketTitle.value = "";
  ticket.value = "";
  button.disabled = true;
  taskAdder.style.display = "none";
}, false);
