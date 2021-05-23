const router = require("express").Router();

const wageRateControlller = require("../../controllers/wage-rate.controller");

router.post("/", wageRateControlller.createRate);
router.get("/", wageRateControlller.getRates);
router.put("/", wageRateControlller.editRate);
router.delete("/", wageRateControlller.deleteRate);

module.exports = router;
