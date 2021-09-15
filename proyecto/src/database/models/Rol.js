module.exports = (sequelize, DataTypes) => {
    let alias = 'Rol';
    let cols = {
        id_role: {
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

        }
    }

    let config = {
        tableName: 'rol',
        timestamps: false
    }

    const Rol = sequelize.define(alias, cols, config);

    // Relaciones
    Rol.associate = function (models) {

        // Un rol lo tienen muchos usuarios 
        Rol.hasMany(models.User, {
            as: 'user',
            foreignKey: 'role_id'
        });
    }

    return Rol;

}