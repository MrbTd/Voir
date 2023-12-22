import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {imageRessource, paletteColor, showToast} from '../../utils/Constantes';
import CustomText from '../../components/CustomText';

import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import HeaderYam from '../../components/HeaderYam';
import {useAuth} from '../../hooks/AuthProvider';
import {etatCommande, statusCode, userRole} from '../../utils/data';
import {
  apiChangeCommandeTermine,
  apiChangeCommandeencours,
  apiDetailCommande,
} from '../../services/apiService';
import LoadingModal from '../../components/LoadingModal';
import {useNavigation} from '@react-navigation/native';

const RecapitulatifCommande = ({route}: any) => {
  const commande = route.params;
  const {auhtContext, dispatchAuhtContext} = useAuth();

  const [dataDetailCommande, setDataDetailCommande] = useState({}) as any;
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const getData = () => {
    setIsLoading(true);
    apiDetailCommande(commande?.id)
      .then(res => {
        setDataDetailCommande(res?.data[0]);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEncour = () => {
    setIsLoading(true);

    apiChangeCommandeencours(dataDetailCommande?.commande_id)
      .then(res => {
        if (res?.status_code == statusCode.SUCESS) {
          getData();
          showToast('Commande en cour....');
        } else {
          showToast('un problème est survenu. veuillez réessayer svp !');
        }
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  };

  const handleTerminer = () => {
    setIsLoading(true);

    apiChangeCommandeTermine(dataDetailCommande?.commande_id)
      .then(res => {
        if (res?.status_code == statusCode.SUCESS) {
          navigation.navigate('ListCommande' as never);
          showToast('Commande en terminée....');
        } else {
          showToast('un problème est survenu. veuillez réessayer svp !');
          console.log('recap command', res);
        }
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

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
          {item?.menu?.name}
        </CustomText>
      </View>

      <View style={{width: '21%'}}>
        <CustomText fontWeight="bold" textAlign="left">
          {item?.menu?.prix} Fr
        </CustomText>
      </View>

      <View style={{width: '21%'}}>
        <CustomText fontWeight="bold" textAlign="left">
          {item?.quantite}
        </CustomText>
      </View>

      <View style={{width: '21%'}}>
        <CustomText fontWeight="bold" textAlign="left">
          {parseFloat(item?.quantite) * parseFloat(item?.menu?.prix)} Fr
        </CustomText>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View style={{paddingHorizontal: '3%', marginTop: '5%'}}>
      <CustomTextInput
        title="Information additionnelles..."
        backgroundColor="transparent"
        borderWidth={1}
        borderColor={paletteColor.grey}
        borderRadius={5}
        marginTop={10}
        multiline={true}
        height={100}
        value={dataDetailCommande?.commande?.description}
        editable={false}
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
            {dataDetailCommande?.commande?.montant_total} FCFA
          </CustomText>
        </View>
      </View>

      {auhtContext.data.role === userRole.CUISINIER && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: '5%',
          }}>
          <View style={{width: '40%'}}>
            <CustomButton
              label="En cours"
              disabled={
                dataDetailCommande?.commande?.status == etatCommande.LANCE
                  ? false
                  : true
              }
              backgroundColor={
                dataDetailCommande?.commande?.status == etatCommande.LANCE
                  ? paletteColor.yellow
                  : paletteColor.grey
              }
              onPress={handleEncour}
            />
          </View>
          <View style={{width: '40%'}}>
            <CustomButton
              label="Terminer"
              disabled={
                dataDetailCommande?.commande?.status == etatCommande.ENCOURS
                  ? false
                  : true
              }
              backgroundColor={
                dataDetailCommande?.commande?.status == etatCommande.ENCOURS
                  ? paletteColor.yellow
                  : paletteColor.grey
              }
              onPress={handleTerminer}
            />
          </View>
        </View>
      )}
    </View>
  );
  const handleCommande = () => {};

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
              Table n°{dataDetailCommande?.commande?.table?.numero_table}
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
          data={dataDetailCommande?.details}
          keyExtractor={item => item?.menu?.id}
          renderItem={renderItem}
          ListFooterComponent={() => renderFooter()}
          ListFooterComponentStyle={{marginBottom: 20}}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <LoadingModal visible={isLoading} />
    </View>
  );
};

export default RecapitulatifCommande;

const styles = StyleSheet.create({});