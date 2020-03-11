import { v4 as uuidv4 } from '../../node_modules/uuid';
import Ticket from './Ticket.js';
import TicketsList from './TicketsList.js';
import { rerender, TicketList } from './rerender.js';


if (!TicketList) {
  let TicketList = new TicketsList;
}

const addTicket = document.querySelector("#addTask");
const submitTask = document.querySelector("#submit");
const cancelTask = document.querySelector("#cancle");

let tickets = []
let taskAdder = document.querySelector("#taskAdder");
let ticket = document.querySelector("textarea");
let ticketTitle = document.querySelector("#title");

ticketTitle.addEventListener("input", () => {
  if (ticketTitle.value.trim() !== "") {
    submitTask.disabled = false;
    submitTask.classList.add("primary");
  } else {
    submitTask.disabled = true;
    submitTask.classList.remove("primary");
  }
}, false)

addTicket.addEventListener("click", openTaskAdder, false);
submitTask.addEventListener("click", submitTicket, false);
cancelTask.addEventListener("click", (e) => {
  e.preventDefault();
  ticketTitle.value = "";
  ticket.value = "";
  submitTask.disabled = true;
  taskAdder.style.display = "none";
}, false);


function openTaskAdder() {
  taskAdder.style.display = "flex";
}

function submitTicket(event) {
  event.preventDefault();
  if (submitTask.innerText === 'Submit') {
    tickets = TicketList.add(new Ticket(`${ticketTitle.value}`, `${ticket.value}`, false, "to-do", uuidv4));
    TicketList.updateList(tickets);
  } else {
    tickets = TicketList.getList()
    tickets.forEach(element => {
      if (element.id === submitTask.setDataId) {
        element.title = ticketTitle.value;
        element.text = ticket.value;
      }
    });
    TicketList.updateList(tickets);
  }

  ticket.value = "";
  ticketTitle.value = "";
  taskAdder.style.display = "none";
  submitTask.disabled = true;
  submitTask.innerText = 'Submit';
  submitTask.classList.remove("primary");
  rerender();
}

export { tickets }