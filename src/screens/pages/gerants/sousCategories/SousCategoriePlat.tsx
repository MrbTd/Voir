import {StyleSheet, Dimensions, View } from 'react-native'
import React, { useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { dataCategoriePlat, dataUsers } from '../../../../utils/mocs'
import { useNavigation } from '@react-navigation/native'
import BodyGerant from '../../../../components/BodyGerant'
import RenderListSousCategoriePlat from './RenderListSousCategoriePlat'
import AjouterSousCategoriePlats from './AjouterSousCategoriePlats'

const SousCategoriePlat = () => {
  const [bottomVisible,setBottomVisible]=useState(false)

    const navigation=useNavigation()

  return (
   <BodyGerant title='Sous-catégories' onPress={()=>setBottomVisible(true)}>
     <View style={{height:Dimensions.get("screen").height}}>
        <FlatList
        data={dataCategoriePlat}
        keyExtractor={item=>item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:300}}
        renderItem={({item})=> ( <RenderListSousCategoriePlat item={item} />)}
        /> 
        
    </View>
    <AjouterSousCategoriePlats isVisible={bottomVisible} 
    onCancel={()=>setBottomVisible(false)} 
    onSave={()=>{
        setBottomVisible(false)
        }}/>
   </BodyGerant>
  )
}

export default SousCategoriePlat

const styles = StyleSheet.create({})