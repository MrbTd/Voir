import {StyleSheet, Dimensions, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';

import BodyGerant from '../../../../components/BodyGerant';
import RenderListSousCategoriePlat from './RenderListSousCategoriePlat';
import AjouterSousCategoriePlats from './AjouterSousCategoriePlats';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../hooks/dispatchSelector';
import LoadingModal from '../../../../components/LoadingModal';
import {searchData} from '../../../../utils/searchData';
import {initializeSousCategorie} from '../../../../reducers/gerant/reducerSousCategorie';
import {initializeCategoriePlat} from '../../../../reducers/gerant/reducerCategoriePlat';

const SousCategoriePlat = () => {
  const [bottomVisible, setBottomVisible] = useState(false);
  const {dataSousCat, isLoadingSousCat} = useAppSelector(
    state => state.sousCatGerant,
  );

  const [recherche, setRecherche] = useState('');
  const filterRecherche = searchData(recherche, dataSousCat, 'name');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeSousCategorie());
    dispatch(initializeCategoriePlat());
  }, []);

  return (
    <BodyGerant
      title="Sous-catégories"
      onPress={() => setBottomVisible(true)}
      onChangeText={e => setRecherche(e)}>
      <View style={{height: Dimensions.get('screen').height}}>
        <FlatList
          data={filterRecherche}
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
