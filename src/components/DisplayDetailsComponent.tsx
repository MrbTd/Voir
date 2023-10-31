import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { paletteColor } from '../utils/Constantes'

const DisplayDetailsComponent=({title,value,img}:{title:string,value:any,img?:boolean})=>{
    return(
        <View style={{flexDirection:"row",borderBottomWidth:1,paddingVertical:'3%'}}>
        <CustomText fontSize={16} fontWeight='900' color={paletteColor.marron}>{title} :  </CustomText>
       {img===true?value: <CustomText fontSize={16}>{value}</CustomText>}
        </View>
    )}
export default DisplayDetailsComponent

const styles = StyleSheet.create({})