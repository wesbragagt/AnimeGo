module.exports = function(sequelize, DataTypes) {
    const Anime = sequelize.define("Anime", {
        name: DataTypes.STRING,
        api_number: DataTypes.UUID
    });

    Anime.associate = function(models) {
        Anime.belongsTo(models.User, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    return Anime;
};
