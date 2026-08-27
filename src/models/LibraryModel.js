import { DataTypes } from "sequelize";
import connection from "../configs/connection.js";

const libraries = connection.define(
    "libraries",
    {
        id: {
            type: DataTypes.STRING(21),
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        libSize: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
);

export default libraries;
