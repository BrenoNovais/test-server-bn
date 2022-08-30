import { request, Request, Response } from "express";
import fs from 'fs'
import supabase from "../Supabase/CreateClient";
import prisma from "../Database/PrismaClient";
import { bancos, diretorios_xml, horarios } from "@prisma/client";
import { ExcludeManyCollums } from "../Exclude";


interface bancosType extends bancos {
    horarios: number[]
    diretorio_xml: string[]
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
                        diretorio_xml: {
                            select: {
                                diretorio_xml: true
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
                diretorio_xml: banco.diretorio_xml.map((diretorio: diretorios_xml) => diretorio.diretorio_xml)
            })
        })

        ExcludeManyCollums(bancos, ['id', 'id_tenant'])

        return res.json({
            ...busca_empresas,
            bancos
        })
    }
}

export default BackupController