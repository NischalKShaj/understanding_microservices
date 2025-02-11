// setting the service server for the authentication

// importing the required modules
const express = require("express");
const pg = require("pg"); // setup the db also
const dotenv = require("dotenv");
const cors = require("cors");
const corsOptions = require("./adapter/config/corsOptions");
const { initializePool } = require("./infrastructure/database/connect");
dotenv.config();

// setting up the app
const app = express();

// setting up the cors
app.use(cors(corsOptions));

// setting the parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function startServer() {
  while (true) {
    try {
      await initializePool(); // ✅ Ensure DB is initialized first
      const userTable = require("./infrastructure/database/schema/userSchema"); // ✅ Import after DB is ready
      userTable();

      // Setup routes
      app.use("/", require("./presentation/routes/routes"));

      // Start the server
      const port = process.env.PORT;
      app.listen(port, () => {
        console.log(`Auth server started on: http://localhost:${port}`);
      });
      break;
    } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
    }
  }
}

startServer();
