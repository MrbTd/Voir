import { Dimensions, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import HeaderYam from '../../../../components/HeaderYam'
import CustomButton from '../../../../components/CustomButton'
import { imageRessource, paletteColor } from '../../../../utils/Constantes'
import { ScrollView } from 'react-native-gesture-handler'
import BottomSheetComponent from '../../../../components/BottomSheetComponent'
import ModalComponent from '../../../../components/ModalComponent'
import DisplayDetailsComponent from '../../../../components/DisplayDetailsComponent'
import { useNavigation } from '@react-navigation/native'

   

const DetailsSousCategoriePlat = ({route}:any) => {
    const item=route.params
    const navigation=useNavigation()
    const [modalVisible,setModalVisible]=useState(false)
    const [bottomVisible,setBottomVisible]=useState(false)
    
  return (
    <View style={{height:Dimensions.get("screen").height}}>
    <HeaderYam/>
     <ScrollView style={{marginHorizontal:"5%"}} contentContainerStyle={{paddingBottom:100}} showsVerticalScrollIndicator={false}>
        <CustomButton
            backgroundColor={paletteColor.marron}
            label="Détails sous catégorie"
            marginTop={10}
            colorText={paletteColor.white}
            fontSize={20}
            fontWeight="bold"
            disabled={true}
            borderRadius={0}
            />
                <DisplayDetailsComponent title='NOM'value={item.categorie}/>
                <DisplayDetailsComponent title='DESCRIPTION'value={item.description}/>
                <DisplayDetailsComponent title='SOUS-CATEGORIE'value={item.souscategorie}/>
                <DisplayDetailsComponent title='PRIX MOYEN'value={item.prixm}/>
                <DisplayDetailsComponent title="ALLERGENES COURANTS"value={item.allegerne}/>
                <DisplayDetailsComponent title='PHOTO'img={true} value={ 
                    <View>
                        <Image source={imageRessource.eat} style={{width:50,height:50,resizeMode:"cover",borderRadius:8}}/>
                    </View>
                }/>

            <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:"5%"}}>
                <View style={{width:"30%"}}>
                    <CustomButton label='Modifier' backgroundColor={paletteColor.yellow}  onPress={()=>setBottomVisible(!bottomVisible)}/>
                </View>
                <View style={{width:"45%"}}>
                    <CustomButton  label="Supprimer la sous catégorie" onPress={()=>setModalVisible(!modalVisible)}/>
                </View> 
            </View>
     </ScrollView>

     <ModalComponent 
    title="SUPPRESSION DE LA SOUS CATEGORIE"
    subtitle="Attention, vous êtes sur le point de supprimer une sous catégorie. Etes vous sûr de vouloir conntinuer ?"
    modalVisible={modalVisible} 
    onContinue={()=>setModalVisible(false)} 
    onCancel={()=>setModalVisible(false)}/>

    <BottomSheetComponent title="Modifier la sous catégorie" isVisible={bottomVisible} onCancel={()=>setBottomVisible(false)} onSave={()=>{
        setBottomVisible(false)
        }}>
                <DisplayDetailsComponent title='NOM'value={item.categorie}/>
                <DisplayDetailsComponent title='DESCRIPTION'value={item.description}/>
                <DisplayDetailsComponent title='SOUS-CATEGORIE'value={item.souscategorie}/>
                <DisplayDetailsComponent title='PRIX MOYEN'value={item.prixm}/>
                <DisplayDetailsComponent title="ALLERGENES COURANTS"value={item.allegerne}/>
                <DisplayDetailsComponent title='PHOTO'img={true} value={ 
                    <View>
                        <Image source={imageRessource.eat} style={{width:50,height:50,resizeMode:"cover",borderRadius:8}}/>
                    </View>
                }/>
    </BottomSheetComponent>
    </View>
  )
}

export default DetailsSousCategoriePlat

const styles = StyleSheet.create({})