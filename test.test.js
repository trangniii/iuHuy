const { setupAssociations } = require("./models");
const movieService = require("./services/movieService");
const sequelize = require("./utils/database");

async function bootstrap() {
  setupAssociations();
  await sequelize.sync();

  console.log(await movieService.getDetailOfMovie(1));
}

bootstrap().then(() => sequelize.close());
