// file for creating the use case for the files

// importing the required modules
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

// creating the class for the file use case
class FileUseCase {
  #fileRepository;
  constructor(fileRepository) {
    this.#fileRepository = fileRepository;
  }

  // use case for uploading the file
  async uploadFiles(id, fileName, file_path) {
    try {
      console.log("api", process.env.API_GATEWAY_URL);
      let existUser = await axios.get(
        `${process.env.API_GATEWAY_URL}/auth/user/${id}`
      );
      console.log("exist user", existUser);
      if (!existUser.data) {
        return { success: false, data: "user not found" };
      }
      console.log("user data from the file repo", existUser.data);

      const uploading = await this.#fileRepository.uploadFiles(
        id,
        fileName,
        file_path
      );
      return { success: true, data: uploading };
    } catch (error) {
      console.error("error from here", error);
      return { success: false, data: error };
    }
  }
}

module.exports = FileUseCase;
