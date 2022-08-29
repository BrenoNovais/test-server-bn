import { Router } from "express"
import multer from "multer"
import BackupController from "../Controllers/Backup"
const multerconfig = require("../Config/Multer")

export const BackupRoute = Router()

BackupRoute.get('/horario-backup', BackupController.Hora1)

BackupRoute.get('/horario-backup-false', BackupController.Hora2)

export default BackupRoute