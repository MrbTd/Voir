import { Dimensions, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import HeaderYam from '../../../components/HeaderYam'
import CustomButton from '../../../components/CustomButton'
import { imageRessource, paletteColor } from '../../../utils/Constantes'
import CustomText from '../../../components/CustomText'
import { ScrollView } from 'react-native-gesture-handler'

    const CustomDetailUsers=({title,value,img}:{title:string,value:any,img?:boolean})=>{
        return(
            <View style={{flexDirection:"row",borderBottomWidth:1,paddingVertical:'3%'}}>
            <CustomText fontSize={16} fontWeight='900' color={paletteColor.marron}>{title} :  </CustomText>
           {img===true?value: <CustomText fontSize={16}>{value}</CustomText>}
            </View>
        )}

const DetailsUtilisateur = ({route}:any) => {
    const item=route.params
    const [modalVisible,setModalVisible]=useState(false)
    
  return (
    <View style={{height:Dimensions.get("screen").height}}>
    <HeaderYam/>
     <ScrollView style={{marginHorizontal:"5%",marginTop:'2%'}} contentContainerStyle={{paddingBottom:100}} showsVerticalScrollIndicator={false}>
        <CustomButton
            backgroundColor={paletteColor.marron}
            label="Détails de l'utilisateur"
            marginTop={10}
            colorText={paletteColor.white}
            fontSize={20}
            fontWeight="bold"
            disabled={true}
            borderRadius={0}
            />
            <CustomDetailUsers title='NOM'value={item.name}/>
            <CustomDetailUsers title='PRENOM'value={item.lastName}/>
            <CustomDetailUsers title='AGE'value={item.name}/>
            <CustomDetailUsers title='EMAIL'value={item.email}/>
            <CustomDetailUsers title="TYPE D'UTILISATEUR"value={item.type}/>
            <CustomDetailUsers title='ADRESSE'value={item.adresse}/>
            <CustomDetailUsers title='N° TELEPHONE'value={item.contact}/>
            <CustomDetailUsers title='PHOTO'img={true} value={ 
                <View>
                    <Image source={imageRessource.user} style={{width:50,height:50,resizeMode:"cover",borderRadius:8}}/>
                </View>
            }/>

            <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:"5%"}}>
                <View style={{width:"30%"}}>
                    <CustomButton label='Modifier' backgroundColor={paletteColor.yellow}/>
                </View>
                <View style={{width:"45%"}}>
                    <CustomButton label="Supprimer l'utilisateur" onPress={()=>setModalVisible(!modalVisible)}/>
                </View>

                <Modal
  animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false );
      }}
    >
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 20,
        }}
      >
               <View>

                    <View style={{backgroundColor:paletteColor.marron,padding:"3%"}}>
                        <CustomText textAlign='center' color={paletteColor.white} fontWeight='bold'>SUPPRESSION D'UTILISATEUR</CustomText>
                    </View>
                    <View style={{backgroundColor:paletteColor.white,padding:"4%"}}>
                        <CustomText fontSize={18} color={paletteColor.black}>Attention, vous êtes sur le point de supprimer un utilisateur. Etes vous sûr de vouloir conntinuer ?</CustomText>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:"5%"}}>
                <View style={{width:"45%"}}>
                    <CustomButton label='ANNULER' backgroundColor={paletteColor.white} colorText={paletteColor.marron}/>
                </View>
                <View style={{width:"45%"}}>
                    <CustomButton label="CONTINUER" onPress={()=>setModalVisible(!modalVisible)}/>
                </View>
                </View>
               </View>
                </View>
            </Modal>
                
            </View>
     </ScrollView>
    </View>
  )
}

export default DetailsUtilisateur

const styles = StyleSheet.create({})