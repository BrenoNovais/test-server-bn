import { Response, Router } from "express";

export const Routes = Router()

Routes.get("/home", (req, res) => {
    const Enviado = {
        "Enviado": "Ronaldo mandou",
        ...req.body
    }

    return res.json(Enviado)
})

export default Routes