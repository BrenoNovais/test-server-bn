import "dotenv/config"
import express, { Request, Response } from "express"
import { Routes } from "./Routes"

const app = express()

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    return res.json({
        "message": "hello World!"
    })
})

app.use(Routes)

app.listen(process.env.PORT, () => console.log(`PORTA: ${process.env.PORT}`))

