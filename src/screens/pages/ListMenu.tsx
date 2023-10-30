import { ScrollView, StyleSheet,  View,Image, Dimensions, Text, ImageBackground, TouchableOpacity, TextInput, SectionList, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { imageRessource, paletteColor } from '../../utils/Constantes'
import CustomText from '../../components/CustomText';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { data } from '../../utils/mocs';
import { FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ListMenu = () => {

    const [numTable, setNumTable] = useState("")
    const [verifSearch, setVerifSearch] = useState(false)

    const [dataCommande, setDataCommande] = useState(data)
    const [commandeSelectionne, setCommandeSelectionne] = useState([])as any

    const navigation=useNavigation()

    const incrementQuantity = (category: string, itemId: string,item: {
      id: string;
      text: string;
      quantite: number;
      price: number;
      description: string;
  }) => {
        setDataCommande((prevData) =>
          prevData.map((categoryData) => {
            if (categoryData.category === category) {
              return {
                ...categoryData,
                items: categoryData.items.map((item) =>
                  item.id === itemId
                    ? { ...item, quantite: item.quantite + 1 }
                    : item
                ),
              };
            }
            return categoryData;
          })
        );

        const commandeExiste=  commandeSelectionne.find((val: any)=>val!.id===itemId)

       if (commandeExiste) {
        const allCommande= commandeSelectionne.filter((val: any)=>val!.id!==itemId)
        allCommande.push({...commandeExiste,quantite:item.quantite+1})
        setCommandeSelectionne(allCommande)
      }
      else{
          commandeSelectionne.push({...item,quantite:item.quantite+1})
       }
        
      };

      const decrementQuantity = (category: string, itemId: string,item: {
        id: string;
        text: string;
        quantite: number;
        price: number;
        description: string;
    }) => {
        setDataCommande((prevData) =>
          prevData.map((categoryData) => {
            if (categoryData.category === category) {
              return {
                ...categoryData,
                items: categoryData.items.map((item) =>
                  item.id === itemId
                    ? { ...item, quantite:item.quantite===0?0: item.quantite -1 }
                    : item
                ),
              };
            }
            return categoryData;
          })
        );
        const commandeExiste=  commandeSelectionne.find((val: any)=>val!.id===itemId)
        const allCommande= commandeSelectionne.filter((val: any)=>val!.id!==itemId)

          if((item.quantite-1)<=0){
            setCommandeSelectionne(allCommande)
          }

          if (commandeExiste && (item.quantite-1)>0) {
            allCommande.push({...commandeExiste,quantite:item.quantite-1})
            setCommandeSelectionne(allCommande)
          }
          else{
              commandeSelectionne.push({...item,quantite:item.quantite-1})
           }     
      };

      const isAllQuantitiesZero = () => {
        
        for (const category of dataCommande) {
            for (const item of category.items) {
                if (item.quantite > 0 && numTable) {
                    return false;
                }
            }
        }
        return true;
    };

    const handleSubmit=()=>{
        navigation.navigate({name:"DetailsCommande",params:{table:numTable,commande:commandeSelectionne}}as never)
    }    
      
  return (
    <View>
     
        <View>
            <View style={{position:'relative'}}>
                <ImageBackground source={imageRessource.pattern} style={{height:200}}>
                <View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:"5%",padding:"2%",marginTop:'5%',alignItems:"center"}}>
                            <MaterialCommunityIcons name='arrow-left' size={30} style={{backgroundColor:paletteColor.white,padding:2,borderRadius:5}} color={paletteColor.yellow} onPress={()=>navigation.goBack()}/>
                            <View style={{flexDirection:'row',alignItems:"center"}}>
                              {verifSearch&&<TextInput style={{backgroundColor:paletteColor.white,height:35,width:200}}/>}
                              {!verifSearch&&<MaterialIcons name='search' size={30} style={{backgroundColor:paletteColor.white,padding:2,borderRadius:5}} color={paletteColor.yellow} onPress={()=>setVerifSearch(!verifSearch)}/>}
                              {verifSearch&&<MaterialIcons name='search' size={30} style={{backgroundColor:paletteColor.white,padding:2, borderTopRightRadius:5,borderBottomRightRadius:5}} color={paletteColor.yellow} onPress={()=>setVerifSearch(!verifSearch)}/>}
                            </View>
                    </View>
                </ImageBackground>
                <View style={{  position: 'absolute', zIndex: 100, bottom: -20,width:"80%",left:"10%" }}>
                    <CustomButton
                    backgroundColor={paletteColor.marron}
                    label='Passer une commande'
                    marginTop={10}
                    colorText={paletteColor.white}
                    fontSize={20}
                    fontWeight="bold"
                    disabled={true}
                    />
                </View>
            </View>
           <View style={{marginTop:'10%',marginHorizontal:'5%'}}>

                <View style={{borderWidth:2,borderColor:paletteColor.marron,borderRadius:8,flexDirection:"row",alignItems:"center",width:"33%",padding:"1%",justifyContent:"space-between"}}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                        <CustomText fontWeight='bold' fontSize={17}>Table n°</CustomText>

                        <TextInput
                        value={numTable}
                        keyboardType="numeric"
                        style={{color:paletteColor.black, fontSize:17}}
                        onChangeText={e=>setNumTable(e)}
                    />
                </View>

                    <View style={{marginRight:"5%"}}>
                    <MaterialIcons
                    color={paletteColor.black}
                    name="arrow-drop-up"
                    size={25}
                    onPress={()=>{
                        if (!numTable) {
                            setNumTable("1")
                        }
                        else{
                        let nb=parseInt(numTable)
                        nb+=1
                       
                        setNumTable(nb.toString())
                        }
                        
                        
                    }}
                    />
                    <MaterialIcons
                    color={paletteColor.black}
                    name="arrow-drop-down"
                    size={25}
                    onPress={()=>{
                        let nb=parseInt(numTable)
                        nb-=1
                        setNumTable(nb.toString())
                        if (nb===0 || !nb) {
                            setNumTable("")
                        }
                        
                    }}
                    />
                    </View>
                </View>
           
                <FlatList
                data={dataCommande}
                keyExtractor={item=>item.category}
                style={{ height: Dimensions.get("screen").height/2.2, marginTop: 10}} 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{paddingBottom: 100}}
                renderItem={({item:value})=>  <View key={value.category} >
                <CustomText fontWeight="700" marginTop={5} marginBottom={10} fontSize={20}>
                    {value.category}
                </CustomText>
                <FlatList
                    data={value.items}
                    renderItem={({item}) =>
                    <View style={styles.card} key={item.id}>
                        <Image source={imageRessource.salade} style={styles.image} />
                        <CustomText 
                            fontSize= {14}
                            numberOfLines={2}
                            fontWeight= 'bold'
                            marginTop= {10}>
                                {item.text}
                        </CustomText>
                        <Text style={styles.description} numberOfLines={1}>{item.description}</Text>

                    <View style={{flexDirection:'row',alignItems:"center",justifyContent:"space-between"}}>
                        <View style={{flexDirection:"row",alignItems:"center", backgroundColor:paletteColor.yellow,width:"50%",justifyContent:"center",borderRadius:5,marginTop:10,padding:'2%'}}>
                            <MaterialIcons name='remove-circle' size={20} color={paletteColor.white} onPress={() => {decrementQuantity(value.category, item.id,item)}}/>
                            <CustomText marginLeft={10} marginRight={10} color={paletteColor.white}>{item.quantite}</CustomText>
                            <MaterialCommunityIcons name='plus-circle' size={20} color={paletteColor.white}
                             onPress={() => {
                                incrementQuantity(value.category, item.id,item)
                            }}
                            />
                        </View>

                        <CustomText 
                            fontSize= {13}
                            fontWeight= 'bold'
                            color={paletteColor.marron}
                            marginTop= {10}>
                                {item.price}Fr
                        </CustomText>

                    </View>
                    </View>
                }
                    keyExtractor={item => item.id}
                    numColumns={2}
                />
            </View>}
                
                />
                <View style={{position:"absolute",width:"100%",bottom:0}}>
                <CustomButton
                disabled={isAllQuantitiesZero()}
                label='Voir la commande' 
                backgroundColor={isAllQuantitiesZero() ? paletteColor.grey_light : paletteColor.yellow}
                onPress={handleSubmit}
                fontSize={20} />
            </View>
           </View>

        </View>
    </View>
  )
}



export default ListMenu



const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    width: "45%" ,
    
  
    
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
  },
description: {
    fontSize: 11,
    color: "#B3B6B7",
    marginTop: 5,
  },
});


