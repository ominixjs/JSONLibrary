//============= Configs
import logger from "../configs/logger.js";
//============= Services
import CreateData from "../services/CreateData.js";
import DeleteData from "../services/DeleteData.js";

// Criar uma categoria
export async function CreateCategory(req, res) {
    const name = req.body.categoryName;

    // Cria uma nova categoria
    await CreateData("category", { name });

    logger.info({
        id: req.user.id,
        name: req.user.name,
        res: "Categoria criada com sucesso",
    });
    res.redirect("/success");
}

// Deletar uma categoria
export async function DeleteCategory(req, res) {
    // Agurda resultado de deleção
    await DeleteData("category", req.params.id);

    logger.info({
        id: req.user.id,
        name: req.user.name,
        res: "Categoria deletada com sucesso",
    });
    res.redirect("/success");
}
