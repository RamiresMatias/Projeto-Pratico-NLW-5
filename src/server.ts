import express from "express"
import "./database" 
const app = express()

import { routes } from "./routes/routes"

app.use(express.json())

app.use(routes)

app.listen(3333, ()=> console.log("\n ----- SERVIDOR RODANDO ----- \n"))
