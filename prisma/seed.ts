import bcrypt, { hash } from "bcrypt"
import prisma from "../src/Database/PrismaClient"

async function seed() {
    try {

        await prisma.tenant.create({
            data: {
                nome: "morinfo",
                cnpj: "58126228000102"
            }
        })

        const hash = await bcrypt.hash("senhateste", 5)

        await prisma.users.create({
            data: {
                id_tenant: 1,
                nome: "admin",
                email: "admin@admin",
                senha: String(hash)
            }
        })

    } catch (error) {
        console.log(error)
    }
}

seed()