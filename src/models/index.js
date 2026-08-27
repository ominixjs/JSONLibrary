//============== Configs
import connection from "../configs/connection.js";
//============== Models
import userModel from "./UserModel.js";
import libraryModel from "./LibraryModel.js";
import categoryModel from "./CategoryModel.js";

// Associação entre usuário e biblioteca
userModel.hasMany(libraryModel);
libraryModel.belongsTo(userModel);

// Associação entre categoria e biblioteca
categoryModel.hasMany(libraryModel);
libraryModel.belongsTo(categoryModel);

// Recriar tabelas
// await connection.sync({ force: true });

export { userModel, libraryModel, categoryModel };
