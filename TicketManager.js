const uuid = require('uuid');
const fs = require('fs');
const Ticket = require('./Ticket');
const TicketFull = require('./TicketFull');

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
    fs.writeFileSync('./tikets.json', data);
  }

  load() {
    const file = fs.readFileSync('./tickets.json', 'utf8');
    if (file) this.ticketsObj = JSON.parse(file);
  }

  init() {
    this.load();
  }
};
