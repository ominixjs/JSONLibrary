import { categoryModel, libraryModel, userModel } from "../models/index.js";

// Criar conta usuários
export function Create(data) {
    const { id, name, email, role, hash, termsAccepted } = data;
    userModel.create({
        id,
        name,
        email,
        role,
        password: hash,
        termsAccepted,
    });
}

// Procurar pelo usuario e sua lista de biblioteca
export function Search(prop) {
    // Parametro da função é usada com o tipo e valor direto na consulta
    // Metodo geral de busca
    return userModel.findOne({
        where: prop,
        include: [{ model: libraryModel, include: [categoryModel] }],
    });
}

// Retornar apenas os dados do usuário
export function Find(id) {
    return userModel.findByPk(id);
}

// Busca pelo usuário e uma biblioteca expecifica
export function FindUserAndLibrary(userId, type) {
    const id = userId;
    return userModel.findByPk(id, {
        include: {
            model: libraryModel,
            where: type,
            include: [categoryModel],
        },
    });
}

// Lista com todos os usuarios
export function Pagination(offset, limit) {
    return userModel.findAndCountAll({
        include: [{ model: libraryModel, required: false }],
        distinct: true,
        offset,
        limit,
    });
}

// Deletar biblioteca
export function Delete(id) {
    userModel.destroy({ where: { id } });
}
