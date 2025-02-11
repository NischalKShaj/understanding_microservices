// setting the service server for the authentication

// importing the required modules
const express = require("express");
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

// setting up the server
const server = async () => {
  while (true) {
    const port = process.env.PORT;

    await initializePool();

    const fileTable = require("./infrastructure/database/schema/fileSchema");
    fileTable();

    // setting up the routes
    app.use("/", require("./presentation/routes/routes"));

    try {
      app.listen(port, () => {
        console.log(`auth server started on: http://localhost:${port}`);
      });
      break;
    } catch (error) {
      console.error("error", error);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
};

// starting the server
server();
