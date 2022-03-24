import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.split(" ").join("_");

    cb(null, Date.now() + name);
  },
});

export default multer({ storage });
