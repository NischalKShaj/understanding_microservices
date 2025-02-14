// file to set up the routes for the admin

// importing the required modules
const express = require("express");
const AdminController = require("../../application/controller/adminController");
const AdminUseCase = require("../../core/usecase/adminUseCase");

// injecting the dependencies
const adminUseCase = new AdminUseCase();
const adminController = new AdminController(adminUseCase);

// setting the router
const router = express.Router();

// router for getting all the users for the admin page
router.get("/users", adminController.getUsers);

// router for getting all the file stored
router.get("/files", adminController.getFiles);

// exporting the router
module.exports = router;
