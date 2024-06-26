const multer = require('multer');
const path = require('path');
// Configurazione di multer
const storage = multer.diskStorage({
  destination: 'public/foto_pics',
  filename: (req, file, cf) => {
    const fileType = path.extname(file.originalname);
    cf(null, String(Date.now()) + fileType);
  },
});
const upload = multer({ storage });
module.exports = upload;
