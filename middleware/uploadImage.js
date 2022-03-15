import multer from "multer";

/*const MIME_TIPE = {
  "image/jpg": ".jpg",
  "image/jpeg": ".jpg",
  "image/gif": ".gif",
  "image/png": ".png",
};*/

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.split(" ").join("_");
    //const extension = MIME_TIPE[file.mimetype];

    cb(null, Date.now() + name);
  },
});

export default multer({ storage });
