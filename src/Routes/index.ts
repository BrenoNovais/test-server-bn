import { request, Router } from "express";
import multer from "multer";
import { UploadControllers } from "../Controllers/Arquivos";
import { LinkControllers } from "../Controllers/Links";
const multerconfig = require("../Config/Multer")

export const Routes = Router()

Routes.post("/upload", multer(multerconfig).single("file"), UploadControllers.store)

Routes.get("/arquivos/:email", UploadControllers.show)

Routes.post("/encurtalink", LinkControllers.store)

Routes.get("/linksencurtados/:email", LinkControllers.show)
export default Routes