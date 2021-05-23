const router = require('express').Router();

router.use('/api/user', require('./apis/user.route'));
router.use('/api/insurance', require('./apis/insurance.route'));
router.use('/api/wage', require('./apis/wage-rate.route'));
router.use('/api/insurance/rate', require('./apis/insurance-rate.route'));

module.exports = router;
