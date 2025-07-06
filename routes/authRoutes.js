const express = require("express");
const {test, loginUser, findUserById, registerUser, forgetPassword, resetPassword, imageUpload} = require("../controller/authController");
const {authenticateToken} = require("../security/Auth")
const router= express.Router();

const multer = require("multer");

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept all files
  cb(null, true);
};

// // Initialize Multer with storage and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.get("/test",test);
router.post("/login",loginUser);
router.get('/:userId',authenticateToken, findUserById); 
router.post("/register",registerUser);
router.post("/forgetpassword", forgetPassword);
router.post("/resetpassword", resetPassword);
router.post('/imageupload',authenticateToken, upload.single('image'), imageUpload);

module.exports= router;