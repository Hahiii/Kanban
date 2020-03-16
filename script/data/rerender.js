import columnElements from './columns.js';
import showTickets from './showtickets.js';
import TicketsList from './TicketsList.js';

let TicketList = new TicketsList();


function rerender() {
    columnElements.forEach(element => {
        element.innerHTML = '';
    });

    const todoItems = TicketList.getList("to-do");
    const inProgressItems = TicketList.getList("in-progress");
    const doneItems = TicketList.getList("done");

    showTickets({
        todoItems,
        inProgressItems,
        doneItems
    },
    columnElements);

}

export { rerender, TicketList }