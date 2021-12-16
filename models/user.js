const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
    // wishlist: [{ type: ObjectId, ref: "Product" }],
  },
  { timestamps: true }
  //date and time will be automatically added to the DB when a user will be created
);
// exports.UserSchema;
module.exports = mongoose.model("User", userSchema);
