import { Request, Response } from "express";

export class HorarioBackupController {

    static index1(req: Request, res: Response)  {
        return res.json({
            "hora1": "05:00",
            "hora2": "11:00",
            "hora3": "17:00",
            "hora4": "23:00"
        })
    }
}

export default HorarioBackupController