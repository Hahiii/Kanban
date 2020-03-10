class Ticket {
  constructor(text, isDone, state, uuidv4) {
    this.text = text;
    this.isDone = isDone;
    this.id = uuidv4();
    this.state = state;
  }
}

export default Ticket