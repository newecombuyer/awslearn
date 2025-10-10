const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  image: String, // store image filename/path

});

module.exports = mongoose.model("User", userSchema);
