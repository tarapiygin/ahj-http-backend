const uuid = require('uuid');
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
  }

  getAllTickets() {
    const tickets = this.ticketsObj.map((obj) => obj.ticket);
    return tickets;
  }

  getTicketById(id) {
    const ticketObj = this.ticketsObj.find((obj) => obj.id === id);
    return ticketObj.ticketFull;
  }

  init() {
    this.ticketsObj.push({
      id: '1',
      ticket: new Ticket('1', 'test', true, 1),
      ticketFull: new TicketFull(1, 'test', true, 1, 'description'),
    }, {
      id: '2',
      ticket: new Ticket('2', 'test', true, 1),
      ticketFull: new TicketFull('2', 'test', true, 1, 'description'),
    });
  }
};
