import { ChatItem } from "@/types";
import { Text, View, Image } from "react-native";

export interface ChatDetailProps {
    chat: ChatItem;
}

export default function ChatDetail({ chat }: ChatDetailProps) {
    return (
        <View>
            <Image
                source={{ uri: chat.image }}
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 1000,
                    margin: 16,
                }}
            ></Image>
            <Text style={{ fontSize: 24, margin: 16 }}>{chat.name}</Text>
            <Text style={{ margin: 16 }}>{chat.lastMessage}</Text>
        </View>
    );
}