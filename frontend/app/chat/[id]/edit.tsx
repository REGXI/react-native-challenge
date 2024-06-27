import Header from "@/components/navigation/Header";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChatEdit() {
    const insets = useSafeAreaInsets();
    
    return (
        <View style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}>
            <Header title="Edit contact" canPop />
            <View>
                
            </View>
        </View>
    )
}