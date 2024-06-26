import ChatDetail from '@/components/chat/ChatDetail';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useChatApi } from '@/service/api';

export default function ChatForId() {
    const { id } = useLocalSearchParams();

    const {
        getChat: {
            data: chat,
            query: getChat,
            isLoading: isGettingChat,
        },
    } = useChatApi();

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            title: `Chat for id: ${id}`,
        });
    }, []);

    useEffect(() => {
        getChat({ id: id + '' })
            .catch((error) => {
                console.error(error);
            })
            .then(() => {
                console.log('Chat fetched')
                console.log(chat)
            });
    }, [id]);
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {isGettingChat && <Text>Loading...</Text>}
            {chat && <ChatDetail chat={chat} />}
        </View>
    );
}