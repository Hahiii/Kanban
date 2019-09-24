import tickets from './data/tickets.js';
import columns from './data/columns.js';
import getData from './data/getdata.js';
import rerender from './data/rerender.js';

document.addEventListener("DOMContentLoaded", () => {
  columns.forEach(element => {
    element.addEventListener("dragover", allowDrop, false)
    element.addEventListener("drop", drop, false)

  });

  function allowDrop(event) {
    if (event.target.nodeName == "DIV") {
      event.preventDefault();
    }
  }

  function drop(event) {
    event.preventDefault();

    let dragged = JSON.parse(event.dataTransfer.getData("text"));
    console.log("obj....> ",dragged)
    tickets.forEach(element => {
      if (element.id === dragged.id) {
        element.state = event.target.className;
      }

      if (element.state === "done") {
        element.draggable = false;
        element.isDone = true;
      }

    });

    localStorage.setItem("tickets", JSON.stringify(tickets))

    columns.forEach(element => {
      element.parentNode.style.backgroundColor = "#f2f2f2"
    });

    rerender();
  }

  rerender();
});

