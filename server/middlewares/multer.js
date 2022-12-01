import multer from "multer";
import path from "path";

const upload = multer({
  // first multer will store my pic/file in the local temp folder
  storage: multer.diskStorage({}),
  // then it's gonna pass the file obj that contains the path to my file
  fileFilter: (req, file, cb) => {
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted]
    // ?? extract the extension for my files and for that ->
    let extension = path.extname(file.originalname); // "file" is an object with many prop and one of them is originalname
    if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
      // To reject this file pass `false`, like so:
      cb(new Error("File extension not supported", false));
      return;
    }

    // To accept the file pass `true`, like so:
    cb(null, true);
  },
});

export default upload;
