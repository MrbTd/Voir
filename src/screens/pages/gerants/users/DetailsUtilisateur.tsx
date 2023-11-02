import { Dimensions, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import HeaderYam from '../../../../components/HeaderYam'
import CustomButton from '../../../../components/CustomButton'
import { imageRessource, paletteColor } from '../../../../utils/Constantes'
import { ScrollView } from 'react-native-gesture-handler'
import BottomSheetComponent from '../../../../components/BottomSheetComponent'
import ModalComponent from '../../../../components/ModalComponent'
import DisplayDetailsComponent from '../../../../components/DisplayDetailsComponent'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

   

const DetailsUtilisateur = ({route}:any) => {
    const item=route.params
    const navigation=useNavigation()
    const [modalVisible,setModalVisible]=useState(false)
    const [bottomVisible,setBottomVisible]=useState(false)
    
  return (
    <View style={{height:Dimensions.get("screen").height}}>

    <ModalComponent 
    title="SUPPRESSION D'UTILISATEUR"
    subtitle="Attention, vous êtes sur le point de supprimer un utilisateur. Etes vous sûr de vouloir conntinuer ?"
    modalVisible={modalVisible} 
    onContinue={()=>setModalVisible(false)} 
    onCancel={()=>setModalVisible(false)}/>

    <BottomSheetComponent title="Modifier l'utilisateur" 
    isVisible={bottomVisible} 
    onCancel={()=>setBottomVisible(false)} 
    onSave={()=>{
        setBottomVisible(false)
        navigation.navigate("ListUtilisateur" as never)
        }}>
                <DisplayDetailsComponent title='NOM'value={item.name}/>
                <DisplayDetailsComponent title='PRENOM'value={item.lastName}/>
                <DisplayDetailsComponent title='AGE'value={item.name}/>
                <DisplayDetailsComponent title='EMAIL'value={item.email}/>
                <DisplayDetailsComponent title="TYPE D'UTILISATEUR"value={item.type}/>
                <DisplayDetailsComponent title='ADRESSE'value={item.adresse}/>
                <DisplayDetailsComponent title='N° TELEPHONE'value={item.contact}/>
                <DisplayDetailsComponent title='PHOTO'img={true} value={ 
                    <View>
                        <Image source={imageRessource.user} style={{width:50,height:50,resizeMode:"cover",borderRadius:8}}/>
                    </View>
                }/>
    </BottomSheetComponent>

    <HeaderYam navigate={<MaterialIcons name='menu' size={35} color={paletteColor.white}     
        onPress={() => {navigation.dispatch(DrawerActions.openDrawer())}}
        />}
        />
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
            <DisplayDetailsComponent title='NOM'value={item.name}/>
            <DisplayDetailsComponent title='PRENOM'value={item.lastName}/>
            <DisplayDetailsComponent title='AGE'value={item.name}/>
            <DisplayDetailsComponent title='EMAIL'value={item.email}/>
            <DisplayDetailsComponent title="TYPE D'UTILISATEUR"value={item.type}/>
            <DisplayDetailsComponent title='ADRESSE'value={item.adresse}/>
            <DisplayDetailsComponent title='N° TELEPHONE'value={item.contact}/>
            <DisplayDetailsComponent title='PHOTO'img={true} value={ 
                <View>
                    <Image source={imageRessource.user} style={{width:50,height:50,resizeMode:"cover",borderRadius:8}}/>
                </View>
            }/>

            <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:"5%"}}>
                <View style={{width:"30%"}}>
                    <CustomButton label='Modifier' backgroundColor={paletteColor.yellow}  onPress={()=>setBottomVisible(!bottomVisible)}/>
                </View>
                <View style={{width:"45%"}}>
                    <CustomButton label="Supprimer l'utilisateur" onPress={()=>setModalVisible(!modalVisible)}/>
                </View> 
            </View>
     </ScrollView>
    </View>
  )
}

export default DetailsUtilisateur

const styles = StyleSheet.create({})