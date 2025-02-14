// file to create the admin controller

// importing the required modules

// creating the admin controller class
class AdminController {
  #adminUseCase;
  constructor(adminUseCase) {
    this.#adminUseCase = adminUseCase;
    this.getUsers = this.getUsers.bind(this);
    this.getFiles = this.getFiles.bind(this);
  }

  // creating the controller for getting all the users
  async getUsers(req, res) {
    try {
      const users = await this.#adminUseCase.getAllUsers();
      if (!users.success) {
        return res.status(400).json({ message: "No users found" });
      }
      res.status(200).json({ data: users.data });
    } catch (error) {
      console.error("error", error);
      res.status(500).json({ error: error });
    }
  }

  // controller for getting all the files
  async getFiles(req, res) {
    try {
      const files = await this.#adminUseCase.getAllFiles();
      if (!files.success) {
        return res.status(400).json({ message: "No files found" });
      }
      res.status(200).json({ data: files.data });
    } catch (error) {
      console.error("error from controller", error);
      res.status(500).json({ error: error });
    }
  }
}

// exporting the modules
module.exports = AdminController;
