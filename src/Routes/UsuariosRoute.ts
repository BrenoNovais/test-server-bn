import { Router } from "express";
import multer from "multer";
import { UsuariosController } from "../Controllers/UsuariosController";
const multerconfig = require("../Config/Multer")

export const UsuariosRoute = Router()

UsuariosRoute.post("/usuarios", UsuariosController.store)

UsuariosRoute.post("/perfil/:id", multer(multerconfig).single("file"), UsuariosController.store_avatar)

export default UsuariosRoute