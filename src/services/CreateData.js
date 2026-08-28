import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import slugify from "slugify";

//============ Repositories
import * as userRepository from "../repositories/UserRepository.js";
import * as libraryRepository from "../repositories/LibraryRepository.js";
import * as categoryRepository from "../repositories/CategoryRepository.js";
//============ Utils
import ValidateFields from "../utils/ValidateFields.js";
import AppError from "../utils/AppError.js";
// Repositorios
const repositories = {
    user: userRepository,
    library: libraryRepository,
    category: categoryRepository,
};

// Função universal para criar dados no DB
export default async function CreateData(type, data) {
    // Apartir dos dados recebidos, sera definido os metodos de validação

    // Validar todas as propriedades
    ValidateFields(data);

    // Definir qual reposirotio usar
    const repository = repositories[type];

    // Verifica qual tipo de dados irá criar:

    if (type === "library") {
        // Confere se esta cadastrada e valida os dados internos
        const library = await CheckAndValidateLibrary(
            repository,
            data.url,
            data.userId
        );

        // Define um nome e um slug
        data = {
            name: library.name,
            description: library.description,
            slug: slugify(library.name),
            libSize: library.size,
            ...data,
        };
    }

    if (type === "user") {
        // Confere se esta cadastrado
        await CheckUserRegister(repository, data.email);

        // Gera um hash da senha
        const hash = await bcrypt.hash(data.password, 12);

        // Definir papel de ADMINISTRADOR se passar na validação
        const role = process.env.ADMIN_EMAIL === data.email ? "Admin" : "User";

        // Criar os dados de autorização de termos
        let termsAccepted = {
            termsOfUseAndPrivacy: data.termsOfUseAndPrivacy,
            dateTermsAccepted: new Date().toISOString(),
            politicalVersion: "1.0",
        };

        // Atribui o novo valor
        data = { hash, role, termsAccepted, ...data };
    }

    if (type === "category") {
        // Confere se já foi cadastrada
        await CheckCategory(repository, data.name);

        // Copia o objeto data e atribui novas proppriedades
        data = {
            name: data.name,
            slug: slugify(data.name),
            ...data,
        };
    }

    // Criar um id
    const id = nanoid(10);

    // Cria o dado no DB
    await repository.Create({ id, ...data });
}

// Verificar se categoria esta cadastrada
async function CheckCategory(repository, name) {
    // Checkagem no DB para possivel clonagem de biblioteca
    const validCategory = await repository.Search({ name });
    if (validCategory) {
        throw new AppError("Categoria já esta cadastrada", 409);
    }
}

// Valida se biblioteca esta cadastrada
async function CheckAndValidateLibrary(repository, url, userId) {
    // Checkagem no DB para possivel clonagem de biblioteca
    const validLibrary = await repository.Search({ url, userId });
    if (validLibrary) {
        throw new AppError("Biblioteca já esta cadastrada", 409);
    }

    // Solicaita dados da biblioteca
    const response = await fetch(url);
    if (!response.ok) {
        throw new AppError("Falha ao solicitar dados da biblioteca", 400);
    }

    // Cria modelo para validar alguns campos como Nome interno do JSON
    const libraryData = await response.json();
    if (typeof libraryData === Object && Array.isArray(libraryData)) {
        throw new AppError("Estrutura de biblioteca inválida", 400);
    }

    // Valida o nome da biblioteca que esta no JSON
    const validationResult = ValidateFields([{ name: libraryData.name }]);
    if (!validationResult.success) {
        throw new AppError(validationResult.error.issues[0].message, 422);
    }

    return {
        name: libraryData.name,
        description: libraryData.description,
        size: libraryData.library.length,
    };
}

// Validar se usuário esta cadastrado
async function CheckUserRegister(repository, email) {
    const validUser = await repository.Search({ email });
    if (validUser) {
        throw new AppError("Usuário já está cadastrado", 409);
    }
}
