import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.split(" ").join("_");

    cb(null, Date.now() + name);
  },
});

export default multer({ storage });
