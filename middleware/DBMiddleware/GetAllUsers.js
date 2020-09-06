const UserSchema = require("../../models/UserSchema");
module.exports = (req, res, next) => {
  UserSchema.find({}, { password: 0 }, (err, users) => {
    if (err) {
      res.err = err;
    } else {
      res.Users = users;
    }
    next();
  });
};
