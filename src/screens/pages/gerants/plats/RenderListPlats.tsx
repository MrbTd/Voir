import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {imageRessource, paletteColor} from '../../../../utils/Constantes';
import CustomText from '../../../../components/CustomText';
import DisplayDetailsComponent from '../../../../components/DisplayDetailsComponent';

const RenderListPlats = ({item}: any) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        marginHorizontal: '5%',
        borderRadius: 8,
        height: 120,
        marginVertical: '4%',
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: paletteColor.white,
      }}
      onPress={() =>
        navigation.navigate({name: 'DetailsPlats', params: item} as never)
      }>
      <View>
        <Image
          source={{uri: item?.image_link}}
          style={{
            width: 95,
            height: 120,
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
          title="DESIGNATION"
          value={item?.name}
          border={0}
        />
        <DisplayDetailsComponent
          title="CATEGORIE"
          value={item?.category_name}
          border={0}
        />
        <DisplayDetailsComponent
          title="SOUS-CATEGORIE"
          value={item?.souscat}
          border={0}
        />
        <DisplayDetailsComponent
          title="PRIX"
          value={`${item?.prix} FCFA`}
          border={0}
        />
      </View>
    </TouchableOpacity>
  );
};

export default RenderListPlats;

const styles = StyleSheet.create({});
