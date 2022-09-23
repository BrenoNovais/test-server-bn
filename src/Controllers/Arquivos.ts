import { Request, Response } from "express";
import supabase from "../Supabase/CreateClient";
import { v4 as uuid } from "uuid"
import fs from "fs"
import prisma from "../Database/PrismaClient";
import { ExcludeManyCollums } from "../Exclude";

export class UploadControllers {

    static async store(req: Request, res: Response) {
        try {

            const { path, originalname, mimetype } = req.file!

            if (!path) {
                return res.status(400).json({
                    "error": "caminho do arquivo inválido"
                })
            }

            let arquivo_buffer = fs.readFileSync(String(path))

            let nome = uuid() + originalname.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z._])/g, '')

            let url = `arquivos/${req.body.email ? req.body.email : 'public'}/${nome}`

            const { data, error } = await supabase
                .storage
                .from("archive-uploads")
                .upload(url, arquivo_buffer, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: mimetype
                })

            if (!data) {
                return res.status(500).json(error)
            }

            const { signedURL } = await supabase
                .storage
                .from("archive-uploads")
                .createSignedUrl(url, 2592000)


            if (!signedURL) {
                return res.status(500).json(error)
            }

            await prisma.arquivos.create({
                data: {
                    nome: originalname,
                    caminho: url,
                    link_download: signedURL,
                    email: req.body.email ? req.body.email : 'public'
                }
            })

            fs.unlink(path, ((err: any) => {
                if (err) console.log(err);
                else {
                    console.log('aquivo temporario excluido. . .');
                }
            }));

            return res.json({
                "message": signedURL
            })

        } catch (error) {
            console.log(error)
        }
    }

    static async show(req: Request, res: Response) {

        try {
            
            const {email} = req.params

        if (!email || email === 'public') {
            return res.status(400).json({
                "message": "nenhum arquivo encontrado"
            })
        }

        const busca_arquivos = await prisma.arquivos.findMany({
            where: {
                email: email
            }
        })

        ExcludeManyCollums(busca_arquivos, ['caminho', 'email'])
        
        return res.status(200).json(busca_arquivos)

        } catch (error) {
            return res.status(500).json(error)
        }
    }
}