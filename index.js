import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

//=============== Configs
import connection from "./src/configs/connection.js";
import logger from "./src/configs/logger.js";
//=============== Routers
import mainRouter from "./src/routers/MainRouter.js";
import userRouter from "./src/routers/UserRouter.js";
//=============== Middlewares
import requireAuth from "./src/middlewares/RequireAuth.js";
import errorHandler from "./src/middlewares/ErrorHandler.js";

// Iniciar servidor
const app = express();

// Protegendo cabeçalhos
app.use(helmet());

// Reforçar headers ao usando proxy
// app.set("trust proxy", true);

// Cookies para middleware
app.use(cookieParser(process.env.COOKIE_PARSER_KEY));

//===
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Diretorio referente ao index
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//== Redenrizador
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//== Diretório estático
app.use(express.static(path.join(__dirname, "public")));

//===
try {
    await connection.authenticate();
    logger.info("DB conectado");
} catch (err) {
    logger.error("DB sem conexão ", err);
}

// Rotas
app.use("/auth", requireAuth);
app.use(mainRouter);
app.use(userRouter);
app.use(errorHandler);

export default app;
