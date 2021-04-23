import {io} from "../http"
import { ConnectionService } from "../services/ConenctionService"
import {UserService} from "../services/UserService"
import {MessagesService} from "../services/MessagesService"

interface IParams{
    text:string;
    email:string;
}

io.on("connect", (socket)=>{

    const connectionService = new ConnectionService()
    const userService = new UserService()
    const messageService = new MessagesService()

    socket.on("client_firt_access", async (params) =>{
        
        const socket_id = socket.id
        const {text,email} = params as IParams

        let user = await userService.findByEmail(email)

        if(!user){
            user = await userService.create(email)
        }

        const connection = await connectionService.findByUserId(user.id)

        if(!connection){
            await connectionService.create({
                socket_id,
                user_id: user.id,
            })
        }else{ // Caso tenha conexão, sobrescreve a que já está criada com o novo id
            connection.socket_id = socket_id
            await connectionService.create(connection)
        }

         //Salvar a conexão com o socket_id, user_id
        await messageService.create({
            text,
            user_id: user.id,
        })
        
        const allMessages = await messageService.listByUser(user.id)

        socket.emit("client_list_all_messages", allMessages)
    })
})