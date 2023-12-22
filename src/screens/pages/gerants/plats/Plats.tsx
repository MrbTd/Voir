import {StyleSheet, Dimensions, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {dataCategoriePlat, dataUsers} from '../../../../utils/mocs';
import {useNavigation} from '@react-navigation/native';
import RenderListPlats from './RenderListPlats';
import BodyGerant from '../../../../components/BodyGerant';
import AjouterPlats from './AjouterPlats';
import LoadingModal from '../../../../components/LoadingModal';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../hooks/dispatchSelector';
import {initializePlat} from '../../../../reducers/gerant/reducerPlat';
import {searchData} from '../../../../utils/searchData';
import {initializeSousCategorie} from '../../../../reducers/gerant/reducerSousCategorie';
import {initializeCategoriePlat} from '../../../../reducers/gerant/reducerCategoriePlat';

const Plats = () => {
  const navigation = useNavigation();
  const [bottomVisible, setBottomVisible] = useState(false);
  const dispatch = useAppDispatch();
  const {dataPlat, isLoadingPlat} = useAppSelector(state => state.platGerant);

  const [recherche, setRecherche] = useState('');
  const filterRecherche = searchData(recherche, dataPlat, 'name');

  useEffect(() => {
    dispatch(initializePlat());
    dispatch(initializeSousCategorie());
    dispatch(initializeCategoriePlat());
  }, []);

  return (
    <BodyGerant
      title="Plats"
      onPress={() => setBottomVisible(true)}
      onChangeText={e => setRecherche(e)}>
      <View style={{height: Dimensions.get('screen').height}}>
        <FlatList
          data={filterRecherche}
          keyExtractor={(item: any) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 300}}
          renderItem={({item}) => <RenderListPlats item={item} />}
        />
      </View>

      <AjouterPlats
        bottomVisible={bottomVisible}
        setBottomVisible={setBottomVisible}
      />
      <LoadingModal visible={isLoadingPlat} />
    </BodyGerant>
  );
};

export default Plats;

const styles = StyleSheet.create({});
