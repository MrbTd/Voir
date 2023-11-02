import {StyleSheet, Dimensions, View } from 'react-native'
import React, { useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { dataCategoriePlat, dataUsers } from '../../../../utils/mocs'
import { useNavigation } from '@react-navigation/native'
import BodyGerant from '../../../../components/BodyGerant'
import RenderListSousCategoriePlat from './RenderListsAccompagnement'
import AjouterAccompagnement from './AjouterAccompagnement'
import RenderListAccompagnement from './RenderListsAccompagnement'

const Accompagnement = () => {
  const [bottomVisible,setBottomVisible]=useState(false)

    const navigation=useNavigation()

  return (
   <BodyGerant title='Accompagnement' onPress={()=>setBottomVisible(true)}>
     <View style={{height:Dimensions.get("screen").height}}>
        <FlatList
        data={dataCategoriePlat}
        keyExtractor={item=>item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:300}}
        renderItem={({item})=> ( <RenderListAccompagnement item={item} />)}
        /> 
        
    </View>
    <AjouterAccompagnement isVisible={bottomVisible} 
    onCancel={()=>setBottomVisible(false)} 
    onSave={()=>{
        setBottomVisible(false)
        }}/>
   </BodyGerant>
  )
}

export default Accompagnement

const styles = StyleSheet.create({})