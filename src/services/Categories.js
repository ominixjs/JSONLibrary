//=========== Repositories
import * as categoryRepository from "../repositories/CategoryRepository.js";

// Busca todas as categorias e cria um modelo ID e NOME
export default async function Categories() {
    // Pega todas as categorias
    const categories = await categoryRepository.AllCategories();
    if (!categories) return [];

    //
    return categories;
}
