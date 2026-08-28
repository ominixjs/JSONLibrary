import { Sequelize } from "sequelize";

// Sequelize configurado para ambiente de desenvolvimento em HTTP
const connection = new Sequelize(
    process.env.DB_SCHEMA,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
        logging: false,
    }
);

export default connection;
