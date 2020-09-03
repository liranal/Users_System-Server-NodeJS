const UserModel = require("../../models/UserSchema");
module.exports = (req, res, next) => {
  UserModel.find({}, (err, users) => {
    if (err) {
      res.err = err;
    } else {
      res.Users = users;
    }
    next();
  });
};
