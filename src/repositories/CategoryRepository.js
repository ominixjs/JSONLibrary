//============= Models
import { libraryModel, categoryModel } from "../models/index.js";

// Todas categorias
export function AllCategories() {
    return categoryModel.findAll({
        order: [["createdAt", "DESC"]],
        include: [{ model: libraryModel }],
    });
}

// Busca pela categoria
export function Search(prop) {
    return categoryModel.findOne({ where: prop });
}

// Cria uma categoria
export async function Create(data) {
    const { id, name, slug } = data;
    categoryModel.create({ id, name, slug });
}

// Deletar Categoria
export function Delete(id) {
    categoryModel.destroy({ where: { id } });
}
