import { Router } from "express"
import HorarioBackupController from "../Controllers/HorarioBackup"

export const HorarioBackupRoute = Router()

HorarioBackupRoute.get('/horario-backup', HorarioBackupController.index1)

HorarioBackupRoute.get('/horario-backup-false', HorarioBackupController.index2)

export default HorarioBackupRoute