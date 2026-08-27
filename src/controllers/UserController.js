//============ Configs
import logger from "../configs/logger.js";
//=========== Services
import loginUser from "../services/LoginUser.js";
import CreateData from "../services/CreateData.js";
import EditData from "../services/EditData.js";
import DeleteData from "../services/DeleteData.js";

// Rota de login
export async function Login(req, res) {
    logger.info({
        ip: req.ip,
        res: `Usuário esta na rota ${req.url}`,
    });

    res.render("pages/login");
}

// Rota de autenticação de login
export async function LoginAuth(req, res) {
    // Faz autenticação dos dados
    const token = await loginUser(req.body);

    // Cookie para autorização e permissão
    res.cookie("token", token, {
        httpOnly: true, // Impede o acesso ao cookie via JavaScript (proteção contra XSS)
        secure: false, // Envia o cookie apenas em conexões HTTPS
        sameSite: "strict", // Restringe o envio do cookie em requisições entre sites (proteção contra CSRF)
        signed: true, // Assina o cookie usando o segredo do cookie-parser
        maxAge: 15 * 60 * 1000,
    });

    logger.info({
        ip: req.ip,
        email: req.body.email,
        res: "Login feito com sucesso",
    });

    return res.redirect("/auth/dashboard");
}

// Rota de cadastro
export async function Create(req, res) {
    logger.info({
        ip: req.ip,
        res: `Usuário esta na rota ${req.url}`,
    });

    res.render("pages/register");
}

// Rota de autenticação de cadastro
export async function CreateAuth(req, res) {
    const { name, email, password, termsOfUseAndPrivacy } = req.body;
    const data = { name, email, password, termsOfUseAndPrivacy };

    // Faz autenticação de dados de cadastro
    await CreateData("user", data);

    logger.info({
        ip: req.ip,
        res: "Conta criada com sucesso",
    });
    res.redirect("/success");
}

// Editar dados do Usuário
export async function Edit(req, res) {
    const { id, name, email, role } = req.body;
    const data = { name, email, role };

    // Função uniersal de editar dados
    const result = await EditData("user", id, data);

    logger.info({
        id: req.user.id,
        name: req.user.name,
        res: result,
    });
    return res.redirect("/success");
}

// Deletar dados do usuário
export async function Delete(req, res) {
    // Aguarda o resultado da deleção da biblioteca
    await DeleteData("user", req.params.id, req.user.role);

    logger.info({
        id: req.user.id,
        name: req.user.name,
        res: "Usuário deletado com sucesso",
    });
    res.redirect("/success");
}

// Rota de logout
export function Logout(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });

    res.redirect("/login");
}
