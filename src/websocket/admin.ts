import { io } from "../http"
import {ConnectionService} from "../services/ConenctionService"
import {MessagesService} from "../services/MessagesService"

io.on("connect", async(socket) =>{

    const messageService = new MessagesService()
    const connectionService = new ConnectionService()

    const allConnectionsWithoutAdmin = await connectionService.findAllWithoutAdmin() 
    
    io.emit("admin_list_all_users", allConnectionsWithoutAdmin)

    // Evento de listar as mensagens de cada usuário
    socket.on("admin_list_messages_by_user", async(params, callback) =>{
        const {user_id} = params

        const allMessages = await messageService.listByUser(user_id)

        // Retornar mensagens dentro da callback
        callback(allMessages)
    })

    // Evento de envio de mensagem do admin
    socket.on("admin_send_message", async params=>{
        const {user_id, text} = params

        await messageService.create({
            text,
            user_id,
            admin_id: socket.id,
        })

        const {socket_id} = await connectionService.findByUserId(user_id)

        io.to(socket_id).emit("admin_send_to_client", {
            text,
            socket_id: socket.id,
        })
    })

    socket.on("admin_user_in_support", async params=>{
        const { user_id } = params

        await connectionService.updateAdminID(user_id,socket.id)

        const allConnectionsWithoutAdmin = await connectionService.findAllWithoutAdmin() 
    
        io.emit("admin_list_all_users", allConnectionsWithoutAdmin)
    })
})