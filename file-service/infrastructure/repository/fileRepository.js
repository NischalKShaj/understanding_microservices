// file to create the file repository

// importing the required modules
const { getPool } = require("../database/connect");

const pool = getPool();

// creating the file repo class
class FileRepository {
  // for uploading the files
  async uploadFiles(id, fileName, file_path) {
    try {
      const query = `INSERT INTO fileupload (uid, fileName, file_path, uploaded_at) VALUES($1, $2, $3, $4) RETURNING *`;
      const date = new Date();
      const values = [id, fileName, file_path, date];
      const result = await pool.query(query, values);
      if (!result.rows.length) {
        throw new Error("file not uploaded");
      }
      const file = result.rows[0];
      return file;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = FileRepository;
