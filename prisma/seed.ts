import bcrypt, { hash } from "bcrypt"
import prisma from "../src/Database/Prisma"

async function seed() {
    try {
        bcrypt.hash("@senhateste", 5, async (err, hash) => {

            await prisma.users.create({
                data: {
                    nome: "admin",
                    email: "admin@admin",
                    senha: hash
                }
            })
        })
    } catch (error) {
        console.log(error)
    }
}

seed()