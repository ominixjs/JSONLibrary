import rateLimit from "express-rate-limit";

// limitar tentativas repetidas do mesmo usuário
const AuthLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: {
        message: "Muitas tentativas de registro. Tente novamente mais tarde.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export default AuthLimiter;
