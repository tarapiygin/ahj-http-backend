module.exports = class TicketFull {
  constructor(id, name, status, created, description) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.created = created;
    this.description = description;
  }
};
