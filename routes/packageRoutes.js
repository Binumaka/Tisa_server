const express = require("express");
const router = express.Router();
const { findAllPackages, createPackage, findById,deleteById, update } = require("../controller/packagesController");

const multer = require("multer");

//Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "ornaments_image");
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

//Initialize Multer with sstirage and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

router.get("/find", findAllPackages);
router.post("/create",upload.fields([{ name: 'image' }]), createPackage);
router.get("/:id", findById);
router.delete("/:id", deleteById);
router.put("/:id",upload.fields([{ name: 'image' }]),update);

module.exports = router;
