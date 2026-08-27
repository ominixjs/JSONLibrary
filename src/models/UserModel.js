import { DataTypes } from "sequelize";

//============ Configs
import connection from "../configs/connection.js";

const users = connection.define(
    "users",
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("User", "Admin"),
            allowNull: false,
            defaultValue: "User",
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        termsAccepted: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: [],
        },
    },
    { freezeTableName: true }
);

export default users;
