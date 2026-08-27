import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//============= Repositories
import * as userRepository from "../repositories/UserRepository.js";
//============= Utils
import ValidationDatainput from "../utils/ValidationDatainput.js";
import AppError from "../utils/AppError.js";

export default async function loginUser(data) {
    const { email, password, termsOfUseAndPrivacy } = data;

    // Valida campos de termos
    if (!termsOfUseAndPrivacy) {
        throw new AppError(
            "Para continuar é necessário aceitar os termos",
            422
        );
    }

    // Valida estrutura do email
    const validEmail = ValidationDatainput.ValidateEmail(email);
    if (!validEmail.success) {
        throw new AppError(validEmail.error.issues[0].message, 422);
    }

    // Verificar se há registros
    const user = await userRepository.Search({ email });
    if (!user) {
        throw new AppError("Revise os dados de login", 404);
    }

    // Validar senha
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        throw new AppError("Revise os dados de login", 404);
    }

    // Dados para o token
    const payload = {
        id: user.id,
        name: user.name,
        role: user.role,
    };

    // Token válido por 15 minutos
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "15m" });

    return token;
}
