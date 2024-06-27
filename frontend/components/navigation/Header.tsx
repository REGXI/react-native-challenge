import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { router, useSegments } from 'expo-router';
import { Inter_600SemiBold, Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { getFontSize } from "@/utils/fonts";
import { useEffect, useState } from "react";

interface HeaderProps {
    title: string;
    large?: boolean;
    canPop?: boolean;
    rightItem?: () => React.ReactNode;
}

export default function Header({ title, large, canPop, rightItem }: HeaderProps) {
    const [fontsLoaded] = useFonts({
        Inter_600SemiBold,
        Inter_500Medium
    });

    const backArrow = () => (
        <Pressable style={styles.backArrow} onPress={()=>{ router.dismiss() }}>
            <Image source={require('@/assets/images/back_arrow.png')}></Image>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            { canPop && backArrow() }
            <Text style={large ? styles.largeTitle : styles.regularTitle}>{title}</Text>

            <View style={styles.rightButton}>
                { rightItem && rightItem() }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        padding: 23,
        paddingTop: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    largeTitle: {
        fontFamily: 'Inter',
        fontSize: getFontSize(20),
        fontWeight: '600',
        textAlign: 'left',
        flexGrow: 1,
    },
    regularTitle: {
        textAlign: 'center',
        borderColor: 'black',
        fontSize: getFontSize(17),
        fontWeight: '500',
        color: '#555555',
        flexGrow: 1,
    },
    backArrow: {
        width: 20,
        height: '100%',
        justifyContent: 'center',
    },
    rightButton: {
        flexGrow: 0,
    }
});