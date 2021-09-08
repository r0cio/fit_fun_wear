module.exports = (sequelize, DataTypes) => {
    let alias = 'Cart';
    let cols = {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        attribute_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        }
    }
    let config = {
        tableName: 'carts',
        timestamps: false
    }

    const Cart = sequelize.define(alias, cols, config);

    // Relaciones
    Cart.associate = function (models) {
        // Un carrito de compras le pertenece a un usuario
        Cart.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        });

        // Un carrito de compras le pertenece a un registro de atributos
        Cart.belongsTo(models.Attribute, {
            as: 'atributos',
            foreignKey: 'attribute_id'
        });
    }

    return Cart;
}