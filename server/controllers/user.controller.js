const User = require("../models/user.model");
const InSurance = require("../models/insurance.model");
const Company = require("../models/company.model");

exports.adminSignup = async (req, res) => {
  try {
    const user = new User({
      username: "admin",
    });
    user.generatePassword();
    await user.save();
    return res.status(200).json({ msg: "OK" });
  } catch (err) {
    return res.status(500).json({ msg: "Đã xảy ra lỗi" });
  }
};

exports.adminLogin = async (req, res) => {
  if (!req.body.username)
    return res.status(422).json({ msg: "Hãy nhập tên tài khoản" });
  if (!req.body.password)
    return res.status(422).errjson({ msg: "Hãy điền mật khẩu" });

  const user = await User.findOne({ username: req.body.username }).catch(
    (err) => {
      return res.status(500).json({ msg: "Đã xảy ra lỗi" });
    }
  );
  if (user == null) {
    return res
      .status(422)
      .json({ msg: "Bạn không phải là quản trị viên. username không đúng!" });
  }
  if (!user.checkValidPassword(req.body.password))
    return res.status(401).json({ msg: "Mật khẩu/Tên tài khoản không đúng" });
  return res.status(200).json({ user: user.toAuthJSON() });
};

exports.addUser = async (req, res) => {
  try {
    const date = new Date(req.body.created_at);
    const user = new User({
      username: req.body.username,
      id_code: req.body.id_code,
      date_of_birth: req.body.date_of_birth,
      created_at: req.body.created_at,
      address: req.body.address,
      position: req.body.position,
      wage: req.body.wage,
      insurance_code: req.body.code
    });

    const insurance = new InSurance({
      type: req.body.type,
      code: req.body.code,
      created_at: req.body.created_at,
      user: user._id,
      status: req.body.status,
      belong_to_district: req.body.address,
      created_time_stamp: date.getTime()
    });

    await user.save();
    await insurance.save();
    return res.status(201).json({ msg: "Thêm người dùng bảo hiểm thành công" });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

exports.createCompany = async (req, res) => {
  const date = new Date(req.body.created_at);
  const time = date.getTime();
  const company = new Company({
    company_id: req.body.company_id,
    address: req.body.address,
    created_at: req.body.created_at,
    name: req.body.name,
    created_time_stamp: time,
  });

  const insurance = new InSurance({
    type: req.body.type,
    code: req.body.company_id,
    created_time_stamp: time,
    created_at: req.body.created_at,
    status: req.body.status,
    belong_to_district: req.body.district,
    belong_to_company: req.body.name,
    company_insurance_code: company._id,
    isCompanyInsurance: req.body.isCompanyInsurance
  })
  await insurance.save();
  await company.save();
  return res.status(201).json({ msg: "Tao Cty thanh cong"})
}

exports.createInsurance = async (req, res) => {
  const date = new Date(req.body.created_at);
  const insurance = new InSurance({
    type: req.body.type,
    code: req.body.code,
    created_at: req.body.created_at,
    user: req.body.user,
    status: req.body.status,
    created_time_stamp: date.getTime(),
    belong_to_district: req.body.district,
    belong_to_company: req.body.belong_to_company,
    isCompanyInsurance: req.body.isCompanyInsurance,
    company_insurance_code: req.body.company_insurance_code
  })
  await insurance.save();
  return res.status(201).json({ msg:"Tao bao hiem thanh cong", insurance})
}

exports.addUserToCompany = async (req, res) => {
  try {
    await Company.updateOne({_id: req.body._id}, {
      $push: {
        users: req.body.user
      }
    })
    return res.status(200).json({msg: "Them thanh cong"})
  } catch (err) {
    return res.status(500).json({msg: err.message})
  }
}
