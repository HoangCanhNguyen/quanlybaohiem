const insuranceRate = require("../models/insurance-rate.model");

exports.create = async (req, res) => {
  try {
    const rate = new insuranceRate({
      type: req.body.type,
      personal_rate: req.body.personal_rate,
      organization_rate: req.body.organization_rate,
      summary: req.body.summary,
    });
    await rate.save();
    return res.status(201).json({ msg: "Tạo thành công" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

exports.get = async (req, res) => {
  try {
    const rates = await insuranceRate.find();
    return res.status(200).json(rates);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

exports.update = async (req, res) => {
  try {
    const rate = await insuranceRate.findOneAndUpdate(
      { _id: req.query.id },
      {
        personal_rate: req.body.personal_rate,
        organization_rate: req.body.organization_rate,
        summary: req.body.summary
      },
      {
        new: true,
      }
    );
    return res.status(200).json(rate);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
