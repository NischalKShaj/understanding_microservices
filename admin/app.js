// file to start the server for the admin side

// importing the required modules
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const corsOptions = require("./adapter/config/corsOptions");
dotenv.config();

// setting up the app
const app = express();

// setting up the cors
app.use(cors(corsOptions));

// setting the port
const port = process.env.PORT;

// setting up the server
const startServer = async () => {
  while (true) {
    try {
      // setting up the routes
      app.use("/", require("./presentation/routers/routes"));

      // starting the server
      app.listen(port, () => {
        console.log(`server running on http://localhost:${port}`);
      });
      break;
    } catch (error) {
      console.error("error while starting the server", error);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
};

// invoking the function
startServer();
