require("dotenv").config();
const { Pool } = require("pg");
const DB_ROOT = process.env.DB_ROOT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;
const DB_PORT = process.env.DB_PORT;

const pool = new Pool({
  root: DB_ROOT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DATABASE_NAME,
  port: DB_PORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};