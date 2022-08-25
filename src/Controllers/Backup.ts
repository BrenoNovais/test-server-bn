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

    static async RecebeBackup(req: Request, res: Response) {

        try {

            
            const { path, originalname, mimetype } = req.file!
            const { id_tenant } = req.body

            console.log(mimetype)

            if (!path) {
                return res.status(400).json({
                    "error": "caminho do arquivo inválido"
                })
            }

            let arquivo_buffer = fs.readFileSync(String(req.file?.path))

            // função que remove ascentos e caracteres especiais 
            let nome = originalname.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z._])/g, '')

            let url = `empresa/${id_tenant}/backup/${nome}`

            const { error, data } = await supabase
                .storage
                .from('teste-server')
                .upload(url, arquivo_buffer, {
                    contentType: mimetype
                })

            if (!data) {
                return res.status(500).json(error)
            }

            await prisma.backups.create({
                data: {
                    id_tenant: Number(id_tenant),
                    url: data.Key
                }
            })

            fs.unlink(path, ((err: any) => {
                if (err) console.log(err);
                else {
                    console.log('aquivo temporario excluido. . .');
                }
            }));

            return res.json({
                "message": "salvo"
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export default BackupController