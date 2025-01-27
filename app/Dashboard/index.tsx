import React, {useState} from "react"
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput} from "react-native"
import { useRouter } from "expo-router";
import { api } from "@/src/services/api";

export default function Dashboard() {

  const router = useRouter()


  // const {signOut, isAuthenticated} = useContext(AuthContext)

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.replace("/");
  //   }
  // }, [isAuthenticated]);

  const [number, setNumber] = useState('')

  async function openOrder() {
    if (number === '') {
      return
    }

    const response = await api.post('/order', {
      table: Number(number) //convertendo para numero
    })

    console.log(response.data);
    
    const {table, id} = response.data

    //requisição e prx tela
    router.push({
      pathname: '/Order',
      params: {number: table, order_id: id}
    })

    setNumber('')

  }

    return(
      
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Novo pedido</Text>

          <TextInput
            placeholder="Numero da mesa"
            placeholderTextColor={"#F0F0F0"}
            style={styles.input}
            keyboardType='numeric'
            value={number}
            onChangeText={setNumber}
          />

          <TouchableOpacity style={styles.button} onPress={openOrder}>
            <Text style={styles.buttonText}>Abrir mesa</Text>
          </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: '#1d1d2e'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24
  },
  input: {
    width: '90%',
    height: 60,
    backgroundColor: '#101026',
    borderRadius: 4,
    paddingHorizontal: 8,
    fontSize: 22,
    color: '#fff'
  },
  button: {
    width: '90%',
    height: 40,
    backgroundColor: "#3fffa3",
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    borderRadius: 4
  },
  buttonText: {
    fontSize: 18,
    color: '#101026',
    fontWeight: 'bold'
  }
})