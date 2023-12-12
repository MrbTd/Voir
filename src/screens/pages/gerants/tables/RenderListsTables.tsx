import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {imageRessource, paletteColor} from '../../../../utils/Constantes';
import CustomText from '../../../../components/CustomText';
import DisplayDetailsComponent from '../../../../components/DisplayDetailsComponent';

const RenderListTables = ({item}: any) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        marginHorizontal: '5%',
        borderRadius: 8,
        height: 100,
        marginVertical: '4%',
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: paletteColor.white,
      }}
      onPress={() =>
        navigation.navigate({name: 'DetailsTables', params: item} as never)
      }>
      <View>
        <Image
          source={imageRessource.table}
          style={{
            width: 90,
            height: 100,
            resizeMode: 'center',
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: paletteColor.white,
          height: '100%',
          justifyContent: 'center',
          paddingHorizontal: '2%',
        }}>
        <DisplayDetailsComponent
          title="NUMERO DE TABLE"
          value={item.numero_table}
          border={0}
        />
      </View>
    </TouchableOpacity>
  );
};

export default RenderListTables;

const styles = StyleSheet.create({});
