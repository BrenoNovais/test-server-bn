import { Router } from "express";
import HorarioBackupRoute from "./HorarioBackup";
import RonaldoRoutes from "./Ronaldo";

export const Routes = Router()

Routes.use(RonaldoRoutes)

Routes.use(HorarioBackupRoute)

export default Routes