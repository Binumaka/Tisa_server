const express = require("express");
const {
  findAll,
  createRent,
  findById,
} = require("../controller/rentOrnamentController");

const router = express.Router();

const multer = require("multer");

//Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); 
  }
});

//File filter to validate file types
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/avif", "image/png"];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only JPEG, PNG, JPG, and AVIF are allowed."), false);
    }
};

//Initialize Multer with storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

router.get("/", findAll);
router.post("/", upload.fields([{ name: 'image' }]), createRent);
router.get("/:id", findById);

module.exports = router;
