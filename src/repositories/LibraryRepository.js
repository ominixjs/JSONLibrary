import { libraryModel, categoryModel } from "../models/index.js";

// Busca pela biblioteca
export function Search(props) {
    return libraryModel.findOne({ where: props });
}

// Apenas acessavel com autorização ==========================
export function Create(data) {
    const { id, name, slug, description, url, libSize, userId, categoryId } =
        data;
        
    libraryModel.create({
        id,
        name,
        slug,
        description,
        url,
        libSize,
        userId,
        categoryId,
    });
}

// Deletar biblioteca
export function Delete(id) {
    return libraryModel.destroy({ where: { id } });
}

// busca pela biblioteca apenas
export function Find(id) {
    return libraryModel.findByPk(id);
}

export function Pagination(offset, limit, userId) {
    return libraryModel.findAndCountAll({
        where: { userId },
        distinct: true,
        include: { model: categoryModel },
        limit: 8,
        offset: (1 - 1) * 8,
    });
}
