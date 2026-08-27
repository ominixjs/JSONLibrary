import { DataTypes } from "sequelize";
import connection from "../configs/connection.js";

const TwoFactorCodeModel = connection.define(
    "TwoFactorCode",
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        codeHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        attempts: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        freezeTableName: true,
    }
);

export default TwoFactorCodeModel;
