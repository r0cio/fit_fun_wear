module.exports = (sequelize, DataTypes) => {
    let alias = 'Attribute';
    let cols = {
        id_attribute: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        available: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        discount: {
            type: DataTypes.INTEGER
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        gender: {
            type: DataTypes.ENUM('H', 'M', 'U'),
            allowNull: false
        },
        size_id: {
            type: DataTypes.INTEGER
        },
        color_id: {
            type: DataTypes.INTEGER
        },
        category_id: {
            type: DataTypes.INTEGER
        },
        product_id: {
            type: DataTypes.INTEGER
        }

    }
    let config = {
        tableName: 'attributes',
        timestamps: false
    }

    const Attribute = sequelize.define(alias, cols, config);

    // Relaciones
    Attribute.associate = function (models) {
        // Un registro de atributos puede pertenecer a muchos carts
        Attribute.hasMany(models.Cart, {
            as: 'carts',
            foreignKey: 'attribute_id'
        });

        // Un atributo le pertenece a un producto
        Attribute.belongsTo(models.Product, {
            as: 'products',
            foreignKey: 'product_id',
        });
    }

    return Attribute;
}