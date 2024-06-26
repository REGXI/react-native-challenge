import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

export default function ChatForId() {
    const { id } = useLocalSearchParams();
    
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            title: `Chat for id: ${id}`,
        });
    }, []);
    return (
        <View>
            <Text>Chat for id: {id}</Text>
        </View>
    );
}