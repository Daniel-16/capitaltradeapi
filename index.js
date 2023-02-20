require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes/router");
const paymentRouter = require("./routes/Payment.Route");

const app = express();
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", router);
app.use("/api/payment", paymentRouter);

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/capitaltrade", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 9000, () => {
      console.log(`Server started successfully at port 9000`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
