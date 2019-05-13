const axios = require("axios");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");

const passport = require("passport");

const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// express-session middleware
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true
    })
);

//passport config
require("./config/passport")(passport);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});

// Routes

// USER
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/user"));

// Utility routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("dotenv").config();

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.User.sync(syncOptions);

app.listen(PORT, function() {
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
    );
});

module.exports = app;
