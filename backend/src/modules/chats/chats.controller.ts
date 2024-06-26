import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {ChatsService} from "./chats.service";
import {Chats} from "./entities/chats.entity";
import {CreateChatDto} from "./dto/create-chat.dto";

@ApiTags('Chats')
@Controller('chats')
export class ChatsController {
    constructor(private readonly chatsService: ChatsService) {}

    @ApiOkResponse({
        type: Chats,
        isArray: true
    })
    @Get()
    async findAll(): Promise<Chats[]> {
        return await this.chatsService.findAll()
    }

    @ApiOkResponse({
        type: Chats
    })
    @Get(':chat_id')
    async findOne(@Param('chat_id') chat_id: string): Promise<Chats> {
        return await this.chatsService.findOne(+chat_id)
    }

    @ApiOkResponse({
        type: Chats
    })
    @Post()
    async create(@Body() createChatDto: CreateChatDto): Promise<Chats> {
        return await this.chatsService.create(createChatDto);
    }

    @ApiOkResponse({
        type: Chats
    })
    @Put(':chat_id')
    async update(@Body() createChatDto: CreateChatDto, @Param('chat_id') chat_id: string): Promise<Chats> {
        return await this.chatsService.update(createChatDto, +chat_id)
    }

    @ApiOkResponse({
        type: Chats
    })
    @Delete(':chat_id')
    async delete(@Param('chat_id') chat_id: string): Promise<Chats> {
        return await this.chatsService.delete(+chat_id)
    }
}