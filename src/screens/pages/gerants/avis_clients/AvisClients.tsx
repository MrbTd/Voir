import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import * as Progress from 'react-native-progress';
import BodyGerant from '../../../../components/BodyGerant';
import {
  formaDate,
  moyenneData,
  paletteColor,
} from '../../../../utils/Constantes';
import CustomText from '../../../../components/CustomText';
import {apiGetAvis} from '../../../../services/apiService';
import moment from 'moment';

const AvisClients = () => {
  const [dataAvis, setDataAvis] = useState<any[]>([]);
  const getData = () => {
    apiGetAvis()
      .then(res => setDataAvis(res?.items))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getData();
  }, []);

  const donnéesGroupées = dataAvis.reduce((acc: any, obj: any) => {
    const clé = obj.note_restaurant;
    if (!acc[clé]) {
      acc[clé] = [];
    }
    acc[clé].push(obj);
    return acc;
  }, {});

  const tableauRésultat = Object.keys(donnéesGroupées)
    .map(clé => ({
      note_restaurant: clé,
      items: donnéesGroupées[clé],
    }))
    .filter(item => item.note_restaurant !== '0');

  return (
    <BodyGerant title="Avis clients" isBtnAvis={false}>
      <View style={{marginHorizontal: '5%', marginVertical: '8%', flex: 1}}>
        <View
          style={{
            backgroundColor: paletteColor.yellow,
            borderRadius: 8,
            padding: '4%',
            justifyContent: 'center',
            elevation: 1.5,
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', columnGap: 15}}>
            <View>
              <CustomText
                textAlign="center"
                color={paletteColor.white}
                fontSize={35}>
                {!isNaN(moyenneData(dataAvis, 'note_restaurant'))
                  ? moyenneData(dataAvis, 'note_restaurant').toFixed(2)
                  : 0}
              </CustomText>
              <CustomText color={paletteColor.white} fontSize={10}>
                Moyenne de notation
              </CustomText>
            </View>
            <View>
              <FlatList
                data={tableauRésultat}
                keyExtractor={item => item.note_restaurant}
                renderItem={({item}) => (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        columnGap: 10,
                      }}>
                      <CustomText color={paletteColor.white}>
                        {item?.note_restaurant}
                      </CustomText>
                      <Progress.Bar
                        progress={item?.items.length / tableauRésultat.length}
                        width={175}
                        height={10}
                        borderRadius={10}
                        color={paletteColor.yellow}
                        unfilledColor={paletteColor.white}
                        style={{
                          shadowColor: 'black',
                          shadowOffset: {width: 0, height: 2},
                          shadowOpacity: 0.3,
                          shadowRadius: 4,
                          elevation: 1,
                        }}
                      />
                      <CustomText color={paletteColor.white}>
                        {(
                          (item?.items.length / tableauRésultat.length) *
                          100
                        ).toFixed(0)}
                        %
                      </CustomText>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={tableauRésultat}
          keyExtractor={(item, index) => item.note_restaurant}
          renderItem={({item}) => (
            <>
              {item.items.map((val: any) => (
                <View
                  key={`${val?.id}`}
                  style={{
                    backgroundColor: paletteColor.white,
                    borderRadius: 8,
                    padding: '4%',
                    justifyContent: 'center',
                    elevation: 1.5,
                    marginTop: '5%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <CustomText fontSize={12} color={paletteColor.marron}>
                      {formaDate(val.created_at)}
                    </CustomText>
                    <CustomText fontSize={12} color={paletteColor.marron}>
                      {moment(val.created_at).format('LT')}
                    </CustomText>
                  </View>
                  <View
                    key={`${val?.id}`}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={{width: '65%', marginTop: '5%'}}>
                      <CustomText fontSize={12}>{val?.avis}</CustomText>
                    </View>
                    <View>
                      <CustomText textAlign="right" color={paletteColor.yellow}>
                        {item?.note_restaurant}
                      </CustomText>
                      <Progress.Bar
                        progress={item?.items.length / tableauRésultat.length}
                        width={100}
                        height={10}
                        borderRadius={10}
                        color={paletteColor.yellow}
                        unfilledColor={paletteColor.white}
                        style={{
                          shadowColor: 'black',
                          shadowOffset: {width: 0, height: 2},
                          shadowOpacity: 0.3,
                          shadowRadius: 4,
                          elevation: 1,
                        }}
                      />
                    </View>
                  </View>
                </View>
              ))}
            </>
          )}
        />
      </View>
    </BodyGerant>
  );
};

export default AvisClients;

const styles = StyleSheet.create({});
