import { View, Image, Text, StyleSheet } from "react-native";
import { ChatItem } from "@/types";
import { memo } from "react";
export interface ChatListItemProps {
    chat: ChatItem;
}

export const chatListItemHeight = 80;

export const ChatListItem = ({ chat }: ChatListItemProps) => (
    <View style={styles.container}>
        <Image style={styles.image} source={{ uri: chat.image }} />
        <View style={styles.textContents}>
            <Text style={styles.title}>{chat.name}</Text>
            <Text style={styles.message}>{chat.message}</Text>
        </View>
        <Text style={styles.timeStamp}>
            {formatDistanceToNow(chat.updated_at, { addSuffix: true })}
        </Text>
    </View>
);

function formatDistanceToNow(date: string, options: { addSuffix: boolean }) {
    // This is a naive implementation of the function
    // that handles the most common cases.

    const dateObj = new Date(date);

    const now = new Date();
    const diff = now.getTime() - dateObj.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} days ago`;
    } else if (hours > 0) {
        return `${hours} hours ago`;
    } else if (minutes > 0) {
        return `${minutes} minutes ago`;
    } else {
        return `${seconds} seconds ago`;
    }
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        padding: 16,
        height: chatListItemHeight,
        flexGrow: 1,
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
    },
    image: {
        width: 48,
        height: 48,
        borderRadius: 1000,
        marginRight: 16,
        backgroundColor: "lightgray",
    },
    textContents: {
        justifyContent: "center",
        flexGrow: 1,
    },
    title: {
        fontWeight: 500,
        fontSize: 15
    },
    message: {
        fontWeight: 500,
        color: "#666666",
        fontSize: 11
    },
    timeStamp: {
        color: "#666666",
        fontSize: 11,
        alignSelf: "center",
    },
});