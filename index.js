require("dotenv").config();
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose");

const app = express();
app.use(cors());

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
