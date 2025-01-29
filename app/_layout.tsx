import { Stack } from "expo-router";
import { AuthProvider } from "@/src/context/AuthContext";

export default function Layout() {

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false}}/>
        <Stack.Screen name="SignIn/index" options={{ headerShown: false}}/>
        <Stack.Screen name="Dashboard/index" options={{ headerShown: false}} />
        <Stack.Screen name="Order/index" options={{ headerShown: false}} />
        <Stack.Screen name="(FinishOrder)/FinishOrder" options={{
          title: "Finalizando",
          headerStyle: {
            backgroundColor: "#1d1d2e"
          },
          headerTintColor: "#fff"
        }} />
      </Stack>
  </AuthProvider>
  )
}
