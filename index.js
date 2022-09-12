const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const user = require("./routes/userRoutes");
const authRoute = require("./routes/auth");
const cardRoute = require("./routes/cardRoute");
const orderRoute = require("./routes/orderRoute");
const productRoute = require("./routes/productRoutes");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");


dotenv.config();

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("DB Connnection"))
  .catch((err) => {
    console.log(err);
  });
  app.use(cors());
app.use(express.json());
app.use("/api/product", productRoute);
app.use("/api/auth", authRoute);
app.use("/api/card", cardRoute);
app.use("/api/order", orderRoute);
app.use("/api/users", user);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 3002, () => {
  console.log("Listening on port 3002");
});
