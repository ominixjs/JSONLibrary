import jwt from "jsonwebtoken";

//========== Configs
import logger from "../configs/logger.js";

// Definir autorização para as rotas
export default function RequireAuth(req, res, next) {
    // Varificar se ainda tem o token
    const token = req.signedCookies.token;
    if (!token) {
        logger.warn({
            ip: req.ip,
            userAgent: req.headers["user-agent"],
            res: "Token expirado",
        });
        return res.redirect("/login");
    }

    try {
        // Decodifica e valida
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        // Armazena os dados do token
        req.user = decoded;

        next();
    } catch (err) {
        logger.error(`${err.name} : ${err.message}`);
    }
}
