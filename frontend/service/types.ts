import { ChatItem, ChatItemEditDTO } from "@/types";

export interface GenericResponse<T> {
    status: boolean;
    statusCode: number;
    data: T;
}

export interface GetChatInput {
    id: string;
}

export interface CreateChatInput {
    chat: ChatItemEditDTO;
}