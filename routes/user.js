const path = require("path");
const express = require("express");
const passport = require("passport");
const router = express.Router();
const db = require("./../models");
const bcrypt = require("bcryptjs");
// Login Page
router.get("/login", (req, res) => res.render("login"));
// Register Page
router.get("/register", (req, res) => res.render("register"));

router.post("/register", (req, res) => {
    // destructuring
    const { name, email, password, password2 } = req.body;

    // validation
    let errors = [];

    // Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: "please fill all fields" });
    }
    // Check if passwords match
    if (password !== password2) {
        errors.push({ msg: "passwords do not match" });
    }

    // Check password length
    if (password.length < 6) {
        errors.push({ msg: "password should be at least 6 characters" });
    }

    if (errors.length > 0) {
        res.render("register", {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        // validation pass
        db.User.findOne({
            where: { email: email }
        }).then(user => {
            // check for that user
            if (user) {
                // user exists
                errors.push({ msg: "email is already registered" });
                res.render("register", {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = {
                    name: name,
                    email: email,
                    password: password
                };

                // Hash password
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        // SET PASSWORD TO HASH
                        newUser.password = hash;
                        // save user
                        db.User.create({
                            name: newUser.name,
                            email: newUser.email,
                            password: newUser.password
                        })
                            .then(user => {
                                req.flash(
                                    "success_msg",
                                    "you are now registered and can log in"
                                );
                                res.redirect("/users/login");
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

// LOGIN HANDLE
router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/users/login",
        failureFlash: true
    })(req, res, next);
});

//LOGOUT
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success_msg", "You are logged out");
    res.redirect("/users/login");
});

module.exports = router;
