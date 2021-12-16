const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 7,
    },
    category: {
      type: ObjectId,
      ref: "Category", //referring to the category model
    },
    subs: [
      {
        type: ObjectId,
        ref: "Sub",
      },
    ],
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"], // enum is used when we had to choose one of the given like here yes or no
    },
    color: {
      type: String,
      enum: ["Red", "Black", "White", "Blue", "Grey"],
    },
    brand: {
      type: String,
      enum: ["Apple", "Samsung", "JBL", "Lenovo", "Microsoft"],
    },
    // ratings: [
    //   {
    //     star: { type: Number },
    //     postedBy: { type: ObjectId, ref: "User" },
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
