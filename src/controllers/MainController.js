//============= Configs
import logger from "../configs/logger.js";
//============= Services
import Libraries from "../services/Libraries.js";
import Categories from "../services/Categories.js";
import Pagination from "../services/Pagination.js";

// Landpage
export function LandingPage(req, res) {
    res.render("landingpage");
}

// Rota de todas as bibliotecas
export async function Dashboard(req, res) {
    logger.info({
        id: req.user.id,
        name: req.user.name,
        res: `Usuário acessou a rota ${req.url}`,
    });

    // Função que retorna uma lista de bibliotecas salvas do usuário logado
    const data = await Libraries(req.user.id);
    const categories = await Categories();

    res.render("index", {
        name: req.user.name,
        role: req.user.role,
        data,
        categories,
    });
}

// Todas as bibliotecas
export async function ViewLibraries(req, res) {
    // Lista com todos os dados de paginação
    const paginationData = await Pagination(
        "library",
        parseInt(req.params.page),
        req.user.id
    );

    // Todas as categorias registradas
    const categories = await Categories();

    res.render("pages/library/libraries", {
        name: req.user.name,
        role: req.user.role,
        pageName: "libraries",
        categories,
        libraries: paginationData.rows,
        page: paginationData.page,
        pageTotal: paginationData.pageTotal,
        hasPreviousPage: paginationData.hasPreviousPage,
        hasNextPage: paginationData.hasNextPage,
    });
}

// Tela de ajustes
export async function Settings(req, res) {
    logger.info({
        id: req.user.id,
        name: req.user.name,
        res: `Usuário acessou a rota ${req.url}`,
    });

    // Dados usados no frontend
    const libraries = await Libraries(req.user.id);
    const categories = await Categories();

    // Validando nivel de autorização para acessar rota de ADMIM
    const adminSettings =
        req.user.role === "Admin" ? "admin/settings" : "settings";

    res.render(adminSettings, {
        libraries,
        categories,
        name: req.user.name,
        role: req.user.role,
        userId: req.user.id,
    });
}

export async function Permissions(req, res) {
    logger.info({
        id: req.user.id,
        name: req.user.name,
        res: `Usuário acessou a rota ${req.url}`,
    });

    // Lista com todos os dados de paginação
    const paginationData = await Pagination("user", parseInt(req.params.page));

    res.render("admin/permissions", {
        name: req.user.name,
        role: req.user.role,
        pageName: "permissions",
        users: paginationData.rows,
        page: paginationData.page,
        pageTotal: paginationData.pageTotal,
        hasPreviousPage: paginationData.hasPreviousPage,
        hasNextPage: paginationData.hasNextPage,
    });
}

// Rota para os erros
export function Terms(req, res) {
    res.render("pages/terms");
}

// Rota para os erros
export function Help(req, res) {
    res.render("pages/help");
}

// Rota para os erros
export function About(req, res) {
    res.render("pages/about");
}

// Rota para os erros
export function Error(req, res) {
    res.render("pages/error");
}

// Rota para os success
export function Success(req, res) {
    res.render("pages/success");
}

// Rota para os alertas
export function Warning(req, res) {
    res.render("pages/warning");
}
