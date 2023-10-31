import {StyleSheet, Dimensions, View } from 'react-native'
import React, { useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { dataUsers } from '../../../../utils/mocs'
import { useNavigation } from '@react-navigation/native'
import RenderListUtilisateur from './RenderListUtilisateur'
import BodyGerant from '../../../../components/BodyGerant'
import AjouterUtilisateur from './AjouterUtilisateur'

const ListUtilisateur = () => {

    const navigation=useNavigation()
    const [bottomVisible,setBottomVisible]=useState(false)


  return (
   <BodyGerant title='Utilisateur' onPress={()=>setBottomVisible(true)}>

     <View style={{height:Dimensions.get("screen").height}}>
        <FlatList
        data={dataUsers}
        keyExtractor={item=>item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:300}}
        renderItem={({item})=> ( <RenderListUtilisateur item={item} />)}
        /> 
        
    </View>

    <AjouterUtilisateur isVisible={bottomVisible} 
    onCancel={()=>setBottomVisible(false)} 
    onSave={()=>{
        setBottomVisible(false)
        }}/>
   </BodyGerant>
  )
}

export default ListUtilisateur

const styles = StyleSheet.create({})