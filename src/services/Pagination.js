//============= Repostories
import * as userRepository from "../repositories/UserRepository.js";
import * as libraryRepository from "../repositories/LibraryRepository.js";
//============== Utils
import InstanceModel from "../utils/InstanceModel.js";
import AppError from "../utils/AppError.js";

const repositories = {
    user: userRepository,
    library: libraryRepository,
};

const instanceModel = {
    user: InstanceModel.UserDataModel,
    library: InstanceModel.LibraryDataModel,
};

export default async function Pagination(type, page, userId) {
    // Valida entrada de dados
    if (isNaN(page)) {
        throw new AppError("Valor inválido para paginação", 404);
    }

    // Limite de itens por pagina
    const limit = 20;
    // Valor inicial de contagem inferior ao pageNext
    const offset = (page - 1) * limit;
    // Calculo valor acima do offset
    const nextPage = offset + limit;

    // Definindo o repositorio
    const repository = repositories[type];

    // Carrega dados para paginação
    let { rows, count } = await repository.Pagination(
        offset,
        nextPage,
        userId ? userId : null
    );

    // Definir qual modelo usar da instancia
    const instance = instanceModel[type];

    // Definindo proppriedades necessarias para o front e reduzir propriedades desnessarias
    rows = rows.map((item) => {
        return instance(item);
    });

    // Total de paginas
    const pageTotal = Math.ceil(count / limit);

    // Limitar paginação com valores negativos
    const hasPreviousPage = page > 1;
    // Limitar paginação ao ultrapassar
    const hasNextPage = page < pageTotal;

    return {
        approved: true,
        rows,
        page,
        pageTotal,
        hasPreviousPage,
        hasNextPage,
    };
}
