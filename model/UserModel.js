const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const crypto = require("crypto");
const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.signup = async function (
  fullname,
  phoneNumber,
  country,
  password,
  email
) {
  if (!email || !password) {
    throw Error("Invalid email or password. All fields must be filled");
  }
  if (!validator.isEmail(email) && !validator.isStrongPassword(password)) {
    throw Error("User email and password are not valid");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("User email already exists");
  }
  const user = await this.create({
    fullname,
    phoneNumber,
    country,
    password,
    email,
  });
  return user;
};

UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error(
      "Invalid email or password. All fields must be filled in order to login"
    );
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Invalid email");
  }
  //Match passwords to hashed passwords in the database
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Password is incorrect");
  }
  return user;
};

const UserModel = mongoose.model("Users", UserSchema);
module.exports = UserModel;