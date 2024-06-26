import { Text, View, FlatList } from "react-native";
import { useCallback, useEffect } from "react";
import { useNavigation } from "expo-router";

import { ChatItem } from "@/types";

import { ChatListItem, chatListItemHeight } from "@/components/home/ChatListItem";
import { Link } from 'expo-router';

import { useChatApi } from "@/service/api";

export default function Index() {
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
        alignItems: "center"
      }}
    >
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