import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderYam from '../../components/HeaderYam';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {paletteColor, showToast} from '../../utils/Constantes';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import {useNavigation} from '@react-navigation/native';
import {dataCommandeEncour} from '../../utils/mocs';
import {useAuth} from '../../hooks/AuthProvider';
import {apiGetListCommandeParServeur} from '../../services/apiService';
import moment from 'moment';
import {etatCommande, statusCode} from '../../utils/data';

const ListMesCommande = () => {
  const navigation = useNavigation();
  const {auhtContext, dispatchAuhtContext} = useAuth();
  const [dataCommande, setDataCommande] = useState([]) as any;
  const [isLoading, setIsLoading] = useState(false);

  const getData = () => {
    setIsLoading(true);

    apiGetListCommandeParServeur(auhtContext.data.idUser)
      .then(res => {
        if (res?.status_code == statusCode.SUCESS) {
          setDataCommande(res?.items);
        } else {
          showToast(res?.message);
          console.log('err apiGetListCommandeParServeur', res);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        showToast('un problème est survenu. veuillez réessayer svp !');
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });

    getData();
    return unsubscribe;
  }, [navigation]);

  const handleRefresh = () => {
    getData();
  };

  return (
    <View style={{flex: 1}}>
      <View>
        <HeaderYam
          navigate={
            <CustomText
              fontSize={18}
              fontWeight="bold"
              color={paletteColor.white}
              onPress={() => navigation.navigate('Home' as never)}>
              ACCUEIL
            </CustomText>
          }
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: '5%',
          }}>
          <TouchableOpacity
            style={{
              borderRadius: 8,
              borderWidth: 3,
              padding: 10,
              borderColor: paletteColor.marron,
              width: '40%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ListCommande' as never)}>
            <CustomText textAlign="center" color={paletteColor.marron}>
              En cours
            </CustomText>
          </TouchableOpacity>
          <View style={{width: '40%'}}>
            <CustomButton label="Mes Commandes" disabled={true} />
          </View>
        </View>
      </View>
      <View style={{flex: 1, marginHorizontal: '5%', marginTop: '8%'}}>
        <FlatList
          data={dataCommande}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={handleRefresh}
              colors={[
                paletteColor.yellow,
                paletteColor.red,
                paletteColor.green,
              ]}
            />
          }
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                borderWidth: 3,
                borderRadius: 8,
                borderColor: paletteColor.marron,
                marginVertical: '2%',
                padding: '4%',
              }}
              onPress={() =>
                navigation.navigate({
                  name: 'RecapitulatifCommande',
                  params: item,
                } as never)
              }>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <CustomText fontSize={17} fontWeight="600">
                    Table n°{item.table?.numero_table}
                  </CustomText>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialCommunityIcons name="clock-outline" />
                    <CustomText textAlign="center">
                      {moment(item.created_at).format('LT')}
                    </CustomText>
                  </View>
                </View>

                <View>
                  <CustomText fontSize={17} fontWeight="600">
                    Commande
                  </CustomText>
                  <CustomText textAlign="center">
                    {item.montant_total} FCFA
                  </CustomText>
                </View>
              </View>

              <View style={{alignItems: 'center', marginTop: '5%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialCommunityIcons
                    name="checkbox-marked-circle"
                    size={25}
                    color={paletteColor.marron}
                  />
                  <View
                    style={{
                      width: '25%',
                      backgroundColor: paletteColor.marron,
                      height: 4,
                    }}
                  />
                  <MaterialCommunityIcons
                    name={
                      item.status == etatCommande.TERMINER ||
                      item.status == etatCommande.ENCOURS
                        ? 'checkbox-marked-circle'
                        : 'checkbox-blank-circle-outline'
                    }
                    size={25}
                    color={paletteColor.marron}
                  />
                  <View
                    style={{
                      width: '25%',
                      backgroundColor: paletteColor.marron,
                      height: 4,
                    }}
                  />
                  <MaterialCommunityIcons
                    name={
                      item.status == etatCommande.TERMINER
                        ? 'checkbox-marked-circle'
                        : 'checkbox-blank-circle-outline'
                    }
                    size={25}
                    color={paletteColor.marron}
                  />
                </View>
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <CustomText fontSize={11}>Lancée</CustomText>
                <CustomText fontSize={11}>En cours</CustomText>
                <CustomText fontSize={11}>Terminer</CustomText>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default ListMesCommande;

const styles = StyleSheet.create({});
