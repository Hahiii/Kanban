class Ticket {
  constructor(title, text, isDone, state, uuidv4) {
    this.title = title;
    this.text = text;
    this.isDone = isDone;
    this.id = uuidv4;
    this.state = state;
  }
}

export default Ticket