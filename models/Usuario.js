import { DataTypes, Model } from "sequelize";
import sequelize from "../database.js";

class User extends Model{}

User.init({
    nome: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
        sequelize,
        modelName: 'User',
        tableName:'users',
        timestamps: false
    })
    export default User