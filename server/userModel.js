const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  propertyType: String,
  bedRoom: String,
  addingDate: { type: Date, default: Date.now },
  monthlyRentPrice: String,
  furnitureType: String,
  notes: String,
  reporterName: String,
  image: String
});

module.exports = mongoose.model("users", UserSchema);