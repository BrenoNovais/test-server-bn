import { Request, Response } from "express"

export class RonaldoController {

    static index1(req: Request, res: Response)  {
        return res.json({
            "message": "HOME MONTILA"
        })
    }
    
    static index2(req: Request, res: Response) {
        const Enviado = {
            "Enviado": "Ronaldo mandou",
            ...req.body
        }
    
        return res.json(Enviado)
    }
    
    static store(req: Request, res: Response) {
        const Enviado = {
            "Parametro enviado": req.params.id,
            "Corpo enviado": req.body
        }
    
        return res.json(Enviado)
    }
}

export default RonaldoController