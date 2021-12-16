const Category = require("../models/category");
const Sub = require("../models/sub");
const slugify = require("slugify");
exports.create = async (req, res) => {
  console.log("inside here category");
  try {
    const { name } = req.body;
    // console.log("name is", name);
    // const category = await new Category({
    //   name: name,
    //   slug: slugify(name),
    // }).save(); // it will be save in DB
    res.json(await new Category({ name, slug: slugify(name) }).save());
  } catch (err) {
    console.log(err);
    res.status(400).send("Create category failed");
  }
};
exports.list = async (req, res) => {
  res.json(await Category.find({}).sort({ createdAt: -1 }).exec()); //sort will keep new items at top
  //here Category is model name and find is empty so it will show all the elements
};
exports.update = async (req, res) => {
  const { name } = req.body; //as name is send in {} so it will save in req.body
  // console.log(req);
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name: name, slug: slugify(name) },
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    res.status(400).send("Category Update failed");
  }
};
exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).send("Category Delete failed");
  }
};
exports.read = async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  res.json(category);
};
exports.getSubs = async (req, res) => {
  Sub.find({ parent: req.params._id }).exec((err, subs) => {
    // value of req.params._id is taken from the link
    // the id will be passed by the frontend same as slug
    // the eq will be `${process.env.REACT_APP_API}/category/${_id}`
    if (err) console.log(err);
    else {
      res.json(subs);
    }
  });
};
