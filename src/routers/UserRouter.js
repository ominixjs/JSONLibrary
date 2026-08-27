import express from "express";

//============ Controllers
import * as userController from "../controllers/UserController.js";
//============ Middlewares
import redirectIfAuthenticated from "../middlewares/RedirectIfAuthenticated.js";
import requireAuth from "../middlewares/RequireAuth.js";
import loginLimiter from "../middlewares/LoginLimiter.js";
import registerLimiter from "../middlewares/RegisterLimiter.js";

//====
const router = express.Router();

// Acessar conta
router.get(
    "/login",
    redirectIfAuthenticated,
    loginLimiter,
    userController.Login
);

// Autenticar dados do login
router.post(
    "/login/auth/",
    redirectIfAuthenticated,
    loginLimiter,
    userController.LoginAuth
);

// Criar uma conta
router.get(
    "/register",
    redirectIfAuthenticated,
    registerLimiter,
    userController.Create
);

// Autenticar dados do login
router.post(
    "/register/auth",
    redirectIfAuthenticated,
    loginLimiter,
    userController.CreateAuth
);

// Editar dados do usuario
router.post("/auth/user-edit", userController.Edit);

// Delete dados do usuario
router.get("/auth/user-delete/:id", userController.Delete);

// Deslogar da conta
router.get("/logout", requireAuth, userController.Logout);

export default router;
