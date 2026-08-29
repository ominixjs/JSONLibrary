//============= Configs
import logger from "../configs/logger.js";

//============= Services
import Categories from "../services/Categories.js";
import SearchLibraryItem from "../services/SearchLibraryItem.js";
import DeleteData from "../services/DeleteData.js";
import LibraryData from "../services/LibraryData.js";
import CreateData from "../services/CreateData.js";
import EditData from "../services/EditData.js";

// Visualizar dados da biblioteca selecionada
export async function ViewLibrary(req, res) {
    logger.info({
        user: req.user.id,
        name: req.user.name,
        res: `Usuário esta na rota ${req.url}`,
    });

    const slug = req.params.slug;
    // Buscar biblioteca selecionada
    const library = await LibraryData(req.user.id, slug);
    // Categorias para dropdown
    const categories = await Categories();

    res.render("pages/library/library", {
        name: req.user.name,
        role: req.user.role,
        library,
        categories,
    });
}

// Autenticação de dados para criar uma biblioteca
export async function CreateLibrary(req, res) {
    logger.info({
        user: req.user.id,
        name: req.user.name,
        res: `Usuário esta na rota ${req.url}`,
    });

    const userId = req.user.id;
    // Referencias dos valores dos inputs
    const { url, categoryId, optionalName } = req.body;
    // Objeto com as propriedades necessarias para criação
    let data = { url, categoryId, userId };
    // Valida valor opcional e atribui se não estiver ausente
    if (optionalName) data = { optionalName, ...data };

    // Função geral de criar dados no DB
    await CreateData("library", data);

    logger.info({
        user: req.user.id,
        name: req.user.name,
        res: result,
    });
    res.redirect("/success");
}

// Deletar uma biblioteca
export async function DeleteLibrary(req, res) {
    // Aguarda o resultado da deleção da biblioteca
    const result = await DeleteData("library", req.params.id);

    logger.info({
        user: req.user.id,
        name: req.user.name,
        res: result,
    });
    res.redirect("/success");
}

export async function EditLibrary(req, res) {
    const { id, name, url, type } = req.body;
    const data = { name, url, categoryId: type };

    // Função de alterar dados
    const result = await EditData("library", id, data);

    logger.info({
        user: req.user.id,
        name: req.user.name,
        res: result,
    });
    res.redirect("/success");
}

// Visualizar dados do item da biblioteca
export async function ViewItem(req, res) {
    logger.info({
        user: req.user.id,
        name: req.user.name,
        res: `Usuário esta na rota ${req.url}`,
    });

    const { type, slug, title } = req.params;
    const userId = req.user.id;

    // Iniciar busca pelo item da biblioteca
    const library = await SearchLibraryItem(userId, slug, title);

    // Através do params da URL é identificado o tipo de biblioteca e exibe a pagina correta
    return res.render(`pages/library/${type}`, {
        name: req.user.name,
        role: req.user.role,
        library,
    });
}
