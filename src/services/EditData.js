//============ Repositories
import * as userRepository from "../repositories/UserRepository.js";
import * as libraryRepository from "../repositories/LibraryRepository.js";
//============ Utils
import ValidateFields from "../utils/ValidateFields.js";

// Repositorios
const creators = {
    user: userRepository,
    library: libraryRepository,
};

// Função geral de edição de dados. ID da entidade e DATA com os valores para alteração
export default async function EditData(type, id, data) {
    // Definindo o repositório
    const creator = creators[type];

    // Antes de fazer as alterações avalia cada propriedade do objeto
    ValidateFields(data);

    // Instacia do modelo
    const instance = await creator.Find(id);

    // Mescla dos novos dados na instacia
    instance.update(data);

    // Finaliza função
    return `Alteração feita com sucesso! Campos alterados: ${instance.changed()}`;
}
