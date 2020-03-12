import { v4 as uuidv4 } from '../../node_modules/uuid';

class Ticket {
  constructor({title, text, isDone, state, id = uuidv4()}) {
    this.title = title;
    this.text = text;
    this.isDone = isDone;
    this.id = id;
    this.state = state;
  }

  getTemplate(title, state, id) {
    let li = document.createElement("li");
    let innerHtmlTemplate = `
      <a title="add new item"><i id="edditTask" class="far fa-edit"></i></a>
      <p draggable="true" class=${state} id=${id}>${title}</p>    
    `
    li.innerHTML = innerHtmlTemplate;

    return li;
  }
}



export default Ticket;