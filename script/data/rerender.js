import getData from './getdata.js';
import columns from './columns.js';
import showTickets from './showtickets.js';

function rerender() {
    columns.forEach(element => {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }

    });
    const todo = getData("to-do");
    const inProgress = getData("in-progress");
    const done = getData("done");
    showTickets(todo, columns[0]);
    showTickets(inProgress, columns[1]);
    showTickets(done, columns[2]);
}

export default rerender