import { tickets } from './tickets.js';

function getData(column) {
  return localStorage.getItem("tickets") ?
    JSON.parse(localStorage.getItem("tickets")).filter(element => element.state === column) :
    tickets.filter(element => element.state === column);
}

export default getData