const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const UserModel = require("../model/UserModel");

exports.payment = async (req, res) => {
  const id = req.params.id;
  const user = await UserModel.findOne({ _id: id });
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.FLUTTERWAVE_KEY}`,
    },
  };
  const body = {
    tx_ref: uuidv4(),
    amount: 2000,
    currency: "NGN",
    redirect_url: "https://www.google.com",
    customer: {
      email: user.email,
      phoneNumber: user.phoneNumber,
      name: user.fullname,
    },
  };
  const url = "https://api.flutterwave.com/v3/payments";
  try {
    axios
      .post(url, body, config)
      .then((response) => {
        const data = response;
        res.status(201).json({ data });
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (err) {
    res.status(401).json({
      err,
    });
  }
};
