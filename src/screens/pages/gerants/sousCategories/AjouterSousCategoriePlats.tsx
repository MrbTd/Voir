import { Image, StyleSheet, TouchableOpacity, TextInput, View } from 'react-native'
import React from 'react'
import BottomSheetComponent from '../../../../components/BottomSheetComponent'
import { imageRessource, paletteColor } from '../../../../utils/Constantes';
import CustomText from '../../../../components/CustomText';

interface AjouterCategoriePlatsProps {
    isVisible: boolean | undefined;
    onCancel: ((params: any) => any) | undefined;
    onSave: ((params: any) => any) | undefined;  
   
  };
  
const AjouterSousCategoriePlats = ({onCancel,onSave, isVisible}:AjouterCategoriePlatsProps) => {

  return (
    <BottomSheetComponent title="Ajouter une sous  categorie" isVisible={isVisible} onCancel={onCancel} onSave={onSave} btnTitle='Ajouter'>
        <TextInput placeholder='NOM:' style={{borderBottomWidth:0.5}} placeholderTextColor={paletteColor.marron}/>
        <TextInput placeholder='DESCRIPTION:' style={{borderBottomWidth:0.5}} placeholderTextColor={paletteColor.marron}/>
        <TextInput placeholder='CATEGORIE PARENT:' style={{borderBottomWidth:0.5}} placeholderTextColor={paletteColor.marron}/>
        <TextInput placeholder='PRIX MOYEN:' style={{borderBottomWidth:0.5}} placeholderTextColor={paletteColor.marron}/>
        <View style={{flexDirection:"row",width:"80%",alignItems:"center"}}>
            <CustomText fontSize={14}  color={paletteColor.marron}>PHOTO :  </CustomText>
            <TouchableOpacity onPress={()=>{}}>
              <Image source={imageRessource.upload} style={{width:40,height:40,resizeMode:"cover",borderRadius:8}}/>
            </TouchableOpacity>
        </View>
    </BottomSheetComponent>
  )
}

export default AjouterSousCategoriePlats

const styles = StyleSheet.create({})