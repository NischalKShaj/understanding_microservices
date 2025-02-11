// controller for the authentication

// importing the required modules

// creating controller class
class UserController {
  #userUseCase;
  constructor(userUseCase) {
    this.#userUseCase = userUseCase;
    this.signupUser = this.signupUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  // for signup the user
  async signupUser(req, res) {
    try {
      const { username, email, password } = req.body;
      console.log("🟢 Calling signupUser from use case...");

      if (!this.#userUseCase || !this.#userUseCase.signupUser) {
        console.error("❌ userUseCase or signupUser method is missing!");
        return res.status(500).json({ error: "Internal server error" });
      }

      const result = await this.#userUseCase.signupUser(
        username,
        email,
        password
      );
      res.status(200).json(result);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: error });
    }
  }

  // for login purpose
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      console.log("email", password);
      const result = await this.#userUseCase.loginUser(email, password);
      if (!result.success) {
        return res.status(400).json("user not found");
      }
      res.status(200).json({ data: result.data });
    } catch (error) {
      console.error("error", error);
      res.status(500).json({ error: error });
    }
  }

  // controller for getting the user by id
  async getUser(req, res) {
    try {
      const { id } = req.params;
      const result = await this.#userUseCase.getUser(id);
      if (!result.success) {
        return res.status(400).json("user not found");
      }
      res.status(200).json({ data: result.data });
    } catch (error) {
      console.error("error", error);
      res.status(500).json({ error: error });
    }
  }
}

module.exports = UserController;
