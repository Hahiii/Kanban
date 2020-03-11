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
      let li = TicketList.getTemplate(element.title, element.state, element.id);
      let icon = li.children[0].childNodes[0];
      let ticket = li.children[1];
      ticket.draggable = false;

      if (column[i].className !== "done") {
        ticket.draggable = true;

        icon.addEventListener("click", () => {
          let eddit = document.querySelector('#taskAdder');
          let edditTitle = document.querySelector('#title');
          let edditText = document.querySelector('textarea');
          let edditButton = document.querySelector('#submit');

          edditButton.disabled = false;
          edditButton.classList.add("primary");
          edditButton.innerHTML = 'Update Task';
          edditButton.setDataId = ticket.id;
          edditTitle.value = ticket.innerText;

          let tickets = TicketList.getList();
          tickets = tickets.filter(element => element.id === ticket.id);
          edditText.value = tickets[0].text;
          eddit.style.display = 'flex'
        }, false)

        ticket.addEventListener("click", () => {
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

        ticket.addEventListener("dragstart", (event) => {
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

        ticket.addEventListener("dragend", (event) => {
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
