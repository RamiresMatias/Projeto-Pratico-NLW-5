import {Entity, PrimaryColumn, CreateDateColumn, Column, ManyToOne, JoinColumn} from "typeorm"
import { v4 as uuid} from "uuid"
import { User } from "./User";

@Entity("messages")
class Message{

    @PrimaryColumn()
    id: string;

    @Column()
    admin_id: string;

    @Column()
    text:string;

    @JoinColumn({name:"user_id"}) // Irá fazer um join com a coluna user_id
    @ManyToOne(()=> User) // Referenciando muitas mensagens para um usuário. E que é do tipo user
    user: User;// Referenciando o objeto User na nossa classe

    @Column()
    user_id:string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }

}

export {Message}