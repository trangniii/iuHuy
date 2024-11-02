const { setupAssociations } = require("./models");
const { CASH } = require("./models/enum/PaymentMethod");
const paymentService = require("./services/paymentService");
const sequelize = require("./utils/database");

async function bootstrap() {
  setupAssociations();
  await sequelize.sync();
  console.log(await paymentService.payTickets(9, CASH));
}

bootstrap().then(() => sequelize.close());
