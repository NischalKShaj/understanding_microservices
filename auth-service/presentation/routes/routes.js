// file to create the routes for the application

// importing the required modules
const express = require("express");
// const upload = require("../middleware/fileUpload");
const UserUseCase = require("../../core/usecase/userUserCase");
const UserRepository = require("../../infrastructure/repository/userRepository");
const UserController = require("../../application/controller/userController");
const router = express.Router();

// needs to inject the dependency here
const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);
const userController = new UserController(userUseCase);

// creating the route for signup
router.post("/signup", userController.signupUser);

// creating the route for login
router.post("/login", userController.loginUser);

// <=============== inter server communication routes =================> //
router.get("/user/:id", userController.getUser);

// exporting the router
module.exports = router;
