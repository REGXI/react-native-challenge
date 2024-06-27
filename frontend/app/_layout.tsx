import { Stack } from "expo-router";

export default function RootLayout() {

  return (
    <Stack>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="index"
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      name="chat/[id]/index" />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
      name="chat/[id]/edit" />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
      name="chat/create" />
    </Stack>
  );
}
