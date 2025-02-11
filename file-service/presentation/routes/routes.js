// file to set the route for the file uploading

// importing the required modules
const express = require("express");
const upload = require("../middleware/fileUpload");
const router = express.Router();
const FileController = require("../../application/controller/fileController");
const FileUseCase = require("../../core/usecase/fileUseCase");
const FileRepository = require("../../infrastructure/repository/fileRepository");

// injecting the dependencies
const fileRepository = new FileRepository();
const fileUseCase = new FileUseCase(fileRepository);
const fileController = new FileController(fileUseCase);

// setting up the routes

// router for uploading the file
router.post("/upload/:id",upload.single("file"), fileController.uploadFiles);

// exporting the router
module.exports = router;
