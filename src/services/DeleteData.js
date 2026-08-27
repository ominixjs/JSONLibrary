//============= Repostories
import * as userRepository from "../repositories/UserRepository.js";
import * as categoryRepository from "../repositories/CategoryRepository.js";
import * as libraryRepository from "../repositories/LibraryRepository.js";
//============= Utils
import AppError from "../utils/AppError.js";

const repositories = {
    user: userRepository,
    category: categoryRepository,
    library: libraryRepository,
};

export default async function DeleteData(type, id, role) {
    // Definindo repositorio
    const repository = repositories[type];

    // Ifs vai selecionar qual entidade usar para processeguir
    if (type === "user") {
        // Permissão para deletar outro usuário
        if (role !== "Admin") {
            throw new AppError("Você não possui permissão", 403);
        }

        // Finaliza ação
        await repository.Delete(id);
    }

    if (type === "category") {
        //
        // Finaliza ação
        await repository.Delete(id);
    }

    if (type === "library") {
        //
        // Finaliza ação
        await repository.Delete(id);
    }
}
