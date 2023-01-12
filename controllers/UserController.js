const UserModel = require("../model/UserModel");

exports.signup = async (req, res) => {
  const { fullname, email, password, phoneNumber, country } = req.body;
  try {
    const user = await UserModel.signup(
      fullname,
      email,
      password,
      phoneNumber,
      country
    );
    res.status(201).json({
      success: true,
      message: user,
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
    res.status(201).json({
      success: true,
      message: user,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
