const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
  company_id: String,
  users: [{type: mongoose.Types.ObjectId, ref: "User"}],
  address: String,
  name: String,
  created_at: String,
  created_time_stamp: {type: Number}
})

module.exports = mongoose.model("Company", companySchema)