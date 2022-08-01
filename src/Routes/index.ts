import { Response, Router } from "express";

export const Routes = Router()

Routes.get("/", (req, res) => {
    return res.json({
        "message": "HOME MONTILA"
    })
})

Routes.get("/home", (req, res) => {
    const Enviado = {
        "Enviado": "Ronaldo mandou",
        ...req.body
    }



    return res.json(Enviado)
})

export default Routes