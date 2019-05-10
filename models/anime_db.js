module.exports = function(sequelize, DataTypes) {
    const Anime = sequelize.define("Anime", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        api_number: {
            type: DataTypes.UUID,
            allowNull: false
        }
    });
    return Anime;
};
