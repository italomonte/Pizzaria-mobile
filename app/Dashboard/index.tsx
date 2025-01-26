import React, {useEffect} from "react"
import { View, Text, Button} from "react-native"

import { useContext } from "react"
import { AuthContext } from "@/src/context/AuthContext"
import { useRouter } from "expo-router";

export default function Dashboard() {

  const {signOut, isAuthenticated} = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated]);
    return(
      
        <View>
            <Text> oioaaai </Text>
            <Button 
            title="SAIR DO APP"
            onPress={signOut}
            >

            </Button>
        </View>
    )
}