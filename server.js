const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const TicketManager = require('./TicketManager');

const app = new Koa();
const ticketManager = new TicketManager();
ticketManager.init();
app.use(cors());
app.use(koaBody({
  urlencoded: true,
  multipart: true,
}));
app.use(async (ctx) => {
  const { method } = ctx.query;
  switch (method) {
    case 'allTickets':
      ctx.response.body = ticketManager.getAllTickets();
      return;
    case 'ticketById':
      // eslint-disable-next-line no-case-declarations
      const { id } = ctx.query;
      try {
        ctx.response.body = ticketManager.getTicketById(id);
      } catch (error) {
        ctx.response.body = Error('Non-existent id passed');
      }
      return;
    case 'createTicket':
      if (ctx.request.method === 'POST') {
        try {
          const { name, status, description } = JSON.parse(ctx.request.body);
          ticketManager.createTicketObj(name, status, description);
          ctx.response.status = 201;
        } catch (error) {
          ctx.response.status = 501;
          ctx.response.body = 'Ошибка при создании тикета';
        }
      } else {
        ctx.response.body = 'the method must be "POST"';
        ctx.response.status = 405;
      }
      return;
    default:
      ctx.response.status = 404;
      // eslint-disable-next-line no-useless-return
      return;
  }
});
const port = process.env.PORT || 7070;
// eslint-disable-next-line no-unused-vars
const server = http.createServer(app.callback()).listen(port);
