const UserSchema = require("../../models/UserSchema");
module.exports = (req, res, next) => {
  UserSchema.findById(req.params.id, (err, user) => {
    if (err) {
      res.err = err;
    } else if (user) {
      UserSchema.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
          res.err = err;
        }
      });
    } else {
      res.err = "User Not Found";
    }
    next();
  });
};
