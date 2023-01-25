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
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  try {
    const user = await UserModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      throw Error(
        "Invalid reset token",
        res.status(400).json({
          error: "Invalid reset token",
        })
      );
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    res.status(201).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    next(error);
  }
};
