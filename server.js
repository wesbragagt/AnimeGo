var axios = require("axios");
var express = require("express");
var exphbs = require("express-handlebars");
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");
var cookieSession = require("cookie-session");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("dotenv").config();

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/

db.sequelize.sync(syncOptions).then(function() {
    db.Anime.create({
        name: "naruto",
        api_number: 11
    }).then(function() {
        db.Anime.create({
            name: "sailor moon",
            api_number: 489
        });
    });
    app.listen(PORT, function() {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
        );
    });
});

// app.listen(PORT, function() {
//     console.log(`Listening on port ${PORT}`);
// });
// cookieSession config
app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
        keys: ["randomstringhere"]
    })
);

app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

// Strategy config
passport.use(
    new GoogleStrategy(
        {
            clientID: "process.env.clientID",
            clientSecret: "process.env.clientSecret",
            callbackURL: "process.env.callbackURL"
        },
        (accessToken, refreshToken, profile, done) => {
            done(null, profile); // passes the profile data to serializeUser
        }
    )
);

// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
    done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.send("You must login!");
    }
}

// passport.authenticate middleware is used here to authenticate the request
app.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["profile"] // Used to specify the required data
    })
);

// The middleware receives the data from Google and runs the function on Strategy config
app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
        res.redirect("/secret");
    }
);

// Secret route
app.get("/secret", isUserAuthenticated, (req, res) => {
    res.send("You have reached the secret route");
});

// Logout route
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

app.listen(8000, () => {
    console.log("Server Started!");
});

module.exports = app;
