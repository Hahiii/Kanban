import Ticket from './Ticket.js';
import { v4 as uuidv4 } from '../../node_modules/uuid';


class TicketsList {
  constructor() {
    this.tickets = localStorage.getItem("tickets") ? this.tickets = JSON.parse(localStorage.getItem("tickets")) : []
  }

  add(ticket) {
    this.tickets.push(ticket);
    return this.tickets;
  }

  remove(state) {
    this.tickets = this.tickets.filter(element => element.isDone === state);
    this.updateList(this.tickets)
  }

  updateList(list) {
    localStorage.setItem("tickets", JSON.stringify(list));
  }

  getList(stateIn) {
    return stateIn ? this.tickets.filter(element => element.state === stateIn) : this.tickets;
  }

  getTemplate(title, state, id) {
    let li = document.createElement("li");
    let innerHtmlTemplate = `
    <a title="add new item"><i id="edditTask" class="far fa-edit"></i></a>
    <p draggable="true" class=${state} id=${id}>${title}</p>    
    `
    li.innerHTML = `${innerHtmlTemplate}`;
    return li;
  }


  submitTicket(event, button, ticket, ticketTitle) {
    let tickets = []
    event.preventDefault();
    if (button.innerText === 'Submit') {
      tickets = this.add(new Ticket(`${ticketTitle.value}`, `${ticket.value}`, false, "to-do", uuidv4));
      this.updateList(tickets);
    } else {
      tickets = this.getList()
      tickets.forEach(element => {
        if (element.id === button.setDataId) {
          element.title = ticketTitle.value;
          element.text = ticket.value;
        }
      });
      this.updateList(tickets);
    }

    ticket.value = "";
    ticketTitle.value = "";
    taskAdder.style.display = "none";
    button.disabled = true;
    button.innerText = 'Submit';
    button.classList.remove("primary");
  }
}

export default TicketsList