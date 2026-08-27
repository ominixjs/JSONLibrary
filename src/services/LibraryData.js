//============== Repositories
import * as userRepository from "../repositories/UserRepository.js";
//============== Utils
import TimeElapsedSince from "../utils/TimeElapsedSince.js";
import AppError from "../utils/AppError.js";

export default async function ViewLibraryData(userId, slug) {
    // Busca pela biblioteca do usuário logado
    const user = await userRepository.FindUserAndLibrary(userId, { slug });
    if (!user) {
        throw new AppError("Falha ao buscar usuário", 404);
    }

    // Criando uma refência direta a biblioteca e aos dados dela
    const library = user.libraries[0];

    // Solicita dados da URL da biblioteca
    const response = await fetch(library.url);
    if (!response.ok) {
        throw new AppError("Falha ao solicitar dados da biblioteca", 400);
    }

    // Formatar JSON
    const data = await response.json();
    if (typeof data !== "object" && data === null) {
        throw new AppError("Estrutura de biblioteca inválida", 400);
    }

    // Propriedades para o frontend
    return {
        id: library.id,
        name: library.name,
        slug: library.slug,
        url: library.url,
        category: library.category.name,
        categoryId: library.category.id,
        posted: TimeElapsedSince(library.createdAt),
        lastModifield: TimeElapsedSince(library.updatedAt),
        data: data.library || [],
    };
}
