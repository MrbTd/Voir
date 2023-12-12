import {StyleSheet, Dimensions, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';

import BodyGerant from '../../../../components/BodyGerant';
import RenderListSousCategoriePlat from './RenderListSousCategoriePlat';
import AjouterSousCategoriePlats from './AjouterSousCategoriePlats';
import {useAppSelector} from '../../../../hooks/dispatchSelector';
import LoadingModal from '../../../../components/LoadingModal';

const SousCategoriePlat = () => {
  const [bottomVisible, setBottomVisible] = useState(false);
  const {dataSousCat, isLoadingSousCat} = useAppSelector(
    state => state.sousCatGerant,
  );

  return (
    <BodyGerant title="Sous-catégories" onPress={() => setBottomVisible(true)}>
      <View style={{height: Dimensions.get('screen').height}}>
        <FlatList
          data={dataSousCat}
          keyExtractor={(item: any) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 300}}
          renderItem={({item}) => <RenderListSousCategoriePlat item={item} />}
        />
      </View>
      <AjouterSousCategoriePlats
        bottomVisible={bottomVisible}
        setBottomVisible={setBottomVisible}
      />
      <LoadingModal visible={isLoadingSousCat} />
    </BodyGerant>
  );
};

export default SousCategoriePlat;

const styles = StyleSheet.create({});
