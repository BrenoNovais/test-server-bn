import { Router } from "express"
import multer from "multer"
import BackupController from "../Controllers/Backup"
const multerconfig = require("../Config/Multer")

export const BackupRoute = Router()

BackupRoute.get('/horario-backup', BackupController.Hora1)

BackupRoute.get('/horario-backup-false', BackupController.Hora2)

BackupRoute.post('/recebe-backup', multer(multerconfig).single("anexo"), BackupController.RecebeBackup)

export default BackupRoute