import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {imageRessource, paletteColor, showToast} from '../../utils/Constantes';
import CustomText from '../../components/CustomText';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import HeaderYam from '../../components/HeaderYam';
import {apiCreateCommandeServeur} from '../../services/apiService';
import {useAppSelector} from '../../hooks/dispatchSelector';
import {useAuth} from '../../hooks/AuthProvider';
import LoadingModal from '../../components/LoadingModal';
import {statusCode} from '../../utils/data';

const DetailsCommande = ({route}: any) => {
  const tableId = route.params?.table;
  const commande = route.params?.commande;
  const navigation = useNavigation();
  const {dataTable} = useAppSelector(state => state.tableGerant) as any;
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {auhtContext, dispatchAuhtContext} = useAuth();

  const table = dataTable.find(
    (item: any) => item.id === tableId,
  )?.numero_table;

  function calculerPrixTotal(commandes: any[]) {
    const prixTotal = commandes.reduce((total, commande) => {
      return total + commande.prix * commande.quantite;
    }, 0);

    return prixTotal;
  }

  const renderItem = ({item}: any) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'flex-start',
        borderBottomWidth: 0.7,
        borderBottomColor: paletteColor.grey,
      }}>
      <View style={{width: '37%'}}>
        <CustomText fontWeight="bold" textAlign="left" numberOfLines={2}>
          {item.name}
        </CustomText>
      </View>

      <View style={{width: '21%'}}>
        <CustomText fontWeight="bold" textAlign="left">
          {item.prix} Fr
        </CustomText>
      </View>

      <View style={{width: '21%'}}>
        <CustomText fontWeight="bold" textAlign="left">
          {item.quantite}
        </CustomText>
      </View>

      <View style={{width: '21%'}}>
        <CustomText fontWeight="bold" textAlign="left">
          {parseFloat(item.quantite) * parseFloat(item.prix)} Fr
        </CustomText>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View style={{paddingHorizontal: '3%'}}>
      <TouchableOpacity
        style={{
          alignSelf: 'flex-end',
          borderWidth: 3,
          padding: 10,
          width: '30%',
          borderColor: paletteColor.marron,
        }}
        activeOpacity={0.7}
        onPress={() => navigation.goBack()}>
        <CustomText textAlign="center" color={paletteColor.marron}>
          Modifier
        </CustomText>
      </TouchableOpacity>

      <CustomTextInput
        title="Information additionnelles..."
        backgroundColor="transparent"
        borderWidth={1}
        borderColor={paletteColor.grey}
        borderRadius={5}
        marginTop={10}
        multiline={true}
        height={100}
        onChangeText={e => setDescription(e)}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          alignItems: 'center',
        }}>
        <CustomText fontWeight="bold">Prix Total</CustomText>
        <View style={{backgroundColor: paletteColor.marron, padding: 10}}>
          <CustomText color={paletteColor.white} fontWeight="bold">
            {calculerPrixTotal(commande)} FCFA
          </CustomText>
        </View>
      </View>
      <CustomButton
        label="Valider la commande"
        height={50}
        backgroundColor={paletteColor.yellow}
        fontSize={20}
        marginTop={20}
        onPress={handleCommande}
      />
      <CustomButton
        label="Annuler la commande"
        height={50}
        marginTop={10}
        backgroundColor={paletteColor.red}
        fontSize={20}
        onPress={() => navigation.navigate('Home' as never)}
      />
    </View>
  );
  const handleCommande = () => {
    setIsLoading(true);
    const data = {
      user_id: auhtContext.data.idUser,
      table_id: tableId,
      description: description,
      liste_plats: commande.map((item: any) => {
        return {
          menu_id: item?.id,
          quantite: item?.quantite,
        };
      }),
      montant_total: calculerPrixTotal(commande),
    };

    apiCreateCommandeServeur(data)
      .then(res => {
        if (res?.status_code == statusCode.SUCESS) {
          navigation.navigate('ListCommande' as never);
        } else {
          showToast(res?.message);
          console.log('err cree commande', res);
        }
        console.log('data', res);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        showToast('un problème est survenu. veuillez réessayer svp !');
      });
  };

  return (
    <View style={{flex: 1}}>
      <View>
        <HeaderYam />
        {/* navigate={<MaterialCommunityIcons name='menu' size={35} color={paletteColor.white}/>} */}

        <View style={{marginTop: '10%', marginHorizontal: '3%'}}>
          <View
            style={{
              backgroundColor: paletteColor.yellow,
              padding: 10,
              width: '25%',
            }}>
            <CustomText
              textAlign="center"
              fontWeight="bold"
              color={paletteColor.white}>
              Table n°{table}
            </CustomText>
          </View>
          <View
            style={{
              backgroundColor: paletteColor.marron,
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <View style={{width: '37%'}}>
              <CustomText fontWeight="bold" color={paletteColor.white}>
                Nom
              </CustomText>
            </View>

            <View style={{width: '21%'}}>
              <CustomText fontWeight="bold" color={paletteColor.white}>
                Prix
              </CustomText>
            </View>
            <View style={{width: '21%'}}>
              <CustomText fontWeight="bold" color={paletteColor.white}>
                Qty
              </CustomText>
            </View>
            <View style={{width: '21%'}}>
              <CustomText fontWeight="bold" color={paletteColor.white}>
                Total
              </CustomText>
            </View>
          </View>
        </View>
      </View>

      <View style={{flex: 1, paddingHorizontal: '3%'}}>
        <FlatList
          data={commande}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListFooterComponent={renderFooter()}
          ListFooterComponentStyle={{marginBottom: 20}}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <LoadingModal visible={isLoading} />
    </View>
  );
};

export default DetailsCommande;

const styles = StyleSheet.create({});
