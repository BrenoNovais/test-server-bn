import { Request, Response } from "express";

export class HorarioBackupController {

    static index1(req: Request, res: Response)  {
        return res.json(true)
    }

    static index2(req: Request, res: Response)  {
        return res.json(false)
    }

}

export default HorarioBackupController