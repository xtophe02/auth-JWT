const Authentication = require("./controllers/authentication");
require("./utils/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  app.get("/", requireAuth, (req, res, next) => {
    res.send(["hello world", "teste"]);
  }),
    app.post("/signup", Authentication.signup),
    app.post("/signin", requireSignin, Authentication.signin);
};
