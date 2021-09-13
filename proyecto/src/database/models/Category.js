module.exports = function (sequelize, DataTypes) {
    let alias = "Category";
    let cols = {
        id_category: {
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
        tableName: "categories",
        timestamps: false
    }

    const Category = sequelize.define(alias, cols, config);

    // Relaciones
    Category.associate = function (models) {
        // Una categoria le pertenece a muchos productos
        Category.belongsToMany(models.Product, {
            as: 'categories_products',
            throught: 'attributes',
            foreignKey: 'id_category',
            otherKey: 'product_id',
            timestamps: false
        });
    }

    return Category;
}