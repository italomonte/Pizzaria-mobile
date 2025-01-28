import React from "react";

import  {View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity} from 'react-native'
import { CategoryProps } from "@/app/Order";

interface ModalPickerProps {
    options: CategoryProps[]
    handleCloseModal: () => void
    selectedItem: (item: CategoryProps) => void // funç]ao vinda como paraetro para mudar um dado no elemento pai
}

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window')

export function ModalPicker({ options, handleCloseModal, selectedItem}: ModalPickerProps) {

    function onPressItem(item: CategoryProps) {
        selectedItem(item);
        handleCloseModal()
    }

    const option = options.map((item, index) => (
        <TouchableOpacity key={index} style={styles.option} onPress={() => onPressItem(item)}>
            <Text style={styles.item}>{item.name}</Text>
        </TouchableOpacity>
    ))

    return (
        <TouchableOpacity onPress={handleCloseModal} style={styles.container}>
            <View style={styles.content}>
            <ScrollView showsVerticalScrollIndicator={false} >
                {option}
            </ScrollView>
            </View>
        </TouchableOpacity>
    )
}   
 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',

    },
    content: {
        width: WIDTH - 20,
        height: HEIGHT / 2,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: "8a8a8a",
        borderRadius: 4
    },
    modalText: {
        color: '#fff',
        fontSize: 36
    },
    option:{
    alignItems: 'flex-start',
    borderTopWidth: 0.8,
    borderTopColor: '#8a8a8a'
    },
    item:{
    margin: 18,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#101026'
    }
  
  })
