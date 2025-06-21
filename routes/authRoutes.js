const express = require("express");
const {test, loginUser, findUserById, registerUser, forgetPassword, resetPassword} = require("../controller/authController");
const {authenticateToken} = require("../security/Auth")
const router= express.Router();

router.get("/test",test);
router.post("/login",loginUser);
router.get('/users',authenticateToken, findUserById); 
router.post("/register",registerUser);
router.post("/forgetpassword", forgetPassword);
router.post("/resetpassword", resetPassword);



module.exports= router;