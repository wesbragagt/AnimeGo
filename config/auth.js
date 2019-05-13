module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error_msg", "Plese log in to view this resource");
        res.redirect("/users/login");
    }
};
