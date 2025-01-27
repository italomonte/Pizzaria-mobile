import React from "react";

import  {View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity} from 'react-native'
import { CategoryProps } from "@/app/Order";

interface ModalPickerProps {
    options: CategoryProps[]
    handleCloseModal: () => void
    selectedItem: () => void 
}

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window')

export function ModalPicker({ options, handleCloseModal, selectedItem}: ModalPickerProps) {

    function onPressItem(item: CategoryProps) {
        console.log(item);
        
    }

    const option = options.map((item, index) => (
        <TouchableOpacity key={index} style={styles.option} onPress={() => onPressItem(item)}>
            <Text style={styles.item}>{item.id}</Text>
        </TouchableOpacity>
    ))

    return (
        <TouchableOpacity onPress={handleCloseModal} style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.modalText}>ADWADADAWDDAWDAW</Text>
            </ScrollView>
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
    option: {

    },
    item: {

    }, modalText: {
        color: '#fff',
        fontSize: 36
    }
  
  })
