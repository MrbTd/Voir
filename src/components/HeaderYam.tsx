import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { imageRessource, paletteColor } from '../utils/Constantes'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

interface PropsHeader {
    navigate?:any
}

const HeaderYam = ({navigate}:PropsHeader) => {
    const navigation=useNavigation()
  return (
    <ImageBackground source={imageRessource.pattern} style={{height:120}}>
    <View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:"5%",padding:"2%",marginTop:'5%',alignItems:"center"}}>
        <MaterialCommunityIcons name='arrow-left' size={30} style={{backgroundColor:paletteColor.white,padding:2,borderRadius:5}} color={paletteColor.yellow} onPress={()=>navigation.goBack()}/>
        {navigate}
    </View>
  </ImageBackground>
  )
}

export default HeaderYam

const styles = StyleSheet.create({})