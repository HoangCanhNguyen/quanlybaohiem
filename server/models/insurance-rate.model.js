const mongoose = require('mongoose');


const insuranceRate = mongoose.Schema({
  type: String,
  personal_rate: mongoose.Decimal128,
  organization_rate: mongoose.Decimal128,
  summary: mongoose.Decimal128,
})

module.exports = mongoose.model("Insurancerate", insuranceRate);