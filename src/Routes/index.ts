import { Router } from "express";
import HorarioBackupRoute from "./HorarioBackup";
import RonaldoRoutes from "./Ronaldo";
import UsuariosRoute from "./UsuariosRoute";

export const Routes = Router()

Routes.use(UsuariosRoute)

Routes.use(RonaldoRoutes)

Routes.use(HorarioBackupRoute)