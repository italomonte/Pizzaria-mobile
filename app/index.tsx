import { StatusBar, View } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggin, setIsLoggin] = useState(false);

  useEffect(() => {
    // Marca como montado
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (isLoggin) {
        router.replace("/Dashboard"); // Redireciona para Dashboard
      } else {
        router.replace("/SignIn"); // Redireciona para Login
      }
    }
  }, [isMounted, isLoggin]);

  return (
    <View>
      <StatusBar
        backgroundColor={"#1d1d2r"}
        barStyle="light-content"
        translucent={false}
      />
    </View>
  );
}
