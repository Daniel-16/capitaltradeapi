const UserModel = require("../model/UserModel");

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
//Forgotten password controller
