import React, {useState, useEffect} from "react"
import { useLocalSearchParams} from "expo-router"
import {Feather} from '@expo/vector-icons'
import { api } from "@/src/services/api"
import { useRouter } from "expo-router"
import { ModalPicker } from "@/src/components/ModalPicker";
import { ListItem } from "@/src/components/ListItem";

import { 
  View, 
  Text, 
  Modal, 
  SafeAreaView, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  FlatList

} from "react-native"

export type OrderParams = {
  number: string; 
  order_id: string; // Pode ajustar para `number` e converter depois
};

export type CategoryProps = {
  id: string
  name: string
}

type ProductProps = {
  id: string,
  name: string
}

type ItemProps = {
  id: string;
  product_id: string;
  name: string;
  amount: string | number;
}

export default function Order() {

  const router = useRouter()
  const {number, order_id} = useLocalSearchParams<OrderParams>()
  
  const [category, setCategory] = useState<CategoryProps[] | []>([])
  const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>()
  const [modalCategoryVisible, setModalCategoryVisible] =  useState(false)

  const [products, setProducts] = useState<ProductProps[] | []>([])
  const [productSelected, setProductSelected] = useState<ProductProps | undefined>()
  const [modalProductsVisible, setModalProductsVisible] =  useState(false)
  
  const [amount, setAmount] = useState('1')
  const [items, setItems] = useState<ItemProps[]>([])

  useEffect(() => {
    
    async function loadInfo() {
      const response = await api.get('/category')

      setCategory(response.data)
      setCategorySelected(response.data[0])
    };

    loadInfo()

  }, [])
  
  useEffect(() => {

    async function loadProducts() {
      const response = await api.get('/category/product', {
        params: {
          category_id: categorySelected?.id
        }
      })
      
      console.log("==================");
      
      console.log(response.data);
      
      setProducts(response.data)
      setProductSelected(response.data[0])
    }

    loadProducts()

  }, [categorySelected])

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

  function handleChangeCategory(item: CategoryProps){
    setCategorySelected(item)
  }

  function handleChangeProduct(item: ProductProps){
    setProductSelected(item)
  }

  async function handleDeleteItem(item_id: string) {
    try {
      await api.delete('/order/remove', {
        params: {
          item_id: item_id
        }
      })

      // removido

      let removeItem = items.filter((item)=> {
        return (item.id !== item_id)
      })

      setItems(removeItem)
    } catch (err) {
      console.log(err);
      
    }
  }

  async function handleAdd(){
    const response = await api.post('/order/add', {
      order_id: order_id,
      product_id: productSelected?.id,
      amount: Number(amount)
    })

    let data = {
      id: response.data.id,
      product_id: productSelected?.id as string,
      name: productSelected?.name as string,
      amount: amount
    }


    setItems(oldArray => [...oldArray, data])

  }

  function handleNextPage () {
    router.push({
      pathname: '/(FinishOrder)/FinishOrder',
      params: {number: number, order_id: order_id}
    })
  }
  
  return(
    
      <View style={styles.container}>
        <View style={styles.header}>

          <Text style={styles.title}>Mesa {number}</Text>
          {items.length === 0 && (
            <TouchableOpacity onPress={handleCloseOrder} >
              <Feather name='trash-2' size={28} color={"#FF3F4b"} />
            </TouchableOpacity>
          )}
        </View>

        {/* Category */}
        {category.length !== 0 && (
          <TouchableOpacity style={styles.input} onPress={ () => setModalCategoryVisible(true)}>
            <Text style={{color: "#fff"}}>
              {categorySelected?.name}
            </Text>
          </TouchableOpacity>
        )}



        {/* Products */}
        {products.length !== 0 && (
          <TouchableOpacity style={styles.input} onPress={() => {setModalProductsVisible(true)}}>
            <Text style={{color: "#fff"}}>
              {productSelected?.name}
            </Text>
          </TouchableOpacity>
        )}
       
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
          <TouchableOpacity 
          style={styles.buttonAdd}
          onPress={handleAdd}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          style={[styles.button, { opacity: items?.length === 0 ? 0.3 : 1}]}
          disabled={items?.length == 0}
          onPress={handleNextPage}
          >
            <Text style={styles.buttonText}>Avançar</Text> 
          </TouchableOpacity>
        </View>


        
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, marginTop: 24 }}
          data={items}
          keyExtractor={(item) => item.id }
          renderItem={ ({ item }) =>  <ListItem data={item} deleteItem={handleDeleteItem}/> }
        />


        <Modal
          transparent={true}
          visible={modalCategoryVisible}
          animationType="fade"
        >
          <ModalPicker
            handleCloseModal= {() => setModalCategoryVisible(false)}
            options={category}
            selectedItem={ handleChangeCategory }
          />
        </Modal>

        <Modal
          transparent={true}
          visible={modalProductsVisible}
          animationType="fade"
        >
          <ModalPicker
            handleCloseModal= {() => setModalProductsVisible(false)}
            options={products}
            selectedItem={ handleChangeProduct }
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
    marginBottom: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    marginRight: 14
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