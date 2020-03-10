import rerender from './rerender.js';

function showTickets(arr, column) {
  let dragged;
  let selected

  arr.forEach(element => {
    let list = document.createElement("li");
    let ticket = document.createElement("p");
    let a = document.createElement("a");
    let icon = document.createElement("i");

    a.title = "add new item"
    icon.id = "edditTask";
    icon.className = "far fa-edit";


    ticket.draggable = false;
    ticket.innerText = element.text;
    ticket.className = element.state;
    ticket.id = element.id;

    icon.addEventListener("click", () => {
      let eddit = document.querySelector('#taskAdder');
      let edditText = document.querySelector('textarea');
      let edditButton = document.querySelector('#submit');
      edditButton.innerHTML = 'Eddit Task' +' '+ticket.id
      edditText.value = ticket.innerText;
      eddit.style.display = 'flex'
    }, false)

    a.append(icon);
    list.append(ticket)
    list.append(a)

    if (column.className !== "done") {
      ticket.draggable = true;

      ticket.addEventListener("dragstart", function (event) {
        if (event.target.nodeName === "P") {
          dragged = element
          selected = event.target;
          ticket.style.opacity = .7;
          event.dataTransfer.effectAllowed = "move"
          event.dataTransfer.setData("text", JSON.stringify(dragged));
        }

        if (column.className === "in-progress") {
          column.parentNode.nextElementSibling.style.backgroundColor = "#a5fdae"
          column.parentNode.previousElementSibling.style.backgroundColor = "#a5fdae"

        } else {
          column.parentNode.nextElementSibling.style.backgroundColor = "#a5fdae";
        }
      }, false);


      ticket.addEventListener("dragover", function (event) {
        if (isBefore(selected, event.target)) event.target.parentNode.insertBefore(selected, event.target);
        else event.target.parentNode.insertBefore(selected, event.target.nextSibling);
      }, false);

      ticket.addEventListener("dragend", function (event) {
        selected.style.opacity = 1;
        if (selected.parentNode.childNodes) {
          let columnTickets = selected.parentNode.childNodes;
          let newArr = [];
          for (let i = 0; i < columnTickets.length; i++) {
            for (let j = 0; j < arr.length; j++) {
              if (arr[j].id === columnTickets[i].id) {
                newArr.push(arr[j]);
              };
            }
          }
          localStorage.setItem("tickets", JSON.stringify(newArr))
        }
        selected = null;
      }, false);

      ticket.addEventListener("click", function () {
        let modal = document.querySelector('#details');
        let ticketDetails = ticket;
        modal.removeChild(modal.lastChild)
        modal.appendChild(ticketDetails)
        modal.parentNode.style.display = 'flex'
        modal.parentNode.addEventListener("click", () => {
          modal.parentNode.style.display = '';
          rerender();
        }, false)
      }, false);
    }
    column.appendChild(list);
  });
}

function isBefore(el1, el2) {
  let cur
  if (el2.parentNode === el1.parentNode) {
    for (cur = el1.previousSibling; cur; cur = cur.previousSibling) {
      if (cur === el2) return true;
    }
  } else return false;
}

export default showTickets
