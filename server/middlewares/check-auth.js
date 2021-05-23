const User = require("../models/user");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = User.verifyJWT(token);
    User.findOne({ _id: decodedToken.userId }).then((user) => {
      if (user) {
        next();
      } else {
        res.status(401).json({ msg: "Hãy Đăng Nhập" });
      }
    });
  } catch (err) {
    res.status(403).json({ msg: "Bạn không được phép truy cập" });
  }
};
