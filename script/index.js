import columns from './data/columns.js';
import rerender from './data/rerender.js';
import removeDoneTickets from './data/emptydone.js';
import { tickets } from './data/tickets.js';

document.addEventListener("DOMContentLoaded", () => {

  const removeTickets = document.querySelector("#removeTask");
  removeTickets.addEventListener("click", removeDoneTickets, false);
  columns.forEach(element => {
    element.addEventListener("dragover", allowDrop, false)
    element.addEventListener("drop", drop, false)
  });

  function allowDrop(event) {
    if (event.target.nodeName == "UL") {
      event.preventDefault();
    }
  }

  function drop(event) {
    event.preventDefault();

    let dragged = JSON.parse(event.dataTransfer.getData("text"));
    tickets.forEach(element => {
      if (element.id === dragged.id) {
        element.state = event.target.className;
      }

      if (element.state === "done") {
        element.draggable = false;
        element.isDone = true;
      }

    });

    localStorage.setItem("tickets", JSON.stringify(tickets));
    columns.forEach(element => {
      element.parentNode.style.backgroundColor = ""
    });

    rerender();
  };

  rerender();
});

