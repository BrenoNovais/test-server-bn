import { Request, Response } from "express";
import multer from "multer";
import supabase from "../Supabase/CreateClient";
import { v4 as uuid } from "uuid"
import fs from "fs"
import prisma from "../Database/PrismaClient";

export class UsuariosController {

    static async store(req: Request, res: Response) {

        try {
            
            await prisma.usuarios.create({
                data: {
                    ...req.body
                }
            })
    
            return res.json({
                "message": "usuario registado"
            })

        } catch (error) {
            return res.status(400).json(error)
        }
    }

    static async store_avatar(req: Request, res: Response) {
        try {

            let caminho = req.file!.path

            let nome_arquivo = uuid() + req.file?.originalname.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z._])/g, '')

            let arquivo_upload = fs.readFileSync(String(req.file?.path))

            let url = `public/${nome_arquivo}`

            const { data, error } = await supabase
                .storage
                .from("avatar")
                .upload(url, arquivo_upload, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: req.file!.mimetype
                })
            const uploader = multer({ dest: "Uploads/" })

            /*  LINK PRONTO P/ USO
            const {signedURL} = await supabase
            .storage
            .from("avatar")
            .createSignedUrl(url, 600)
            await prisma.usuarios.update({
                where: {
                    id: Number(req.params.id),
                },
                data: {
                    avatar: url
                }
            }) */
            
            if (!caminho) {return}

            fs.unlink(caminho, ((err: any) => {
                if (err) console.log(err);
                else {
                  console.log('aquivo temporario excluido. . .');
                }
            }));

            return res.json({
                "message": "salvo"
            })
        } catch (error) {

        }
    }
}