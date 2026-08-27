import rateLimit from "express-rate-limit";

// limitar tentativas repetidas do mesmo usuário
const RegisterLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 15,
    message: {
        message: "Muitas tentativas de registro. Tente novamente mais tarde.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export default RegisterLimiter;
