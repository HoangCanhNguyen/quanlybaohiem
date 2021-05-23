const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const accessTokenKey =
  "Jy9M6B289yKqAgr4GcGAzDSJ3EXJjC8mfpzhk9sf2GLmGgTUYnah758ubhNK5JGBj6tkvGTUea6uxtB9ZfsgJNnHyhFCJtZSvkvj";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  id_code: String,
  date_of_birth: String,
  created_at: String,
  created_time_stamp: {type: Date, default: Date.now()},
  address: String,
  position: String,
  wage: Number,
  insurance_code: String,
});


userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      username: this.username,
      userId: this._id,
    },
    accessTokenKey
  );
};

userSchema.statics.verifyJWT = function (token) {
  return jwt.verify(token, accessTokenKey);
};

userSchema.methods.generatePassword = function () {
  this.password = bcrypt.hashSync("admin@123", 10);
};

userSchema.methods.checkValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.toAuthJSON = function () {
  return {
    username: this.username,
    token: this.generateJWT(),
  };
};

module.exports = mongoose.model("User", userSchema);
