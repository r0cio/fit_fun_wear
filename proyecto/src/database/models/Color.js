module.exports = function (sequelize, dataTypes) {
    let alias = "Color";
    let cols = {
        id_color: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }
    let config = {
        tableName: "colors",
        timestamps: false
    }

    const Color = sequelize.define(alias, cols, config);

    Color.associate = function (models) {
        // Una color le pertenece a muchos productos
        Color.belongsToMany(models.Product, {
            as: 'colors_products',
            through: 'attributes',
            foreignKey: 'id_color',
            otherKey: 'product_id',
            timestamps: false
        });
    }

    return Color;
}