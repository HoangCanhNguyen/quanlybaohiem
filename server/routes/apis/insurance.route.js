const router = require("express").Router();
const insuranceController = require("../../controllers/insurance.controller");

router.post("/", insuranceController.getInsurances);
router.post("/personal", insuranceController.getInsurancesByDateRange);
router.post("/not-insurance", insuranceController.getNotInsurancesByDateRange);
router.post("/company", insuranceController.getInsuranceByCompany);


module.exports = router;
