module.exports = function(sequelize, DataTypes) {
    var Anime = sequelize.define("Anime", {
        name: DataTypes.STRING,
        genre: DataTypes.STRING,
        api_id: DataTypes.INTEGER
    });
    return Anime;
};
