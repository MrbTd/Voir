import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HeaderYam from '../../components/HeaderYam'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { paletteColor } from '../../utils/Constantes'
import CustomButton from '../../components/CustomButton'
import CustomText from '../../components/CustomText'
import { useNavigation } from '@react-navigation/native'
import { dataCommandeEncour } from '../../utils/mocs'

const ListMesCommande = () => {
  
  const navigation=useNavigation()
  return (
    <View style={{flex:1}}>
      
      <View>
          <HeaderYam navigate={<CustomText fontSize={18} fontWeight='bold' color={paletteColor.white} onPress={()=>navigation.navigate("Home"as never)}>ACCUEIL</CustomText>}/>

            <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:"5%"}}>
                <View style={{width:"40%"}}>
                  <CustomButton label='Mes Commandes' disabled={true}/>
                </View>
                <TouchableOpacity style={{borderRadius:8,borderWidth:3,padding:10,borderColor:paletteColor.marron,width:"40%",justifyContent:"center",alignItems:"center"}}  activeOpacity={.7} onPress={()=>navigation.navigate("ListCommande" as never)}>
                  <CustomText textAlign='center' color={paletteColor.marron}>En cours</CustomText>
                </TouchableOpacity>
            </View>
      </View>
        <View style={{flex:1,marginHorizontal:"5%",marginTop:"8%"}}>

            <FlatList
            data={dataCommandeEncour}
            keyExtractor={item=>item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item})=>
              <View style={{borderWidth:3,borderRadius:8,borderColor:paletteColor.marron,marginVertical:"2%",padding:"4%"}}>

                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                   <View>
                      <CustomText fontSize={17} fontWeight="600">Table n°{item.table}</CustomText>
                     <View style={{flexDirection:"row",alignItems:"center"}}>
                      <MaterialCommunityIcons name='clock-outline'/>
                      <CustomText textAlign='center'>{item.heure}</CustomText>
                     </View>
                   </View>
                  
                  <View>
                      <CustomText fontSize={17} fontWeight="600">Commande n°{item.nombreCommande}</CustomText>
                      <CustomText textAlign="center">{item.price} FCFA</CustomText>
                  </View>
                </View>

                <View style={{alignItems:"center",marginTop:"5%"}}>
                  <View style={{flexDirection:"row",alignItems:"center"}}>
                      <MaterialCommunityIcons name='checkbox-marked-circle' size={25} color={paletteColor.marron}/>
                      <View style={{width:"25%",backgroundColor:paletteColor.marron,height:4}}/>
                      <MaterialCommunityIcons name={(item.status=="Terminer"||item.status=="En cours")? 'checkbox-marked-circle':"checkbox-blank-circle-outline"} size={25} color={paletteColor.marron}/>
                      <View style={{width:"25%",backgroundColor:paletteColor.marron,height:4}}/>
                      <MaterialCommunityIcons name={item.status=="Terminer"?'checkbox-marked-circle':"checkbox-blank-circle-outline"} size={25} color={paletteColor.marron}/>
                  </View>
                </View>

                  <View style={{flexDirection:"row",justifyContent:"space-around"}}>
                      <CustomText fontSize={11}>Lancée</CustomText>
                      <CustomText fontSize={11}>En cours</CustomText>
                      <CustomText fontSize={11}>Terminer</CustomText>
                  </View>

              </View>
            }
            
            />
        </View>

    </View>
  )
}

export default ListMesCommande

const styles = StyleSheet.create({})