import Header from "@/components/navigation/Header";
import { Button, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useChatApi } from "@/service/api";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ChatItemEditDTO } from "@/types";
import ChatForm from "@/components/chat/ChatForm";

export default function ChatEdit() {
    const { id } = useLocalSearchParams();
    const insets = useSafeAreaInsets();

    const {
        getChat: {
            isLoading: isGettingChat,
            query: getChat,
            data: chat,
        },
        updateChat: {
            mutation: updateChat,
            isLoading: isUpdatingChat,
        },
    } = useChatApi();

    const [chatToUpload, setChatToUpload] = useState<ChatItemEditDTO>({
        name: "",
        message: "",
        image: "",
        has_read: false
    });

    useEffect(() => {
        getChat({ id: id + '' });
    }, []);

    useEffect(() => {
        if (chat) {
            setChatToUpload(chat);
        }
    }, [chat]);

    const updateChatInput = (attributes: Partial<ChatItemEditDTO>) => {
        setChatToUpload({
            ...chatToUpload,
            ...attributes
        });
    }

    const save = async () => {
        await updateChat({ id: id + '', chat: chatToUpload })
    }
    
    return (
        <View style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}>
            <Header title="Edit contact" canPop />
            <View>
                {isGettingChat ? (
                    <Text>Loading...</Text>
                ) : (
                    <ChatForm chat={chatToUpload} updateChatAttributes={updateChatInput}/>
                )}
            </View>
            <Button onPress={save} title="Save Changes"/>
        </View>
    )
}