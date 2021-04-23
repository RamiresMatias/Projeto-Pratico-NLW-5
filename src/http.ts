import express from "express"
import "./database" 
import { createServer } from "http"
import { Server, Socket } from "socket.io"
import path from "path"

const app = express()

app.use(express.static(path.join(__dirname,"..","public")))
app.set("views", path.join(__dirname,"..","public"))
app.engine("html", require("ejs").renderFile)
app.set("view engine", "html")

app.get("/pages/client", (req,res) =>{
    return res.render("html/client.html")
})

app.get("/pages/admin", (req,res) =>{
    return res.render("html/admin.html")
})

const http = createServer(app) // Criando o protocolo http
const io = new Server(http) // Criando protocolo Web Socket(WS)

io.on("connection", (socket: Socket)=>{
    //console.log("Se conectou", socket.id)
})

import { routes } from "./routes/routes"

app.use(express.json())

app.use(routes)

export {http,io}