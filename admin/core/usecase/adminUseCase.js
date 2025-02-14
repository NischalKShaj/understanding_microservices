// file to create the use case for the admin

// importing the required modules
const axios = require("axios");

// creating use case for the admin
class AdminUseCase {
  // for getting the entire user
  async getAllUsers() {
    try {
      const users = await axios.get(
        `${process.env.API_GATEWAY_URL}/auth/users`
      );
      console.log("users", users.data);
      if (!users.data) {
        return { success: false, data: "user not found" };
      }
      return { success: true, data: users.data };
    } catch (error) {
      console.error("error from use case of admin use case", error);
      return { success: false, data: error };
    }
  }

  //  for getting the entre files
  async getAllFiles() {
    try {
      const files = await axios.get(
        `${process.env.API_GATEWAY_URL}/file/all-files`
      );
      console.log("files", files);
      if (!files.data) {
        return { success: false, data: "files not found" };
      }
      return { success: true, data: files.data };
    } catch (error) {
      console.error("error from admin use case", error);
      return { success: false, data: error };
    }
  }
}

// exporting the modules
module.exports = AdminUseCase;
