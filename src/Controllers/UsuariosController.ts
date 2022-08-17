import { Request, Response } from "express";
import multer from "multer";
import supabase from "../Supabase/CreateClient";
import { v4 as uuid } from "uuid"
import fs from "fs"
import prisma from "../Database/PrismaClient";

export class UsuariosController {

    static async store(req: Request, res: Response) {

        try {

            await prisma.users.create({
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

            const { path, originalname, mimetype } = req.file!
            const { id_tenant } = req.body

            if (!path) {
                return res.status(400).json({
                    "error": "caminho do arquivo inválido"
                })
            }

            let arquivo_buffer = fs.readFileSync(String(path))

            let nome = uuid() + originalname.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z._])/g, '')

            let url = `empresa/${id_tenant}/avatars/${nome}`

            const { data, error } = await supabase
                .storage
                .from("teste-server")
                .upload(url, arquivo_buffer, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: mimetype
                })

            if (!data) {
                return res.status(500).json(error)
            }

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