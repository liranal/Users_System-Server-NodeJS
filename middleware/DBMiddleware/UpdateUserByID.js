const UserSchema = require("../../models/UserSchema");
module.exports = (req, res, next) => {
  console.log(req.body);
  let updateUser = {
    _id: req.params.id,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  UserSchema.findByIdAndUpdate(req.params.id, updateUser, (err, user) => {
    if (err) {
      res.err = err;
    } else {
      res.updatedUser = updateUser;
    }
    next();
  });
};
