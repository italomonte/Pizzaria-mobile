import { ActivityIndicator, StatusBar, View } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/src/context/AuthContext";


export default function Index() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const {isAuthenticated} = useContext(AuthContext)

  useEffect(() => {
    // Marca como montado
    setIsMounted(true);
  }, []);

  useEffect(() => {
    console.log(isAuthenticated);
    
    if (isMounted) {
      if (isAuthenticated) {
        router.replace("/Dashboard"); // Redireciona para Dashboard
      } else {
        router.replace("/SignIn"); // Redireciona para Login
      }
    }
  }, [isMounted, isAuthenticated]);

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
