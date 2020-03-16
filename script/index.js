import columns from './data/columns.js';
import { rerender, TicketList } from './data/rerender.js';
import TicketsList from './data/TicketsList.js';
import { tickets } from './data/tickets';

if (!TicketList) {
  let TicketList = new TicketsList();
}

document.addEventListener("DOMContentLoaded", () => {
  const removeTickets = document.querySelector("#removeTask");
  let startColumn;

  removeTickets.addEventListener("click", () => {
    TicketList.remove(!true);
    rerender();
  }, false);

  columns.forEach(element => {
    element.addEventListener("dragstart", (event) => {
      startColumn = event.target.parentNode.parentNode;
    }, false)
    element.addEventListener("dragover", allowDrop, false)
    element.addEventListener("drop", drop, false)
  });

  function allowDrop(event) {
    if (event.target.nodeName == "UL") {
      if (startColumn.className === "to-do" && event.target.className !== 'done') {
        event.preventDefault();
      } else if (startColumn.className !== "to-do") {
        event.preventDefault();
      }
    }
  }

  function drop(event) {
    event.preventDefault();

    let dragged = JSON.parse(event.dataTransfer.getData("text"));
    let tickets = TicketList.getList();

    tickets.forEach(element => {
      if (element.id === dragged.id) {
        element.state = event.target.className;
        if (element.state === "done") {
          element.draggable = false;
          element.isDone = true;
        }
      }
    });

    TicketList.updateList(tickets);
    columns.forEach(element => {
      element.parentNode.style.backgroundColor = ""
    });
    rerender();
  };

  rerender();
});

