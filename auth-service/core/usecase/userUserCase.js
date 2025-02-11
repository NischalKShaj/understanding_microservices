// file to create the user use case

// importing the required modules

// creating the class for the user use case
class UserUseCase {
  #userRepository;
  constructor(userRepository) {
    this.#userRepository = userRepository;
  }
  // for signup
  async signupUser(username, email, password) {
    console.log("🚀 signupUser method executed!"); // Add this log

    try {
      if (!username || !email || !password) {
        throw new Error("All fields are required");
      }
      const result = await this.#userRepository.createUser(
        username,
        email,
        password
      );
      return result;
    } catch (error) {
      console.error("Error from use case", error);
      throw new Error(error);
    }
  }
  // use case for login
  async loginUser(email, password) {
    try {
      if (!email || !password) {
        throw new Error("all fields are required");
      }
      const result = await this.#userRepository.loginUser(email, password);
      console.log("result", result);
      if (!result) {
        return { success: false, data: "no user found" };
      }
      return { success: true, data: result };
    } catch (error) {
      console.error("error", error);
      throw new Error(error);
    }
  }

  // use case for getting the user
  async getUser(id) {
    try {
      if (!id) {
        throw new Error("no user id provided");
      }
      const result = await this.#userRepository.getUser(id);
      if (!result) {
        return { success: false, data: "no user found" };
      }
      return { success: true, data: result };
    } catch (error) {
      console.error("error from use case", error);
      throw new Error(error);
    }
  }
}

module.exports = UserUseCase;
