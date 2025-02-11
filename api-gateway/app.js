// file to create the main server or the starting server for rest of the micro services

// importing the required modules
const express = require("express");
const dotenv = require("dotenv");
const proxy = require("express-http-proxy");
const cors = require("cors");
const corsOptions = require("./adapter/config/corsOptions");
dotenv.config();

// setting up the express
const app = express();

// setting up the cors
app.use(cors(corsOptions));

// setting up the gateway routes
app.use("/auth", proxy(process.env.AUTH_URL));
app.use("/file", proxy(process.env.FILE_URL));

// setting the main server
const port = process.env.port;

const server = async () => {
  while (true) {
    try {
      app.listen(port, () => {
        console.log(`server started on: http://localhost:${port}`);
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
