class Ticket {
  constructor(text, isDone, state) {
    this.text = text;
    this.isDone = isDone;
    this.id = Math.floor(Math.random() * 100);
    this.state = state
  }
}

export default Ticket