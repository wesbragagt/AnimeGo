const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.User;

module.exports = function(passport) {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email"
            },
            (email, password, done) => {
                // Match User
                db.User.findOne({
                    where: {
                        email: email
                    }
                })
                    .then(user => {
                        if (!user) {
                            return done(null, false, {
                                message: "that email is not registered"
                            });
                        }

                        // Match the Password
                        bcrypt.compare(
                            password,
                            user.password,
                            (err, isMatch) => {
                                if (err) throw err;
                                if (isMatch) {
                                    return done(null, user);
                                } else {
                                    return done(null, false, {
                                        message: "Password Incorrect"
                                    });
                                }
                            }
                        );
                    })
                    .catch(err => console.log(err));
            }
        )
    );

    passport.serializeUser((user, done) => {
        console.log(user);
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findByPk(id)
            .then(function(user) {
                done(null, user);
            })
            .catch(function(e) {
                done(e, false);
            });
    });
};
