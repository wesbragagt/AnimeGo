var db = require("../models");
var axios = require("axios");
var path = require("path");
module.exports = function(app) {
    // Load index page
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../dashboard.html"));
        // db.Anime.findAll({}).then(function(dbExamples) {
        //     res.render("index", {
        //         msg: "AnimeGo!",
        //         animes: dbExamples
        //     });
    });

    // Load example page and pass in an example by id
    app.get("/example/:id", function(req, res) {
        // db.Anime.findOne({ where: { id: req.params.id } }).then(function(
        //     dbExample
        // ) {
        //     res.render("example", {
        //         example: dbExample
        //     });
        // });
    });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};
