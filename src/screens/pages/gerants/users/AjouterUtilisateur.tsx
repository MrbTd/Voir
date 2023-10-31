import { Image, StyleSheet, TouchableOpacity, TextInput, View } from 'react-native'
import React from 'react'
import BottomSheetComponent from '../../../../components/BottomSheetComponent'
import { imageRessource, paletteColor } from '../../../../utils/Constantes';
import CustomText from '../../../../components/CustomText';

interface AjouterUtilisateurProps {
    isVisible: boolean | undefined;
    onCancel: ((params: any) => any) | undefined;
    onSave: ((params: any) => any) | undefined;  
   
  };
  
const AjouterUtilisateur = ({onCancel,onSave, isVisible}:AjouterUtilisateurProps) => {

  return (
    <BottomSheetComponent title="Ajouter un utilisateur" isVisible={isVisible} onCancel={onCancel} onSave={onSave} btnTitle='Ajouter'>
        <TextInput placeholder='NOM:' style={{borderBottomWidth:0.5}} placeholderTextColor={paletteColor.marron}/>
        <TextInput placeholder='PRENOM (S):' style={{borderBottomWidth:0.5}} placeholderTextColor={paletteColor.marron}/>
        <TextInput placeholder='AGE:' style={{borderBottomWidth:0.5}} placeholderTextColor={paletteColor.marron}/>
        <TextInput placeholder='EMAIL:' style={{borderBottomWidth:0.5}} placeholderTextColor={paletteColor.marron}/>
        <TextInput placeholder='MOT DE PASSE:' style={{borderBottomWidth:0.5}} placeholderTextColor={paletteColor.marron}/>
        <TextInput placeholder="TYPE D'UTILISATEUR:" style={{borderBottomWidth:0.5}} placeholderTextColor={paletteColor.marron}/>
        <TextInput placeholder='ADRESSE:' style={{borderBottomWidth:0.5}} placeholderTextColor={paletteColor.marron}/>
        <TextInput placeholder='N°TELEPHONE:' style={{borderBottomWidth:0.5,marginBottom:"2%"}} placeholderTextColor={paletteColor.marron}/>
        <View style={{flexDirection:"row",width:"80%",alignItems:"center"}}>
            <CustomText fontSize={14}  color={paletteColor.marron}>PHOTO :  </CustomText>
            <TouchableOpacity onPress={()=>{}}>
              <Image source={imageRessource.upload} style={{width:40,height:40,resizeMode:"cover",borderRadius:8}}/>
            </TouchableOpacity>
        </View>
    </BottomSheetComponent>
  )
}

export default AjouterUtilisateur

const styles = StyleSheet.create({})