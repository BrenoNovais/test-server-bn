import { request, Request, Response } from "express";
import fs from 'fs'
import supabase from "../Supabase/CreateClient";
import prisma from "../Database/PrismaClient";

export class BackupController {

    static async Hora1(req: Request, res: Response) {

        const {body} = req

        const busca_bkps = await prisma.bkps.create({
            data: {
                ...body
            }
        })
        return res.json({
            backup: true
        })
    }

    static Hora2(req: Request, res: Response) {
        return res.json({
            backup: false
        })
    }

    static async empresas(req: Request, res: Response) {

        const {body} = req

        const busca_bkps = await prisma.bkps.create({
            data: {
                ...body
            }
        })
        return res.json({
            backup: true
        })
        
    }
}

export default BackupController