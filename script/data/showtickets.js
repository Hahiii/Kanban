import { rerender, TicketList } from './rerender.js';
import TicketsList from './TicketsList.js';

if (!TicketList) {
  let TicketList = new TicketsList;
}

function showTickets(object, column) {

  let dragged;
  let selected
  let i = 0;
  for (const key in object) {

    object[key].forEach(element => {
      let list = document.createElement("li");
      let ticket = document.createElement("p");
      let a = document.createElement("a");
      let icon = document.createElement("i");

      a.title = "add new item"
      icon.id = "edditTask";
      icon.className = "far fa-edit";


      ticket.draggable = false;
      ticket.innerText = element.title;
      ticket.className = element.state;
      ticket.id = element.id;



      if (column[i].className !== "done") {
        ticket.draggable = true;

        icon.addEventListener("click", () => {
          let eddit = document.querySelector('#taskAdder');
          let edditTitle = document.querySelector('#title');
          let edditText = document.querySelector('textarea');
          let edditButton = document.querySelector('#submit');

          edditButton.disabled = false;
          edditButton.classList.add("primary");
          edditButton.innerHTML = 'Update Task' + ' ' + ticket.id;
          edditTitle.value = ticket.innerText;

          let tickets = TicketList.getList();
          tickets = tickets.filter(element => element.id === ticket.id);
          edditText.value = tickets[0].text;
          eddit.style.display = 'flex'
        }, false)


        ticket.addEventListener("dragstart", function (event) {
          if (event.target.nodeName === "P") {
            dragged = element
            selected = event.target.parentNode;
            ticket.style.opacity = .7;
            event.dataTransfer.effectAllowed = "move"
            event.dataTransfer.setData("text", JSON.stringify(dragged));
          }

          if (event.target.className === "in-progress") {
            selected.parentNode.parentNode.nextElementSibling.style.backgroundColor = "#a5fdae"
            selected.parentNode.parentNode.previousElementSibling.style.backgroundColor = "#a5fdae"

          } else {
            selected.parentNode.parentNode.nextElementSibling.style.backgroundColor = "#a5fdae";
            selected.parentNode.parentNode.nextElementSibling.nextElementSibling.style.backgroundColor = "#ff0000a1";
          }
        }, false);

        // ticket.addEventListener("dragover", function (event) {
        //   if (selected.parentNode.className === event.target.parentNode.parentNode.className) {
        //     if (isBefore(selected, event.target.parentNode)) event.target.parentNode.parentNode.insertBefore(selected, event.target.parentNode);
        //     else event.target.parentNode.parentNode.insertBefore(selected, event.target.parentNode.nextSibling);
        //   }
        // }, false);

        ticket.addEventListener("dragend", function (event) {
          selected.style.opacity = 1;
          // let ticketsList = event.target.parentNode.parentNode;
          // if (ticketsList) {
          //   let columnTickets = selected.parentNode.childNodes;
          //   let newArr = [];
          //   for (let i = 0; i < columnTickets.length; i++) {
          //     for (let j = 0; j < arr.length; j++) {
          //       if (arr[j].id === columnTickets[i].id) {
          //         newArr.push(arr[j]);
          //       };
          //     }
          //   }
          //   localStorage.setItem("tickets", JSON.stringify(newArr));
          // }
          selected = null;

        }, false);

        ticket.addEventListener("click", function () {
          let modal = document.querySelector('#details');
          let ticketDetails = TicketList.getList();
          ticketDetails = ticketDetails.filter(element => element.id === ticket.id);
          let description = document.createElement("p")
          if (ticketDetails[0].text !== "") {
            description.innerText = ticketDetails[0].text
          } else {
            description.innerText = 'There are no details about this Task'
          }


          modal.removeChild(modal.lastChild);
          modal.appendChild(description);
          modal.parentNode.style.display = 'flex'

          modal.parentNode.addEventListener("click", () => {
            modal.parentNode.style.display = '';
            rerender();
          }, false)
        }, false);
      }
      a.append(icon);
      list.append(ticket)
      list.append(a)
      column[i].appendChild(list);
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
