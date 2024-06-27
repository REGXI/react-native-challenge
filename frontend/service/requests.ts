import { useFetch } from "@/hooks/useFetch";
import { ChatItem } from "@/types";

import { GetChatInput, CreateChatInput, GenericResponse } from "./types";

export const useGetChats = () => {
    const { commonFetch, isLoading, data: response } = useFetch<GenericResponse<ChatItem[]>>({
        endpoint: "/chats",
        method: "GET",
    });

    const getChats = () => commonFetch({ fetchOptions: { method: "GET"} });

    return { isLoading, getChats, chats: response?.data };
}

export const useCreateChat = () => {
    const { commonFetch, isLoading, data: response } = useFetch<GenericResponse<ChatItem>>({
        endpoint: "/chats",
        method: "POST",
    });

    const createChat = (input: CreateChatInput) => commonFetch({ input: input.chat, fetchOptions: { method: "POST" } });

    return { isLoading, createChat, chatCreated: response?.data };
}

// That doesn't work because the endpoint would not be dynamic.
// We would need to pass the id as a parameter to the getChat function.
// We could do that, but it needs to handle dynamic endpoints instead.

export const useGetChat = () => {
    const { commonFetch, isLoading, data: response } = useFetch<GenericResponse<ChatItem>>({
        endpoint: "/chats",
        method: "GET",
    });

    const getChat = (input: GetChatInput) => commonFetch({
        dynamicEndpoint: `/${input.id}`,
        fetchOptions: { method: "GET" }
    });

    return { isLoading, getChat, chat: response?.data };
}

export const useUpdateChat = () => {
    const { commonFetch, isLoading, data: response } = useFetch<GenericResponse<ChatItem>>({
        endpoint: "/chats",
        method: "PUT",
    });

    const updateChat = (input: CreateChatInput & GetChatInput) => commonFetch({
        dynamicEndpoint: `/${input.id}`,
        input: input.chat,
        fetchOptions: { method: "PUT" }
    });
    
    return { isLoading, updateChat, chatUpdated: response?.data };
}