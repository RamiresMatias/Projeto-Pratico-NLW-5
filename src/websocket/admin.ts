import { io } from "../http"
import {ConnectionService} from "../services/ConenctionService"
import {MessagesService} from "../services/MessagesService"

io.on("connect", async(socket) =>{

    const messageService = new MessagesService()
    const connectionService = new ConnectionService()

    const allConnectionsWithoutAdmin = await connectionService.findAllWithoutAdmin() 
    
    io.emit("admin_list_all_users", allConnectionsWithoutAdmin)

    socket.on("admin_list_messages_by_user", async(params, callback) =>{
        const {user_id} = params

        const allMessages = await messageService.listByUser(user_id)

        // Retornar mensagens dentro da callback
        callback(allMessages)
    })
})