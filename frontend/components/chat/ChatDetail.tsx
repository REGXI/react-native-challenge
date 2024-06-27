import { ChatItem } from "@/types";
import { Text, View, Image, StyleSheet } from "react-native";

export interface ChatDetailProps {
    chat: ChatItem;
}

export default function ChatDetail({ chat }: ChatDetailProps) {
    return (
        <View style={styles.main}>
            <Image
                source={{ uri: chat.image }}
                style={{
                    ...styles.image,
                }}
            ></Image>
            <Text style={{ fontSize: 24, margin: 16 }}>{chat.name}</Text>
            <Text style={{ margin: 16 }}>{chat.message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 80,
        height: 80,
        borderRadius: 1000,
        margin: 18,
    },
    main: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});