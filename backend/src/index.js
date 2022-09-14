import app from "./app.js";
import { sequelize } from "./database/database.js";
import "./models/Notes.js";

async function main() {
  try {
    await sequelize.sync({ force: false });
    app.listen(4000);
  } catch (error) {
    console.log("unable to connect to db", error);
  }
}

main();