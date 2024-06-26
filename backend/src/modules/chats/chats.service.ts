import {HttpException, HttpStatus, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Chats} from "./entities/chats.entity";
import {Repository} from "typeorm";
import {CreateChatDto} from "./dto/create-chat.dto";

@Injectable()
export class ChatsService {
    constructor(
        @InjectRepository(Chats) private readonly chatsRepository: Repository<Chats>
    ) { }

    async create(createChatDto: CreateChatDto): Promise<Chats> {
        return await this.chatsRepository.save(createChatDto);
    }

    async update(createChatDto: CreateChatDto, chat_id: number): Promise<Chats> {
        const chat = await this.chatsRepository.findOne({
            where: { id: chat_id }
        })

        if (!chat) {
            throw new HttpException("Chat not found", HttpStatus.NOT_FOUND)
        }

        const chatUpdated = this.chatsRepository.merge(chat, createChatDto)
        return await this.chatsRepository.save(chatUpdated);
    }

    async delete(chat_id: number): Promise<Chats> {
        const chat = await this.chatsRepository.findOne({
            where: { id: chat_id }
        })

        if (!chat) {
            throw new HttpException("Chat not found", HttpStatus.NOT_FOUND)
        }

        return await this.chatsRepository.remove(chat)
    }

    async findAll(): Promise<Chats[]> {
        return await this.chatsRepository.find();
    }

    async findOne(chat_id: number): Promise<Chats> {
        const chat = await this.chatsRepository.findOne({
            where: { id: chat_id }
        })

        if (!chat) {
            throw new HttpException("Chat not found", HttpStatus.NOT_FOUND)
        }

        return chat
    }
}