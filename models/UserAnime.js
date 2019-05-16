module.exports = function(sequelize, DataTypes) {
    const UserAnime = sequelize.define("UserAnime", {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        anime_id: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return UserAnime;
};
