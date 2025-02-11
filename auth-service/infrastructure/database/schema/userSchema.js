// creating the schema for the user

// importing the required modules
const { getPool } = require("../connect");

// creating the user table
async function userTable() {
  const pool = getPool();
  if (!pool) {
    throw new Error(
      "Database pool not initialized. Call initializePool() first."
    );
  }

  const query = `
 CREATE TABLE IF NOT EXISTS userauth (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
  `;

  try {
    await pool.query(query);

    console.log("Created the schema successfully");
  } catch (error) {
    console.error("Error while creating the schema", error);
  }
}

module.exports = userTable;
