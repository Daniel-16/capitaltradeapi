const UserModel = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SIGNING, { expiresIn: "7d" });
};
exports.signup = async (req, res) => {
  const { fullname, phoneNumber, country, password, email, referrerId } =
    req.body;
  try {
    const user = await UserModel.signup(
      fullname,
      phoneNumber,
      country,
      password,
      email,
      referrerId
    );
    const token = createToken(user._id);
    res.status(201).json({
      success: true,
      message: user,
      token,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.status(201).json({
      success: true,
      message: user,
      token,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
//Forgotten password controller
exports.resetPassword = async (req, res, next) => {
  const resetPassword = crypto
}