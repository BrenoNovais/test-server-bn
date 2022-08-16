import { Router } from "express"
import RonaldoController from "../Controllers/Ronaldo"

export const RonaldoRoute = Router()

RonaldoRoute.get('/', RonaldoController.index1)

RonaldoRoute.post("/teste-ronaldo", RonaldoController.index2)

RonaldoRoute.post("/teste-parametro/:id", RonaldoController.store)

export default RonaldoRoute