const Insurance = require("../models/insurance.model");
const Company = require("../models/company.model");

exports.getInsurances = async (req, res) => {
  try {
    if (req.query.type === "willingly") {
      const insurances = await Insurance.find({
        type: req.body.type,
        belong_to_district: req.body.district,
      }).populate("user");
      return res.status(200).json(insurances);
    }
    const companies = await Company.find({
      address: req.body.district,
    }).populate("users");
    return res.status(200).json(companies);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err.message);
  }
};

exports.getInsurancesByDateRange = async (req, res) => {
  try {
    if (req.query.type === "willingly") {
      const insurances = await Insurance.find({
        $and: [
          { created_time_stamp: { $gte: req.body.start_at } },
          { created_time_stamp: { $lte: req.body.end_at } },
          { code: req.body.code },
          { status: req.body.status },
          { type: req.body.type },
        ],
      }).populate("user");
      return res.status(200).json(insurances);
    }

    const company = await Company.find({
      $and: [
        { created_time_stamp: { $gte: req.body.start_at } },
        { created_time_stamp: { $lte: req.body.end_at } },
        { company_id: req.body.code },
      ],
    }).populate("users");
    return res.status(200).json(company);
  } catch (err) {}
};

exports.getNotInsurancesByDateRange = async (req, res) => {
  try {
    console.log(req.body)
    if (req.query.type === "willingly") {
      const insurances = await Insurance.find({
        $and: [
          { created_time_stamp: { $gte: req.body.start_at } },
          { created_time_stamp: { $lte: req.body.end_at } },
          { status: req.body.status },
          { type: req.body.type },
        ],
      }).populate("user");
      return res.status(200).json(insurances);
    }

    const company = await Company.find({
      $and: [
        { created_time_stamp: { $gte: req.body.start_at } },
        { created_time_stamp: { $lte: req.body.end_at } },
      ],
    }).populate("users");
    return res.status(200).json(company);
  } catch (err) {}
};

exports.getInsuranceByCompany = async (req, res) => {
  try {
    console.log(req.body);
    const insurances = await Insurance.find({
      $and: [
        { created_time_stamp: { $gte: req.body.start_at } },
        { created_time_stamp: { $lte: req.body.end_at } },
        { code: req.body.code },
      ],
    });
    return res.status(200).json(insurances);
  } catch (err) {}
};
