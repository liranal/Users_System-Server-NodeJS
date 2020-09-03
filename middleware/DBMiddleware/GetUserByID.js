const UserSchema = require("../../models/UserSchema");
module.exports = (req, res, next) => {
  UserSchema.findById(req.params.id, (err, user) => {
    console.log(user);
    if (err) {
      res.err = err;
    } else {
      res.user = user;
    }
    next();
  });
};
