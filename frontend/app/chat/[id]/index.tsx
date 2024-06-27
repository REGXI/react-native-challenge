import ChatDetail from '@/components/chat/ChatDetail';
import Header from '@/components/navigation/Header';
import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
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

    const editButton = () => {
        return (
            <Link href={`/chat/${id}/edit`} style={{ width: '100%' }}>
                <Image source={require('@/assets/images/edit_icon.png')}></Image>
            </Link>
        );
    }

    const insets = useSafeAreaInsets();

    return (
        <View
            style={{
                ...styles.container,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
        >
            <Header title="Contact" large={false} canPop rightItem={editButton} />

            <View style={styles.main}>
                {isGettingChat && <Text>Loading...</Text>}
                {chat && <ChatDetail chat={chat} />}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center'
    }
});