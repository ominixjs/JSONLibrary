import TimeElapsedSince from "../utils/TimeElapsedSince.js";

// Classe usada para criar um modelo universal e reduzir instancia
export default class InstanceModel {
    // Modela objeto para dados de usuario
    static UserDataModel(user) {
        return {
            id: user.id,
            name: user.name,
            role: user.role,
            email: user.email,
        };
    }

    // Modela o objeto e retorna
    static LibraryDataModel(lib) {
        return {
            id: lib.id,
            name: lib.name,
            slug: lib.slug,
            description: lib.description,
            libSize: lib.libSize,
            category: { id: lib.category.id, name: lib.category.name },
            createdAt: lib.createdAt,
            lastModifield: TimeElapsedSince(lib.updatedAt),
        };
    }
}
