const Sub = require("../models/sub");
const slugify = require("slugify");
exports.create = async (req, res) => {
  console.log("inside here Sub");
  try {
    const { name, parent } = req.body;
    // console.log("name is", name);
    // const Sub = await new Sub({
    //   name: name,
    //   slug: slugify(name),
    // }).save(); // it will be save in DB
    res.json(await new Sub({ name, slug: slugify(name), parent }).save());
  } catch (err) {
    console.log(err);
    res.status(400).send("Create Sub failed");
  }
};
exports.list = async (req, res) => {
  res.json(await Sub.find({}).sort({ createdAt: -1 }).exec()); //sort will keep new items at top
  //here Sub is model name and find is empty so it will show all the elements
};
exports.update = async (req, res) => {
  const { name } = req.body; //as name is send in {} so it will save in req.body
  // console.log(req);
  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name: name, slug: slugify(name) },
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    res.status(400).send("Sub Update failed");
  }
};
exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).send("Sub Delete failed");
  }
};
exports.read = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  res.json(sub);
};
