import {
  Dimensions,
  FlatList,
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
import {dataCommandeEncour} from '../../../../utils/mocs';
import {useNavigation} from '@react-navigation/native';
import {apiGetListCommandeGerant} from '../../../../services/apiService';

const CommandeJours = () => {
  const navigation = useNavigation();
  const [dataCommande, setDataCommande] = useState([]) as any;
  const getData = () => {
    apiGetListCommandeGerant()
      .then(res => setDataCommande(res?.items))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BodyGerant title="Commande journalières" isBtnAvis={false}>
      <View style={{flex: 1}}>
        <View
          style={{
            marginHorizontal: '5%',
            marginTop: '8%',
          }}>
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
                onPress={() => navigation.navigate('DetailsCommande' as never)}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <CustomText fontSize={17} fontWeight="600">
                      Table n°{item.table_id}
                    </CustomText>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <MaterialCommunityIcons name="clock-outline" />
                      <CustomText textAlign="center">
                        {formaDate(item.created_at)}
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
                        item.status == 'Terminer' || item.status == 'En cours'
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
                        item.status == 'Terminer'
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
