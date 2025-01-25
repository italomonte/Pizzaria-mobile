import React, {useState, useContext} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity
    } from "react-native";

import { AuthContext } from "@/src/context/AuthContext";

export default function SignIn() {

    const {user} = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleLogin() {
      /// "5" == 5
      /// =, receber numa vriavel, == valor, === tipo e valor
      if (email === '' || password === '') return

      console.log("testes");
      console.log(email);
      console.log(password);
      
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require("@/src/assets/logo.png")}
            />

            <Text style={{color: "#fff"}}>
              {user?.email}
            </Text>

            <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Digite seu email"
                  style={styles.input}
                  placeholderTextColor={'#f0f0f0'}
                  onChangeText={setEmail}
                />

                <TextInput
                  placeholder="Digite sua senha"
                  style={styles.input}
                  placeholderTextColor={'#f0f0f0'}
                  secureTextEntry={true}
                  onChangeText={setPassword}
                />

                <TouchableOpacity 
                style={styles.button}
                onPress={handleLogin}
                >
                  <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#1d1d2e"
    },
    logo: {
      marginBottom: 18,
    },
    inputContainer: {
      width: '95%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 32,
      paddingHorizontal: 14
    },
    input: {
      width: '95%',
      height: 40,
      backgroundColor: '#101026',
      marginBottom: 12,
      borderRadius: 4,
      paddingHorizontal: 8,
      color: '#fff',
    },
     button: {
      width: '95%',
      height: 40,
      backgroundColor: '#3fffa3',
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#101026'
    }

})