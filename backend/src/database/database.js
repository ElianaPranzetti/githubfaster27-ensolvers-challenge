import { Sequelize, DataTypes } from "sequelize";

export const sequelize = new Sequelize("notes-db", "postgres", "123456789", {
  host: "localhost",
  dialect: "postgres",
});
