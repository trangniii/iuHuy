const { setupAssociations } = require("./models");
const CinemaHall = require("./models/CinemaHall");
const { CASH } = require("./models/enum/PaymentMethod");
const { COMPLETED } = require("./models/enum/PaymentStatus");
const Payment = require("./models/Payment");
const Seat = require("./models/Seat");
const Showtime = require("./models/Showtime");
const Ticket = require("./models/Ticket");
const hallService = require("./services/hallService");
const paymentService = require("./services/paymentService");
const ticketService = require("./services/ticketService");
const sequelize = require("./utils/database");

async function bootstrap() {
  setupAssociations();
  await sequelize.sync();
  // console.log(
  //   await ticketService.bookTicket(1, 1, [
  //     { row: 3, number: 1 },
  //     { row: 3, number: 2 },
  //     { row: 3, number: 3 },
  //   ])
  // await ticketService.bookTicket(2, 1, [
  //   { row: 2, number: 1 },
  //   { row: 2, number: 2 },
  // ])
  // );

  // log(await paymentService.pay(1, 28));
  // log(await paymentService.pay(2, 29));

  // const payment = await Payment.findByPk(11, {
  //   include: [
  //     {
  //       model: Ticket,
  //       include: [Seat],
  //     },
  //   ],
  // });

  // console.log(JSON.stringify(payment.toJSON(), null, 2));

  // log(
  //   await Showtime.findByPk(1, {
  //     include: [
  //       {
  //         model: CinemaHall,
  //         include: [Seat],
  //       },
  //     ],
  //   })
  // );

  // const payment = await paymentService.getPaymentInfo(1, 30);

  // log(payment);

  const hall = await hallService.getInfoOfHallWithShowtime(3);

  log(hall);
}

function log(data) {
  console.log(JSON.stringify(data, null, 2));
}

bootstrap().then(() => sequelize.close());
