import ChatDetail from '@/components/chat/ChatDetail';
import Header from '@/components/navigation/Header';
import { Link, router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { useChatApi } from '@/service/api';
import { GenericResponse } from '@/service/types';
import { ChatItem } from '@/types';

export default function ChatForId() {
    const [refreshing, setRefreshing] = useState(false);
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
                router.navigate('/');
            });
    }, [id]);

    const editButton = () => {
        return (
            <Link href={`/chat/${id}/edit`} style={{ width: '100%' }}>
                <Image source={require('@/assets/images/edit_icon.png')}></Image>
            </Link>
        );
    }

    const onRefresh = async () => {
        setRefreshing(true);
        await getChat({ id: id + '' });
        setRefreshing(false);
    }

    // Temp. Should use a store and reactive updates instead of refreshing
    const unsubscribe = navigation.addListener('focus', () => {
        getChat({ id: id + ''})
        .catch((error) => {
          console.error(error);
        });
      });
    
      useEffect(() => {
        return unsubscribe;
      }, []);

    const insets = useSafeAreaInsets();

    return (
        <View
        style={{
            ...styles.container,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}
        >
            <Header title="Contact" large={false} canPop rightItem={editButton} />

            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={styles.main}>
                    {isGettingChat &&
                        <ActivityIndicator
                            style={styles.activityIndicator}
                            animating={isGettingChat}
                            size="large"
                            color="#0000ff"
                        />
                    }
                    {chat && <ChatDetail chat={chat} />}
                </View>
            </ScrollView>
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
    },
    activityIndicator: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
    },
});