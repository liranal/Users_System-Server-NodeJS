const UserSchema = require("../../models/UserSchema");
module.exports = (req, res, next) => {
  UserSchema.findById(req.params.id, { password: 0 }, (err, user) => {
    if (err) {
      res.err = err;
    } else {
      res.user = user;
    }
    next();
  });
};
