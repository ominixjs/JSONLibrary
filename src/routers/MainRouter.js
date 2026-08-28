import express from "express";

//=============== Controllers
import * as mainController from "../controllers/MainController.js";
import * as categoryController from "../controllers/CategoryController.js";
import * as libraryController from "../controllers/LibraryController.js";
//=============== Middlewares
import RequireAdmin from "../middlewares/RequireAdmin.js";

//=============================
const router = express.Router();

// Pagina inicial
router.get("/landingpage", mainController.LandingPage);

// Pagina inicial
router.get("/auth/dashboard", mainController.Dashboard);

// Configurações da aplicação
router.get("/auth/settings", mainController.Settings);

// Visualizar todas as bibliotecas
router.get("/auth/libraries/:page", mainController.ViewLibraries);

// Tabela de permissões de usuarios
router.get("/auth/permissions/:page", RequireAdmin, mainController.Permissions);

// Adicionar bibliotecas
router.post("/auth/create-library", libraryController.CreateLibrary);

// Deletar biblioteca selecionada
router.get("/auth/delete-library/:id", libraryController.DeleteLibrary);

// Editar biblioteca selecionada
router.post("/auth/edit-library/", libraryController.EditLibrary);

// Visualizar bibilioteca e seus dados
router.get("/auth/library/:slug", libraryController.ViewLibrary);

// Visualizar dados do item da biblioteca
router.get("/auth/library/:type/:slug/:title", libraryController.ViewItem);

// Criar categoria
router.post("/auth/create-category/", categoryController.CreateCategory);

// Deletar categoria
router.get("/auth/delete-category/:id", categoryController.DeleteCategory);

// Rota de termos
router.get("/terms", mainController.Terms);

// Rota de ajuda
router.get("/help", mainController.Help);

// Rota de sobre a empresa
router.get("/about", mainController.About);

// Rota para erros
router.get("/error", mainController.Error);

// Rota para erros
router.get("/success", mainController.Success);

// Rota para alertas
router.get("/warning", mainController.Warning);

export default router;
