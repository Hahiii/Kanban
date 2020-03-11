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
}

export default TicketsList