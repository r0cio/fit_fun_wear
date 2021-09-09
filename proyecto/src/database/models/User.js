module.exports = (sequelize, DataTypes) => {
    let alias = 'User';
    let cols = {
        id_user: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            required: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false

        },
        last_name: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },   
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        },
        role_id: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false
        }, 
    }

    let config = {
        tableName: 'users',
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config);

    // Relaciones
    User.associate = function (models) {

        // Un usuario le pertenece a un rol 
        User.belongsTo(models.Rol, {
            as: 'rol',
            foreignKey: 'role_id'
        });

        // Un usuario tiene muchos carritos de compra
        User.hasMany(models.Cart, {
            as: 'carts',
            foreignKey: 'user_id'
        });
    }

    return User;
}