const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const tokenForUser = user => (
   jwt.sign(
    { sub: user.id, iat: new Date().getTime() },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  )
);

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.status(422).send({ error: "Email is in use" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ email, password: hashPassword });
  await newUser.save();
  return res.json({ token: tokenForUser(newUser) });
};
exports.signin = async (req, res, next) => {
  return res.json({ token: tokenForUser(req.user) });
};
