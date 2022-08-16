import { Request, Response } from "express";

export class HorarioBackupController {

    static index1(req: Request, res: Response)  {
        return res.json(true)
    }
}

export default HorarioBackupController