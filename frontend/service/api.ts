import { useGetChats, useCreateChat, useGetChat } from "./requests";

export const useChatApi = () => {
    const { isLoading: isGettingChats, getChats, chats } = useGetChats();
    const { isLoading: isCreatingChat, createChat, chatCreated } = useCreateChat();
    const { isLoading: isGettingChat, getChat, chat } = useGetChat();

    return {
        getChats: {
            isLoading: isGettingChats,
            query: getChats,
            data: chats,
        },
        getChat: {
            isLoading: isGettingChat,
            query: getChat,
            data: chat,
        },
        createChat: {
            isLoading: isCreatingChat,
            mutation: createChat,
            data: chatCreated,
        },
    };
}