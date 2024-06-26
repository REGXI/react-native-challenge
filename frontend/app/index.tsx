import { Text, View, FlatList } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "expo-router";

import { ChatItem } from "@/types";

import { ChatListItem } from "@/components/home/ChatListItem";
import { Link } from 'expo-router';

export default function Index() {
  const navigation = useNavigation();
  const chats: ChatItem[] = [
    {
      id: "1",
      name: "John Doe",
      image: "https://picsum.photos/300/?blur",
      lastMessage: "Hello, how are you?",
      lastMessageDate: new Date(),
    },
    {
      id: "2",
      name: "Jane Doe",
      image: "https://picsum.photos/300/?blur",
      lastMessage: "I'm good, thank you.",
      lastMessageDate: new Date(),
    },
  ];

  useEffect(() => {
    navigation.setOptions({
      title: "Chats",
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <FlatList
        data={chats}
        renderItem={ListItem}
        keyExtractor={(item) => item.id}
        style={{
          width: "100%",
        }}
      ></FlatList>
    </View>
  );
}

function ListItem({ item }: { item: ChatItem }) {
  return (
    <Link href={`/chat/${item.id}`} style={{ width: '100%' }} >
      <ChatListItem chat={item} />
    </Link>
  );
}