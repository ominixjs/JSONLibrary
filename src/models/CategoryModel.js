import { DataTypes } from "sequelize";
import connection from "../configs/connection.js";

const categories = connection.define(
    "categories",
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
    },
    { freezeTableName: true }
);

export default categories;
