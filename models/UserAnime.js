module.exports = function(sequelize, DataTypes) {
    const UserAnime = sequelize.define("UserAnime", {
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        anime_id: {
            type: DataTypes.UUID,
            allowNull: false
        }
    });
    return UserAnime;
};
