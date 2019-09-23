// import Ticket from './constructor.js' ;
import tickets from './data/tickets.js';

document.addEventListener("DOMContentLoaded", () => {
  const columns = [];
  const toDoColumn = document.querySelector(".to-do");
  const progressColumn = document.querySelector(".in-progress");
  const doneColumn = document.querySelector(".done");

  let dragged;

  columns.push(toDoColumn, progressColumn, doneColumn);
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

    if (event.target.className == "done") {
      dragged.className = "done"
      dragged.draggable = false;
      event.target.appendChild(dragged);
    } else {
      dragged.className = event.target.className;
      event.target.appendChild(dragged);
    }
  }

  console.log(columns)

  const todo = getData("to-do");
  const inProgress = getData("in-progress");
  const done = getData("done");

  function getData(column) {
    return tickets.filter(element => element.state === column)
  }

  console.log(todo)

  showTickets(todo, toDoColumn);
  showTickets(inProgress, progressColumn);
  showTickets(done, doneColumn);

  function showTickets(arr, column) {
    arr.forEach(element => {
      let ticket = document.createElement("p");

      ticket.innerText = element.text;
      ticket.className = element.state;

      if (column.className !== "done") {
        ticket.draggable = true;
        ticket.addEventListener("dragstart", function (event) {
          dragged = event.target;
          event.target.style.opacity = .5;
          event.dataTransfer.setData("text", dragged);

          if (column.className === "in-progress") {
            column.nextElementSibling.style.backgroundColor = "#a5fdae"
            column.previousElementSibling.style.backgroundColor = "#a5fdae"

          } else {
            column.nextElementSibling.style.backgroundColor = "#a5fdae"
          }
        }, false);

        ticket.addEventListener("dragend", function (event) {
          event.target.style.opacity = 1;
          columns.forEach(element => {
            element.style.backgroundColor = "#f2f2f2"
          });
        }, false);
      }
      column.appendChild(ticket);

    });
  }



});

