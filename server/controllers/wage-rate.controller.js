const WageRate = require("../models/wage-rate.model");

exports.createRate = async (req, res) => {
  try {
    const rate = new WageRate({
      area: req.body.area,
      minimum_wage: req.body.minimum_wage,
      maximum_wage: req.body.maximum_wage,
      trained_employees_rate: req.body.trained_employees_rate,
      trained_employees_wage: req.body.trained_employees_wage,
    });
    await rate.save();
    return res.status(201).json({ msg: "Thêm mức lương thành công", _id: rate._id, trained_employees_rate: rate.trained_employees_rate });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getRates = async (req, res) => {
  try {
    const rates = await WageRate.find();
    return res.status(200).json(rates);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.editRate = async (req, res) => {
  try {
    console.log(req.query);
    console.log(req.body)
    const updatedRate = await WageRate.findOneAndUpdate(
      { _id: req.query.id },
      {
        area: req.body.area,
        minimum_wage: req.body.minimum_wage,
        maximum_wage: req.body.maximum_wage,
        trained_employees_rate: req.body.trained_employees_rate,
        trained_employees_wage: req.body.trained_employees_wage,
      },
      { new: true }
    );
    return res.status(200).json(updatedRate);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.deleteRate = async (req, res) => {
  try {
    await WageRate.deleteOne({ _id: req.query.id });
    return res.status(200).json({ msg: "Xoá thành công" });
  } catch (error) {
    res.status(500).json({ msg: err.message });
  }
};
