const Product = require("../models/product");
const slugify = require("slugify");
exports.create = async (req, res) => {
  try {
    // console.log("product created", req.body);

    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();

    res.json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create Product failed");
  }
};

exports.listAll = async (req, res) => {
  const products = await Product.find({}) // these methods are used to limit the numbers to show on the dashboard
    .limit(parseInt(req.params.count))
    .populate("category") //here if we dont use populate then category will show only id nothing else like in DB
    .populate("subs") //same as above bcoz we want whole sub and category obj
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};
exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).send("Product delete failed");
  }
};
exports.read = async (req, res) => {
  let product = await Product.findOne({ slug: req.params.slug })
    .populate("category") //here if we dont use populate then category will show only id nothing else like in DB
    .populate("subs") //same as above bcoz we want whole sub and category obj
    .exec();
  res.json(product);
};
// exports.remove = async (req, res) => {
//   try {
//     const deleted = await Category.findOneAndDelete({
//       slug: req.params.slug,
//     }).exec();
//     res.json(deleted);
//   } catch (err) {
//     console.log(err);
//     res.status(400).send("Category Delete failed");
//   }
// };
