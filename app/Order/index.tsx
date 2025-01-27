import React, {useState, useEffect} from "react"
import { useLocalSearchParams} from "expo-router"
import {Feather} from '@expo/vector-icons'
import { api } from "@/src/services/api"
import { useRouter } from "expo-router"
import { ModalPicker } from "@/src/components/ModalPicker"
import { View, Text, Modal, SafeAreaView, StyleSheet, TouchableOpacity, TextInput} from "react-native"

type OrderParams = {
  number: string; 
  order_id: string; // Pode ajustar para `number` e converter depois
};

export type CategoryProps = {
  id: string
  name: string
}

export default function Order() {

  const router = useRouter()
  const {number, order_id} = useLocalSearchParams<OrderParams>()
  
  const [category, setCategory] = useState<CategoryProps[] | []>([])
  const [categorySelected, setCategorySelected] = useState<CategoryProps>()
  const [modalCategoryVisible, setModalCategoryVisible] =  useState(false)

  const [amount, setAmount] = useState('1')

  useEffect(() => {
    async function loadInfo() {
      const response = await api.get('/category')

      setCategory(response.data)
      setCategorySelected(response.data[0])
    };

    loadInfo()


  }, [])

  async function handleCloseOrder(){
    try {
      await api.delete('/order', {
        params: {
          order_id: order_id 
        }
      })

      router.back()
    } catch (err) {
      console.log(err);
    }
  }
  
  return(
    
      <View style={styles.container}>
        <View style={styles.header}>

          <Text style={styles.title}>Mesa {number}</Text>

          {category.length !== 0 && (
            <TouchableOpacity>
              <Feather name='trash-2' size={28} color={"#FF3F4b"} onPress={handleCloseOrder} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.input} onPress={ () => setModalCategoryVisible(true)}>
          <Text style={{color: "#fff"}}>
            {categorySelected?.name}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.input}>
          <Text style={{color: "#fff"}}>Pizza de calabresa</Text>
        </TouchableOpacity>
       
        <View style={styles.qtdContainer}>

          <Text style={styles.qtdText}>Quantidade</Text>

          <TextInput
            style={[styles.input, {width: '60%', textAlign: 'center'}]}
            placeholderTextColor={"#f0f0f0"}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

        </View>

        
        <View style={styles.actions}>
          <TouchableOpacity style={styles.buttonAdd}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Avançar</Text> 
          </TouchableOpacity>
        </View>

        <Modal
          transparent={true}
          visible={modalCategoryVisible}
          animationType="fade"
        >
          <ModalPicker
            handleCloseModal= {() => setModalCategoryVisible(false)}
            options={category}
            selectedItem={() => {}}
          />
        </Modal>

        

      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: '5%',
    paddingHorizontal: '4%',
    backgroundColor: '#1d1d2e'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24
  },
  input: {
    backgroundColor: '#101026',
    width: '100%',
    borderRadius: 4,
    height:50,
    marginBottom: 12,
    justifyContent: 'center',
    paddingHorizontal: 8,
    fontSize: 20,
    color: '#fff'
  },
  qtdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  qtdText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  actions:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  buttonAdd:{
    width: '20%',
    backgroundColor: '#3fd1ff',
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    color: '#101026',
    fontSize: 18,
    fontWeight: 'bold'
  },
  button:{
    backgroundColor: '#3fffa3',
    borderRadius: 4,
    height: 40,
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center'
  }

})