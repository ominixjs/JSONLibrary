import logger from "../configs/logger.js";

export default function RequireAdmin(req, res, next) {
    if (req.user.role !== "Admin") {
        logger.warn({
            ip: req.ip,
            userAgent: req.headers["user-agent"],
            res: "Tentativa de acesso a rota ADMINISTRATIVA!",
        });
        return res.redirect("/warning");
    }

    next();
}
