import { Response, Router } from "express";

export const Routes = Router()

Routes.get("/", (req, res) => {
    return res.json({
        "message": "HOME MONTILA"
    })
})

Routes.post("/teste-ronaldo", (req, res) => {
    const Enviado = {
        "Enviado": "Ronaldo mandou",
        ...req.body
    }

    return res.json(Enviado)
})

Routes.post("/teste-parametro/:id", (req, res) => {
    const Enviado = {
        "Parametro enviado": req.params.id,
        "Corpo enviado": req.body
    }

    return res.json(Enviado)
})

export default Routes