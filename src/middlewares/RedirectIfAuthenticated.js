//============ Configs
import logger from "../configs/logger.js";

export default function RedirectIfAuthenticated(req, res, next) {
    // Validar token e voltar ao dashboard
    if (req.signedCookies.token) {
        logger.warn({
            ip: req.ip,
            userAgent: req.headers["user-agent"],
            res: "Usuário autenticado",
        });
        return res.redirect("/auth/dashboard");
    }

    // caso não tenha, permite ir para o login ou cadastro
    next();
}
