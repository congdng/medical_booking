import multer from "multer";

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    },
  });
export const userAvaUpload = multer({storage})


