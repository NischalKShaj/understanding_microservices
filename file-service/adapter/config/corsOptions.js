// setting up the cors option for the file service

// importing the required modules
const dotenv = require("dotenv");
dotenv.config();

// setting up the cors options
const corsOptions = {
  origin: [process.env.BASE_URL, process.env.API_GATEWAY_URL],
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS", "HEAD"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
  credentials: true,
};

// exporting the corsOptions
module.exports = corsOptions;
