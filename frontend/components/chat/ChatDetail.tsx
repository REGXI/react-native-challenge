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
            <Text style={styles.message}>{chat.message}</Text>
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
    },
    message: {
        padding: 10,
        margin: 16,
        borderColor: "#E4E4E4",
        borderWidth: 1,
        borderRadius: 10,
    }
});