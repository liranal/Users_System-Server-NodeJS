const UserSchema = require("../../models/UserSchema");

module.exports = (req, res, next) => {
  let newUser = new UserSchema({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  newUser.save((err) => {
    if (err) {
      console.log(err);
      res.err = err;
    } else {
      console.log("Saved: " + newUser);
      res.newUser = newUser;
    }
    next();
  });
};
