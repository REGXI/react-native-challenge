import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/navigation/Header";
import ChatForm from "@/components/chat/ChatForm";

import { ChatItemEditDTO } from "@/types";
import { useState } from "react";

export default function ChatCreate() {
    const insets = useSafeAreaInsets();

    let [chat, setChat] = useState<ChatItemEditDTO>({
        name: "",
        message: "",
        image: "",
        has_read: false
    });

    const updateChat = (attributes: Partial<ChatItemEditDTO>) => {
        setChat({
            ...chat,
            ...attributes
        });
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
            <Header title="New contact" canPop />
            <View>
                <ChatForm chat={chat} updateChatAttributes={updateChat}/>
            </View>
        </View>
    )
}