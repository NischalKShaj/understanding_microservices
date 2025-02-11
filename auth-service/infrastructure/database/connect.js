// file to connect the database

// importing the required modules
const pg = require("pg");
const dotenv = require("dotenv");
dotenv.config();

// for establishing the connection
const tempPool = new pg.Pool({
  user: process.env.AUTH_DB_USER,
  host: process.env.AUTH_DB_HOST,
  database: "postgres", // Always connect to 'postgres' initially
  password: process.env.AUTH_DB_PASSWORD,
  port: process.env.AUTH_DB_PORT,
});

let pool; // Variable to hold the actual pool instance

// Function to check if the DB exists and create it if necessary
async function checkDBExists(dbName) {
  try {
    const client = await tempPool.connect();
    const dbExists = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (dbExists.rowCount === 0) {
      console.log(`Creating database ${dbName}...`);
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database ${dbName} created successfully.`);
    } else {
      console.log(`Database ${dbName} already exists.`);
    }

    client.release(); // Release the connection
  } catch (error) {
    console.error("Error creating or checking database:", error);
    throw error;
  }
}

// Function to initialize the connection pool
async function initializePool() {
  if (pool) return pool; // Prevent reinitialization

  await checkDBExists(process.env.AUTH_DB_NAME);

  pool = new pg.Pool({
    user: process.env.AUTH_DB_USER,
    host: process.env.AUTH_DB_HOST,
    database: process.env.AUTH_DB_NAME,
    password: process.env.AUTH_DB_PASSWORD,
    port: process.env.AUTH_DB_PORT,
  });

  console.log(`Connected to database: ${process.env.AUTH_DB_NAME}`);
  return pool;
}

// Function to get the pool instance
function getPool() {
  if (!pool) {
    throw new Error(
      "Database connection not initialized. Call initializePool() first."
    );
  }
  return pool;
}

module.exports = { initializePool, getPool };
