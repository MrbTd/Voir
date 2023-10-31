import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import HeaderYam from './HeaderYam'
import CustomButton from './CustomButton'
import { paletteColor } from '../utils/Constantes'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface BodyGerantProps {
    children:any;
    title:string;
    onPress?: ((params: any) => any) | undefined;
    onChangeText?: ((text: string) => void) | undefined
}

const BodyGerant = ({children,title,onPress,onChangeText}:BodyGerantProps) => {
  return (
    <View>
        <View>
        <HeaderYam/>
            <View style={{  position: 'absolute', zIndex: 100, bottom: -20,width:"80%",left:"10%" }}>
                    <CustomButton
                    backgroundColor={paletteColor.marron}
                    label={title}
                    marginTop={10}
                    colorText={paletteColor.white}
                    fontSize={20}
                    fontWeight="bold"
                    disabled={true}
                    />
            </View>
        </View>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-evenly",marginTop:"8%"}}>
            <View style={{width:"45%",backgroundColor:paletteColor.white,borderRadius:8}}>
                <View style={{flexDirection:"row",alignItems:"center",paddingLeft:"2%"}}>
                    <MaterialIcons name="search" size={25} color={paletteColor.marron}/>
                    <TextInput placeholder='Rechercher'placeholderTextColor={paletteColor.marron} onChangeText={onChangeText}/>
                </View>
            </View>
            <View style={{width:"25%"}}>
                <CustomButton label='Ajouter'backgroundColor={paletteColor.yellow} onPress={onPress}/>
            </View>
        </View>
        {children}
    </View>
  )
}

export default BodyGerant

const styles = StyleSheet.create({})