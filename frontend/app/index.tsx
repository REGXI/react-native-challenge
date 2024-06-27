import { Text, View, FlatList, Image } from "react-native";
import { useCallback, useEffect } from "react";
import { useNavigation } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ChatItem } from "@/types";

import { ChatListItem, chatListItemHeight } from "@/components/home/ChatListItem";
import { Link } from 'expo-router';

import { useChatApi } from "@/service/api";

import Header from "@/components/navigation/Header";

export default function Index() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const {
    getChats: {
      data: chats,
      query: getChats,
      isLoading: isGettingChats,
    },
  } = useChatApi();

  useEffect(() => {
    navigation.setOptions({
      title: "Chats",
    });
  }, []);

  useEffect(() => {
    getChats()
    .catch((error) => {
      console.error(error);
    });
  }, []);

  const addButton = useCallback(() => {
    return (
      <Link href={`/chat/create`} style={{ width: '100%' }}>
          <Image source={require('@/assets/images/add_button.png')}></Image>
      </Link>
    );
  }, []);

  const renderItem = useCallback(({ item }: { item: ChatItem }) => {
    return (
      <Link href={`/chat/${item.id}`} style={{ width: '100%' }} >
        <ChatListItem chat={item} />
      </Link>
    );
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right
      }}
    >
      <Header title="Chats" large rightItem={addButton} />

      {isGettingChats && <Text>Loading...</Text>}

      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        getItemLayout={(data, index) => ({ length: chatListItemHeight, offset: chatListItemHeight * index, index }) }
        style={{
          width: "100%",
        }}
      ></FlatList>
    </View>
  );
}