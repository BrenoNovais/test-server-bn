import { Request, Response } from "express";
import { v4 as uuid } from "uuid"
import prisma from "../Database/PrismaClient";
import { ExcludeCollums, ExcludeManyCollums } from "../Exclude";

export class LinkControllers {

    static async store(req: Request, res: Response) {
        try {

            const { email, nome, link } = req.body

            if (!link) {
                return res.status(400).json({
                    "error": "Nenhum link enviado"
                })
            }

            const link_encurtado = await prisma.links.create({
                data: {
                    nome: nome ? nome : "",
                    email: email ? email : 'public',
                    link_original: link,
                    link_encurtado: uuid().split('-')[0]
                }
            })

            ExcludeCollums(link_encurtado, ["email"])

            return res.json({
                ...link_encurtado
            })

        } catch (error) {
            console.log(error)
        }
    }

    static async show(req: Request, res: Response) {

        const { email } = req.params
        console.log(email)

        if (!email) {
            return res.status(400).json({
                "error": "informe um email"
            })
        }

        const busca_links = await prisma.links.findMany({
            where: {
                email: email 
            }
        })

        await ExcludeManyCollums(busca_links, ["email"])

        return res.json(busca_links)
    }

}