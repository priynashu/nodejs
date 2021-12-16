const User = require("../models/user");

// exports.createOrUpdateUser = async (req, res) => {
exports.createOrUpdate = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { picture },
    { new: true }
  );
  // console.log("hiii");
  if (user) {
    // console.log("USER UPDATED", user);
    res.json(user); //user will be updated if already exists
  } else {
    const newUser = await new User({
      name: req.headers.name,
      email: email,
      picture: picture,
    }).save();
    // console.log("USER CREATED ", newUser);
    res.json(newUser); //user will be created if it does not exist
  }
};
exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
