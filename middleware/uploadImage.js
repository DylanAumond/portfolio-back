const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/upload')
  },
  filename: (req, file, cb) => {
    const name = file.fieldname
    const extension = ".webp"

    cb(null, Date.now() + name + extension)
  },
})

module.exports = multer({storage: storage});