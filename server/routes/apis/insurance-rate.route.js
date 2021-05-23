const router = require('express').Router();

const controller = require("../../controllers/insurance-rate.controller");

router.post("/", controller.create);
router.get("/", controller.get);
router.put("/", controller.update);
module.exports = router;