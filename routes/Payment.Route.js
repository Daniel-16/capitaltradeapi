const express = require("express");
const { payment } = require("../controllers/Payment.Controller");
const paymentRouter = express.Router();

paymentRouter.post("/:id", payment);

module.exports = paymentRouter;
