var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require("../../config");
const VerifyToken = require("../../middleware/AuthMiddleware/VerifyToken");

router.use(bodyParser.urlencoded({ extended: false })).use(bodyParser.json());
var User = require("../../models/UserSchema");

router.post("/register", (req, res) => {
  var hashPassword = bcrypt.hashSync(req.body.password, 8);
  User.create(
    {
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    },
    (err, user) => {
      if (err)
        return res
          .status(500)
          .send("There was a problem registering the user." + err);
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400,
      });
      return res.status(200).send({ auth: true, token: token });
    }
  );
});

router.post("/login", (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) return res.status(500).send("Error on the Sever");
    if (!user) return res.status(404).send("No user found");

    var passwordValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordValid)
      return res.status(401).send({ auth: false, token: null });

    var token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 });
    res.status(200).send({ auth: true, token: token });
  });
});

router.get("/logout", function (req, res) {
  res.status(200).send({ auth: false, token: null });
});

router.get("/me", VerifyToken, function (req, res, next) {
  User.findById(req.userId, { password: 0 }, function (err, user) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");

    res.status(200).send(user);
  });
});

// add the middleware function
router.use(function (user, req, res, next) {
  res.status(200).send(user);
});

module.exports = router;
