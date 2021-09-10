module.exports = function(sequelize, dataTypes){
    let alias = "Color";
    let cols = {
        id_color: {
            type:  dataTypes.INTEGER,
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

    let Color = sequelize.define(alias, cols, config);


    return Color;
}