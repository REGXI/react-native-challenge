import { View, Image, Text, StyleSheet } from "react-native";
import { ChatItem } from "@/types";
import { getFontSize } from "@/utils/fonts";

import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";

export interface ChatListItemProps {
    chat: ChatItem;
}

export const chatListItemHeight = 70;

export const ChatListItem = ({ chat }: ChatListItemProps) => {
    const [fontsLoaded] = useFonts({
        Inter_500Medium,
    });

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: chat.image }} />
            <View style={styles.mainContent} >
                <View style={styles.topRow}>
                    <Text style={styles.title}>{chat.name}</Text>
                    <Text style={styles.timeStamp}>
                        {formatDistanceToNow(chat.updated_at, { addSuffix: true })}
                    </Text>
                </View>
                <View style={styles.bottomRow}>
                    <Text style={styles.message}>{chat.message}</Text>

                    { /* If !has_read */ chat.has_read ? null : (
                            <View style={styles.unreadBadge}></View>
                        )
                    }
                </View>
            </View>
        </View>
    )
};

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
        return `${days}d`;
    } else if (hours > 0) {
        return `${hours}h`;
    } else if (minutes > 0) {
        return `${minutes}m`;
    } else {
        return `${seconds}s`;
    }
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: "100%",
        maxWidth: "100%",
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        height: chatListItemHeight,
        paddingHorizontal: 20
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 1000,
        marginRight: 16,
        backgroundColor: "lightgray",
    },
    textContents: {
        justifyContent: "flex-start",
        flexGrow: 1,
        height: "100%",
    },
    title: {
        fontFamily: "Inter",
        fontWeight: 500,
        fontSize: getFontSize(15),
        flexGrow: 1,
    },
    message: {
        fontFamily: "Inter",
        fontWeight: 500,
        color: "#666666",
        fontSize: getFontSize(11),
        flexGrow: 1,
        width: 'auto'
    },
    unreadBadge: {
        width: 10,
        height: 10,
        borderRadius: 1000,
        backgroundColor: "#0099FF",
        alignSelf: "center",
    },
    timeStamp: {
        fontFamily: "Inter",
        color: "#666666",
        fontSize: getFontSize(11),
        alignSelf: "center",
        flexGrow: 0,
    },
    topRow: {
        flexDirection: "row",
        flexGrow: 1,
        justifyContent: "space-between",
        alignItems: "center",
    },
    bottomRow: {
        flexDirection: "row",
        flexGrow: 1,
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingBottom: 4,
        paddingRight: 5,
    },
    mainContent: {
        height: "100%",
        maxWidth: "100%",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexGrow: 1,
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
        paddingBottom: 5,
    },
});