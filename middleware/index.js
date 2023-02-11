//Code to require authetication
const jwt = require("jsonwebtoken");
const UserModel = require("../model/UserModel");

exports.requireAuth = async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(201).json({
      error: "Authorization token required",
    });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SIGNING);
    req.user = await UserModel.findOne({ _id }).select("_id");
    return next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
