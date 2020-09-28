const uuid = require('uuid');
const fs = require('fs');
const Ticket = require('./Ticket');
const TicketFull = require('./TicketFull');
const ticketsData = require('./tikets');

module.exports = class TicketManager {
  constructor() {
    this.ticketsObj = [];
  }

  createTicketObj(name, status, description) {
    const id = uuid.v1();
    const created = Date.now();
    this.ticketsObj.push({
      id,
      ticket: new Ticket(id, name, status, created),
      ticketFull: new TicketFull(id, name, status, created, description),
    });
    this.save();
  }

  getAllTickets() {
    const tickets = this.ticketsObj.map((obj) => obj.ticket);
    return tickets;
  }

  getTicketById(id) {
    const ticketObj = this.ticketsObj.find((obj) => obj.id === id);
    return ticketObj.ticketFull;
  }

  save() {
    const data = JSON.stringify(this.ticketsObj);
    fs.writeFile('./tikets.json', data, (err) => {
      if (err) console.error(err);
    });
  }

  load() {
    const data = JSON.parse(ticketsData);
    if (data) this.ticketsObj = data;
  }

  init() {
    this.load();
  }
};
