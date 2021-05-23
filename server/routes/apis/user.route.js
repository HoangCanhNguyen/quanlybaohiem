const router = require('express').Router();
const userController = require("../../controllers/user.controller");

// router.get("/sign-up", userController.adminSignup);
router.post("/login", userController.adminLogin);
router.post("/create", userController.addUser);
router.post("/create-company", userController.createCompany);
router.post("/create-insurance", userController.createInsurance);
router.post("/add-user",userController.addUserToCompany)
module.exports = router