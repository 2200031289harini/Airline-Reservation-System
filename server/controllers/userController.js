
const User = require("../models/User");

updateUser = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "User not found!",
      });
    }
    console.log(user);

    user.FirstName = body.FirstName;

    user.LastName = body.LastName;

  

    user.Email = body.Email;

    

    user.PassportNumber = body.PassportNumber;

    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: user.id,
          message: "User updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "User not updated!",
        });
      });
  });
};

deleteUser = async (req, res) => {
  await User.findByIdAndDelete({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }

    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};

createUser = (req, res) => {
  User.create(req.body)
    .then((user) =>
      res.json({ msg: "User added successfully", data: req.body })
    )
    .catch((err) => res.status(400).json({ error: "Unable to add this user" }));
};
getUser = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ nousersfound: "No User found" }));
};
getUserById = async (req, res) => {
  await User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "User not found" });
    }
    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};

module.exports = {
  updateUser,
  deleteUser,
  createUser,
  getUser, 
  getUserById
};
