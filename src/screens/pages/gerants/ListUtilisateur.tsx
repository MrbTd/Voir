import { Image, StyleSheet, Dimensions, View,TouchableOpacity } from 'react-native'
import React from 'react'
import HeaderYam from '../../../components/HeaderYam'
import CustomButton from '../../../components/CustomButton'
import { imageRessource, paletteColor } from '../../../utils/Constantes'
import CustomTextInput from '../../../components/CustomTextInput'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { dataUsers } from '../../../utils/mocs'
import CustomText from '../../../components/CustomText'
import { useNavigation } from '@react-navigation/native'

const ListUtilisateur = () => {
    const navigation=useNavigation()
  return (
    <View>
        <View>
        <HeaderYam/>
            <View style={{  position: 'absolute', zIndex: 100, bottom: -20,width:"80%",left:"10%" }}>
                    <CustomButton
                    backgroundColor={paletteColor.marron}
                    label='Utilisateurs'
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
                    <TextInput placeholder='Rechercher'placeholderTextColor={paletteColor.marron}/>
                </View>
            </View>
            <View style={{width:"25%"}}>
                <CustomButton label='Ajouter'backgroundColor={paletteColor.yellow}/>
            </View>
        </View>

        <View style={{height:Dimensions.get("screen").height}}>
            <FlatList
            data={dataUsers}
            keyExtractor={item=>item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:300}}
            renderItem={({item})=> ( 
            <TouchableOpacity
            activeOpacity={.9}
            style={{marginHorizontal:"5%",borderRadius:8,borderWidth:3,
            height:100,marginVertical:"4%",flexDirection:"row",alignItems:"center",paddingHorizontal:"1%",overflow:"hidden",backgroundColor:paletteColor.marron,borderColor:paletteColor.marron}}
            onPress={()=>navigation.navigate({name:"DetailsUtilisateur",params:item}as never)}
            >
                <View>
                    <Image source={imageRessource.user} style={{width:90,height:80,resizeMode:"cover",borderRadius:8,marginLeft:"2%"}}/>
                </View>
                    <View style={{backgroundColor:paletteColor.white,width:"100%",height:"100%",justifyContent:"center",paddingHorizontal:"2%"}}>
                        <View style={{flexDirection:"row"}}>
                                <CustomText fontSize={14} fontWeight='900'>NOM :  </CustomText>
                                <CustomText >{item.name}</CustomText>
                        </View>
                        <View style={{flexDirection:"row"}}>
                            <CustomText fontSize={14} fontWeight='900'>PRENOM (S) :  </CustomText>
                            <CustomText >{item.name}</CustomText>
                        </View>
                        <View style={{flexDirection:"row"}}>
                            <CustomText fontSize={14} fontWeight='900'>TYPE :  </CustomText>
                            <CustomText >{item.name}</CustomText>
                        </View>

                    </View>
            </TouchableOpacity>
            )}

            />
        </View>

    </View>
  )
}

export default ListUtilisateur

const styles = StyleSheet.create({})