module.exports = function(sequelize, DataTypes) {
    const Anime = sequelize.define("Anime", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
        
    });
    return Anime;
};
