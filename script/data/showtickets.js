function showTickets(arr, column) {
  let dragged;
  arr.forEach(element => {
    let ticket = document.createElement("p");
    ticket.draggable = false;
    ticket.innerText = element.text;
    ticket.className = element.state;
    ticket.id = element.id;

    if (column.className !== "done") {
      ticket.draggable = true;

      ticket.addEventListener("dragstart", function (event) {

        if (event.target.nodeName === "P") {
          dragged = element
          ticket.style.opacity = .7;
          event.dataTransfer.setData("text", JSON.stringify(dragged));
        }

        if (column.className === "in-progress") {
          column.parentNode.nextElementSibling.style.backgroundColor = "#a5fdae"
          column.parentNode.previousElementSibling.style.backgroundColor = "#a5fdae"

        } else {
          column.parentNode.nextElementSibling.style.backgroundColor = "#a5fdae";
        }

      }, false);

      ticket.addEventListener("dragend", function (event) {
        event.target.style.opacity = 1;
      }, false);

    }
    column.appendChild(ticket);
  });
}

export default showTickets
