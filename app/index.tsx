import { ActivityIndicator, StatusBar, View } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const isLoggin = true
  const isLoading = true

  useEffect(() => {
    // Marca como montado
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (!isLoading) {
        if (isLoggin) {
          router.replace("/Dashboard"); // Redireciona para Dashboard
        } else {
          router.replace("/SignIn"); // Redireciona para Login
        }
    }
    }
  }, [isMounted, isLoggin, isLoading]);

  return (
    <View
      style={{
        flex:1,
        backgroundColor: "#1D1D2E",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <ActivityIndicator size={60} color={"#FFFFFF"}/>
    </View>
  );
}
