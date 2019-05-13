module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });

    User.associate = function(models) {
        User.hasMany(models.Anime, {
            onDelete: "cascade"
        });
    };
    return User;
};
