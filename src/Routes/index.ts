import { Router } from "express";
import BackupRoute from "./Backup";
import RonaldoRoutes from "./Ronaldo";
import UsuariosRoute from "./UsuariosRoute";

export const Routes = Router()

Routes.use(UsuariosRoute)

Routes.use(RonaldoRoutes)

Routes.use(BackupRoute)

export default Routes