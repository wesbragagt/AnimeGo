var db = require("../models");
var axios = require("axios");
module.exports = function(app) {
    // Get specific anime by name remembet to add %20 between spaces
    app.get("/api/:anime", function(req, res) {
        axios
            .get(
                "https://kitsu.io/api/edge/anime?filter[text]=" +
                    req.params.anime +
                    "&page[limit]=1"
            )
            .then(function(response) {
                res.json(response.data);
            })
            .catch("error please provide an anime");
    });

    // Create a new example
    // app.post("/api/examples", function(req, res) {
    //     db.Example.create(req.body).then(function(dbExample) {
    //         res.json(dbExample);
    //     });
    // });

    // Delete an example by id
    // app.delete("/api/examples/:id", function(req, res) {
    //     db.Example.destroy({ where: { id: req.params.id } }).then(function(
    //         dbExample
    //     ) {
    //         res.json(dbExample);
    //     });
    // });
};
