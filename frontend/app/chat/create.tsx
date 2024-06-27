import { Button, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/navigation/Header";
import ChatForm from "@/components/chat/ChatForm";

import { ChatItemEditDTO } from "@/types";
import { useState } from "react";

import { useChatApi } from "@/service/api";
import { router } from "expo-router";

export default function ChatCreate() {
    const insets = useSafeAreaInsets();

    let [chat, setChat] = useState<ChatItemEditDTO>({
        name: "John Doe",
        message: "Hey, what's up? Just wanted to check in and see how you're doing. Let's catch up soon!",
        image: "https://cdn.stocksnap.io/img-thumbs/280h/dog-animal_DOTORLBDD7.jpg",
        has_read: false
    });

    const {
        createChat: {
            data: newChat,
            mutation: createChat,
            isLoading: isCreatingChat,
        },
    } = useChatApi();

    const updateChat = (attributes: Partial<ChatItemEditDTO>) => {
        setChat({
            ...chat,
            ...attributes
        });
    }

    const save = async () => {
        console.log('Saving: ', chat)
        await createChat({ chat })

        if (newChat) router.navigate(`/chat/${newChat.id}`)
    }

    return (
        <View style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: 'white',
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}>
            <Header title="New contact" canPop />
            <View>
                <ChatForm
                    chat={chat}
                    updateChatAttributes={updateChat}
                    saveButton={() => <Button onPress={save} title="Create Contact Now"/>}
                />
            </View>
        </View>
    )
}