const { setupAssociations } = require("./models");
const hallService = require("./services/hallService");
const movieService = require("./services/movieService");
const seatService = require("./services/seatService");
const sequelize = require("./utils/database");

async function bootstrap() {
  setupAssociations();
  await sequelize.sync();
  console.log(await hallService.getInfoOfHallWithShowtime(1));
}

bootstrap().then(() => sequelize.close());
