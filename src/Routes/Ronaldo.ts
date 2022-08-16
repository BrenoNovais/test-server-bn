import { Router } from "express"
import RonaldoController from "../Controllers/Ronaldo"

export const RonaldoRoutes = Router()

RonaldoRoutes.get('/', RonaldoController.index1)

RonaldoRoutes.post("/teste-ronaldo", RonaldoController.index2)

RonaldoRoutes.post("/teste-parametro/:id", RonaldoController.store)

export default RonaldoRoutes