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
}

export default TicketsList