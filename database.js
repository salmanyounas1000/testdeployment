const sqlite3 = require("sqlite3").verbose();

// create database file
const db = new sqlite3.Database("/database/notes.db");

// create table if it does not exist
db.run(`
CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT
)
`);

module.exports = db;
