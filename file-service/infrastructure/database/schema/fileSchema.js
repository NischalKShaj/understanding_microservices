// file to create the schema for the file uploading

// importing the required modules
const { getPool } = require("../connect");

// creating the user table
async function fileTable() {
  const pool = getPool();
  if (!pool) {
    throw new Error(
      "Database pool not initialized. Call initializePool() first."
    );
  }

  const query = `
 CREATE TABLE IF NOT EXISTS fileupload (
  id SERIAL PRIMARY KEY,
  uid VARCHAR(255) NOT NULL,
  filename VARCHAR(255) UNIQUE NOT NULL,
  file_path TEXT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
  `;

  try {
    await pool.query(query);

    console.log("Created the schema successfully");
  } catch (error) {
    console.error("Error while creating the schema", error);
  }
}

module.exports = fileTable;
