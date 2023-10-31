import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { imageRessource, paletteColor } from '../../../../utils/Constantes'
import CustomText from '../../../../components/CustomText'
import DisplayDetailsComponent from '../../../../components/DisplayDetailsComponent'

const RenderListUtilisateur = ({item}:any) => {
    const navigation=useNavigation()
  return (
    <TouchableOpacity
    activeOpacity={.9}
    style={{marginHorizontal:"5%",borderRadius:8,
    height:100,marginVertical:"4%",flexDirection:"row",alignItems:"center",overflow:"hidden",backgroundColor:paletteColor.white}}
    onPress={()=>navigation.navigate({name:"DetailsUtilisateur",params:item}as never)}
    >
        <View>
            <Image source={imageRessource.user} style={{width:90,height:100,resizeMode:"cover",borderTopLeftRadius:8,borderBottomLeftRadius:8}}/>
        </View>
            <View style={{backgroundColor:paletteColor.white,height:"100%",justifyContent:"center",paddingHorizontal:"2%"}}>
                <DisplayDetailsComponent title='NOM'value={item.name} border={0} color={paletteColor.black}/>
                <DisplayDetailsComponent title='PRENOM (S)'value={item.lastName} border={0} color={paletteColor.black}/>
                <DisplayDetailsComponent title='TYPE'value={item.type} border={0} color={paletteColor.black}/>
                
            </View>
    </TouchableOpacity>
  )
}

export default RenderListUtilisateur

const styles = StyleSheet.create({})