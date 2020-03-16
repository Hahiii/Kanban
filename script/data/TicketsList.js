import Ticket from './Ticket.js';

class TicketsList {
  constructor() {
    this.tickets = [];
    const ticketsFromLS = localStorage.getItem("tickets");

    if (ticketsFromLS) {
      this.tickets = JSON.parse(ticketsFromLS).map((ticket) => {
        return new Ticket(ticket);
      });
    }
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

  getTicketById(id) {
    const matchingTickets = this.tickets.filter(element => element.id === id);
    let ticket = null;

    if (matchingTickets.length) {
      ticket = matchingTickets[0];
    }

    return ticket;
  }


  getList(stateIn) {
    return stateIn ?
      this.tickets.filter(element => element.state === stateIn) :
      this.tickets;
  }

  submitTicket(event, submitButton, ticket, ticketTitle, form) {
    event.preventDefault();
    let tickets = []

    if (submitButton.innerText === 'Submit') {
      tickets = this.add(new Ticket({
        title: `${ticketTitle.value}`,
        text: `${ticket.value}`,
        isDone: false,
        state: "to-do"
      }));

      this.updateList(tickets);
    } else {
      tickets = this.getList()
      tickets.forEach(element => {
        if (element.id === submitButton.setDataId) {
          element.title = ticketTitle.value;
          element.text = ticket.value;
        }
      });

      this.updateList(tickets);
    }

    this.resetForm(form, submitButton);
  }

  resetForm(form, submitButton) {
    form.reset();
    submitButton.disabled = true;
    submitButton.innerText = 'Submit';
    submitButton.classList.remove("primary");

    // Close modal
    taskAdder.style.display = "none";
  }
}

export default TicketsList