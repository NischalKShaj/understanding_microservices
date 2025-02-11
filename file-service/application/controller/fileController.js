// controller for the files

// importing the required modules

// creating the controller for the file controller
class FileController {
  #fileUseCase;
  constructor(fileUseCase) {
    this.#fileUseCase = fileUseCase;
    this.uploadFiles = this.uploadFiles.bind(this);
  }

  // controller for inserting the files
  async uploadFiles(req, res) {
    try {
      const { id } = req.params;
      const { fileName } = req.body;
      const file_path = req.file?.path;

      if (!file_path) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const result = await this.#fileUseCase.uploadFiles(
        id,
        fileName,
        file_path
      );
      // console.log("result from controller", result);
      if (!result.success) {
        return res.status(400).json("file uploading failed");
      }
      res.status(201).json({ data: result.data });
    } catch (error) {
      // console.error("error", error);
      res.status(500).json(error);
    }
  }
}

module.exports = FileController;
