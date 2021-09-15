module.exports = function (sequelize, DataTypes) {
    let alias = "Size";
    let cols = {
        id_size: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
    let config = {
        tableName: "sizes",
        timestamps: false
    }

    const Size = sequelize.define(alias, cols, config);

    // Relaciones
    Size.associate = function (models) {
        // Una talla le pertenece a muchos productos
        Size.belongsToMany(models.Product, {
            as: 'sizes_products',
            through: 'attributes',
            foreignKey: 'id_size',
            otherKey: 'product_id',
            timestamps: false
        });
    }

    return Size;
}