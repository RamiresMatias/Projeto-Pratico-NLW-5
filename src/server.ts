import {http} from "./http" 
import "./websocket/client"

http.listen(3333, ()=> console.log("\n ----- SERVIDOR RODANDO NA PORTA : 3333 ----- \n"))
