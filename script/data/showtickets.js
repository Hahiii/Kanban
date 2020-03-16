import { rerender, TicketList } from './rerender.js';
import TicketsList from './TicketsList.js';

import Modal from './Modal';

if (!TicketList) {
  let TicketList = new TicketsList();
}

const onEdit = (e) => {
  let eddit = document.querySelector('#taskAdder');
  let edditTitle = document.querySelector('#title');
  let edditText = document.querySelector('textarea');
  let edditButton = document.querySelector('#submit');


  let ticketTextElement = e.target.closest('li').querySelector('p');


  edditButton.disabled = false;
  edditButton.classList.add("primary");
  edditButton.innerHTML = 'Update Task';
  edditButton.setDataId = ticketTextElement.getAttribute('id');
  edditTitle.value = ticketTextElement.innerText;

  let tickets = TicketList.getList();
  tickets = tickets.filter(element => element.id === ticketTextElement.getAttribute('id'));
  edditText.value = tickets[0].text;
  eddit.style.display = 'flex'

}

const onTicketClick = (e) => {
  let ticketTextElement = e.target;
  let ticketId = ticketTextElement.getAttribute('id');
  // Get ticket by id
  let ticket = TicketList.getTicketById(ticketId);
  const title = ticket.title;
  const description = ticket.text ? ticket.text : 'There are no details about this Task';
  
  // Open ticket in modal window
  const modal = new Modal();
  const modalContent = document.createElement("div");

  modalContent.innerHTML = `
      <h1>${title}</h1>
      <p>${description}</p>
    `;

  modal.show(modalContent);
}

const onDragStart = (e) => {
  const ticketTextElement = e.target;
  const ticketId = ticketTextElement.getAttribute('id');
  const ticket = TicketList.getTicketById(ticketId);
  const liElement = ticketTextElement.parentNode;

    if (ticketTextElement.nodeName === "P") {
      ticketTextElement.style.opacity = .7;
      e.dataTransfer.effectAllowed = "move"
      e.dataTransfer.setData("text", JSON.stringify(ticket));
    }

    if (ticketTextElement.className === "in-progress") {
      liElement.parentNode.parentNode.nextElementSibling.style.backgroundColor = "#a5fdae"
      liElement.parentNode.parentNode.previousElementSibling.style.backgroundColor = "#a5fdae"

    } else {
      liElement.parentNode.parentNode.nextElementSibling.style.backgroundColor = "#a5fdae";
      liElement.parentNode.parentNode.nextElementSibling.nextElementSibling.style.backgroundColor = "#ff0000a1";
    }
  
}

const onDragEnd = (e) => {
  const ticketTextElement = e.target;

  ticketTextElement.style.opacity = 1;
}

function showTickets(object, column) {
  const { todoItems, inProgressItems, doneItems } = object;

  let i = 0;

  for (const key in object) {
    object[key].forEach(element => {
      let li = element.getTemplate(element.title, element.state, element.id);

      let icon = li.children[0].childNodes[0];
      let ticket = li.children[1];
      
      ticket.draggable = false;

      if (column[i].className !== "done") {
        ticket.draggable = true;

        icon.addEventListener("click", onEdit, false)

        ticket.addEventListener("click", onTicketClick, false);

        ticket.addEventListener("dragstart", onDragStart, false);

        ticket.addEventListener("dragend", onDragEnd, false);

        // ticket.addEventListener("dragover", function (event) {
        //   if (selected.parentNode.className === event.target.parentNode.parentNode.className) {
        //     if (isBefore(selected, event.target.parentNode)) event.target.parentNode.parentNode.insertBefore(selected, event.target.parentNode);
        //     else event.target.parentNode.parentNode.insertBefore(selected, event.target.parentNode.nextSibling);
        //   }
        // }, false);
      }

      column[i].appendChild(li);
    });

    i++;
  }
}

// function isBefore(el1, el2) {
//   let cur
//   if (el1 && el2) {
//     if (el2.parentNode === el1.parentNode) {
//       for (cur = el1.previousSibling; cur; cur = cur.previousSibling) {
//         if (cur === el2) return true;
//       }
//     } else return false;
//   }
// }

export default showTickets
