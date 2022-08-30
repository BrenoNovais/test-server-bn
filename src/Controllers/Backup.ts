import { request, Request, Response } from "express";
import fs from 'fs'
import supabase from "../Supabase/CreateClient";
import prisma from "../Database/PrismaClient";
import { bancos, diretorios_xmls, horarios } from "@prisma/client";
import { ExcludeManyCollums } from "../Exclude";


interface bancosType extends bancos {
    horarios: number[]
    diretorios_xmls: string[]
}

export class BackupController {

    static async Hora1(req: Request, res: Response) {

        const { body } = req

        const busca_empresas = await prisma.empresas.create({
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

        const busca_empresas = await prisma.empresas.findFirst({
            where: {
                id_empresas: Number(req.params.id)
            },
            include: {
                bancos: {
                    include: {
                        diretorios_xmls: {
                            select: {
                                diretorios_xmls: true
                            }
                        },
                        horarios: true,
                    }
                }
            }
        })

        let bancos: bancosType[] = []

        busca_empresas!.bancos.map((banco: any) => {
            bancos.push({
                ...banco,
                horarios: banco.horarios.map((horario: horarios) => horario.horario),
                diretorios_xmls: banco.diretorios_xmls.map((diretorio: diretorios_xmls) => diretorio.diretorios_xmls)
            })
        })

        ExcludeManyCollums([busca_empresas], ['id', 'id_tenant', 'created_at', 'updated_at'])
        ExcludeManyCollums(bancos, ['id', 'id_tenant', 'id_banco'])

        return res.json({
            ...busca_empresas,
            bancos
        })
    }
}

export default BackupController