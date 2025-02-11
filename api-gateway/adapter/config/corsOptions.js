// file to setup the cors for the application

// importing the required modules
const dotenv = require("dotenv");
dotenv.config();

// setting the cors options
const corsOptions = {
  origin: [process.env.BASE_URL, process.env.AUTH_URL, process.env.FILE_URL],
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

// exporting the cors options
module.exports = corsOptions;
