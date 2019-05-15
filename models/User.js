module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define(
        "User",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            classMethods: {
                associate: function(models) {
                    User.belongsToMany(models.Anime, {
                        through: {
                            model: models.UserAnime
                        },
                        foreignKey: "user_id"
                    });
                }
            }
        }
    );

    return User;
};
