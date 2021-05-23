const mongoose = require("mongoose");

const districtSchema = mongoose.Schema({
  name: String,
  number_of_employees: Number,
  users: [{type: mongoose.Types.ObjectId, ref: "User"}],
})

module.exports = mongoose.model("District", districtSchema)