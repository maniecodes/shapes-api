require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_TEST_NAME,
    host: process.env.DB_HOST,
    environment: process.env.NODE_ENV,
    dialect: "postgres",
    protocol: "postgres",
    port: process.env.DB_PORT,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    environment: process.env.NODE_ENV,
    dialect: "postgres",
    protocol: "postgres",
    port: process.env.DB_PORT,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    environment: process.env.NODE_ENV,
    dialect: "postgres",
    protocol: "postgres",
    port: process.env.DB_PORT,
  },
};
