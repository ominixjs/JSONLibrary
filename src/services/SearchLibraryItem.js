//========== Services
import LibraryData from "./LibraryData.js";
//============ Utils
import AppError from "../utils/AppError.js";

// Procurar por dados da URL
export default async function SearchLibraryItem(userId, slug, title) {
    // Reutiliza função de busca de biblioteca
    // Retorna dados da biblioteca selecionada
    const lib = await LibraryData(userId, slug);

    // Busca pelo item selecionado contendo o mesmo title
    const item = lib.data.find((item) => item.title === title);
    if (!item) {
        throw new AppError("Item não encontrado", 404);
    }

    // Modelo para frontend
    return {
        approved: true,
        id: lib.id,
        name: lib.name,
        slug: lib.slug,
        url: lib.url,
        category: lib.category,
        createdAt: lib.createdAt,
        updatedAt: lib.updatedAt,
        item,
    };
}
