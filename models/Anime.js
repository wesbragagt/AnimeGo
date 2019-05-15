module.exports = function(sequelize, DataTypes) {
    const Anime = sequelize.define(
        "Anime",
        {
            name: DataTypes.STRING
        },
        {
            classMethods: {
                associate: function(models) {
                    Anime.belongsToMany(models.User, {
                        through: "UserAnime",
                        foreignKey: "anime_id"
                    });
                }
            }
        }
    );

    return Anime;
};
