import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderYam from '../../components/HeaderYam';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {formaDate, imageRessource, paletteColor} from '../../utils/Constantes';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import {useNavigation} from '@react-navigation/native';
import {dataCommandeEncour} from '../../utils/mocs';
import {etatCommande, userRole} from '../../utils/data';
import {useAuth} from '../../hooks/AuthProvider';
import {
  actionReducer,
  actionTypeReducer,
} from '../../contexts/reducers/actionReducer';
import {apiGetListCommandeGerant} from '../../services/apiService';
import moment from 'moment';

const ListCommande = () => {
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();
  const {auhtContext, dispatchAuhtContext} = useAuth();
  const [dataCommande, setDataCommande] = useState([]) as any;

  const getData = () => {
    apiGetListCommandeGerant()
      .then(res => {
        setDataCommande(res?.items);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View>
        <ImageBackground source={imageRessource.pattern} style={{height: 200}}>
          {auhtContext.data.role !== userRole.CUISINIER && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: '5%',
                padding: '2%',
                marginTop: '5%',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={30}
                style={{
                  backgroundColor: paletteColor.white,
                  padding: 2,
                  borderRadius: 5,
                }}
                color={paletteColor.yellow}
                onPress={() => navigation.goBack()}
              />
              <CustomText
                fontSize={18}
                fontWeight="bold"
                color={paletteColor.white}
                onPress={() => navigation.navigate('Home' as never)}>
                ACCUEIL
              </CustomText>
            </View>
          )}
          {auhtContext.data.role === userRole.CUISINIER && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: '5%',
                backgroundColor: paletteColor.white,
                padding: '2%',
                borderTopLeftRadius: 50,
                borderBottomLeftRadius: 50,
                borderTopRightRadius: 50,
                borderBottomRightRadius: 50,
                marginTop: '5%',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={imageRessource.user}
                  style={{width: 50, height: 50, borderRadius: 100}}
                />
                <CustomText marginLeft={5}>Toure Ben Daouda</CustomText>
              </View>
              <TouchableOpacity
                onPress={() =>
                  dispatchAuhtContext(actionReducer(actionTypeReducer.SIGN_OUT))
                }>
                <Image
                  source={imageRessource.deconnexion}
                  style={{width: 50, height: 50, borderRadius: 100}}
                />
              </TouchableOpacity>
            </View>
          )}
        </ImageBackground>
        {auhtContext.data.role === userRole.CUISINIER && (
          <View
            style={{
              position: 'absolute',
              zIndex: 100,
              bottom: -20,
              width: '80%',
              left: '10%',
            }}>
            <CustomButton
              backgroundColor={paletteColor.marron}
              label="Liste des commandes"
              marginTop={10}
              colorText={paletteColor.white}
              fontSize={20}
              fontWeight="bold"
              disabled={true}
            />
          </View>
        )}

        {auhtContext.data.role !== userRole.CUISINIER && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: '5%',
            }}>
            <View style={{width: '40%'}}>
              <CustomButton label="En cours" disabled={true} />
            </View>
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
              onPress={() => navigation.navigate('ListMesCommande' as never)}>
              <CustomText textAlign="center" color={paletteColor.marron}>
                Mes Commandes
              </CustomText>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={{flex: 1, marginHorizontal: '5%', marginTop: '8%'}}>
        <FlatList
          data={dataCommande}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
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
                    Table n°{item.table_id}
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

export default ListCommande;

const styles = StyleSheet.create({});
