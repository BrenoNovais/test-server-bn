import 'dotenv/config'
import express from "express";
import Routes from './Routes/index';

const app = express()



app.use(express.json())

app.use(Routes)

app.listen(process.env.PORT!, () => console.log(`Servidor aberto na porta ${process.env.PORT}`)
)