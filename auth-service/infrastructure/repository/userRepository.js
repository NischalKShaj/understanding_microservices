// repository for the user

// importing the required modules
const { getPool } = require("../database/connect");

const pool = getPool();

// creating the repository class
class UserRepository {
  // for user signup
  async createUser(username, email, password) {
    try {
      const query = `INSERT INTO userauth (username, email, password) VALUES ($1, $2, $3) RETURNING *`;
      console.log("username, email, password", username, email, password);
      const values = [username, email, password];
      const result = await pool.query(query, values);
      if (!result) {
        throw new Error("user not added properly");
      }
      return result.rows[0];
    } catch (error) {
      console.error("error in repo", error);
      throw new Error(error);
    }
  }

  // for user login
  async loginUser(email, password) {
    try {
      const query = `SELECT  * FROM userauth WHERE email = $1 AND password = $2`;
      const values = [email, password];
      const result = await pool.query(query, values);
      console.log("result from repo", result);
      if (!result.rows.length) {
        throw new Error("user not found");
      }
      const user = result.rows[0];
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  // for getting the user
  async getUser(id) {
    try {
      const query = `SELECT * FROM  userauth WHERE  id = $1`;
      const value = [id];
      const result = await pool.query(query, value);
      if (!result.rows.length) {
        throw new Error("user not found");
      }
      const user = result.rows[0];
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}

// exporting the user repo
module.exports = UserRepository;
