const mongoose = require('mongoose');

const wageRateSchema = mongoose.Schema({
  area: String,
  minimum_wage: Number,
  maximum_wage: Number,
  trained_employees_rate: mongoose.Decimal128,
  trained_employees_wage: Number,
})

module.exports = mongoose.model("Wagerate", wageRateSchema);