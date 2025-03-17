require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes/index");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
app.use(
  cors({
    origin: process.env.STUDENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("mongodb is connected"))
  .catch((e) => console.log(e));


app.use("/auth",authRoutes);


app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});
app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
