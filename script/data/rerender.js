import columns from './columns.js';
import showTickets from './showtickets.js';
import TicketsList from './TicketsList.js';

let TicketList = new TicketsList;

function rerender() {
    columns.forEach(element => {
        element.innerHTML = null;
    });

    const todo = TicketList.getList("to-do");
    const inProgress = TicketList.getList("in-progress");
    const done = TicketList.getList("done");
    showTickets({ todo, inProgress, done }, columns);
}

export { rerender, TicketList }