const mongoose = require("mongoose");
const uniq = require("mongoose-unique-validator");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, index: true, unique: true, required: true },
  password: { type: String, required: true },
});
UserSchema.plugin(uniq);
module.exports = mongoose.model("users", UserSchema);
