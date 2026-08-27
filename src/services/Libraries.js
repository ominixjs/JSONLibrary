//============== Repositories
import * as userRepository from "../repositories/UserRepository.js";
//============== Utils
import TimeElapsedSince from "../utils/TimeElapsedSince.js";

export default async function Libraries(userId) {
    // Todas as bibliotecas
    const user = await userRepository.FindUserAndLibrary(userId);
    if (!user) return [];

    // Conta todos os itens de cada biblioteca
    const itemsCount = user.libraries
        .map((lib) => parseInt(lib.libSize))
        .reduce((acc, cur) => acc + cur, 0);

    // Formata a biblioteca para o frontend
    const libraries = user.libraries.map((lib) => {
        return {
            id: lib.id,
            name: lib.name,
            slug: lib.slug,
            description: lib.description || "",
            url: lib.url,
            libSize: lib.libSize,
            category: {
                id: lib.category.id,
                name: lib.category.name,
            },
            lastModifield: TimeElapsedSince(lib.updatedAt),
        };
    });

    return {
        allItems: itemsCount,
        libraries,
    };
}
