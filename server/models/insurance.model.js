const mongoose = require("mongoose");

const insuranceSchema = mongoose.Schema({
  type: String,
  code: String,
  created_time_stamp: { type: Number },
  created_at: String,
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  status: { type: String, default: "Chưa đóng" },
  belong_to_district: String,
  belong_to_company: String,
  company_insurance_code: { type: mongoose.Types.ObjectId, ref: "Company"},
  isCompanyInsurance: {type: Boolean, default: false}
});

module.exports = mongoose.model("Insurance", insuranceSchema);
