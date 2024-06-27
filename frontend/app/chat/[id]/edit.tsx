import Header from "@/components/navigation/Header";
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useChatApi } from "@/service/api";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChatItemEditDTO } from "@/types";
import ChatForm from "@/components/chat/ChatForm";

export default function ChatEdit() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

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
            const chatDTO = {
                name: chat.name,
                message: chat.message,
                image: chat.image,
                has_read: chat.has_read
            }
            setChatToUpload(chatDTO);
        }
    }, [chat]);

    const updateChatInput = (attributes: Partial<ChatItemEditDTO>) => {
        setChatToUpload({
            ...chatToUpload,
            ...attributes
        });
    }

    const save = async () => {
        console.log('Saving: ', chatToUpload)
        await updateChat({ id: id + '', chat: chatToUpload })
        router.dismiss();        
    }
    
    return (
        <View style={{
                ...styles.container,
                backgroundColor: 'white',
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}>
            <Header title="Edit contact" canPop />
            <View style={{ flexGrow: 1, width: '100%' }}>
                {isGettingChat ? null : (
                    <ChatForm
                        chat={chatToUpload}
                        updateChatAttributes={updateChatInput}
                        saveButton={() => <Button onPress={save} title="Save Changes"/>}
                    />
                )}
            </View>

            <View style={styles.loadingIndicator}>
                <ActivityIndicator style={styles.activityIndicator} animating={isGettingChat || isUpdatingChat} size="large" color="#0000ff" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    loadingIndicator: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
    },
    activityIndicator: {
    }
})