import { Stack } from "expo-router";
import { AuthProvider } from "@/src/context/AuthContext";

export default function Layout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false}}/>
        <Stack.Screen name="SignIn/index" options={{ headerShown: false}}/>
        <Stack.Screen name="Dashboard/index" options={{ headerShown: false}} />
      </Stack>
  </AuthProvider>
  )
}
