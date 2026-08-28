//============= Configs
import logger from "../configs/logger.js";

//============== Utils
import AppError from "../utils/AppError.js";

export default function ErrorHandler(error, req, res, next) {
    // Erros lançados manualmente
    if (error instanceof AppError) {
        logger.warn(
            `[${req.method}] ${req.url} - Status: ${error.statusCode} - Mensagem: ${error.message}`
        );

        return res.status(error.statusCode).render("pages/error", {
            status: error.statusCode,
            message: error.message,
        });
    }

    logger.error(`[${req.method}] ${req.url} - Erro Crítico:`, error);

    return res.status(500).render("pages/error", {
        status: error.statusCode,
        message: "Error interno do servidor",
    });
}
