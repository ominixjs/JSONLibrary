import rateLimit from "express-rate-limit";

// limitar tentativas repetidas do mesmo usuário
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        message: "Muitas tentativas de login. Tente novamente mais tarde.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export default loginLimiter;
