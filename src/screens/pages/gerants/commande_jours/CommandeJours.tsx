import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BodyGerant from '../../../../components/BodyGerant';
import CustomText from '../../../../components/CustomText';
import {formaDate, paletteColor} from '../../../../utils/Constantes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {apiGetListCommandeGerant} from '../../../../services/apiService';
import moment from 'moment';
import {etatCommande} from '../../../../utils/data';
import LoadingModal from '../../../../components/LoadingModal';
import {searchData} from '../../../../utils/searchData';

const CommandeJours = () => {
  const navigation = useNavigation();
  const [dataCommande, setDataCommande] = useState([]) as any;
  const [isLoading, setIsLoading] = useState(false);

  const [recherche, setRecherche] = useState('');
  const filterRecherche = searchData(recherche, dataCommande, 'montant_total');

  const getData = () => {
    setIsLoading(true);
    apiGetListCommandeGerant()
      .then(res => {
        setIsLoading(false);

        setDataCommande(res?.data);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleRefresh = () => {
    getData();
  };

  return (
    <BodyGerant
      title="Commande journalières"
      isBtnAvis={false}
      onChangeText={e => setRecherche(e)}>
      <View style={{flex: 1}}>
        <View
          style={{
            marginHorizontal: '5%',
            marginTop: '8%',
          }}>
          <FlatList
            data={filterRecherche}
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
                    name: 'RecapitulatifCommandeGerant',
                    params: item,
                  } as never)
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
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
                      Commande n°{item.table_id}
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
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <CustomText fontSize={11}>Lancée</CustomText>
                  <CustomText fontSize={11}>En cours</CustomText>
                  <CustomText fontSize={11}>Terminer</CustomText>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </BodyGerant>
  );
};

export default CommandeJours;

const styles = StyleSheet.create({});
